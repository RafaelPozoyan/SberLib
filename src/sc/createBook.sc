theme: /

    state: НоваяКнига
        q!: * (*добав* / *заполн* / *сохран* / *встав*) [~произведение / ~книга] 
        
        random:
            a: Делаю!
            a: Записываю!
            
        script:
            log('createBook: context: ' + JSON.stringify($context))
            
            #log('BOOK PROPERTIES: ' + {{$parseTree.text}})
            createBook($context);
            # прописать все возможные фразы
            addSuggestions(["Добавь автора Пушкин", "Добавь книгу Капитанская Дочка", "Помощь", "Удали первую"], $context);