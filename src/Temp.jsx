import { useEffect, useState } from "react";
import { createAssistant, createSmartappDebugger } from "@salutejs/client";
import BookForm from "./components/BookForm/BookForm";
import BookList from "./components/BookList/BookList";
import Filter from "./components/Filter/Filter";

const initialize = (getState, getRecoveryState) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN,
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
      nativePanel: {
        defaultText: "Добавь книгу ...",
        screenshotMode: false,
        tabIndex: -1,
      },
    });
  } else {
    return createAssistant({ getState });
  }
};

const Temp = () => {
  const [books, setBooks] = useState([
    {
      id: Math.random().toString(36).substring(7),
      title: "War",
      author: "Sarkis Shainyan",
      isFavorite: false,
    },
  ]);

  const [filter, setFilter] = useState({
    title: "",
    author: "",
    isFavorite: false,
  });

  const addBook = (action) => {
    setBooks([
      ...books,
      {
        id: Math.random().toString(36).substring(7),
        title: action.book.title,
        author: action.book.author,
        isFavorite: false,
      },
    ]);
  };

  const deleteBook = (action) => {
    setBooks([...books].filter((currentBook) => currentBook.id !== action.id));
  };

  const toggleFavoriteBook = (book) => {
    setBooks(
      [...books].map((currentBook) => {
        if (book.id === currentBook.id) {
          return { ...currentBook, isFavorite: !book.isFavorite };
        }
        return { ...currentBook };
      }),
    );
  };

  function getAssistantAppState() {
    return {
      item_selector: {
        ignored_words: [
          "добавить",
          "установить",
          "запиши",
          "поставь",
          "закинь",
          "напомнить",
          "создать", // addNote.sc
          "удалить",
          "удали", // deleteNote.sc
          "выполни",
          "выполнил",
          "сделал", // выполнил|сделал
        ],
        items: [
          books.map((book, index) => {
            return { ...book, number: index + 1 };
          }),
        ],
      },
    };
  }

  const assistant = initialize(() => getAssistantAppState());

  assistant.on("data", (data) => {
    if (data.type === "smart_app_data") {
      const { action } = data;

      console.log(data);

      dispatchAssistantAction(action);
    }
  });

  assistant.on("start", (event) => {
    assistant.getInitialData();
  });

  const dispatchAssistantAction = (action) => {
    if (action) {
      switch (action.type) {
        case "add_book":
          addBook(action);
          break;
        case "delete_note":
          console.log(action);
          deleteBook(action);
          break;
        case "toggle_favorite_book":
          toggleFavoriteBook(action);
          break;
        default:
          console.warn("Unknown action type:", action.type);
      }
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Book Library App</h1>
      </header>
      <main className="app-main">
        <div className="app-left-column">
          <BookForm onAddBook={(book) => addBook({ type: "add_book", book })} />
        </div>
        <div className="app-right-column">
          <Filter filter={filter} setFilter={setFilter} />
          <BookList
            books={books}
            filter={filter}
            onDeleteBook={(book) =>
              deleteBook({ action: "delete_note", id: book.id })
            }
            onToggleFavoriteBook={toggleFavoriteBook}
          />
        </div>
      </main>
    </div>
  );
};

export default Temp;
