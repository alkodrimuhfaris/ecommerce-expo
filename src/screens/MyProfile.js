import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Container} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';

const uri = 'http://52.200.32.180:8080/Uploads/2-avatar-1603815972130.jpeg';

const arrayOpt = (orderCount = 0, addressCount = 0) => {
  return [
    {
      title: 'My Orders',
      subtitle: orderCount
        ? `Already have ${orderCount} orders`
        : "Doesn't have any order yet",
    },
    {
      title: 'Shipping Address',
      subtitle: addressCount
        ? `${addressCount} address`
        : "Doesn't add any address yet",
    },
    {
      title: 'Setting',
      subtitle: 'Notification, password',
    },
    {
      title: 'Log-out',
      subtitle: '',
    },
  ];
};

function ProfileOpt(props) {
  return (
    <View style={optStyle.parent}>
      <View style={optStyle.titleWrap}>
        <Text style={optStyle.title}>{props.item.title}</Text>
        {props.item.subtitle ? (
          <Text style={optStyle.subtitle}>{props.item.subtitle}</Text>
        ) : null}
      </View>
      <View>
        <FontAwesome name="chevron-right" size={12} color={'#5A6868'} />
      </View>
    </View>
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
  const items = arrayOpt();

  return (
    <View>
      <Container style={styles.container}>
        <Text style={styles.title}>My profile</Text>
        <View style={styles.profileInfo}>
          <View style={styles.avaWrapper}>
            <Image
              source={{
                uri:
                  'http://52.200.32.180:8080/Uploads/2-avatar-1603815972130.jpeg',
              }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.name}>{'Syamsul Bahari'}</Text>
            <Text style={styles.email}>{'farisalkodri@gmail.com'}</Text>
          </View>
        </View>
      </Container>

      <ScrollView style={styles.profileOpt}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={index < items.length ? styles.opt : styles.lastOpt}>
            <ProfileOpt item={item} />
          </TouchableOpacity>
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
    marginTop: 200,
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
