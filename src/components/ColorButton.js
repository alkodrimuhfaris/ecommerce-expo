import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ColorButton({item, selected}) {
  const {item: detail} = item;
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    console.log('set active called');
    selected === detail.id ? setActive(true) : setActive(false);
  }, [selected, detail]);

  return (
    <View style={[colorBtn.outer, active ? colorBtn.outerActive : null]}>
      <View style={[colorBtn.inner, {backgroundColor: `${detail.hex}`}]}>
        <Text>&nbsp;</Text>
      </View>
    </View>
  );
}

const colorBtn = StyleSheet.create({
  outer: {
    width: 30,
    height: 30,
    borderRadius: 30,
    padding: 2,
  },
  outerActive: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#457373',
  },
  inner: {
    flex: 1,
    width: '100%',
    borderRadius: 30,
  },
});
