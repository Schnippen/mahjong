import React from 'react';
import {Text, View} from 'react-native';
import Score from './EndRoundScore';
import {useAppSelector} from '../../Store/hooks';
import {RootState} from '../../Store/store';

const ScoreContainer = () => {
  const pointsName = useAppSelector(
    (state: RootState) => state.gameReducer.winningHand.pointsName,
  );

  return (
    <View style={{backgroundColor: 'pink', flexDirection: 'row', width: 420}}>
      <Score />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'blue',
        }}>
        <Text style={{color: '#fbd54e', fontSize: 42, fontWeight: 'bold'}}>
          {pointsName}
        </Text>
      </View>
    </View>
  );
};
export default ScoreContainer;
