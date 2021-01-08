import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  View,
} from 'react-native';
import qs from 'qs';

export default function ModalCenter({
  modalOpen,
  setModalOpen,
  items = [],
  defaultValue = '',
  labelStyle = {},
  labelSelectedStyle = {},
  selectItem = () => {},
  setDefaultItem = () => {},
}) {
  const [selected, setSelected] = React.useState(-1);
  const [defValue, setDefValue] = React.useState('');

  React.useEffect(() => {
    if (typeof defaultValue === 'object') {
      if (Object.keys(defaultValue).length) {
        const defVal = qs.stringify({...defaultValue});
        setDefValue(defVal);
      } else {
        setSelected(-1);
      }
    } else if (defaultValue) {
      setDefValue(defaultValue);
    } else if (!defaultValue) {
      setSelected(-1);
    }
  }, [defaultValue]);

  React.useEffect(() => {
    console.log(selected);
  }, [selected]);

  React.useEffect(() => {
    if (items.length) {
      let selectedIndex = -1;
      let selectedItem = {};
      for (let [index, element] of items.entries()) {
        const {value} = element;
        if (typeof value === 'object') {
          if (Object.keys(value).length) {
            const defVal = qs.stringify({...value});
            if (defVal === defValue) {
              selectedIndex = index;
              selectedItem = {...element};
            }
          }
        } else {
          if (value === defValue) {
            selectedIndex = index;
            selectedItem = {...element};
          }
        }
      }
      setSelected(selectedIndex);
      setDefaultItem(selectedItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, defValue]);

  return (
    <Modal
      onRequestClose={() => setModalOpen(false)}
      animationType="fade"
      transparent={true}
      visible={modalOpen}>
      <TouchableOpacity
        onPress={() => setModalOpen(false)}
        style={modalStyle.parent}>
        <TouchableWithoutFeedback style={modalStyle.content}>
          <View style={modalStyle.optionsWrapper}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.index}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      selectItem(item);
                      setModalOpen(false);
                    }}
                    style={modalStyle.options}>
                    <Text
                      style={[
                        {...modalStyle.label, ...labelStyle},
                        selected === index
                          ? {...modalStyle.labelSelected, ...labelSelectedStyle}
                          : null,
                      ]}
                      ellipsizeMode="tail"
                      numberOfLines={1}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const modalStyle = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  optionsWrapper: {
    width: '80%',
    height: '30%',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  options: {
    width: '100%',
    padding: 3,
    paddingHorizontal: 10,
  },
  content: {
    width: 'auto',
    height: 'auto',
  },
  label: {
    fontSize: 14,
    textAlign: 'left',
  },
  labelSelected: {
    color: '#457373',
  },
});
