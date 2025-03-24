theme: /

    state: ПолучениеНазвания
        q!: * (*книг* / *произвед* / *рассказ* / *роман*) $Book::book
        
        random:
            #a: Книга получена! {{$parseTree.text}}
            a: Книга получена! #{{$parseTree._book}} 
            #addNote($parseTree._anyText, $context);
        
        script:
            log('What is in book var: ' + $parseTree._book)
            addBook($parseTree._book, $context)
            addSuggestions(["Добавь автора Пушкин", "Сохрани книгу", "Помощь", "Удали первую"], $context);
            
    state: CatchAll || noContext=true
        q: * (*книг* / *произвед* / *рассказ* / *роман*) *
        a: Нужно произнести отдельно название книги и имя автора.