import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useAppSelector} from '../../Store/hooks';
import {RootState} from '../../Store/store';
import AnimatedNumbers from 'react-native-animated-numbers';

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
  const displayWinningFu = winningFu || '';
  const displayWinningPoints = winningPoints || '';
  const displayTotalHan = totalHan || '';
  const displayWinningFuAnimated = winningFu || 0;
  const displayTotalHanAnimated = totalHan || 0;
  const displayWinningPointsAnimated = winningPoints || 0;
  //https://www.npmjs.com/package/react-native-animated-numbers
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AnimatedNumbers
          includeComma={false}
          animateToNumber={displayWinningFuAnimated}
          fontStyle={{
            fontSize: 24,
            fontFamily: 'TheLastShuriken',
          }}
          animationDuration={4000}
        />
        <Text style={{fontFamily: 'TheLastShuriken'}}>Fu </Text>

        <AnimatedNumbers
          includeComma={false}
          animateToNumber={displayTotalHanAnimated}
          fontStyle={{
            fontSize: 24,
            fontFamily: 'TheLastShuriken',
          }}
          animationDuration={4000}
        />
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
        <AnimatedNumbers
          includeComma={false}
          animateToNumber={displayWinningPointsAnimated}
          fontStyle={{
            fontSize: 30,
            textAlignVertical: 'center',
            fontFamily: 'TheLastShuriken',
          }}
          animationDuration={5000}
        />
        <Text
          style={{
            fontSize: 18,
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
{
  /*       <Text style={{fontFamily: 'TheLastShuriken', fontSize: 24}}>
          {displayWinningFu + ' '}
        </Text> */
}
{
  /*         <Text style={{fontSize: 24, fontFamily: 'TheLastShuriken'}}>
          {displayTotalHan + ' '}
        </Text> */
}
{
  /*  <Text
          style={{
            fontSize: 30,
            textAlignVertical: 'center',
            fontFamily: 'TheLastShuriken',
          }}>
          {displayWinningPoints + ' '}
        </Text> */
}
