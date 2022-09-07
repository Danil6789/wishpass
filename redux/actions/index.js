import {ADD_WISHPASS, DELETE_WISHPASS} from '../constants';
let nextId = 5;

export const addWish = (title, group) => ({
    type: ADD_WISHPASS,
    payload: {
      id: ++nextId,
      title,
      group
    }
  });

export const deleteWish = id => ({
    type: DELETE_WISHPASS,
    payload: {
        id
    }
});
