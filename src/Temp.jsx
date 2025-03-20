import { useEffect, useState, useMemo } from "react";
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
      getRecoveryState: getState,
      nativePanel: {
        defaultText: "Добавь книгу",
        screenshotMode: false,
        tabIndex: -1,
      },
    });
  } else {
    return createAssistant({ getState, getRecoveryState });
  }
};

const Temp = () => {
  const [books, setBooks] = useState([
    {
      id: Math.random().toString(36).substring(7),
      title: "Война",
      author: "Саркис Шаинян",
      isFavorite: false,
    },
  ]);

  const [pendingBook, setPendingBook] = useState({title:"", author:""});

  const [filter, setFilter] = useState({
    title: "",
    author: "",
    isFavorite: false,
  });

  const addBook = () => {
    console.log('Added a new book with: ', pendingBook)
    setBooks([
      ...books,
      {
        id: Math.random().toString(36).substring(7),
        title: pendingBook.title,
        author: pendingBook.author,
        isFavorite: false,
      },
    ]);
    pendingBook.title = '';
    pendingBook.author = '';
  };

  useEffect(() => {
    assistant.setGetState(() => getAssistantAppState());
  }, [books]);
  

  const deleteBook = (action) => {
    console.log("called deletebook with action:\n")
    console.log(action)
    console.log('books after deletion:\n')
    console.log(books)
    setBooks([...books].filter((currentBook) => currentBook.id !== action.id));
  };

  const toggleFavoriteBook = (book) => {
    console.log("called toggleFavorite with action:\n")
    console.log(book)
    console.log('books after toggling:\n')
    console.log(books)
    setBooks(
      [...books].map((currentBook) => {
        if (book.id === currentBook.id) {
          return { ...currentBook, isFavorite: !book.isFavorite };
        }
        return { ...currentBook };
      }),
    );
  };

  function getAssistantAppState(){
    console.log("called getAssistant\n");

    const state = {
      item_selector: {
        items: books.map(({ id, title, author }, index) => ({
          number: index + 1,
          id,
          title,
          author
        })),
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
      },
    };

    console.log("getAssistantAppState: state:", state);
    return state;
  };

  //const assistant = initialize(() => getAssistantAppState());
  const assistant = useMemo(
    () => initialize(() => getAssistantAppState(), () => getAssistantAppState()),
    []
  );
  

  assistant.on("data", (data) => {
    if (data.type === "smart_app_data") {
      const { action } = data;
      console.log('called assistant.on(data) with data:\n')
      console.log(data);

      dispatchAssistantAction(action);
    }
  });

  assistant.on("start", (event) => {
    assistant.getInitialData();
  });

  function _send_action_value(action_id, value) {
    const data = {
      action: {
        action_id: action_id,
        parameters: {
          // значение поля parameters может быть любым, но должно соответствовать серверной логике
          value: value, // см.файл src/sc/noteDone.sc смартаппа в Studio Code
        },
      },
    };
    const unsubscribe = assistant.sendData(data, (data) => {
      // функция, вызываемая, если на sendData() был отправлен ответ
      const { type, payload } = data;
      console.log('sendData onData:', type, payload);
      unsubscribe();
    });
  };

  const dispatchAssistantAction = (action) => {
    console.log('dispatchAction\n')
    if (action) {
      switch (action.type) {
        case "set_title":
          setPendingBook((prev) => {
            const updated = {...prev, title:action.title};
            console.log("Set a title for book:", updated);
            return updated;
          });
          break;
        case "set_author":
         setPendingBook((prev) => {
           const updated = { ...prev, author: action.author };
           console.log("Set an author for book", updated);
           return updated;
         });
         break;
        case "add_book":
          console.log('Called an addBook with data: ' + pendingBook.title + " " + pendingBook.author)  
          if (pendingBook.title && pendingBook.author) {
          addBook();
          }
          else {
            console.warn("Cant add new book we dont have title or author", pendingBook);
            const texts = ['не хватает автора или книги!', 'Я не знаю автора, либо названия'];
            const idx = (Math.random() * texts.length) | 0;
            // почему-то не может прочитать пропертис
            _send_action_value('done', texts[idx]);
          }
          break;
        case "delete_note":
          console.log(action);
          deleteBook(action);
          break;
        case "toggle_favorite_book":
          console.log(action);
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
          {/*<BookForm onAddBook={(book) => addBook({ type: "add_book", book })} />*/}
          <BookForm onAddBook={(book) => {
            console.log('received from react fields a book' + book.title + ' ' + book.author)
            setPendingBook({ title:book.title, author:book.author });
            addBook();
          }} />
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
