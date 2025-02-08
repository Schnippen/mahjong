import React from 'react';
import {View} from 'react-native';
import {TableCell} from './TableCell';
import {TplayerString} from '../../Types/types';
//TODO move to types.ts
type ScoresType = {
  player: TplayerString;
  riichiBetsLost: boolean;
  riichiBetsGained: boolean;
  tenpai: boolean;
  noten: boolean;
  ronOrTsumoPoints: number;
  totalPoints: number;
};
type ScoresStateType = Omit<
  ScoresType,
  'ronOrTsumoPoints' | 'player' | 'totalPoints'
>;

export const ColumnLegend = ({
  state,
  winningAction,
  round,
}: {
  state: ScoresStateType;
  winningAction: 'TSUMO' | 'RON' | '';
  round: number;
}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        maxHeight: 274,
      }}>
      <TableCell data={'Round' + ' ' + (round + 1)} />
      {state.riichiBetsLost ? <TableCell data={'Riichi bets lost'} /> : null}
      {state.riichiBetsGained ? (
        <TableCell data={'Riichi bets gained'} />
      ) : null}
      {state.tenpai ? <TableCell data={'Tenpai'} /> : null}
      {state.noten ? <TableCell data={'Noten'} /> : null}
      {state.noten !== true ? <TableCell data={winningAction} /> : null}
      <View
        style={{
          borderTopWidth: 3,
          borderColor: 'black',
          height: 3,
          width: '100%',
        }}
      />
      <TableCell data={'Total'} />
    </View>
  );
};
