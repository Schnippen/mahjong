import React, {useEffect, useState} from 'react';
import {useAppDispatch} from '../Store/hooks';
import {RootState} from '../Store/store';
import {useSelector} from 'react-redux';
import useBackHandler from '../Functions/utils/useBackHandlerHook';
import {StatusBar, Text, View} from 'react-native';
import {boardColor} from '../Data/colors';
import {StyleSheet} from 'react-native';
import {ButtonCaptureScreenshot} from '../Components/Buttons/ButtonCaptureScreenshot';
import {ButtonResetToNextRound} from '../Components/Buttons/ButtonResetToNextRound';
import {TplayerString, whoTheLoserIsType} from '../Types/types';
import {TableCell} from '../Components/ScoresScreenComponents/TableCell';
import {ColumnLegend} from '../Components/ScoresScreenComponents/ColumnLegend';
import {TableComponent} from '../Components/ScoresScreenComponents/TableComponent';

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

export const ScoresScreen = ({navigation}: {navigation: any}) => {
  //should I use it?
  //https://www.npmjs.com/package/react-native-table-component
  //Take note 'react-native-auto-size-text'
  const round = useSelector((state: RootState) => state.gameReducer.round);

  const {player1River, player2River, player3River, player4River} = useSelector(
    (state: RootState) => state.riverReducer,
  );

  const {player1, player2, player3, player4} = useSelector(
    (state: RootState) => state.playersReducer,
  );
  const {whoTheWinnerIs} = useSelector(
    (state: RootState) => state.playersReducer,
  );
  const {winningHand} = useSelector((state: RootState) => state.gameReducer);
  let losers = whoTheWinnerIs.whoTheLoserIs;
  let winningAction = winningHand?.winningAction;
  let isNoten = winningAction === ''; //there might be a bug
  let winner = whoTheWinnerIs.playerName;
  let winingPoints = winningHand.points;
  const calculateRonTsumoPoints = (
    currentPlayer: TplayerString,
    winner: TplayerString,
    winningAction: string,
    winingPoints: number,
    losers: whoTheLoserIsType[],
  ): {result: boolean; points: number} => {
    if (winner === 'null') {
      return {result: false, points: 0};
    }
    if (currentPlayer === winner) {
      return {result: true, points: winingPoints};
    }
    if (winningAction === 'TSUMO') {
      return {
        result: true,
        points: -Math.ceil(winingPoints / 3),
      };
    }

    const loserInfo = losers.find(loser => loser?.loserName === currentPlayer);
    if (loserInfo) {
      return {
        result: true,
        points: -Math.ceil(winingPoints * loserInfo.paymentMultiplier),
      };
    }

    return {result: false, points: 0};
  };
  // must consider wind of player...
  // //https://riichi.wiki/Japanese_mahjong_scoring_rules
  //TODO calculateRiichiBetPoints does not work properly, no points
  function calculateRiichiBetPoints(
    playerName: TplayerString,
    winnerName: TplayerString,
    allRivers: Record<string, any>,
  ): {result: boolean; points: number} {
    if (
      typeof allRivers[playerName]?.riichiIndex === 'number' &&
      playerName !== winnerName
    ) {
      return {result: true, points: -1000};
    }
    if (playerName === winnerName) {
      const betsGained =
        Object.entries(allRivers).filter(
          ([player, river]) =>
            player !== winnerName && typeof river.riichiIndex === 'number',
        ).length * 1000;

      return {result: true, points: betsGained};
    }

    return {result: false, points: 0};
  }

  //i hate typescript
  const players: Exclude<TplayerString, 'null'>[] = [
    'player1',
    'player2',
    'player3',
    'player4',
  ];

  type PlayerRivers = Record<
    Exclude<TplayerString, 'null'>,
    typeof player1River
  >;
  type PlayerScores = Record<Exclude<TplayerString, 'null'>, number>;

  const playerRivers: PlayerRivers = {
    player1: player1River,
    player2: player2River,
    player3: player3River,
    player4: player4River,
  };

  const playerScores: PlayerScores = {
    player1: player1.player1Score,
    player2: player2.player2Score,
    player3: player3.player3Score,
    player4: player4.player4Score,
  };

  const dataToRender: ScoresType[] = players.map(player => ({
    player,
    riichiBetsLost: typeof playerRivers[player].riichiIndex === 'number',
    riichiBetsGained: calculateRiichiBetPoints(
      player,
      whoTheWinnerIs.playerName,
      {
        player1: player1River,
        player2: player2River,
        player3: player3River,
        player4: player4River,
      },
    ).result,
    tenpai: false,
    noten: isNoten,
    ronOrTsumoPoints: calculateRonTsumoPoints(
      player,
      winner,
      winningAction,
      winingPoints,
      losers,
    ).points,
    totalPoints: playerScores[player],
  }));

  const [state, setState] = useState<ScoresStateType>({
    riichiBetsLost: false,
    riichiBetsGained: false,
    tenpai: false,
    noten: false,
  });
  /*type assertion in TypeScript is a way to tell the compiler "trust me, I know this type better than you." It's like manually overriding TypeScript's type inference. */
  useEffect(() => {
    let updatedState = {...state};
    (Object.keys(state) as Array<keyof ScoresStateType>).forEach(key => {
      updatedState[key] = dataToRender.some(player => player[key] === true);
    });
    setState(updatedState);
  }, []);

  //console.log('ScoresScreen', state);
  const dispatch = useAppDispatch();
  useBackHandler(navigation, dispatch);
  const previousRounds = `${round + 1} - ${round}`;

  const ColumnComponent = ({
    item,
    index,
    winnerName,
  }: {
    item: any;
    index: number;
    winnerName: TplayerString;
  }) => {
    //TODO add typescript

    let gains = calculateRiichiBetPoints(item.playerName, winnerName, {
      player1: player1River,
      player2: player2River,
      player3: player3River,
      player4: player4River,
    });
    return (
      <View style={{flex: 1, maxHeight: 274}}>
        <TableCell data={item.player} />
        {state.riichiBetsLost ? (
          <TableCell data={item.riichiBetsLost ? '-1000' : ''} />
        ) : null}
        {state.riichiBetsGained ? (
          <TableCell data={gains.points || 'TODO'} />
        ) : null}
        {state.tenpai ? <TableCell data={item.tenpai} /> : null}
        {state.noten ? (
          <TableCell data={item.noten ? 'true' : 'false'} />
        ) : null}
        {state.noten !== true ? (
          <TableCell data={item.ronOrTsumoPoints} />
        ) : null}
        <View
          style={{
            borderTopWidth: 3,
            borderColor: 'black',
            height: 3,
            width: '100%',
          }}
        />
        <TableCell data={item.totalPoints} />
      </View>
    );
  };

  const CollumnArray = ({winner}: {winner: TplayerString}) => {
    return dataToRender.map((item, index) => (
      <View style={{flex: 1}}>
        <ColumnComponent
          item={item}
          index={index}
          key={item.player.toString()}
          winnerName={winner}
        />
      </View>
    ));
  };
  const [dimensionsView, setDimensionsView] = useState({width: 0, height: 0});
  const onLayoutView = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    if (width !== dimensionsView.width || height !== dimensionsView.height) {
      setDimensionsView({width, height});
    }
  };
  /*  console.log('TABLE COMPONENT:', dimensionsView.width, dimensionsView.height); */
  return (
    <View
      style={{backgroundColor: boardColor, flex: 1}}
      onLayout={onLayoutView}>
      <StatusBar hidden={true} />
      <TableComponent>
        <ColumnLegend
          state={state}
          winningAction={winningAction}
          round={round}
        />
        <CollumnArray winner={winner} />
      </TableComponent>
      <View
        style={{
          backgroundColor: boardColor,
          height: dimensionsView.height - 274,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <ButtonCaptureScreenshot />
        <ButtonResetToNextRound />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {color: 'black', fontFamily: 'TheLastShuriken', fontSize: 14},
});
