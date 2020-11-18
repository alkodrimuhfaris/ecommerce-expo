const {EXPO_API_URL} = process.env;

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import StarRating from './StarRating';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function CommentCard({item}) {
  const {item: commentData} = item;
  const {id, name, avatar, review, createdAt, rating} = commentData;

  return (
    <View style={commentCardStyles.parent}>
      <View style={commentCardStyles.container}>
        <View style={commentCardStyles.nameWrapper}>
          <TouchableOpacity style={commentCardStyles.avaWrapper}>
            <Image
              source={{
                uri: EXPO_API_URL + avatar,
              }}
              style={commentCardStyles.ava}
            />
          </TouchableOpacity>
          <Text style={commentCardStyles.name}>{name}</Text>
        </View>
        <View style={commentCardStyles.ratingWrapper}>
          <StarRating noRatingCount={true} rating={rating} />
          <Text style={commentCardStyles.date}>
            {moment(createdAt).format('MMM DD, yyyy')}
          </Text>
        </View>
        <View style={commentCardStyles.commentWrapper}>
          <Text style={commentCardStyles.comment}>{review}</Text>
        </View>
        <View style={commentCardStyles.likeWrapper}>
          <TouchableOpacity style={commentCardStyles.likeContainer}>
            <Text style={commentCardStyles.likeTxt}>Helpful</Text>
            <FontAwesome name="thumbs-o-up" size={12} color="#5A6868" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const commentCardStyles = StyleSheet.create({
  parent: {
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },
  container: {
    width: '100%',
    position: 'relative',
    flex: 1,
    borderRadius: 8,
    elevation: 2,
    zIndex: 1,
    alignItems: 'flex-start',
    padding: 20,
  },
  nameWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avaWrapper: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ava: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#102526',
  },
  ratingWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  date: {
    color: '#5A6868',
    fontSize: 12,
  },
  commentWrapper: {
    marginTop: 5,
  },
  comment: {
    color: '#102526',
    fontSize: 14,
  },
  likeWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  likeContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  likeTxt: {
    color: '#5A6868',
    fontSize: 12,
    marginRight: 5,
  },
});
