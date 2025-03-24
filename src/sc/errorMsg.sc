theme: /
    
    state: ЗаданиеВыполнено
        event!: done
        event!: DONE
        
        script:
            ### Пример обработки сообщения, отправленного из фронтенда с помощью sendData()
            log('cantAdd: context: ' + JSON.stringify($context))
            var eventData = $context && $context.request && $context.request.data && $context.request.data.eventData || {}
            log('cantAdd: eventData: ' + JSON.stringify($context && $context.request && $context.request.data && $context.request.data.eventData))
            # видимо это ответ ассистента без тега a: (внутри script:)
            $reactions.answer({
                #"value": "Ты - " + eventData.value,
                "value": "Ошибочка: " + eventData.value,
            });
            ###
            addSuggestions(["Добавь 'купить машину'"], $context);
        # random: 
            # a: Молодец!
            # a: Красавичк!
            # a: Супер!
        