import { persistCombineReducers, persistStore, persistReducer } from 'redux-persist';
import { createStore, combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import calorieReducer from './calorieReducer';


const persistConfig = {
    key: 'App101',
    storage: AsyncStorage
}
const Reducer = combineReducers({
    calorie: calorieReducer
})

const persistedReducer = persistReducer(persistConfig, Reducer)

export let store = createStore(persistedReducer);
export let persistor = persistStore(store)

