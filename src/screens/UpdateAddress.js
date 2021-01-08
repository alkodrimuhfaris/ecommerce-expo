/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Input, Form, Item, Button, Label} from 'native-base';
import Toggle from '../components/Toggle';
import {Formik} from 'formik';
import * as Yup from 'yup';
import actions from '../redux/actions/index';
import {useSelector, useDispatch} from 'react-redux';
import ModalLoading from '../components/ModalLoading';
import ModalAlert from '../components/ModalAlert';
import {useNavigation} from '@react-navigation/native';
import Picker from '../components/picker/Picker';

const schemaAddress = Yup.object().shape({
  address_name: Yup.string('Input the right address name').required(
    'Address name is required!',
  ),
  recipient_name: Yup.string('Input the right recipient name format!').required(
    'Recipient name is required!',
  ),
  phone: Yup.string('Input the right phone number')
    .required('Phone must be provided!')
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
      'Input right phone number format!',
    ),
  address: Yup.string('Input the right address!')
    .min(2, 'Address is too short')
    .required('Address is needed!'),
  city_id: Yup.number('Select the right city id!')
    .min(1, 'city can not be empty!')
    .required('City id is required!'),
  province_id: Yup.number('Select the right province id!')
    .min(1, 'province can not be empty!')
    .required('Province id is required!'),
  postal_code: Yup.string('Input the right postal code!')
    .matches(/^([1-9])[0-9]{4}$/, 'Input the right postal code format!')
    .required('Postal code is required'),
  primary_address: Yup.boolean(
    'Input the right format for primary address!',
  ).required('Primary address is required'),
});

export default function CreateAddress({route}) {
  const {addressAction} = actions;
  const {id} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const getProvince = useSelector((state) => state.getProvince);
  const updateAddress = useSelector((state) => state.updateAddress);
  const getCity = useSelector((state) => state.getCity);
  const token = useSelector((state) => state.auth.token);
  const getDetailAddress = useSelector((state) => state.getDetailAddress);
  const detailAddress = useSelector((state) => state.getDetailAddress.data);
  const [provinceSelected, setProvinceSelected] = useState(0);
  const [provinceOpt, setProvinceOpt] = useState([]);
  const [citySelected, setCitySelected] = useState(0);
  const [cityOpt, setCityOpt] = useState([]);
  const [openNotif, setOpenNotif] = useState(false);
  const [propsNotif, setPropsNotif] = useState({});

  const togglePrimary = (value, setValue) => {
    setValue('primary_address', !value);
  };

  useEffect(() => {
    dispatch(addressAction.getProvince(token));
  }, [token]);

  useEffect(() => {
    dispatch(addressAction.getAddresssById(token, id));
  }, [token, id]);

  // calibrating province data array for react-select option
  useEffect(() => {
    const {data: provinceData} = getProvince;
    if (provinceData.length) {
      console.log(provinceData);
      const provinceNewOpt = provinceData.map((item) => {
        item = {
          value: item.province_id,
          label: item.province,
        };
        return item;
      });
      console.log(provinceNewOpt);
      setProvinceOpt(provinceNewOpt);
    }
  }, [getProvince.data]);

  // calibrating city data array for react-select option
  useEffect(() => {
    const {data: cityData} = getCity;
    if (cityData.length) {
      const cityNewOpt = cityData.map((item) => {
        item = {
          value: {
            cityId: item.city_id,
            postal_code: item.postal_code,
          },
          label: item.city,
        };
        return item;
      });
      console.log(cityNewOpt);
      setCityOpt(cityNewOpt);
    }
  }, [getCity.data]);

  useEffect(() => {
    if (provinceSelected) {
      dispatch(addressAction.getCityProvince(token, provinceSelected));
    }
  }, [provinceSelected]);

  useEffect(() => {
    if (updateAddress.success) {
      setPropsNotif({
        content: 'Success updated address!',
        confirm: () => {
          dispatch(addressAction.getAddress(token));
          dispatch(addressAction.getAddresssById(token, id));
          dispatch(addressAction.clearStateAddress());
          setOpenNotif(false);
          navigation.goBack();
        },
        useOneBtn: true,
      });
      setOpenNotif(true);
    } else if (updateAddress.error) {
      setPropsNotif({
        content: updateAddress.message,
        confirm: () => {
          dispatch(addressAction.clearStateAddress());
          dispatch(addressAction.getAddresssById(token, id));
          setOpenNotif(false);
        },
        useOneBtn: true,
      });
      setOpenNotif(true);
    }
  }, [updateAddress.pending]);

  const provinceSelect = (e, setValue) => {
    setProvinceSelected(e);
    setValue('city_id', 0);
    setValue('postal_code', '');
    setValue('province_id', e);
  };

  const citySelect = (e, setValue) => {
    setCitySelected(e);
    console.log(e.postal_code);
    setValue('city_id', e.cityId);
    setValue('postal_code', e.postal_code);
  };

  const addAddress = (values) => {
    console.log(values);
    dispatch(addressAction.updateAddress(token, id, values));
  };

  useEffect(() => {
    if (provinceOpt.length) {
      setProvinceSelected(detailAddress.province_id);
      console.log(provinceOpt);
    }
  }, [provinceOpt]);

  useEffect(() => {
    if (cityOpt.length) {
      setCitySelected({
        cityId: detailAddress.city_id,
        postal_code: detailAddress.postal_code,
      });
    }
  }, [cityOpt]);

  const initialValue = {
    address_name: detailAddress.address_name ? detailAddress.address_name : '',
    phone: detailAddress.phone ? detailAddress.phone : '',
    address: detailAddress.address ? detailAddress.address : '',
    province_id: detailAddress.province_id ? detailAddress.province_id : 0,
    city_id: detailAddress.city_id ? detailAddress.city_id : 0,
    postal_code: detailAddress.postal_code ? detailAddress.postal_code : '',
    primary_address: detailAddress.primary_address ? true : false,
    recipient_name: detailAddress.recipient_name
      ? detailAddress.recipient_name
      : '',
  };

  return (
    <ScrollView style={styles.parent}>
      {/* <ModalCenter modalOpen={true} /> */}
      <ModalLoading
        modalOpen={updateAddress.pending || getDetailAddress.pending}
      />
      <ModalAlert modalOpen={openNotif} {...propsNotif} />

      <Formik
        initialValues={initialValue}
        enableReinitialize
        validationSchema={schemaAddress}
        onSubmit={(values) => addAddress(values)}>
        {({
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          values,
          touched,
          errors,
        }) => {
          return (
            <Form style={styles.container}>
              <View style={styles.secondary}>
                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Recipient Name</Label>
                  <Input
                    placeholder="Name"
                    onChangeText={handleChange('recipient_name')}
                    onBlur={handleBlur('recipient_name')}
                    style={styles.input}
                    value={values.recipient_name}
                  />
                </Item>
                {touched.recipient_name && errors.recipient_name && (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.error}>{errors.recipient_name}</Text>
                  </View>
                )}
              </View>

              <View style={styles.secondary}>
                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Recipient's phone</Label>
                  <Input
                    placeholder="Phone"
                    keyboardType="numeric"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    style={styles.input}
                    value={values.phone}
                  />
                </Item>
                {touched.phone && errors.phone && (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.error}>{errors.phone}</Text>
                  </View>
                )}
              </View>

              <View style={styles.secondary}>
                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Address</Label>
                  <Input
                    placeholder="Address"
                    onChangeText={handleChange('address')}
                    handleBlur={handleBlur('address')}
                    style={styles.input}
                    value={values.address}
                  />
                </Item>
                {touched.address && errors.address && (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.error}>{errors.address}</Text>
                  </View>
                )}
              </View>

              <View style={styles.secondary}>
                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Save Address As</Label>
                  <Input
                    placeholder="Save Address As"
                    onChangeText={handleChange('address_name')}
                    handleBlur={handleBlur('address_name')}
                    style={styles.input}
                    value={values.address_name}
                  />
                </Item>
                {touched.address_name && errors.address_name && (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.error}>{errors.address_name}</Text>
                  </View>
                )}
              </View>

              <View style={styles.secondary}>
                <Item style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Province/Region:</Label>
                  <Picker
                    data={provinceOpt}
                    onChange={(e) => provinceSelect(e, setFieldValue)}
                    defaultValue={`${provinceSelected}`}
                  />
                </Item>
                {touched.name && errors.name && (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.error}>{errors.name}</Text>
                  </View>
                )}
              </View>

              <View style={styles.secondary}>
                {!getCity.pending ? (
                  <Item style={styles.floatingLbl}>
                    <Label style={styles.labelTxt}>City:</Label>
                    <Picker
                      data={cityOpt}
                      onChange={(e) => citySelect(e, setFieldValue)}
                      defaultValue={citySelected}
                    />
                  </Item>
                ) : (
                  <View style={styles.loadingWrapper}>
                    <ActivityIndicator
                      visible={getCity.pending}
                      size="small"
                      color="#457373"
                    />
                  </View>
                )}

                {touched.name && errors.name && (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.error}>{errors.name}</Text>
                  </View>
                )}
              </View>

              <View style={styles.secondary}>
                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Zip Code</Label>
                  <Input
                    disabled
                    placeholder="Zip Code"
                    keyboardType="numeric"
                    onChangeText={handleChange('postal_code')}
                    onBlur={handleBlur('postal_code')}
                    style={styles.input}
                    value={values.postal_code}
                  />
                </Item>
                {touched.postal_code && errors.postal_code && (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.error}>{errors.postal_code}</Text>
                  </View>
                )}
              </View>

              <View style={styles.alignWrap}>
                <Text style={styles.toglerTxt}>Set Primary Address</Text>
                <View>
                  <Toggle
                    isEnabled={values.primary_address}
                    toggleSwitch={() =>
                      togglePrimary(values.primary_address, setFieldValue)
                    }
                  />
                </View>
              </View>
              {touched.primary_address && errors.primary_address && (
                <View style={styles.errorWrapper}>
                  <Text style={styles.error}>{errors.primary_address}</Text>
                </View>
              )}

              <Button onPress={handleSubmit} style={styles.btn}>
                <Text style={styles.btnTxt}>SAVE ADRESS</Text>
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
  container: {
    position: 'relative',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: 30,
    marginBottom: 10,
  },
  secondary: {
    marginTop: 10,
    marginBottom: 20,
    elevation: 3,
    borderRadius: 10,
    paddingRight: 10,
    paddingBottom: 20,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 22,
    color: '#102526',
    fontWeight: 'bold',
  },
  radioLabel: {
    fontSize: 20,
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
    color: '#102526',
  },
  changePass: {
    fontSize: 14,
    color: '#457373',
  },
  toglerTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#102526',
  },
  btn: {
    marginTop: 20,
    width: 350,
    borderRadius: 50,
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#457373',
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
  },
  errorWrapper: {
    width: '100%',
    paddingHorizontal: 15,
  },
  loadingWrapper: {
    width: '100%',
    paddingHorizontal: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontSize: 12,
    color: '#7C4935',
  },
});
