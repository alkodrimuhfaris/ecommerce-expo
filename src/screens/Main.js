import React, {Component} from 'react';

import Categories from './Categories';
import ChangePassword from './ChangePassword';
import ChangeProfile from './ChangeProfile';
import CreateAddress from './CreateAddress';
import Checkout from './Checkout';
import DetailProduct from './DetailProduct';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Login from './Login';
import MyBag from './MyBag';
import MyOrder from './MyOrder';
import MyProfile from './MyProfile';
import RatingAndReview from './RatingAndReview';
import Search from './Search';
import SelectAddress from './SelectAddress';
import Signup from './Signup';
import {useSelector, useDispatch} from 'react-redux';
import UpdateAddress from './UpdateAddress';
import DetailOrder from './DetailOrder';
import AllProductStack from './StackScreen/AllProductStack';
import TopUp from './TopUp';
import ShareButton from '../components/ShareButton';
import HomeButton from '../components/HomeButton';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

import {MaterialIcons, AntDesign, Feather} from '@expo/vector-icons';

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackImage: () => {
          return <AntDesign name="left" size={16} color="black" />;
        },
        headerStyle: {
          elevation: 1,
        },
      }}>
      <Stack.Screen
        name="Login"
        options={{title: 'Login', headerShown: false}}
        component={Login}
      />
      <Stack.Screen
        options={{title: 'Sign Up'}}
        name="SignUp"
        component={Signup}
      />
      <Stack.Screen
        options={{title: 'Forgot Password'}}
        name="ForgotPassword"
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackImage: () => {
          return <AntDesign name="left" size={16} color="black" />;
        },
        headerStyle: {
          elevation: 1,
        },
      }}>
      <Stack.Screen
        options={{title: 'Change Profile'}}
        name="ChangeProfile"
        component={ChangeProfile}
      />
      <Stack.Screen
        options={{title: 'Change Password'}}
        name="ChangePassword"
        component={ChangePassword}
      />
    </Stack.Navigator>
  );
};

const ProductStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackImage: () => {
          return <AntDesign name="left" size={16} color="black" />;
        },
        headerRight: () => {
          return <ShareButton />;
        },
        headerStyle: {
          elevation: 1,
        },
      }}>
      <Stack.Screen
        options={{title: null}}
        name="Product"
        component={DetailProduct}
      />
      <Stack.Screen
        options={{title: 'Rating and Review'}}
        name="RatingAndReview"
        component={RatingAndReview}
      />
    </Stack.Navigator>
  );
};

const CheckoutStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackImage: () => {
          return <AntDesign name="left" size={16} color="black" />;
        },
        headerStyle: {
          elevation: 1,
        },
      }}>
      <Stack.Screen
        options={{
          title: 'Checkout',
        }}
        name="Checkout"
        component={Checkout}
      />
    </Stack.Navigator>
  );
};

const TransactionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackImage: () => {
          return <AntDesign name="left" size={16} color="black" />;
        },
        headerStyle: {
          elevation: 1,
        },
      }}>
      <Stack.Screen
        options={{
          title: 'My Orders',
          headerRight: () => {
            return <HomeButton />;
          },
        }}
        name="My Orders"
        component={MyOrder}
      />
      <Stack.Screen
        options={{
          title: 'Order Detail',
        }}
        name="OrderDetail"
        component={DetailOrder}
      />
      <Stack.Screen
        options={{
          title: 'Top Up',
        }}
        name="TopUp"
        component={TopUp}
      />
    </Stack.Navigator>
  );
};

const AddressStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackImage: () => {
          return <AntDesign name="left" size={16} color="black" />;
        },
        headerStyle: {
          elevation: 1,
        },
      }}>
      <Stack.Screen
        options={{title: 'Select Address'}}
        name="SelectAddress"
        component={SelectAddress}
      />
      <Stack.Screen
        options={{title: 'Create Address'}}
        name="CreateAddress"
        component={CreateAddress}
      />
      <Stack.Screen
        options={{title: 'Update Address'}}
        name="UpdateAddress"
        component={UpdateAddress}
      />
    </Stack.Navigator>
  );
};

const TabbedScreen = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBarOptions={{
        showLabel: false,
      }}>
      <BottomTab.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => {
            return (
              <AntDesign
                name="home"
                size={24}
                color={focused ? '#457373' : '#102526'}
              />
            );
          },
        }}
        name="Home"
        component={Home}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => {
            return (
              <AntDesign
                name="shoppingcart"
                size={24}
                color={focused ? '#457373' : '#102526'}
              />
            );
          },
        }}
        name="Shop"
        component={Categories}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => {
            return (
              <Feather
                name="shopping-bag"
                size={24}
                color={focused ? '#457373' : '#102526'}
              />
            );
          },
        }}
        name="Bag"
        component={MyBag}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => {
            return (
              <MaterialIcons
                name="person-outline"
                size={24}
                color={focused ? '#457373' : '#102526'}
              />
            );
          },
        }}
        name="Profile"
        component={MyProfile}
      />
    </BottomTab.Navigator>
  );
};

export default function Main() {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="TabbedScreen" component={TabbedScreen} />
        {!isLogin ? (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        ) : (
          <>
            <Stack.Screen name="CheckoutStack" component={CheckoutStack} />
            <Stack.Screen
              name="TransactionStack"
              component={TransactionStack}
            />
          </>
        )}
        <Stack.Screen name="AllProductStack" component={AllProductStack} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="ProfileStack" component={ProfileStack} />
        <Stack.Screen name="ProductStack" component={ProductStack} />
        <Stack.Screen name="AddressStack" component={AddressStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
