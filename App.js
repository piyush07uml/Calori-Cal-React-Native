import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './redux/store';
import { Provider } from "react-redux";
import { createAppContainer, createStackNavigator } from "react-navigation";
import Items from './screens/Items';
import AddItem from './screens/AddItem';
import EditItem from './screens/EditItem';
import MealsContainer from './screens/Meals-section/MealsContainer';


const myNavigator = createStackNavigator({

  Meals: { screen: MealsContainer },
  Items: { screen: Items },
  AddItem: { screen: AddItem },
  EditItem: { screen: EditItem }

}, {
    defaultNavigationOptions: {
      headerTitleStyle: {
        color: '#fff'
      },
      headerStyle: {
        backgroundColor: '#2475B0'
      },
      headerTintColor: '#fff'
    }
  })


const Navigation = createAppContainer(myNavigator)





export default class App extends React.Component {

  loader = () => {
    return <ActivityIndicator />
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}