import React from 'react';
import { createBook } from './api';

function AddBookForm({ onBookAdded }) {

  const fileInput = React.createRef();

  async function onSubmit(e) {
    e.preventDefault();
    const elem = e.target.elements;
    const title = elem.title.value;
    const cover = fileInput.current.files[0];
    const tags = elem.tags.value;
    try {
      const book = await createBook({ title, cover, tags });
      onBookAdded(book);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" name="title" />
        </div>
        <div>
          <label htmlFor="cover">Cover</label>
          <input id="cover" type="file" ref={fileInput} />
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <input id="tags" type="text" name="tags" />
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
    </div>
  )
}

export default AddBookForm;