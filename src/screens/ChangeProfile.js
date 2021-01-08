/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {Input, Form, Item, DatePicker, Button, Label} from 'native-base';
import RadioButton from '../components/RadioButton';
import Toggle from '../components/Toggle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {Formik, Field} from 'formik';
import moment from 'moment';
import actions from '../redux/actions';
import ModalAlert from '../components/ModalAlert';
import ModalLoading from '../components/ModalLoading';

const schema = Yup.object().shape({
  name: Yup.string('Input the right value!')
    .min(2, 'Name is too short!')
    .nullable(),
  email: Yup.string('Input the right value!')
    .email('Input valid email!')
    .nullable(),
  phone: Yup.string('Input the right value!')
    .min(9, 'Phone is too short')
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
      'Input right phone number format!',
    )
    .nullable(),
  gender: Yup.string('Select one of the option below')
    .nullable()
    .test('gender-test', 'Choose the right gender role!', (value) => {
      value = value === 'Male' || value === 'Female';
      return value;
    })
    .nullable(),
  birthdate: Yup.string()
    .test('birthday-test', 'Birthday should be a valid date!', (value) =>
      moment(value).isSameOrBefore(new Date()),
    )
    .transform((_value, originalValue) =>
      moment(originalValue).format('YYYY-MM-DD'),
    )
    .nullable(),
});

export default function ChangeProfile({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.getProfile.userData);
  const token = useSelector((state) => state.auth.token);
  const getProfile = useSelector((state) => state.getProfile);
  const updateProfile = useSelector((state) => state.updateProfile);

  // gender change
  const [checked, setChecked] = useState(0);

  // notification
  const [notifSale, setNotifSale] = useState(false);
  const toggleSale = () => setNotifSale((previousState) => !previousState);
  const [notifNew, setNotifNew] = useState(false);
  const toggleNew = () => setNotifNew((previousState) => !previousState);
  const [notifDeliv, setNotifDeliv] = useState(false);
  const toggleDeliv = () => setNotifDeliv((previousState) => !previousState);

  // refresh
  const [refreshing, setRefreshing] = useState(false);

  // alert notif
  const [openNotif, setOpenNotif] = useState(false);
  const [propsNotif, setPropsNotif] = useState({});

  const genders = ['Male', 'Female'];

  useEffect(() => {
    if (updateProfile.success || updateProfile.error) {
      setPropsNotif({
        content: updateProfile.message,
        confirm: () => {
          dispatch(actions.profileAction.clearStateUpdate());
          dispatch(actions.profileAction.getProfile(token));
          setOpenNotif(false);
        },
        useOneBtn: true,
      });
      setOpenNotif(true);
    }
  }, [updateProfile.pending]);

  useEffect(() => {
    dispatch(actions.profileAction.getProfile(token));
  }, []);

  useEffect(() => {
    let genderChosen = 0;
    genders.forEach((item, index) => {
      if (item === user.gender) {
        genderChosen = index;
      }
    });
    setChecked(genderChosen);
  }, [user]);

  // set refresh to get profile
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(actions.profileAction.getProfile(token));
    setRefreshing(false);
  };

  const initialValue = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    birthdate: user.birthdate,
  };

  const changeGender = (e, setValue) => {
    setChecked(e);
    setValue('gender', genders[e]);
  };

  const changeDate = (e, setValue) => {
    console.log(e);
    e = moment(e).format('YYYY-MM-DD');
    console.log(e);
    setValue('birthdate', e);
  };

  const toChangePass = () => {
    navigation.navigate('ProfileStack', {screen: 'ChangePassword'});
  };

  const saveChange = (e) => {
    console.log('change save');
    console.log(e);
    const formData = new FormData();
    for (const [key, value] of Object.entries(e)) {
      if (value) {
        formData.append(key, value);
      }
    }
    dispatch(actions.profileAction.updateProfile(token, formData));
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.parent}>
      <ModalAlert modalOpen={openNotif} {...propsNotif} />
      <ModalLoading modalOpen={getProfile.pending || updateProfile.pending} />
      <Formik
        enableReinitialize
        initialValues={initialValue}
        validationSchema={schema}
        validateOnBlur
        onSubmit={(values) => {
          saveChange(values);
        }}>
        {(props) => {
          const {
            touched,
            errors,
            handleSubmit,
            values,
            handleChange,
            handleBlur,
            setFieldValue,
          } = props;

          return (
            <Form style={styles.container}>
              <Text style={styles.subTitle}>Personal Information</Text>

              <View style={styles.secondary}>
                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Name</Label>
                  <Input
                    placeholder="Name"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    style={styles.input}
                    value={values.name}
                  />
                </Item>
                {touched.name && errors.name && (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.error}>{errors.name}</Text>
                  </View>
                )}
              </View>

              <View style={styles.secondary}>
                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Email</Label>
                  <Input
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={styles.input}
                    value={values.email}
                  />
                </Item>
                {touched.email && errors.email && (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.error}>{errors.email}</Text>
                  </View>
                )}
              </View>

              <View style={styles.secondary}>
                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Phone</Label>
                  <Input
                    placeholder="Phone"
                    keyboardType="numeric"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    style={styles.input}
                  />
                </Item>
                {touched.phone && errors.phone && (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.error}>{errors.phone}</Text>
                  </View>
                )}
              </View>

              <View style={styles.secondary}>
                <View style={styles.secondaryDate}>
                  <Label style={[styles.labelTxt, styles.labelBig]}>
                    Date of Birth:
                  </Label>
                  <View>
                    <DatePicker
                      defaultDate={
                        values.birthdate
                          ? new Date(moment(values.birthdate).valueOf())
                          : new Date(null)
                      }
                      minimumDate={new Date(1900, 1, 1)}
                      maximumDate={new Date()}
                      modalTransparent={false}
                      animationType={'fade'}
                      androidMode={'default'}
                      textStyle={[styles.labelTxt, styles.labelBig]}
                      placeHolderTextStyle={[styles.labelTxt, styles.labelBig]}
                      onDateChange={(e) => changeDate(e, setFieldValue)}
                      disabled={false}
                    />
                  </View>
                </View>
                {touched.birthdate && errors.birthdate && (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.error}>{errors.birthdate}</Text>
                  </View>
                )}
              </View>

              <View style={styles.radioWrapper}>
                <Text style={[styles.subTitle, styles.radioLabel]}>Gender</Text>
                <RadioButton
                  setChecked={(e) => changeGender(e, setFieldValue)}
                  checked={checked}
                  genders={genders}
                />
              </View>
              {touched.gender && errors.gender && (
                <View style={styles.errorWrapper}>
                  <Text style={styles.error}>{errors.gender}</Text>
                </View>
              )}

              <View style={styles.alignWrap}>
                <Text style={styles.subTitle}>Password</Text>
                <TouchableOpacity onPress={toChangePass}>
                  <Text style={styles.changePass}>Change</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.subTitle}>Notification</Text>

              <View style={styles.alignWrap}>
                <Text style={styles.toglerTxt}>Sales</Text>
                <View>
                  <Toggle isEnabled={notifSale} toggleSwitch={toggleSale} />
                </View>
              </View>
              <View style={styles.alignWrap}>
                <Text style={styles.toglerTxt}>New Arrival</Text>
                <View>
                  <Toggle isEnabled={notifNew} toggleSwitch={toggleNew} />
                </View>
              </View>
              <View style={styles.alignWrap}>
                <Text style={styles.toglerTxt}>Delivery Status Change</Text>
                <View>
                  <Toggle isEnabled={notifDeliv} toggleSwitch={toggleDeliv} />
                </View>
              </View>

              <Button style={styles.btn} onPress={handleSubmit} block>
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  parent: {
    backgroundColor: 'white',
  },
  container: {
    position: 'relative',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  profilePicCont: {
    marginTop: 10,
    marginBottom: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  secondaryDate: {
    paddingHorizontal: 15,
    paddingTop: 15,
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  radioWrapper: {
    marginTop: 10,
    marginBottom: 10,
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
  radioLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  alignWrap: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#457373',
  },
  changePass: {
    fontSize: 14,
    color: '#457373',
  },
  toglerTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#457373',
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
  loadingWrapper: {
    width: '100%',
    paddingHorizontal: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
