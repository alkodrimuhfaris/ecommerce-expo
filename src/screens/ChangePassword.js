/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Input, Form, Item, Button, Label} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import ModalLoading from '../components/ModalLoading';
import ModalAlert from '../components/ModalAlert';
import actions from '../redux/actions';
import * as Yup from 'yup';
import {Formik} from 'formik';

const passSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Enter your recent password!'),
  newPassword: Yup.string()
    .required('New Password must be provided!')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Enter your confirmation password!'),
});

export default function ChangeProfile() {
  const dispatch = useDispatch();
  const updatePassword = useSelector((state) => state.updatePassword);
  const token = useSelector((state) => state.auth.token);
  const [openNotif, setOpenNotif] = useState(false);
  const [propsNotif, setPropsNotif] = useState({});
  const [funcReset, setFuncReset] = React.useState({reset: () => {}});

  useEffect(() => {
    if (updatePassword.success || updatePassword.error) {
      setPropsNotif({
        content: updatePassword.message,
        confirm: () => {
          dispatch(actions.profileAction.clearStatePassword());
          setOpenNotif(false);
          updatePassword.success && funcReset.reset();
        },
        useOneBtn: true,
      });
      setOpenNotif(true);
    }
  }, [updatePassword.pending]);

  const postPassword = (value, reset) => {
    dispatch(actions.profileAction.changePassword(token, value));
    setFuncReset({
      reset: () => reset(),
    });
  };

  const initialValue = {
    oldPassword: '',
    confirmNewPassword: '',
    newPassword: '',
  };

  return (
    <ScrollView style={styles.parent}>
      <ModalLoading modalOpen={updatePassword.pending} />
      <ModalAlert modalOpen={openNotif} {...propsNotif} />

      <Formik
        initialValues={initialValue}
        validationSchema={passSchema}
        validateOnBlur
        onSubmit={(values, {resetForm}) => {
          postPassword(values, resetForm);
        }}>
        {(props) => {
          const {
            touched,
            errors,
            handleSubmit,
            values,
            handleChange,
            handleBlur,
          } = props;
          return (
            <Form style={styles.container}>
              <View style={[styles.secondary, styles.oldPassword]}>
                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Old Password</Label>
                  <Input
                    placeholder="Old Password"
                    secureTextEntry
                    value={values.oldPassword}
                    onChangeText={handleChange('oldPassword')}
                    onBlur={handleBlur('oldPassword')}
                    style={styles.input}
                  />
                </Item>
                {touched.oldPassword && errors.oldPassword && (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.error}>{errors.oldPassword}</Text>
                  </View>
                )}
              </View>
              <View style={styles.secondary}>
                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>New Password</Label>
                  <Input
                    placeholder="New Password"
                    secureTextEntry
                    value={values.newPassword}
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    style={styles.input}
                  />
                </Item>
                {touched.newPassword && errors.newPassword && (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.error}>{errors.newPassword}</Text>
                  </View>
                )}

                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Confirm New Password</Label>
                  <Input
                    placeholder="Confirm New Password"
                    secureTextEntry
                    onChangeText={handleChange('confirmNewPassword')}
                    onBlur={handleBlur('confirmNewPassword')}
                    value={values.confirmNewPassword}
                    style={styles.input}
                  />
                </Item>
                {touched.confirmNewPassword && errors.confirmNewPassword && (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.error}>
                      {errors.confirmNewPassword}
                    </Text>
                  </View>
                )}
              </View>

              <Button onPress={handleSubmit} style={styles.btn} block>
                <Text style={styles.btnTxt} block>
                  SAVE
                </Text>
              </Button>
            </Form>
          );
        }}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'white',
  },
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
  oldPassword: {
    marginTop: 30,
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
  labelBig: {
    fontSize: 16,
  },
  labelTxt: {
    fontSize: 14,
    color: '#457373',
  },
  floatingLbl: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#457373',
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
  errorWrapper: {
    width: '100%',
    paddingHorizontal: 15,
  },
  error: {
    fontSize: 12,
    color: '#7C4935',
  },
});
