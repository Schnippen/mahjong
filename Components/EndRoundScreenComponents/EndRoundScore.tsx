import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useAppSelector} from '../../Store/hooks';
import {RootState} from '../../Store/store';

export const Score = () => {
  const topPanelBackgroundColor = '#3c7fc3';

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
      <View style={{}}>
        <View style={{}}>
          <Text>{displayWinningFu}</Text>
          <Text>Fu</Text>
        </View>
        <View style={{}}>
          <Text>{displayTotalHan}</Text>
          <Text>Han</Text>
        </View>
      </View>
      <View style={{}}>
        <Text>{displayWinningPoints}</Text>
        <Text style={{}}>PTS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: 200,
    backgroundColor: 'purple',
    paddingHorizontal: 5,
  },
  topPanel: {
    flexDirection: 'row',
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
  },
  bottomPanel: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'red',
    alignItems: 'baseline',
  },
  pointsText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default Score;
