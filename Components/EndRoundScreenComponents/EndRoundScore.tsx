import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useAppSelector} from '../../Store/hooks';
import {RootState} from '../../Store/store';
import AnimatedNumbers from 'react-native-animated-numbers';
import {getFontSize} from '../../Functions/utils/getFontSize';
import {soundFunc} from '../../Functions/playSounds/soundFunc';

export const Score = () => {
  const {totalHan, points, fu, yakuList} = useAppSelector(
    (state: RootState) => state.gameReducer.winningHand,
  );

  const [displayWinningFuAnimated, setDisplayWinningFuAnimated] = useState(0);
  const [displayTotalHanAnimated, setDisplayTotalHanAnimated] = useState(0);
  const [displayWinningPointsAnimated, setDisplayWinningPointsAnimated] =
    useState(0);
  //index*2400
  let yakuListLength = yakuList.length;
  let timeForExecution = 2400;
  console.log(
    'endroundScore:',
    timeForExecution * (yakuListLength - 0.6) + 400,
    timeForExecution * (yakuListLength + 1) + 400,
    timeForExecution * (yakuListLength + 1.5) + 400,
    yakuListLength,
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      soundFunc({type: 'points1'});
      setDisplayWinningFuAnimated(fu || 0);
    }, timeForExecution * (yakuListLength - 0.5) + 400);
    return () => clearTimeout(timer);
  }, [fu]);
  useEffect(() => {
    const timer = setTimeout(() => {
      soundFunc({type: 'points1'});
      setDisplayTotalHanAnimated(totalHan || 0);
    }, timeForExecution * yakuListLength + 400);
    return () => clearTimeout(timer);
  }, [totalHan]);
  useEffect(() => {
    const timer = setTimeout(() => {
      soundFunc({type: 'points2'});
      setDisplayWinningPointsAnimated(points || 0);
    }, timeForExecution * (yakuListLength + 1) + 400);
    return () => clearTimeout(timer);
  }, [points]);

  //https://www.npmjs.com/package/react-native-animated-numbers
  let textSizSmall = getFontSize(18);
  let textSizeMedium = getFontSize(28);
  let textSize = getFontSize(24);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',

          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <AnimatedNumbers
            includeComma={false}
            animateToNumber={displayWinningFuAnimated}
            fontStyle={{
              fontSize: textSize,
              fontFamily: 'TheLastShuriken',
            }}
            animationDuration={timeForExecution * 0.9}
          />
        </View>
        <Text style={{fontFamily: 'TheLastShuriken'}}>Fu </Text>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <AnimatedNumbers
            includeComma={false}
            animateToNumber={displayTotalHanAnimated}
            fontStyle={{
              fontSize: textSize,
              fontFamily: 'TheLastShuriken',
            }}
            animationDuration={timeForExecution}
          />
        </View>
        <Text style={{fontFamily: 'TheLastShuriken'}}>Han </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'flex-end'}}>
          <AnimatedNumbers
            includeComma={false}
            animateToNumber={displayWinningPointsAnimated}
            fontStyle={{
              fontSize: textSizeMedium,
              textAlignVertical: 'center',
              fontFamily: 'TheLastShuriken',
            }}
            animationDuration={timeForExecution * 1.3}
          />
        </View>
        <Text
          style={{
            fontSize: textSizSmall,
            textAlignVertical: 'center',
            fontFamily: 'TheLastShuriken',
          }}>
          PTS
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: 200,
    backgroundColor: 'transparent',
    paddingLeft: 5,
  },
});

export default Score;
