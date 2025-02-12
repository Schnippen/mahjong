import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Score from './EndRoundScore';
import {useAppSelector} from '../../Store/hooks';
import {RootState} from '../../Store/store';
import {getFontSize} from '../../Functions/utils/getFontSize';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {soundFunc} from '../../Functions/playSounds/soundFunc';

const ScoreContainer = () => {
  const [loading, setLoading] = useState(true);
  const translateX = useSharedValue(-200);
  const opacity = useSharedValue(0);
  const {pointsName, yakuList} = useAppSelector(
    (state: RootState) => state.gameReducer.winningHand,
  );
  let textSizBig = getFontSize(38);
  let yakuListLengthLast = yakuList.length;
  let timeForExecution = 2400 * (yakuListLengthLast + 3);
  let pointsNameSound = pointsName.toLowerCase();
  //index*2400
  //(yakuListLength+4)*2400
  console.log('.', pointsNameSound, timeForExecution, yakuListLengthLast);
  useEffect(() => {
    const timer = setTimeout(() => {
      //console.log('yaku-row', soundName);
      setLoading(false);
      soundFunc({type: pointsNameSound}); //TODO fix typescript pointsNameSound | undefined | ''
      translateX.value = withTiming(0, {
        duration: 1500,
        easing: Easing.out(Easing.exp),
      });
      opacity.value = withTiming(1, {
        duration: 2400,
        easing: Easing.out(Easing.exp),
      });
    }, timeForExecution);

    return () => clearTimeout(timer);
  }, [timeForExecution]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
      opacity: opacity.value,
    };
  });

  /*   if (loading) {
    return null;
  } */

  return (
    <View style={{flexDirection: 'row', width: 420}}>
      <Score />
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          },
          animatedStyle,
        ]}>
        <Text
          style={{
            color: '#fbd54e',
            fontSize: textSizBig,
            fontFamily: 'TheLastShuriken',
          }}
          adjustsFontSizeToFit={true}>
          {pointsName}
        </Text>
      </Animated.View>
    </View>
  );
};
export default ScoreContainer;
