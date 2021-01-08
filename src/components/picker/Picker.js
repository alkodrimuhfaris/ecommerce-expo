import React from 'react';
import ModalPicker from './ModalPicker';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {Entypo} from '@expo/vector-icons';

export default function Picker({
  data = [],
  defaultValue = '',
  displayLabelStyle = StyleSheet.create({}),
  labelStyle = StyleSheet.create({}),
  labelSelectedStyle = StyleSheet.create({}),
  onChange = (e) => {
    return e;
  },
  defaultLabel = 'Choose options below',
  containerStyle = StyleSheet.create({}),
}) {
  const [openModalPicker, setOpenModalPicker] = React.useState(false);
  const [labelSelected, setLabelSelected] = React.useState('');
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const setDefaultItem = (item) => {
    const {label} = item;
    setLabelSelected(label);
  };

  const selectItem = (item) => {
    const {value: val} = item;
    onChange(val);
  };

  return (
    <>
      <ModalPicker
        modalOpen={openModalPicker}
        setModalOpen={setOpenModalPicker}
        items={data}
        defaultValue={value}
        labelStyle={labelStyle}
        labelSelectedStyle={labelSelectedStyle}
        selectItem={(e) => selectItem(e)}
        setDefaultItem={(e) => setDefaultItem(e)}
      />
      <TouchableOpacity
        onPress={() => setOpenModalPicker(true)}
        style={{...styles.parent, ...containerStyle}}>
        <View style={styles.wrapper}>
          <Text
            style={{...styles.text, ...displayLabelStyle}}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {labelSelected ? labelSelected : defaultLabel}
          </Text>
          <Entypo
            name="chevron-down"
            style={styles.icon}
            size={16}
            color="black"
          />
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    flexDirection: 'row',
    height: 40,
    padding: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    width: '80%',
    fontSize: 14,
    color: '#457373',
  },
  icon: {
    marginHorizontal: 2,
  },
});
