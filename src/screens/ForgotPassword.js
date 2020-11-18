import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Input, Form, Item, Button, Label} from 'native-base';

export default function ChangeProfile() {
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetToggle, setResetToggle] = useState(false);

  const sendCodePress = () => {
    if (!email) {
      Alert.alert(
        'Wrong Email',
        'Input the right email address!',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      setResetToggle(true);
    }
  };

  const resetPassPress = () => {
    setResetToggle(false);
  };

  useEffect(() => {
    console.log(resetCode);
    console.log(email);
    console.log(newPassword);
    console.log(resetToggle);
  }, [email, resetCode, resetToggle, newPassword]);

  return (
    <View style={styles.parent}>
      {!resetToggle ? (
        <View style={styles.wrapper}>
          <Text style={styles.title}>Send Reset Code</Text>
          <Text style={styles.paragraph}>
            Please, enter your email address. You will receive an OTP to reset
            your password.
          </Text>

          <ScrollView style={styles.scroll}>
            <Form style={styles.container}>
              <View style={styles.secondary}>
                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Email</Label>
                  <Input
                    placeholder="Email"
                    onChangeText={(e) => setEmail(e)}
                    style={styles.input}
                    value={email}
                    block
                  />
                </Item>
              </View>
            </Form>
          </ScrollView>

          <Button onPress={() => sendCodePress()} style={styles.btn} block>
            <Text style={styles.btnTxt} block>
              SEND RESET CODE
            </Text>
          </Button>
        </View>
      ) : (
        <View style={styles.wrapper}>
          <Text style={styles.title}>Reset Your Password</Text>
          <Text style={styles.paragraph}>
            We have sent an email containing a password reset instruction to
            your email. please check your email.
          </Text>

          <ScrollView style={styles.scroll}>
            <Form style={styles.container}>
              <View style={styles.secondary}>
                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Reset Code</Label>
                  <Input
                    placeholder="Reset Code"
                    onChangeText={(e) => setResetCode(e)}
                    style={styles.input}
                    value={resetCode}
                    block
                  />
                </Item>

                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Password</Label>
                  <Input
                    placeholder="Password"
                    onChangeText={(e) => setNewPassword(e)}
                    secureTextEntry
                    style={styles.input}
                    value={newPassword}
                  />
                </Item>

                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Confirm Password</Label>
                  <Input
                    placeholder="Confirm Password"
                    onChangeText={(e) => setConfirmNewPassword(e)}
                    secureTextEntry
                    style={styles.input}
                    value={confirmNewPassword}
                  />
                </Item>
              </View>
            </Form>
          </ScrollView>

          <Button onPress={() => resetPassPress()} style={styles.btn} block>
            <Text style={styles.btnTxt} block>
              RESET PASSWORD
            </Text>
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFFFF',
  },
  wrapper: {
    backgroundColor: '#FEFFFF',
    width: '80%',
  },
  scroll: {
    height: 'auto',
  },
  container: {
    position: 'relative',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: 10,
  },
  floatingLbl: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#457373',
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
    color: '#457373',
  },
  title: {
    marginLeft: 20,
    fontSize: 34,
    color: '#457373',
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
  },
  forgotWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: '5%',
    marginLeft: '5%',
    marginBottom: 30,
  },
  paragraph: {
    fontSize: 14,
    paddingHorizontal: '6%',
    marginTop: 3,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  forgot: {
    marginRight: 2,
    color: '#084F6C',
  },
  btn: {
    marginTop: 20,
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
  buttonWrapper: {
    elevation: 5,
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
