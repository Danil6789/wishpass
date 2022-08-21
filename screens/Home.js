import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllWishes from './AllWishes';
import Wishlists from './Wishlists';

const Tab = createMaterialTopTabNavigator();



export default function Home({ navigation }) {
    return (
      <Tab.Navigator screenOptions={{swipeEnabled: false}}>
        <Tab.Screen name="Wishlists" component={Wishlists} options={{title: 'Вишлисты'}}/>
        <Tab.Screen name="AllWishes" component={AllWishes} options={{title: 'Все виши'}}/>
      </Tab.Navigator>
    );
  }

