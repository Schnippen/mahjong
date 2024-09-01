import React from 'react';
import {View} from 'react-native';
import {tilesData} from '../Data/tilesData';

import {WinningHand} from '../Components/EndRoundScreenComponents/WinningHandComponent';
import {resetToNextRound} from '../Functions/resetToNextRound';
import {useAppDispatch} from '../Store/hooks';
import {Button} from '@rneui/themed';
import {captureScrenshot} from '../Functions/utils/captureScreenshot';
import ScoreContainer from '../Components/EndRoundScreenComponents/EndRoundScreenScoreContainer';
import EndRoundScreenDoras from '../Components/EndRoundScreenComponents/EndRoundScreenDoras';
import EndRoundScreenUraDoras from '../Components/EndRoundScreenComponents/EndRoundScreenUraDoras';
import {soundType} from '../Functions/playSounds/soundFunc';
import YakuList from '../Components/EndRoundScreenComponents/YakuList';
import ButtonContainers from '../Components/EndRoundScreenComponents/ButtonContainers';

//TODO love this
/* onLayout={(event) => {
  const {x, y, width, height} = event.nativeEvent.layout;
  console.log(x,y,width,height)
}} */

function EndRoundScreen({navigation}: {navigation: any}) {
  const topPanelBackgroundColor = '#3c7fc3';
  const panelBackgroundColor = 'rgba(22, 60, 85, 0.9)';
  const exampleData = tilesData.slice(12, 25);
  const exampleData2 = tilesData.slice(25, 26);
  //props, winning hand of a player, winning tile by tsumo or ron

  const dispatch = useAppDispatch();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'green',
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
