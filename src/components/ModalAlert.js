import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function ModalAlert({
  modalOpen = false,
  closeModal = () => {},
  confirm = () => {},
  discard = () => {},
  content = '',
  confirmText = 'Ok',
  discardText = 'Cancel',
  useOneBtn = false,
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(modalOpen);
  }, [modalOpen]);

  const cancel = () => {
    discard();
    closeModal();
  };

  const proceed = () => {
    confirm();
    closeModal();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={open}>
      <TouchableOpacity style={modalStyle.parent}>
        <TouchableWithoutFeedback style={contents.content}>
          <View style={contents.parent}>
            <View style={contents.textWrapper}>
              <Text style={contents.content}>{content}</Text>
            </View>
            <View style={contents.buttonWrapper}>
              {useOneBtn ? (
                <View style={contents.btn}>
                  <Text style={contents.btnNo}>&nbsp;</Text>
                </View>
              ) : (
                <TouchableOpacity onPress={cancel} style={contents.btn}>
                  <Text style={contents.btnNo}>{discardText}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={proceed} style={contents.btn}>
                <Text style={contents.btnYes}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
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
  content: {
    width: 'auto',
    height: 'auto',
  },
});

const contents = StyleSheet.create({
  parent: {
    width: '70%',
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  textWrapper: {
    width: '100%',
    padding: '5%',
  },
  content: {
    color: '#999',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    padding: '5%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnYes: {
    color: '#457373',
    fontSize: 14,
  },
  btnNo: {
    color: '#7C4935',
    fontSize: 14,
  },
});
