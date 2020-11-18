import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import homeImage from '../assets/homePhotos/headers.png';
import {FontAwesome} from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={headerStyles.headerParent}>
      <Image source={homeImage} style={headerStyles.headerImage} />
      <Text style={headerStyles.headerTitle}>Street Clothes</Text>
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
    </View>
  );
}

const headerStyles = StyleSheet.create({
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
});
