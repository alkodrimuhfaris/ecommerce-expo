import React, {Component} from 'react';

import AllProduct from '../AllProduct';
import Search from '../Search';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import {AntDesign} from '@expo/vector-icons';
import SearchButton from '../../components/SearchButton';

export default function AllProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: null,
          headerTitleAlign: 'center',
          headerBackImage: () => {
            return <AntDesign name="left" size={16} color="black" />;
          },
          headerStyle: {
            elevation: 0,
          },
        }}
        name="Search"
        component={Search}
      />
      <Stack.Screen
        options={{
          title: null,
          headerTitleAlign: 'center',
          headerBackImage: () => {
            return <AntDesign name="left" size={16} color="black" />;
          },
          headerRight: () => {
            return <SearchButton />;
          },
          headerStyle: {
            elevation: 0,
          },
        }}
        name="AllProduct"
        component={AllProduct}
      />
    </Stack.Navigator>
  );
}
