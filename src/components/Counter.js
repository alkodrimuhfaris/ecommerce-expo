import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function Counter({values, countChange}) {
  const [count, setCount] = useState(values);

  useEffect(() => {
    console.log(values);
    countChange(count);
  }, [count, countChange, values]);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  return (
    <View style={cardStyle.btnWrap}>
      <TouchableOpacity
        style={cardStyle.btn}
        disabled={!count}
        onPress={decrease}>
        <Text style={cardStyle.btnTxt}>-</Text>
      </TouchableOpacity>
      <Text style={cardStyle.counter}>{count}</Text>
      <TouchableOpacity style={cardStyle.btn} onPress={increase}>
        <Text style={cardStyle.btnTxt}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const cardStyle = StyleSheet.create({
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 100,
  },
  btn: {
    width: 36,
    height: 36,
    borderRadius: 36,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    marginHorizontal: 10,
  },
});
