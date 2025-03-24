require: slotfilling/slotFilling.sc
  module = sys.zb-common
  
# Подключение javascript обработчиков
require: js/getters.js
require: js/reply.js
require: js/actions.js

# Подключение сценарных файлов

# действия
require: sc/createBook.sc
#require: sc/favoriteBook.sc
require: sc/deleteBook.sc
require: sc/errorMsg.sc

# ввод
require: sc/getAuthor.sc
require: sc/getName.sc



patterns:
    $AnyText = $nonEmptyGarbage
    $Author = $nonEmptyGarbage
    $Book = $nonEmptyGarbage

theme: /
    state: Start
        # При запуске приложения с кнопки прилетит сообщение /start.
        q!: $regex</start>
        # При запуске приложения с голоса прилетит сказанная фраза.
        # Если названме приложения отличается, то выполнится переход к состоянию Fallback, будет проиграно "Я не понимаю".
        # Обратите внимание, что если в названии приложения есть тире, их нужно заменить на пробелы ("my-canvas-test" -> "my canvas test")
        q!: (запусти | открой | вруби) canvas_sample
        a: Начнем. Стартап поможет с ведением своей библиотеки. Если не понятно, что говорить, то можно произнести "помощь".
        
    state: Help
        q!: * (*помощ* | умееш* | можеш*) *
        a: Я могу сохранить прочитанные книги в библиотеку, отфильтровать произведения и удалить старые. Необходимо только сказать мне об этом. Для добавления нужно всего лишь отдельно назвать автора и книгу, а затем сказать, что нужно внести её в список.
        
        
    state: Fallback
        event!: noMatch
        script:
            log('Error noMatch: Fallback: context: ' + JSON.stringify($context))
            addSuggestions(["Добавь автора Пушкин", "Добавь книгу Капитанская Дочка", "Помощь", "Удали первую"], $context);
        a: Я не понял фразу

