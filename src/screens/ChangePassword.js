/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Input, Form, Item, Button, Label} from 'native-base';

export default function ChangeProfile() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  useEffect(() => {
    console.log(password);
    console.log(newPassword);
    console.log(confirmNewPass);
  }, [password, newPassword, confirmNewPass]);

  const savePassword = () => {
    const passwordForm = {
      oldPassword: password,
      newPassword,
      confirmNewPass,
    };
    console.log(passwordForm);
  };

  return (
    <ScrollView>
      <Form style={styles.container}>
        <Text style={styles.title}>Change Your Password</Text>

        <View style={styles.secondary}>
          <Item floatingLabel style={styles.floatingLbl}>
            <Label style={styles.labelTxt}>Old Password</Label>
            <Input
              placeholder="Old Password"
              secureTextEntry
              value={password}
              onChangeText={(e) => setPassword(e)}
              style={styles.input}
            />
          </Item>

          <Item floatingLabel style={styles.floatingLbl}>
            <Label style={styles.labelTxt}>New Password</Label>
            <Input
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={(e) => setNewPassword(e)}
              style={styles.input}
            />
          </Item>

          <Item floatingLabel style={styles.floatingLbl}>
            <Label style={styles.labelTxt}>Confirm New Password</Label>
            <Input
              placeholder="newPassword"
              secureTextEntry
              onChangeText={(e) => setConfirmNewPass(e)}
              value={confirmNewPass}
              style={styles.input}
            />
          </Item>
        </View>

        <Button onPress={savePassword} style={styles.btn} block>
          <Text style={styles.btnTxt} block>
            SAVE
          </Text>
        </Button>
      </Form>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    position: 'relative',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  floatingLbl: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1F271B',
  },
  secondary: {
    marginTop: 10,
    marginBottom: 20,
    elevation: 5,
    borderRadius: 10,
    paddingRight: 10,
    paddingBottom: 20,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelTxt: {
    fontSize: 16,
    color: '#1F271B',
  },
  floatingSave: {
    position: 'absolute',
    top: 30,
    right: 30,
    color: '#457373',
    padding: 5,
    borderRadius: 30,
    justifyContent: 'center',
  },
  saveTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 34,
    color: '#457373',
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#457373',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  alignWrap: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 50,
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#457373',
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
