import store from './store/store.js'

Echo.join('chat')
        .here(users => {////Usuários logados ...
            store.commit('LOAD_USERS', users)
        })
        .joining(user => {//Usuários que entraram no chat ...
            store.commit('JOINING_USER', user)
        })
        .leaving(user => {//Usuários que saíram do chat ...
            store.commit('LEAVING_USER', user)
        })
        .listen('Chat.MessageCreated', e => {
            store.commit('ADD_MESSAGE', e.message)
        })