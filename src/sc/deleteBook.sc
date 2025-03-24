theme: /

    state: УдалениеКниги
        q!: (~удалить|удали)
            $AnyText::anyText
        script:
            log('deleteBook: context: ' + JSON.stringify($context))
            var item_id = get_id_by_selected_item(get_request($context));
            log('deleteBook: item_id: ' + item_id)
            deleteBook(item_id,$context);
            addSuggestions(["Добавь автора Пушкин", "Добавь книгу Капитанская Дочка", "Помощь", "Удали первую"], $context);
        a: Удаляю