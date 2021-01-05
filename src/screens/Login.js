import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Input, Form, Item, Button, Label} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {FontAwesome} from '@expo/vector-icons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ModalLoading from '../components/ModalLoading';
import ModalAlert from '../components/ModalAlert';
import actions from '../redux/actions/index';
import {useNavigation} from '@react-navigation/native';

const schemaLogin = Yup.object().shape({
  email: Yup.string()
    .email('Masukkan alamat email dengan benar')
    .required('Email dibutuhkan'),
  password: Yup.string('Masukkan format password yang benar!').required(
    'Password dibutuhkan',
  ),
});

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authLogin = useSelector((state) => state.auth);
  const [openAlert, setOpenAlert] = useState(false);
  const [propsAlert, setPropsAlert] = useState({});
  const {authAction} = actions;

  useEffect(() => {
    if (authLogin.isError) {
      setPropsAlert({
        content: authLogin.alertMsg,
        confirm: () => {
          dispatch(authAction.clearAlert());
          setOpenAlert(false);
        },
        useOneBtn: true,
      });
      setOpenAlert(true);
    } else if (authLogin.isLogin) {
      navigation.navigate('TabbedScreen', {screen: 'Home'});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLogin.isLoading]);

  const goToForgot = () => {
    navigation.navigate('ForgotPassword');
  };

  const goLogin = (values) => {
    console.log(values);
    dispatch(authAction.login(values));
  };

  const goSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.parent}>
      <ModalLoading modalOpen={authLogin.isLoading} />
      <ModalAlert modalOpen={openAlert} {...propsAlert} />
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <View>
          <ScrollView style={styles.scroll}>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={schemaLogin}
              onSubmit={(values) => goLogin(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
              }) => {
                return (
                  <Form style={styles.container}>
                    <View style={styles.secondary}>
                      <Item floatingLabel style={styles.floatingLbl}>
                        <Label for="email" style={styles.labelTxt}>
                          Email
                        </Label>
                        <Input
                          placeholder="Email"
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          style={styles.input}
                          value={values.email}
                          block
                        />
                      </Item>
                      {touched.email && errors.email && (
                        <Text style={styles.error}>{errors.email}</Text>
                      )}

                      <Item floatingLabel style={styles.floatingLbl}>
                        <Label for="password" style={styles.labelTxt}>
                          Password
                        </Label>
                        <Input
                          placeholder="Password"
                          onChangeText={handleChange('password')}
                          secureTextEntry
                          style={styles.input}
                          value={values.password}
                          onBlur={handleBlur('password')}
                          block
                        />
                      </Item>
                      {touched.password && errors.password && (
                        <Text style={styles.error}>{errors.password}</Text>
                      )}
                    </View>
                    <View style={styles.forgotContainer}>
                      <TouchableOpacity
                        onPress={goToForgot}
                        style={styles.forgotWrapper}>
                        <Text style={styles.forgot}>Forgot your password?</Text>
                        <FontAwesome
                          name="long-arrow-right"
                          color={'#457373'}
                        />
                      </TouchableOpacity>
                    </View>
                    <Button onPress={handleSubmit} style={styles.btn} block>
                      <Text style={styles.btnTxt}>Login</Text>
                    </Button>

                    <View style={styles.signupContainer}>
                      <TouchableOpacity
                        onPress={goSignUp}
                        style={styles.signupWrapper}>
                        <Text style={styles.signupText}>
                          Doesn't have an account? Sign Up here
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Form>
                );
              }}
            </Formik>
          </ScrollView>
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
  error: {
    fontSize: 12,
    color: '#7C4935',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    color: '#457373',
    fontSize: 14,
  },
});
