theme: /

    state: ПолучениеАвтора
        
        q!: *(*имя* / *писател* / *автор* / *философ* / *поэт*) $Author::author
        
        random:
            #a: Книга получена! {{$parseTree.text}}
            a: Автора узнали! #{{$parseTree._author}} 
            a: Я распознал! #{{$parseTree._author}}
            #addNote($parseTree._anyText, $context);
        
        script:
            log('Here is author var: ' + $parseTree._author)
            addAuthor($parseTree._author, $context)
            addSuggestions(["Сохрани книгу", "Добавь книгу Капитанская Дочка", "Помощь", "Удали первую"], $context);
            
    
    #state: CatchAll || noContext=true
    #    q: * (*имя* / *писател* / *автор* / *философ* / *поэт*) *
    #    a: Не понял имени автора