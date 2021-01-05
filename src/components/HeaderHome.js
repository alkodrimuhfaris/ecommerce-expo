import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import homeImage from '../assets/homePhotos/headers.png';
import {FontAwesome} from '@expo/vector-icons';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigation = useNavigation();

  const goLogin = () => {
    navigation.navigate('AuthStack', {screen: 'Login'});
  };

  return (
    <SafeAreaView style={headerStyles.safeArea}>
      <View style={headerStyles.headerParent}>
        <Image source={homeImage} style={headerStyles.headerImage} />
        <Text style={headerStyles.headerTitle}>Street Clothes</Text>
        {isLogin ? (
          <TouchableOpacity style={headerStyles.notifContainer}>
            <View style={headerStyles.notifWrapper}>
              <View style={headerStyles.bellContainer}>
                <FontAwesome name="bell" color={'white'} size={28} regular />
              </View>
              <FontAwesome
                name="circle"
                color={'#7C4935'}
                size={10}
                style={headerStyles.notifDot}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={goLogin} style={headerStyles.loginWrapper}>
            <Text style={headerStyles.login}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const headerStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerParent: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 196,
  },
  headerTitle: {
    color: 'white',
    fontSize: 34,
    position: 'absolute',
    top: 136,
    left: 16,
    fontWeight: 'bold',
  },
  notifContainer: {
    position: 'absolute',
    top: 66,
    right: 15,
  },
  notifWrapper: {
    position: 'relative',
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  bellContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  loginWrapper: {
    position: 'absolute',
    top: 66,
    right: 15,
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  login: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});
