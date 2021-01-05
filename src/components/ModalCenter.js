import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

export default function ModalCenter({
  modalOpen,
  setModalOpen,
  modalContent = <Text>This is your modal</Text>,
}) {
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
          {modalContent}
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
  content: {
    width: 'auto',
    height: 'auto',
  },
});
