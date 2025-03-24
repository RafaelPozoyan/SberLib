

function addAuthor(value, context) {
    log('ACTION : addAuthor in actions.jc')
    //log('textComm: context: ' + JSON.stringify($context))
    addAction({
        type: "set_author",
        author: value
    }, context);
}

function createBook(context) {
    log('ACTION : createBook in actions.jc')
    //log('textComm: context: ' + JSON.stringify($context))
    addAction({
        type: "add_book",
    }, context);
}

function addBook(value, context) {
    log('ACTION : addBook in actions.jc')
    //log('textComm: context: ' + JSON.stringify($context))
    addAction({
        type: "set_title",
        title: value
    }, context);
}

function favoriteBook(id, context){
    log('ACTION : favoriteBook in actions.jc')
    addAction({
        type: "toggle_favorite_book",
        id: id
    }, context)
}

function deleteBook(id, context){
    log('ACTION : deleteBook in actions.jc')
    addAction({
        type: "delete_note",
        id: id
    }, context)
}