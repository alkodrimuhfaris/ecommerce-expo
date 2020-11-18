import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

export default function StarRating({
  rating,
  ratingCount,
  noRatingCount = false,
}) {
  rating = rating > 5 ? rating : rating * 20;
  return (
    <View style={ratingStyles.container}>
      <View style={ratingStyles.parent}>
        <View style={ratingStyles.innerStar}>
          {[...Array(5)].map((_item, index) => (
            <View key={index} style={ratingStyles.starIndividual}>
              <FontAwesome name={'star'} color={'#9B9B9B'} />
            </View>
          ))}
          <View style={[ratingStyles.outerStar, {width: `${rating || 0}%`}]}>
            {[...Array(5)].map((_item, index) => (
              <View key={index} style={ratingStyles.starIndividual}>
                <FontAwesome name={'star'} color={'#FFBA49'} />
              </View>
            ))}
          </View>
        </View>
      </View>
      {!noRatingCount ? (
        <Text style={ratingStyles.ratingCount}>({ratingCount || 0})</Text>
      ) : null}
    </View>
  );
}

const ratingStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  parent: {
    width: 'auto',
  },
  starIndividual: {
    marginHorizontal: 1,
  },
  outerStar: {
    flexDirection: 'row',
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 2,
    top: 0,
    left: 0,
  },
  innerStar: {
    position: 'relative',
    flexDirection: 'row',
    zIndex: 1,
  },
  ratingCount: {
    marginLeft: 5,
    fontSize: 12,
    color: '#5A6868',
  },
});
