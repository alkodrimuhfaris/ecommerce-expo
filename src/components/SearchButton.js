import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons';
import {StyleSheet} from 'react-native';
import {Button} from 'native-base';

export default function SearchButton() {
  const navigation = useNavigation();
  const goToSearch = () => {
    navigation.navigate('AllProductStack', {screen: 'Search'});
  };

  return (
    <>
      <Button onPress={goToSearch} style={styles.buttonStyle}>
        <AntDesign name="search1" size={16} color="black" />
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
