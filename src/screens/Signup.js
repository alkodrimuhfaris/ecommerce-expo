import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Input, Form, Item, Button, Label} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import actions from '../redux/actions/index';
import {useDispatch, useSelector} from 'react-redux';
import ModalLoading from '../components/ModalLoading';
import ModalAlert from '../components/ModalAlert';

const schemaSignup = Yup.object().shape({
  name: Yup.string().required('Nama lengkap dibutuhkan'),
  email: Yup.string()
    .email('Masukkan alamat email dengan benar')
    .required('Email dibutuhkan'),
  password: Yup.string()
    .min(8, 'Password setidaknya terdiri dari 8 karakter')
    .required('Password dibutuhkan'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password tidak cocok')
    .required('Konfirmasi password dibutuhkan'),
});

export default function ChangeProfile() {
  const {signupAction} = actions;
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup);
  const navigation = useNavigation();
  const [propsNotif, setPropsNotif] = useState({});
  const [openNotif, setOpenNotif] = useState(false);

  useEffect(() => {
    if (signup.error) {
      setPropsNotif({
        content: signup.message,
        confirm: () => {
          dispatch(signupAction.clearAlert());
          setOpenNotif(false);
        },
        useOneBtn: true,
      });
      setOpenNotif(true);
    } else if (signup.success) {
      setPropsNotif({
        content: 'Sign up success!',
        confirm: () => {
          dispatch(signupAction.clearAlert());
          navigation.navigate('Login');
          setOpenNotif(false);
        },
        useOneBtn: true,
      });
      setOpenNotif(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signup.pending]);

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const goSignUp = (values) => {
    const {confirmPassword, ...data} = values;
    console.log(data);
    dispatch(signupAction.signup(data));
  };

  return (
    <SafeAreaView style={styles.parent}>
      <ModalLoading modalOpen={signup.pending} />

      <ModalAlert modalOpen={openNotif} {...propsNotif} />

      <View style={styles.wrapper}>
        <Text style={styles.title}>Sign Up</Text>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={schemaSignup}
            onSubmit={(values) => goSignUp(values)}>
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
                      <Label style={styles.labelTxt}>Name</Label>
                      <Input
                        placeholder="Name"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        style={styles.input}
                        value={values.name}
                        block
                      />
                    </Item>
                    {touched.name && errors.name && (
                      <Text style={styles.error}>{errors.name}</Text>
                    )}

                    <Item floatingLabel style={styles.floatingLbl}>
                      <Label style={styles.labelTxt}>Email</Label>
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
                      <Label style={styles.labelTxt}>Password</Label>
                      <Input
                        placeholder="Password"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        secureTextEntry
                        style={styles.input}
                        value={values.password}
                      />
                    </Item>
                    {touched.password && errors.password && (
                      <Text style={styles.error}>{errors.password}</Text>
                    )}

                    <Item floatingLabel style={styles.floatingLbl}>
                      <Label style={styles.labelTxt}>Confirm Password</Label>
                      <Input
                        placeholder="Confirm Password"
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        secureTextEntry
                        style={styles.input}
                        value={values.confirmPassword}
                      />
                    </Item>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={styles.error}>{errors.confirmPassword}</Text>
                    )}
                  </View>

                  <View style={styles.forgotContainer}>
                    <TouchableOpacity
                      onPress={goToLogin}
                      style={styles.forgotWrapper}>
                      <Text style={styles.forgot}>
                        Already Have An Account?
                      </Text>
                      <FontAwesome name="long-arrow-right" color={'#457373'} />
                    </TouchableOpacity>
                  </View>

                  <Button onPress={handleSubmit} style={styles.btn} block>
                    <Text style={styles.btnTxt} block>
                      SIGN UP
                    </Text>
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  wrapper: {
    backgroundColor: 'white',
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
  error: {
    fontSize: 12,
    color: '#7C4935',
  },
});
