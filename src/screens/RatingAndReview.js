import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {Button} from 'native-base';
import RatingComponent from '../components/RatingComponent';
import CommentCard from '../components/CommentCard';

const ratingItem = [
  {
    ratingAvg: 0,
    ratingBar: [0, 0, 0, 0, 0],
    starCount: [0, 0, 0, 0, 0],
    ratingCount: 0,
  },
];

const comments = [
  {
    id: 1,
    product_id: 1,
    name: 'Sarinah',
    avatar: 'Uploads/2-product_image-1603966940378.jpg',
    rating: 4.5,
    review: 'Barangnya bagus banget saya suka!',
    createdAt: '2020-10-29T10:22:22.000Z',
  },
  {
    id: 2,
    product_id: 1,
    name: 'Sarinah',
    avatar: 'Uploads/2-product_image-1603966940378.jpg',
    rating: 4.5,
    review: 'Barangnya bagus banget saya suka!',
    createdAt: '2020-10-29T10:22:22.000Z',
  },
  {
    id: 3,
    product_id: 1,
    name: 'Sarinah',
    avatar: 'Uploads/2-product_image-1603966940378.jpg',
    rating: 4.5,
    review: 'Barangnya bagus banget saya suka!',
    createdAt: '2020-10-29T10:22:22.000Z',
  },
  {
    id: 4,
    product_id: 1,
    name: 'Sarinah',
    avatar: 'Uploads/2-product_image-1603966940378.jpg',
    rating: 4.5,
    review: 'Barangnya bagus banget saya suka!',
    createdAt: '2020-10-29T10:22:22.000Z',
  },
  {
    id: 5,
    product_id: 1,
    name: 'Sarinah',
    avatar: 'Uploads/2-product_image-1603966940378.jpg',
    rating: 4.5,
    review: 'Barangnya bagus banget saya suka!',
    createdAt: '2020-10-29T10:22:22.000Z',
  },
];

export default function App() {
  const rating = ratingItem;
  const pageInfo = {};
  //const ratingArr = ratings;
  const nextPage = () => {
    console.log('process to do scrolling');
  };

  return (
    <View style={styles.parentContainer}>
      <ScrollView style={styles.parentScroll}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{'Rating&Review'}</Text>
        </View>

        <RatingComponent rating={rating} />

        <Text style={styles.commentCount}>
          {Object.keys(pageInfo).length ? pageInfo.count : 0} reviews
        </Text>

        <View style={styles.commentSection}>
          <FlatList
            data={comments.length ? comments : []}
            onEndReached={nextPage}
            onEndReachedTreshold={0.5}
            renderItem={(item) => {
              return <CommentCard item={item} />;
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.transparentFooter}>
        <Button rounded style={styles.btn}>
          <FontAwesome name="pencil" size={16} color="white" />
          <Text style={styles.btnTxt}>Write A Review</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  parentScroll: {
    width: '100%',
    paddingHorizontal: 20,
  },
  titleWrap: {
    marginVertical: 30,
  },
  title: {
    color: '#102526',
    fontSize: 34,
    fontWeight: 'bold',
  },
  commentCount: {
    color: '#102526',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  commentSection: {
    flex: 1,
    paddingVertical: 10,
    marginVertical: 10,
  },
  transparentFooter: {
    position: 'relative',
    backgroundColor: 'white',
    height: '10%',
    width: '100%',
  },
  btn: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: '#457373',
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  btnTxt: {
    color: 'white',
    marginLeft: 10,
  },
});
