import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import StarBar from './StarBar';

export default function RatingComponent({rating}) {
  const [{ratingAvg, ratingBar, starCount, ratingCount}] = rating;

  return (
    <View style={ratingComponentStyle.starsWrapper}>
      <View style={ratingComponentStyle.totalStarWrapper}>
        <View style={ratingComponentStyle.totalStar}>
          <Text style={ratingComponentStyle.ratingTxt}>{ratingAvg}</Text>
          <Text
            style={
              ratingComponentStyle.ratingCount
            }>{`${ratingCount} ratings`}</Text>
        </View>
      </View>
      <View style={ratingComponentStyle.starBarWrap}>
        {ratingBar.map((bar, index) => {
          return (
            <StarBar
              key={index}
              bar={bar}
              index={index}
              count={starCount[index]}
            />
          );
        })}
      </View>
    </View>
  );
}

const ratingComponentStyle = StyleSheet.create({
  starsWrapper: {
    flexDirection: 'row',
    flex: 1,
    height: 'auto',
    justifyContent: 'flex-end',
  },
  totalStarWrapper: {
    width: '25%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  totalStar: {
    alignItems: 'center',
  },
  starBarWrap: {
    width: '75%',
    flexDirection: 'column',
  },
  ratingTxt: {
    color: '#102526',
    fontSize: 44,
    fontWeight: 'bold',
  },
  ratingCount: {
    color: '#5A6868',
    fontSize: 14,
  },
});
