import React, {useEffect} from 'react';
import {Alert, BackHandler, View} from 'react-native';
import {tilesData} from '../Data/tilesData';

import {WinningHand} from '../Components/EndRoundScreenComponents/WinningHandComponent';
import {useAppDispatch} from '../Store/hooks';
import ScoreContainer from '../Components/EndRoundScreenComponents/EndRoundScreenScoreContainer';
import EndRoundScreenDoras from '../Components/EndRoundScreenComponents/EndRoundScreenDoras';
import EndRoundScreenUraDoras from '../Components/EndRoundScreenComponents/EndRoundScreenUraDoras';
import YakuList from '../Components/EndRoundScreenComponents/YakuList';
import ButtonContainers from '../Components/EndRoundScreenComponents/ButtonContainers';
import {boardColor} from '../Data/colors';
import useBackHandler from '../Functions/utils/useBackHandlerHook';

//love this
/* onLayout={(event) => {
  const {x, y, width, height} = event.nativeEvent.layout;
  console.log(x,y,width,height)
}} */

function EndRoundScreen({navigation}: {navigation: any}) {
  const dispatch = useAppDispatch();

  useBackHandler(navigation, dispatch);

  const topPanelBackgroundColor = '#3c7fc3';
  const panelBackgroundColor = 'rgba(22, 60, 85, 0.9)';
  const exampleData = tilesData.slice(12, 25);
  const exampleData2 = tilesData.slice(25, 26);
  //props, winning hand of a player, winning tile by tsumo or ron

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: boardColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: panelBackgroundColor,
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'flex-start',
            //paddingTop: 2,
          }}>
          <EndRoundScreenDoras />
          <EndRoundScreenUraDoras />
        </View>
        <WinningHand />
        <YakuList />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            backgroundColor: 'transparent',
          }}>
          <ScoreContainer />
          <ButtonContainers dispatch={dispatch} navigation={navigation} />
        </View>
      </View>
    </View>
  );
}
//later show global scores??? maybe add table like in mahjongsoft
//add stars 1st, 2nd etc
export default EndRoundScreen;
