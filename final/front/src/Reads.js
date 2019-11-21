
import React, { useState, useEffect } from 'react';
import Book from './Book';
import { listRead, removeRead } from './api';

function Reads() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    listRead()
      .then(setBooks)
      .catch(alert);
  }, []);

  function onClickRead(bk) {
    return async () => {
      try {
        await removeRead(bk);
        setBooks(books.filter(b => b._id !== bk.id));
      } catch (e) {
        alert(e);
      }
    }
  }

  return (
    <div>
      {
        books.map(b =>
          <Book
            key={b._id} {...b}
            onClickRead={onClickRead(b)} />)
      }
    </div>
  )
}

export default Reads