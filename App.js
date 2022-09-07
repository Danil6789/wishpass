import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import AddWishlist from './screens/AddWishlist';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './redux/reducers/';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Home from './screens/Home';
import GroupItems from './screens/GroupItems';
import ItemItem from './screens/ItemItem';
import AddWish from './screens/AddWish';
const store = createStore(rootReducer, applyMiddleware(thunk))

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{title: 'Править'}}/>
          <Stack.Screen name="AddWishlist" component={AddWishlist}/>
          <Stack.Screen name='GroupItems' component={GroupItems}/>
          <Stack.Screen name='ItemItem' component={ItemItem}/>
          <Stack.Screen name='AddWish' component={AddWish}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
