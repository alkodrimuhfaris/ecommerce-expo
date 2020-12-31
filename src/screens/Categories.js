import React from 'react';
import {Text, FlatList, StyleSheet, View} from 'react-native';
import {Container, Button} from 'native-base';
import CategoryCard from '../components/CategoryCard';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    id: 11,
    name: 'Fashion wanita',
    categories_image: 'Uploads/2-categories_image-1603821057970.jpg',
    created_at: '2020-10-27T17:50:59.000Z',
    updated_at: null,
    totalProducts: 1,
  },
  {
    id: 10,
    name: 'Fashion Pria',
    categories_image: 'Uploads/2-categories_image-1603820887982.jpg',
    created_at: '2020-10-27T17:48:09.000Z',
    updated_at: null,
    totalProducts: 0,
  },
];

export default function Categories() {
  const navigation = useNavigation();
  const categoriesData = data;
  const [categorySelect, setCategory] = React.useState(0);

  const selectCategory = (id, name) => {
    navigation.navigate('AllProduct', {title: name, id});
  };

  function nextPage() {
    console.log('next');
  }

  const goToAllItem = () => {
    navigation.navigate('AllProduct', {title: 'All item'});
  };

  return (
    <Container style={styles.container}>
      <View style={styles.btnWrapper}>
        <Button block onPress={goToAllItem} rounded style={styles.btn}>
          <Text style={styles.btnTxt}>VIEW ALL ITEMS</Text>
        </Button>
      </View>
      <Text style={styles.text}>Select Category</Text>

      <View style={styles.viewScroll}>
        <FlatList
          data={categoriesData.length ? categoriesData : []}
          onEndReached={nextPage}
          onEndReachedTreshold={0.5}
          renderItem={(item) => {
            return <CategoryCard item={item} selectCategory={selectCategory} />;
          }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  viewScroll: {
    width: '100%',
    flex: 1,
    paddingHorizontal: '5%',
  },
  container: {
    alignItems: 'center',
  },
  text: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 14,
    color: '#9B9B9B',
    textAlign: 'center',
  },
  btnWrapper: {
    marginTop: 50,
    width: '100%',
    padding: '5%',
  },
  btn: {
    padding: 5,
    backgroundColor: '#457373',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});
