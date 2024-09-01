import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useAppSelector} from '../../Store/hooks';
import {RootState} from '../../Store/store';

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
        <Text style={{fontWeight: 'bold', fontSize: 24}}>
          {displayWinningFu + ' '}
        </Text>
        <Text style={{fontWeight: 'bold'}}>Fu </Text>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>
          {displayTotalHan + ' '}
        </Text>
        <Text style={{fontWeight: 'bold'}}>Han </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 30,
            textAlignVertical: 'center',
            fontWeight: 'bold',
          }}>
          {displayWinningPoints + ' '}
        </Text>
        <Text style={{fontSize: 18, textAlignVertical: 'center'}}>PTS</Text>
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
