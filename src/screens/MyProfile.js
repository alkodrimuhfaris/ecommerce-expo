import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Container} from 'native-base';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesome} from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import actions from '../redux/actions/index';
import ModalAlert from '../components/ModalAlert';
import ModalLoading from '../components/ModalLoading';
import placeHolder from '../assets/homePhotos/profile.jpg';
import {Entypo} from '@expo/vector-icons';
import ModalCenter from '../components/ModalCenter';
import ContentSelector from '../components/ContentSelector';
import * as ImagePicker from 'expo-image-picker';
import uploadAvaHandler from '../helpers/uploadAvaHandler';

function ProfileOpt(props) {
  return (
    <TouchableOpacity onPress={props.item.action} style={optStyle.parent}>
      <View style={optStyle.titleWrap}>
        <Text style={optStyle.title}>{props.item.title}</Text>
        {props.item.subtitle ? (
          <Text style={optStyle.subtitle}>{props.item.subtitle}</Text>
        ) : null}
      </View>
      <View>
        <FontAwesome name="chevron-right" size={12} color={'#5A6868'} />
      </View>
    </TouchableOpacity>
  );
}

const optStyle = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '2%',
    paddingRight: '2%',
    height: 70,
  },
  titleWrap: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#102526',
  },
  subtitle: {
    fontSize: 11,
    color: '#5A6868',
  },
});

export default function App() {
  const {authAction, profileAction} = actions;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const getProfile = useSelector((state) => state.getProfile);
  const deleteAvatar = useSelector((state) => state.deleteAvatar);
  const deleteAvatarPending = useSelector(
    (state) => state.deleteAvatar.pending,
  );
  const updateProfile = useSelector((state) => state.updateProfile);
  const userData = useSelector((state) => state.getProfile.userData);
  const navigation = useNavigation();
  const [propsAlert, setPropsAlert] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [modalOption, setModalOption] = React.useState(false);
  const [avatar, setAvatar] = React.useState('');
  const [selectOption, setSelectOption] = React.useState([
    'Open Galery',
    'Open Camera',
  ]);

  React.useEffect(() => {
    dispatch(profileAction.getProfile(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  React.useEffect(() => {
    if (userData.avatar) {
      setSelectOption(['Open Galery', 'Open Camera', 'Delete Avatar']);
    }
  }, [userData]);

  const arrayOpt = (orderCount = 0, addressCount = 0) => {
    return [
      {
        title: 'My Orders',
        subtitle: orderCount
          ? `Already have ${orderCount} orders`
          : "Doesn't have any order yet",
        action: () => {
          navigation.navigate('ProfileStack', {screen: 'MyOrder'});
        },
      },
      {
        title: 'Shipping Address',
        subtitle: addressCount
          ? `${addressCount} address`
          : "Doesn't add any address yet",
        action: () => {
          navigation.navigate('AddressStack', {screen: 'SelectAddress'});
        },
      },
      {
        title: 'Setting',
        subtitle: 'Notification, password',
        action: () => {
          navigation.navigate('ProfileStack', {screen: 'ChangeProfile'});
        },
      },
      {
        title: 'Log-out',
        subtitle: '',
        action: () => {
          console.log('log out clicked');
          setPropsAlert({
            content: 'Are you sure want to logout?',
            confirmText: 'Yes',
            confirm: () => {
              dispatch(authAction.logout());
              setOpenAlert(false);
              navigation.navigate('AuthStack', {screen: 'Login'});
            },
            discard: () => {
              setOpenAlert(false);
            },
          });
          setOpenAlert(true);
        },
      },
    ];
  };

  const arrayNewUser = [
    {
      title: 'Login',
      subtitle: '',
      action: () => {
        navigation.navigate('AuthStack', {screen: 'Login'});
      },
    },
  ];

  const updateAva = (data) => {
    console.log(data);
    dispatch(profileAction.updateProfile(token, data));
  };

  const selectAction = async (index) => {
    let result = {};
    if (index === 0) {
      console.log('open galery');
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      await uploadAvaHandler(result, updateAva, setAvatar);
    } else if (index === 1) {
      console.log('open camera');
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      await uploadAvaHandler(
        result,
        updateAva,
        setAvatar,
        setOpenAlert,
        setPropsAlert,
      );
    } else if (index === 2) {
      if (avatar || userData.avatar) {
        setAvatar('');
        dispatch(profileAction.deleteAvatar(token));
      }
    }
    setModalOption(false);
  };

  useEffect(() => {
    if (deleteAvatar.success) {
      setPropsAlert({
        content: 'Avatar deleted!',
        confirm: () => {
          dispatch(profileAction.clearStateAvatar());
          setOpenAlert(false);
          dispatch(profileAction.getProfile(token));
        },
        useOneBtn: true,
      });
      setOpenAlert(true);
    } else if (deleteAvatar.error) {
      setPropsAlert({
        content: deleteAvatar.message,
        confirm: () => {
          dispatch(profileAction.clearStateAvatar());
          setOpenAlert(false);
          dispatch(profileAction.getProfile(token));
        },
        useOneBtn: true,
      });
      setOpenAlert(true);
    }
    console.log('deleteAvatar.pending');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteAvatar.pending]);

  const items = auth.isLogin ? arrayOpt() : arrayNewUser;

  return (
    <View>
      {/* select camera or gallery */}
      <ModalCenter
        modalOpen={modalOption}
        setModalOpen={setModalOption}
        modalContent={
          <ContentSelector sortOption={selectOption} setOption={selectAction} />
        }
      />
      <ModalLoading modalOpen={deleteAvatar.pending || updateProfile.pending} />
      <ModalAlert modalOpen={openAlert} {...propsAlert} />
      <View style={styles.container}>
        <Text style={styles.title}>
          {auth.isLogin ? 'My profile' : 'Hi there!'}
        </Text>
        <View style={styles.profileInfo}>
          {auth.isLogin ? (
            <TouchableOpacity
              onPress={() => setModalOption(true)}
              style={styles.avaWrapper}>
              <Image
                source={
                  avatar
                    ? {uri: avatar}
                    : userData.ava
                    ? {uri: process.env.EXPO_API_URL + userData.ava}
                    : placeHolder
                }
                style={styles.avatar}
              />
              <View style={styles.iconWrapper}>
                <Entypo name="camera" size={15} color="black" />
              </View>
            </TouchableOpacity>
          ) : null}
          <View style={styles.nameWrapper}>
            <Text style={styles.name}>
              {auth.isLogin ? userData.name : 'New User'}
            </Text>
            <Text style={styles.email}>
              {auth.isLogin
                ? userData.email
                : 'Join now! discounts are waiting!'}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.profileOpt}>
        {items.map((item, index) => (
          <View
            key={index}
            style={index < items.length ? styles.opt : styles.lastOpt}>
            <ProfileOpt item={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  opt: {
    borderBottomWidth: 1,
    borderBottomColor: '#5A6868',
  },
  lastOpt: {
    borderBottomWidth: 0,
  },
  profileOpt: {
    marginTop: 5,
  },
  container: {
    paddingRight: '5%',
    paddingLeft: '5%',
  },
  title: {
    marginTop: 50,
    marginBottom: 30,
    fontSize: 34,
    fontWeight: 'bold',
    color: '#102526',
  },
  profileInfo: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  avaWrapper: {
    marginRight: 20,
    width: '25%',
    aspectRatio: 1,
    alignItems: 'center',
    alignContent: 'center',
    position: 'relative',
  },
  iconWrapper: {
    position: 'absolute',
    zIndex: 4,
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    transform: [{translateY: -20}, {translateX: -5}],
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 64,
  },
  nameWrapper: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#102526',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#5A6868',
  },
});
