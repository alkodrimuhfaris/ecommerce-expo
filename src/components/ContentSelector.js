import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Selector({sortOption, setOption}) {
  return (
    <View style={sortStyles.parent}>
      {sortOption.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => setOption(index)}
            style={sortStyles.btn}>
            <Text style={sortStyles.txt}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const sortStyles = StyleSheet.create({
  parent: {
    width: '70%',
    backgroundColor: 'white',
  },
  btn: {
    width: '100%',
    padding: '5%',
  },
  txt: {
    fontSize: 14,
    color: '#222',
  },
});
