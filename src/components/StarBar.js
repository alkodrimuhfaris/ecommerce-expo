import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

export default function StarBar({bar, count, index}) {
  bar = bar * 100;
  return (
    <View style={starBarStyles.parent}>
      <View style={starBarStyles.stars}>
        <View style={starBarStyles.starsArray}>
          {[...Array(5 - index)].map((_item, idx) => {
            return (
              <View key={idx} style={starBarStyles.starWrapper}>
                <FontAwesome name={'star'} color={'#FFBA49'} size={16} />
              </View>
            );
          })}
        </View>
      </View>
      <View style={starBarStyles.bars}>
        <View style={starBarStyles.innerBar}>
          <View style={[starBarStyles.outerBar, {width: `${bar}%`}]}>
            <Text>&nbsp;</Text>
          </View>
        </View>
      </View>

      <View style={starBarStyles.counts}>
        <Text style={starBarStyles.countTxt}>
          {count > 999 ? '999+' : `${count}`}
        </Text>
      </View>
    </View>
  );
}

const starBarStyles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginVertical: 2,
  },
  stars: {
    width: '40%',
    alignItems: 'flex-end',
  },
  starsArray: {
    flexDirection: 'row',
    width: 'auto',
  },
  starWrapper: {
    marginHorizontal: 2,
  },
  bars: {
    width: '50%',
    alignItems: 'flex-start',
    paddingHorizontal: 3,
  },
  innerBar: {
    width: '100%',
    position: 'relative',
    height: 8,
    borderRadius: 8,
  },
  outerBar: {
    height: '100%',
    backgroundColor: '#457373',
    borderRadius: 8,
  },
  counts: {
    width: '10%',
    paddingHorizontal: 5,
    alignItems: 'flex-end',
  },
  countTxt: {
    color: '#5A6868',
    fontSize: 12,
    textAlign: 'right',
  },
});
