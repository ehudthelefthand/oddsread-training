
import React, { useState, useEffect } from 'react';

import AddBookForm from './AddBookForm';
import { listBook, addRead } from './api';

function Books() {
  const [books, setBooks] = useState([]);

  function onBookAdded(book) {
    setBooks([...books, book]);
  }

  function onClickRead(book) {
    return async function () {
      try {
        const updated = await addRead(book);
        setBooks(books.map(b => {
          if (b._id === updated._id) {
            return updated;
          }
          return b;
        }));
      } catch (e) {
        alert(e);
      }
    }
  }

  useEffect(() => {
    listBook()
      .then(setBooks)
      .catch(alert);
  }, []);

  return (
    <div>
      <AddBookForm onBookAdded={onBookAdded} />
      {
        books.map(b => {
          return (
            <div key={b._id}>
              <header>{b.title}</header>
              <img src={b.cover} alt={b.title} />
              <button onClick={onClickRead(b)}>read</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default Books