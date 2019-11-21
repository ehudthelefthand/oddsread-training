import React from 'react';

function Book({ title, cover, onClickRead }) {
  return (
    <div>
      <header>{title}</header>
      <img src={cover} alt={title} />
      <button onClick={onClickRead}>read</button>
    </div>
  )
}

export default Book;