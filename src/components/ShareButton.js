import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {EvilIcons} from '@expo/vector-icons';
import {StyleSheet} from 'react-native';
import {Button} from 'native-base';

export default function SearchButton() {
  const navigation = useNavigation();
  const goShare = () => {
    console.log('share');
  };

  return (
    <>
      <Button onPress={goShare} style={styles.buttonStyle}>
        <EvilIcons name="share-apple" size={24} color="black" />
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
