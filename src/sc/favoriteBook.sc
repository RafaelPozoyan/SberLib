theme: /

    state: ВыполнениеЭлемента
        # должно быть что-то кроме основного слова в (), чтобы дифференцировать книгу
        q!: (*отмет* / *помет* / *выдел*) 
            $AnyText::text # должна быть другая переменная
            
        script:
            log('favoriteBook: context: ' + JSON.stringify($context))
            var item_id = get_id_by_selected_item(get_request($context));
            log('favoriteBook: item_id: ' + item_id)
            favoriteBook(item_id,$context);
            
        random: 
            a: Молодец!
            a: Красавичк!
            a: Супер!
        