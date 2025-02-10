import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useAppSelector} from '../../Store/hooks';
import {RootState} from '../../Store/store';
import AnimatedNumbers from 'react-native-animated-numbers';
import {getFontSize} from '../../Functions/utils/getFontSize';

export const Score = () => {
  const winningFu = useAppSelector(
    (state: RootState) => state.gameReducer.winningHand.fu,
  );
  const winningPoints = useAppSelector(
    (state: RootState) => state.gameReducer.winningHand.points,
  );
  const totalHan = useAppSelector(
    (state: RootState) => state.gameReducer.winningHand.totalHan,
  );
  const [displayWinningFuAnimated, setDisplayWinningFuAnimated] = useState(0);
  const [displayTotalHanAnimated, setDisplayTotalHanAnimated] = useState(0);
  const [displayWinningPointsAnimated, setDisplayWinningPointsAnimated] =
    useState(0);
  let timeForExecution = 2000;
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayWinningFuAnimated(winningFu || 0);
    }, timeForExecution * 1.1);
    return () => clearTimeout(timer);
  }, [winningFu]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayTotalHanAnimated(totalHan || 0);
    }, timeForExecution * 2.1);
    return () => clearTimeout(timer);
  }, [totalHan]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayWinningPointsAnimated(winningPoints || 0);
    }, timeForExecution * 3.1);
    return () => clearTimeout(timer);
  }, [winningPoints]);

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
            animationDuration={timeForExecution}
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
            animationDuration={timeForExecution * 2.5}
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
