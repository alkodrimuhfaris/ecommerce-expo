import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons';
import {StyleSheet} from 'react-native';
import {Button} from 'native-base';

export default function SearchButton() {
  const navigation = useNavigation();
  const goHome = () => {
    navigation.navigate('TabbedScreen', {screen: 'Home'});
  };

  return (
    <>
      <Button onPress={goHome} style={styles.buttonStyle}>
        <AntDesign name="home" size={24} color={'black'} />
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 10,
    backgroundColor: 'transparent',
    elevation: 0,
  },
});
