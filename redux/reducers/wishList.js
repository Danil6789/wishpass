import {ADD_WISHPASS, DELETE_WISHPASS} from '../constants';

const initialState = {
    wishlist: [
        {id: 1, title: 'юбка', group: "День рождения"},
        {id: 2, title: 'книга компьюетерные сети', group: "День рождения"},
        {id: 3, title: 'шапка-ушанка', group: "9 мая"},
        {id: 4, title: 'манга наруто', group: "14 февраля"},
        {id: 5, title: 'телевизор', group: "9 мая"},
    ]
}

export const wishes = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WISHPASS:
            return {
                ...state,
                wishlist: [...state.wishlist, action.payload]
            }
        case DELETE_WISHPASS:
            const { id } = action.payload
             return {
                ...state,
                wishlist: state.wishlist.filter((todo) => todo.id != id)
      };
        default:
            return state;
       }
    }
