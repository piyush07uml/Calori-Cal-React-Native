import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM, ADD_ITEM_MEAL, REMOVE_ITEM_MEAL } from './actionTypes';
import uuid from 'uuid';

const initialState = {
    itemList: [],
    mealDietList: [
        {
            id: uuid(),
            title: "Meal-1",
            dietList: [],
            totalCal: 0
        },
        {
            id: uuid(),
            title: "Meal-2",
            dietList: [],
            totalCal: 0
        },
        {
            id: uuid(),
            title: "Meal-3",
            dietList: [],
            totalCal: 0
        },
        {
            id: uuid(),
            title: "Meal-4",
            dietList: [],
            totalCal: 0
        },
        {
            id: uuid(),
            title: "Meal-5",
            dietList: [],
            totalCal: 0
        },
        {
            id: uuid(),
            title: "Meal-6",
            dietList: [],
            totalCal: 0
        }
    ],
    Cal: 0,
}



const calorieReducer = (state = initialState, action) => {

    let newItemList;
    let newMealList;
    let newList;
    let newTotalCal = 0
    let newCal = 0
    let finaleList
    let getCal


    // calaculating total calories and calories for every meal after change in mealDietList
    // due to change in itemList


    const CalColories1 = (newMealList) => {

        finaleList = newMealList.map((items) => {

            items.dietList.map(item => {
                newTotalCal += (parseFloat(item.protein) * 4) + (parseFloat(item.carbs) * 4) + (parseFloat(item.fats) * 9);
                return item
            })
            items.totalCal = newTotalCal;
            newCal += newTotalCal
            newTotalCal = 0
            return items;

        })

        return {
            finaleList,
            newCal
        }
    }


    // calaculating total calories and calories for every meal after change in mealDietList
    // due to change in mealDietList


    const CalColories2 = (newMealList) => {

        finaleList = newMealList.map((items) => {
            if (items.id === action.id) {

                items.dietList.map(item => {
                    newTotalCal += (parseFloat(item.protein) * 4) + (parseFloat(item.carbs) * 4) + (parseFloat(item.fats) * 9);
                    return item
                })
                items.totalCal = newTotalCal;
                return items;
            } else {
                return items;
            }
        })

        finaleList.map((items) => {
            return newCal += items.totalCal
        })

        return {
            finaleList,
            newCal
        }
    }










    switch (action.type) {
        case ADD_ITEM:

            //Adding item to the itemList

            newItemList = [...state.itemList, action.item]

            return {
                ...state,
                itemList: newItemList
            }



        case DELETE_ITEM:


            // Deleting Item from itemList


            newItemList = state.itemList.filter((item) => {
                return item.id !== action.id;
            })


            //Removing Item From mealDietList for every Meal

            newMealList = state.mealDietList.map((items) => {

                newList = items.dietList.filter((item) => {
                    return item.uid !== action.id
                })
                items.dietList = newList;
                return items
            })


            // calaculating total calories and calories for every meal after change in mealDietList

            getCal = CalColories1(newMealList);


            return {
                ...state,
                itemList: newItemList,
                mealDietList: getCal.finaleList,
                Cal: getCal.newCal
            }




        case EDIT_ITEM:

            // Editing Item from itemList

            newItemList = state.itemList.map((item) => {
                item.id === action.item.id ? item = action.item : item
                return item
            })


            //  editing item From mealDietList for every Meal

            newMealList = state.mealDietList.map((items) => {

                newList = items.dietList.map((item) => {

                    if (item.uid === action.item.id) {
                        let mealItem = { ...action.item, uid: item.uid, id: item.id }
                        item = mealItem;
                        return item
                    } else {
                        return item
                    }
                })

                items.dietList = newList;
                return items
            })

            // calaculating total calories and calories for every meal after change in mealDietList

            getCal = CalColories1(newMealList);





            return {
                ...state,
                itemList: newItemList,
                mealDietList: getCal.finaleList,
                Cal: getCal.newCal
            };





        case ADD_ITEM_MEAL:

            //Adding item to the mealDietList for a  Meal

            newMealList = state.mealDietList.map((item) => {
                item.id === action.id ? item.dietList = [...item.dietList, action.item] : item
                return item;
            })

            // calaculating total calories and calories for a meal after change in mealDietList

            getCal = CalColories2(newMealList);

            return {
                ...state,
                mealDietList: getCal.finaleList,
                Cal: getCal.newCal
            }



        case REMOVE_ITEM_MEAL:

            //Removing item from  mealDietList for a Meal

            let filterItem;

            newMealList = state.mealDietList.map((items) => {


                if (items.id === action.id) {
                    filterItem = items.dietList.filter((item) => {
                        return item.id !== action.item.id
                    });

                    items.dietList = filterItem;
                    return items;


                } else {
                    return items;
                }
            })


            // calaculating total calories and calories for a meal after change in mealDietList

            getCal = CalColories2(newMealList);



            return {
                ...state,
                mealDietList: getCal.finaleList,
                Cal: getCal.newCal
            }


        default:
            return state;
    }
}

export default calorieReducer;