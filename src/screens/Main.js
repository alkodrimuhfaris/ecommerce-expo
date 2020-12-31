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
import AllProduct from './AllProduct';

import {connect} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

import {MaterialIcons, AntDesign, Feather} from '@expo/vector-icons';

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title: 'Login'}} name="Login" component={Login} />
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
    <Stack.Navigator>
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
      <Stack.Screen
        options={{title: 'My Order'}}
        name="MyOrder"
        component={MyOrder}
      />
    </Stack.Navigator>
  );
};

const ProductStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        options={{title: 'Product'}}
        name="Product"
        component={DetailProduct}
      />
      <Stack.Screen
        options={{title: 'Rating and Review'}}
        name="RatingAndReview"
        component={RatingAndReview}
      />
      <Stack.Screen
        options={{title: 'Checkout'}}
        name="Checkout"
        component={Checkout}
      />
      <Stack.Screen
        options={{title: 'Select Address'}}
        name="SelectAddress"
        component={SelectAddress}
      />
    </Stack.Navigator>
  );
};

const AddressStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
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
    </Stack.Navigator>
  );
};

const TabbedScreen = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => {
            return <AntDesign name="home" size={24} color="black" />;
          },
        }}
        name="Home"
        component={Home}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => {
            return <AntDesign name="shoppingcart" size={24} color="black" />;
          },
        }}
        name="Shop"
        component={Categories}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => {
            return <Feather name="shopping-bag" size={24} color="black" />;
          },
        }}
        name="Bag"
        component={MyBag}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => {
            return (
              <MaterialIcons name="person-outline" size={24} color="black" />
            );
          },
        }}
        name="Profile"
        component={MyProfile}
      />
    </BottomTab.Navigator>
  );
};

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="TabbedScreen" component={TabbedScreen} />
          <Stack.Screen name="AllProduct" component={AllProduct} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="ProfileStack" component={ProfileStack} />
          <Stack.Screen name="ProductStack" component={ProductStack} />
          <Stack.Screen name="AddressStack" component={AddressStack} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapSatateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapSatateToProps)(Main);
