import {Button} from '@rneui/themed';
import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  BackHandler,
  Alert,
  StatusBar,
} from 'react-native';
import RiverBottom from '../Components/River/RiverBottom';
import {RiverRight} from '../Components/River/RiverRight';
import {RiverLeft} from '../Components/River/RiverLeft';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store/store';
import {initializeGame} from '../Functions/initializeGame';
import WallBottom from '../Components/Wall/WallBottom';
import WallRight from '../Components/Wall/WallRight';
import WallLeft from '../Components/Wall/WallLeft';
import RiverTop from '../Components/River/RiverTop';
import WallTop from '../Components/Wall/WallTop';
import PlayerPanel from '../Components/PlayerControls/PlayerPanel';
import SidePanel from '../Components/SidePanel/SidePanel';
import DoraPanel from '../Components/DoraPanel/DoraPanel';
import Compass from '../Components/Compass/Compass';
import StolenTilesPanelBottom from '../Components/StolenTiles/StolenTilesBottom/StolenTilesPanelBottom';
import StolenTilesPanelTop from '../Components/StolenTiles/StolenTilesTop/StolenTilesPanelTop';
import StolenTilesRight from '../Components/StolenTiles/StolenTilesRight/StolenTilesPanelRight';
import StolenTilesPanelLeft from '../Components/StolenTiles/StolenTilesLeft/StolenTilesPanelLeft';
import {boardColor} from '../Data/colors';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import {soundFunc} from '../Functions/playSounds/soundFunc';
import {
  handleImpactLight,
  handleImpactMedium,
} from '../Functions/utils/hapticFeedback';
import {resetToStartScreen} from '../Functions/resetToStartScreen';
import useBackHandler from '../Functions/utils/useBackHandlerHook';

//tiles
//winning conditions
//tile component
//wall component
//center compass component with
//handle tile discard - double tap, or drag???
//hand component
//handle turn?
//https://www.npmjs.com/package/react-native-orientation-locker

//SCREEN COMPOSITION
// bottom ROW - player hand
//player hand buttons timer tile to take ,

//PERSPECTIVe in richii city from bottom up
//padding to hand 5px
//player tile height 159px
//from top of tile to bottom of wall 27px
//wall height - two tiles 74px - one tile 58px
//from top of player hand to the bottom compass 344px
//compass dimensions bottom perimeter 323 px/ top perimeter 305px/ height all 208px

//Colors:
//In the River:
//Tile Front: e9ebe8
//tile shadow: bdbbc0
//tile back: 56a2c4
//In the Wall:
//tile Front: 98dffb"
//tile shadow: 44809a
//tile back: a39f9e
//
//number of tiles: 17*4
//types of styling
//-on hand NESW
//-on wall NESW
//-on sidetabke NESW
//-on River NESW
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
//console.log("Dimensions: ",screenWidth,"width x height:",screenHeight)

//TODO oficjalna skala z perspektywą???
function MahjongScreen({navigation, route}: any) {
  const dispatch = useDispatch();

  const playerBottomMainPlayerWind = useSelector(
    (state: RootState) => state.playersReducer.player1.wind,
  );
  const playerRightWind = useSelector(
    (state: RootState) => state.playersReducer.player2.wind,
  );
  const playerTopWind = useSelector(
    (state: RootState) => state.playersReducer.player3.wind,
  );
  const playerLeftWind = useSelector(
    (state: RootState) => state.playersReducer.player4.wind,
  );

  //console.log("mahjong currentDiscard:",currentDiscard.map(t=>t.name),)
  /* console.log(
    'DICE_ROLL:',
    DICE_ROLL,
     playerBottomMainPlayerWind,
    playerTopWind,
  )*/
  /* console.info("playerRight:",playerRightHand.length, playerRightHand.map(t=>t.name))
console.info("playerTop:",playerTopHand.length,playerTopHand.map(t=>t.name))
console.info("playerLeftHand:",playerLeftHand.length, playerLeftHand.map(t=>t.name)) */
  //Handle going to previuous Screen
  useBackHandler(navigation, dispatch);

  //TODO init game only once when navigation params change
  const hasInitializedGame = useRef(false);
  console.log('ROUTE:', route);
  useEffect(() => {
    //ROUTE: {"key": "MahjongScreen-3J4Py3oFunDa8eguFjvZK", "name": "MahjongScreen", "params": {"gameInitializer": "start"}, "path": undefined}
    if (
      !hasInitializedGame.current &&
      route.params?.gameInitializer === 'start'
    ) {
      hasInitializedGame.current = true;
      setTimeout(() => {
        //initializeGame(dispatch)
      }, 1000);
    }
    console.log(
      'USE EFFECT ROUTE:',
      route.params.gameInitializer,
      'hasInitializedGame?:',
      hasInitializedGame,
    );
  }, [route.params?.gameInitializer]);

  //Final verison only have view -> for flatlist performance
  return (
    <View style={{flex: 1}}>
      <StatusBar hidden={true} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          position: 'absolute',
          top: 0,
          zIndex: 99999,
        }}>
        <Button
          style={{flex: 1, backgroundColor: 'red'}}
          title="initialize"
          onPress={() => initializeGame(dispatch)}></Button>
        <Button
          style={{flex: 1}}
          title="RESET"
          onPress={() => resetToStartScreen(dispatch)}></Button>
      </View>

      {/* <Button title="nextTurn" onPress={() => nextTurn()}></Button> */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          //height: screenHeight,
          //width: screenWidth,
          backgroundColor: boardColor,
          position: 'relative',
        }}>
        {/* <MenuPanel navigation={navigation} /> */}
        <DoraPanel />
        <SidePanel />
        <View
          style={{
            marginTop: -75,
            transform: [{rotateX: '45deg'}, {rotateZ: '0deg'}, {scale: 1}],
          }}>
          <View
            style={{
              alignItems: 'center',
              //backgroundColor: 'blue',
              justifyContent: 'center',
              width: 540,
              height: 560,
              position: 'relative',
              transform: [{rotateX: '0deg'}, {rotateZ: '0deg'}, {scale: 0.36}],
            }}>
            <Compass />
            <View
              style={{
                position: 'absolute',
                left: 0,
                bottom: 460,
                width: 600,
                alignItems: 'center',
                transform: [{rotateZ: '180deg'}],
              }}>
              <RiverTop />
              <View
                style={{
                  //backgroundColor: 'blue',
                  position: 'absolute',
                  top: 280,
                }}>
                <WallTop wallWind={playerTopWind} />
                <View
                  style={{
                    position: 'absolute',
                    top: 54,
                    left: 40,
                    width: 800,
                    backgroundColor: 'transparent',
                  }}>
                  <StolenTilesPanelTop />
                </View>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                right: 460,
                top: 50,
                height: 460, //previous 460 //TODO change it, make it wider?
                width: 250,
                justifyContent: 'center',
                //backgroundColor: 'orange',
                alignItems: 'center',
              }}>
              <RiverLeft />
              <View
                style={{
                  //backgroundColor: 'blue',
                  transform: [{rotateZ: '90deg'}],
                  alignItems: 'flex-start',
                  position: 'absolute',
                  right: 0,
                }}>
                <WallLeft wallWind={playerLeftWind} />
                <View
                  style={{
                    position: 'absolute',
                    width: 800,
                    top: 54,
                    left: 40,
                    backgroundColor: 'transparent',
                  }}>
                  <StolenTilesPanelLeft />
                </View>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                left: 460,
                bottom: 50,
                height: 460,
                width: 250,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <RiverRight />
              <View
                style={{
                  //backgroundColor: 'blue',
                  transform: [{rotateZ: '270deg'}],
                  position: 'absolute',
                  left: 0,
                }}>
                <WallRight wallWind={playerRightWind} />
                <View
                  style={{
                    position: 'absolute',
                    top: 54,
                    left: 40,
                    width: 800,
                    backgroundColor: 'transparent',
                  }}>
                  <StolenTilesRight />
                </View>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                left: -15,
                top: 460,
                width: 600,
                alignItems: 'center',
                marginBottom: 5,
                backgroundColor: 'transparent',
              }}>
              <RiverBottom />
              <View
                style={{
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  top: 280,
                  /* alignItems: 'flex-start', */
                }}>
                <WallBottom wallWind={playerBottomMainPlayerWind} />
                <View
                  style={{
                    position: 'absolute',
                    top: 54,
                    left: 0,
                    width: 920, //TODO changed width from 800 to 920
                    height: 120,
                    backgroundColor: 'transparent',
                  }}>
                  <StolenTilesPanelBottom />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{position: 'absolute', bottom: 0}}>
          <PlayerPanel navigation={navigation} />
        </View>
      </View>
    </View>
  );
}
export default MahjongScreen;
//https://github.com/software-mansion/react-native-reanimated/issues/2750

//Normally, the game ends after the dealer loses in South 4 (for hanchans) or East 4 (tonpussen).
//https://riichi.wiki/End_game_scenarios
