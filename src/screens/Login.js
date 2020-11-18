import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Input, Form, Item, Button, Label} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log(email);
    console.log(password);
  }, [email, password]);

  const goToForgot = () => {
    console.log('go to forgot pass');
  };

  return (
    <View style={styles.parent}>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <View>
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

                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Password</Label>
                  <Input
                    placeholder="Password"
                    onChangeText={(e) => setPassword(e)}
                    secureTextEntry
                    style={styles.input}
                    value={password}
                  />
                </Item>
              </View>
            </Form>
          </ScrollView>
          <View style={styles.forgotContainer}>
            <TouchableOpacity onPress={goToForgot} style={styles.forgotWrapper}>
              <Text style={styles.forgot}>Forgot your password?</Text>
              <FontAwesome name="long-arrow-right" color={'#457373'} />
            </TouchableOpacity>
          </View>
          <Button style={styles.btn} block>
            <Text style={styles.btnTxt}>Login</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 10,
  },
  forgotWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
  },
  form: {
    width: '80%',
    backgroundColor: '#E5E5E5',
  },
  forgot: {
    marginRight: 10,
  },
  btn: {
    width: '100%',
    borderRadius: 30,
    marginTop: 10,
    backgroundColor: '#457373',
  },
  title: {
    fontSize: 30,
    marginBottom: 70,
    fontWeight: 'bold',
    color: '#457373',
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
  danger: {
    borderWidth: 1,
    borderColor: '#F01F0E',
    backgroundColor: 'white',
  },
  success: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2AA952',
  },
  txtSecondary: {
    paddingLeft: 3,
    paddingTop: 3,
    fontSize: 15,
    color: '#9B9B9B',
  },
  txtDanger: {
    fontSize: 15,
    color: '#F01F0E',
  },
  txtSuccess: {
    fontSize: 15,
    color: '#2AA952',
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 0,
  },
});
