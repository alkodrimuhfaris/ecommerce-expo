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
    <View style={active ? colorBtn.outerActive : colorBtn.outerInactive}>
      <View style={[colorBtn.inner, {backgroundColor: `${detail.hex}`}]}>
        <Text>&nbsp;</Text>
      </View>
    </View>
  );
}

const colorBtn = StyleSheet.create({
  outerActive: {
    width: 30,
    height: 30,
    borderRadius: 30,
    padding: 2,
    borderWidth: 1,
    borderColor: '#457373',
  },
  outerInactive: {
    width: 30,
    height: 30,
    borderRadius: 30,
    padding: 2,
  },
  inner: {
    flex: 1,
    width: '100%',
    borderRadius: 30,
  },
});
