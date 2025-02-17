import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {soundFunc} from '../../Functions/playSounds/soundFunc';
import {YakuType} from '../../Types/types';
import {GoldTextColor} from '../../Data/colors';
import {getFontSize} from '../../Functions/utils/getFontSize';
//TODO change typescript - ?
export const YakuRow = ({data, time}: {data?: YakuType; time?: number}) => {
  const topPanelBackgroundColor = '#3c7fc3';
  const [loading, setLoading] = useState(true);
  const translateX = useSharedValue(-200);
  const opacity = useSharedValue(0);
  let soundName = data?.yakuName.split(' ').join('').toLowerCase();

  //TODO create dorani dorasan etc sounds ;_;

  useEffect(() => {
    const timer = setTimeout(() => {
      //console.log('yaku-row', soundName);
      setLoading(false);
      soundFunc({type: soundName}); //TODO fix typescript soundName | undefined
      translateX.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
      opacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
    }, time);

    return () => clearTimeout(timer);
  }, [time]);
  console.log('time:', time);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
      opacity: opacity.value,
    };
  });

  if (loading) {
    return null;
  }
  let name = data?.yakuName ? data.yakuName : null;
  let han = data?.han ? data.han : null;
  let nameFontExeption = ['Suuankou', 'Sanankou'];
  let textSize = getFontSize(12);
  return (
    <Animated.View style={[styles.yakuRow, animatedStyle]}>
      <View style={{flex: 3, justifyContent: 'center', height: 38}}>
        <Text
          style={{
            fontFamily: 'TheLastShuriken',
            textAlign: 'center',
            fontSize: 14,
          }}
          adjustsFontSizeToFit={true}
          numberOfLines={1}>
          {name}
        </Text>
      </View>
      <View style={styles.hanContainer}>
        <Text
          style={{
            color: GoldTextColor,
            fontFamily: 'TheLastShuriken',
            fontSize: textSize,
          }}
          adjustsFontSizeToFit={true}>
          {han}
        </Text>
        <Text
          style={{
            color: GoldTextColor,
            fontFamily: 'TheLastShuriken',
            fontSize: textSize,
          }}
          adjustsFontSizeToFit={true}>
          {' '}
          HAN
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  yakuRow: {
    flexDirection: 'row',
    height: 38,
    width: 140,
    backgroundColor: '#3c7fc3',
    borderRadius: 4,
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  hanContainer: {
    flexDirection: 'row',
    backgroundColor: '#113764',
    height: 32,
    borderRadius: 4,
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
