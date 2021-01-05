import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

export default function ModalLoading({modalOpen}) {
  return (
    <Modal animationType="fade" transparent={true} visible={modalOpen}>
      <TouchableOpacity style={modalStyle.parent}>
        <TouchableWithoutFeedback style={modalStyle.content}>
          <ActivityIndicator visible={modalOpen} size="large" color="#457373" />
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
    backgroundColor: 'rgba(0,0,0,0)',
  },
  content: {
    width: 'auto',
    height: 'auto',
  },
});
