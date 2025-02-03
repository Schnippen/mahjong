import React, {useState} from 'react';
import {useAppDispatch} from '../Store/hooks';
import {RootState} from '../Store/store';
import {useSelector} from 'react-redux';
import useBackHandler from '../Functions/utils/useBackHandlerHook';
import {StatusBar, Text, View} from 'react-native';
import {boardColor} from '../Data/colors';
import {StyleSheet} from 'react-native';
import {TplayerString} from '../Types/types';
import {ButtonCaptureScreenshot} from '../Components/Buttons/ButtonCaptureScreenshot';
import {ButtonResetToNextRound} from '../Components/Buttons/ButtonResetToNextRound';
export const ScoresScreen = ({navigation}: {navigation: any}) => {
  //should I use it?
  //https://www.npmjs.com/package/react-native-table-component
  //Take note TODO 'react-native-auto-size-text'
  const round = useSelector((state: RootState) => state.gameReducer.round);
  const dataToRender = [
    {
      player: 'player1',
      riichiBetsLost: true,
      riichiBetsGained: true,
      tenpai: true,
      noten: true,
      ronOrTsumoPoints: 1000,
      roundPoints: 0,
    },
    {
      player: 'player2',
      riichiBetsLost: true,
      riichiBetsGained: true,
      tenpai: true,
      noten: true,
      ronOrTsumoPoints: 1000,
      roundPoints: 0,
    },
    {
      player: 'player3',
      riichiBetsLost: true,
      riichiBetsGained: true,
      tenpai: true,
      noten: true,
      ronOrTsumoPoints: 1000,
      roundPoints: 0,
    },
    {
      player: 'player4',
      riichiBetsLost: true,
      riichiBetsGained: true,
      tenpai: true,
      noten: true,
      ronOrTsumoPoints: 1000,
      roundPoints: 0,
    },
  ];
  const dispatch = useAppDispatch();
  useBackHandler(navigation, dispatch);
  const previousRounds = `${round + 1} - ${round}`;
  const TableComponent = ({children}: {children?: any}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'brown',
          flexDirection: 'row',
          maxHeight: 274,
        }}>
        {children}
      </View>
    );
  };
  const TableCell = ({data}: {data?: any}) => {
    return (
      <View
        style={{
          minHeight: 34,
          backgroundColor: 'red',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'black',
        }}>
        <Text
          style={[styles.text, {textAlign: 'center'}]}
          adjustsFontSizeToFit={true}
          numberOfLines={1}>
          {data}
        </Text>
      </View>
    );
  };
  const ColumnComponent = ({item, index}: {item: any; index: number}) => {
    return (
      <View style={{flex: 1, backgroundColor: 'blue', maxHeight: 274}}>
        <TableCell data={item.player} />
        <TableCell data={item.riichiBetsLost} />
        <TableCell data={item.riichiBetsGained} />
        <TableCell data={item.tenpai} />
        <TableCell data={item.noten} />
        <TableCell data={item.ronOrTsumoPoints} />
        <TableCell data={item.roundPoints} />
        <View
          style={{
            borderTopWidth: 3,
            borderColor: 'black',
            height: 3,
            width: '100%',
          }}
        />
        <TableCell data={'0'} />
      </View>
    );
  };
  const ColumnLegend = () => {
    return (
      <View
        style={{
          backgroundColor: 'purple',
          flexDirection: 'column',
          maxHeight: 274,
        }}>
        <TableCell data={'Round' + ' ' + (round + 1)} />
        <TableCell data={'Riichi bets lost'} />
        <TableCell data={'Riichi bets gained'} />
        <TableCell data={'Tenpai'} />
        <TableCell data={'Noten'} />
        <TableCell data={true ? 'RON' : 'TSUMO'} />
        <TableCell data={'Round Points'} />
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

  const CollumnArray = () => {
    return dataToRender.map((item, index) => (
      <View style={{flex: 1}}>
        <ColumnComponent
          item={item}
          index={index}
          key={item.player.toString()}
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
  console.log('TABLE COMPONENT:', dimensionsView.width, dimensionsView.height);
  return (
    <View
      style={{backgroundColor: boardColor, flex: 1}}
      onLayout={onLayoutView}>
      <StatusBar hidden={true} />
      <TableComponent>
        <ColumnLegend />
        <CollumnArray />
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
      {/* next Round button ;)  */}
    </View>
  );
};
const styles = StyleSheet.create({
  text: {color: 'black', fontFamily: 'TheLastShuriken', fontSize: 14},
});
