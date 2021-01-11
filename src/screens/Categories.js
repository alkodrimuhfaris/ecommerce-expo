/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text, FlatList, StyleSheet, View} from 'react-native';
import {Container, Button} from 'native-base';
import CategoryCard from '../components/CategoryCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../redux/actions/index';
import queryExtractor from '../helpers/queryExtractor';

export default function Categories() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const categoriesData = useSelector((state) => state.getCategory.data);
  const pageInfo = useSelector((state) => state.getCategory.pageInfo);
  const [categorySelect, setCategory] = React.useState(0);
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    dispatch(actions.categoryAction.getCategories());
  }, []);

  const doRefresh = () => {
    setRefresh(true);
    dispatch(actions.categoryAction.getCategories());
    setRefresh(false);
  };

  const selectCategory = (id, name) => {
    navigation.navigate('AllProductStack', {
      screen: 'AllProduct',
      params: {title: name, categoryId: id, categoryDetail: true},
    });
  };

  function nextPage() {
    const nextQuery = queryExtractor(pageInfo);
    if (nextQuery) {
      dispatch(actions.categoryAction.scrollCategories(nextQuery));
    }
  }

  const goToAllItem = () => {
    navigation.navigate('AllProductStack', {
      screen: 'AllProduct',
      params: {title: 'All item', allItem: true},
    });
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
          refreshing={refresh}
          onRefresh={doRefresh}
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
