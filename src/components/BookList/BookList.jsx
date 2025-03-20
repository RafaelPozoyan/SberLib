import "./BookList.css";

import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { useState } from "react";

// компонент со списком книг
// тут реализовано удаление, работа с избранными
// отображение фильтров

const BookList = ({ books, onDeleteBook, onToggleFavoriteBook, filter }) => {
  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(filter.title.toLowerCase());

    const matchesAuthor = book.author
      .toLowerCase()
      .includes(filter.author.toLowerCase());

    const matchesFavorite = filter.isFavorite ? book.isFavorite : true;

    return matchesTitle & matchesAuthor & matchesFavorite;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");
    return text.split(regex).map((substring, index) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={index} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h2>BookList</h2>
      {filteredBooks.length === 0 ? (
        <h2>Books not found</h2>
      ) : (
        <ul>
          {filteredBooks.map((book, index) => (
            <li key={book.id}>
              <div className="book-info">
                {++index}. {highlightMatch(book.title, filter.title)} by{" "}
                <strong>{highlightMatch(book.author, filter.author)}</strong>
              </div>
              <div className="book-actions">
                {/*{book.isFavorite ? (
                  <BsBookmarkStarFill
                    className="star-icon"
                    onClick={() => onToggleFavoriteBook(book)}
                  />
                ) : (
                  <BsBookmarkStar
                    className="star-icon"
                    onClick={() => onToggleFavoriteBook(book)}
                  />
                )}*/}
                <button onClick={() => onDeleteBook(book)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
