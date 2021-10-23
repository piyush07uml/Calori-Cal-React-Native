import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM, ADD_ITEM_MEAL, REMOVE_ITEM_MEAL } from './actionTypes';


export const addItemAction = (item) => {
    return {
        type: ADD_ITEM,
        item
    }
}

export const deleteItemAction = (id) => {

    return {
        type: DELETE_ITEM,
        id
    }
}

export const editItemAction = (item) => {

    return {
        type: EDIT_ITEM,
        item
    }
}

export const addItemToMealAction = (item, id) => {

    return {
        type: ADD_ITEM_MEAL,
        item,
        id
    }
}

export const removeItemFromMealAction = (item, id) => {

    return {
        type: REMOVE_ITEM_MEAL,
        item,
        id
    }
}