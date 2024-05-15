import {Button, Image, Overlay, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {ScrollView, View, Dimensions, FlatList, Settings} from 'react-native';
import {mahjongTilesSVGsArray} from '../Assets/MahjongTiles/MahjongTiles';
import LinearGradient from 'react-native-linear-gradient';
import ButtonSettings from '../Components/Buttons/ButtonSettings';
import ButtonQuestionmark from '../Components/Buttons/ButtonQuestionmark';
import SettingsOverlay from '../Components/SettingsOverlay';
import RiverBottom from '../Components/River/RiverBottom';
import {RiverRight} from '../Components/River/RiverRight';
import {RiverLeft} from '../Components/River/RiverLeft';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store/store';
import {initialGame} from '../Functions/initializeGame';
import WallBottom from '../Components/Wall/WallBottom';
import WallRight from '../Components/Wall/WallRight';
import WallLeft from '../Components/Wall/WallLeft';
import RiverTop from '../Components/River/RiverTop';
import WallTop from '../Components/Wall/WallTop';
import PlayerPanel from '../Components/PlayerControls/PlayerPanel';
import SidePanel from '../Components/SidePanel/SidePanel';
import DoraPanel from '../Components/DoraPanel/DoraPanel';
import Compass from '../Components/Compass/Compass';
import determineTurnOrder from '../Functions/determineTurnOrder';
import {END_TURN} from '../Store/gameReducer';
import StolenTilesPanel from '../Components/StolenTiles/StolenTilesBottom/StolenTilesPanelBottom';
import StolenTilesPanelBottom from '../Components/StolenTiles/StolenTilesBottom/StolenTilesPanelBottom';
import StolenTilesPanelTop from '../Components/StolenTiles/StolenTilesTop/StolenTilesPanelTop';
import StolenTilesRight from '../Components/StolenTiles/StolenTilesRight/StolenTilesPanelRight';
import StolenTilesPanelLeft from '../Components/StolenTiles/StolenTilesLeft/StolenTilesPanelLeft';
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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleOverlay = () => {
    setIsVisible(!isVisible);
  };
  const MenuPanel = ({navigation}: {navigation: any}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'pink',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: 0,
        }}>
        <ButtonQuestionmark text="Q" />
        <ButtonSettings navigation={navigation} toggleOverlay={toggleOverlay} />
      </View>
    );
  };
  const dispatch = useDispatch();
  const tilesAfterHandout = useSelector(
    (state: RootState) => state.wallReducer.tilesAfterHandout,
  );
  const MainPlayerCurrentHand = useSelector(
    (state: RootState) => state.handReducer.player1Hand,
  );
  console.log(
    'tilesAfterHandout:',
    tilesAfterHandout.length,
    'MainPlayerCurrentHand:',
    MainPlayerCurrentHand.length,
  );
  //winds of players
  const playerBottomMainPlayerWind = useSelector(
    (state: RootState) => state.playersReducer.player1.player1Wind,
  );
  const playerRightWind = useSelector(
    (state: RootState) => state.playersReducer.player2.player2Wind,
  );
  const playerTopWind = useSelector(
    (state: RootState) => state.playersReducer.player3.player3Wind,
  );
  const playerLeftWind = useSelector(
    (state: RootState) => state.playersReducer.player4.player4Wind,
  );
  const firstHand = useSelector(
    (state: RootState) => state.handReducer.firstHand,
  );
  const player1Hand = useSelector(
    (state: RootState) => state.handReducer.player1Hand,
  );
  const DICE_ROLL = useSelector(
    (state: RootState) => state.wallReducer.currentDiceRoll,
  );
  const currentDiscard = useSelector(
    (state: RootState) => state.riverReducer.currentDiscard,
  );
  const startTakingFromWallXState = useSelector(
    (state: RootState) => state.wallReducer.startTakingFromWallXState,
  );
  const playerRightHand = useSelector(
    (state: RootState) => state.handReducer.player2Hand,
  );
  const playerTopHand = useSelector(
    (state: RootState) => state.handReducer.player3Hand,
  );
  const playerLeftHand = useSelector(
    (state: RootState) => state.handReducer.player4Hand,
  );
  console.log("mahjong currentDiscard:",currentDiscard.map(t=>t.name),"startWallX:",startTakingFromWallXState)
  console.log(
    'DICE_ROLL:',
    DICE_ROLL,
    /*  playerBottomMainPlayerWind,
    playerTopWind, */
  );
console.info("playerRight:",playerRightHand.length, playerRightHand.map(t=>t.name))
console.info("playerTop:",playerTopHand.length,playerTopHand.map(t=>t.name))
console.info("playerLeftHand:",playerLeftHand.length, playerLeftHand.map(t=>t.name))
  /* console.log(
    'firstHand:',
    firstHand.length,
    'player1Hand:',
    player1Hand.length,
  ); */
  //Wall wind, perspective based,
  const nextTurn = () => {
    dispatch(END_TURN());
  };
  return (
    <ScrollView>
      <Button title="initialize" onPress={() => initialGame(dispatch)}></Button>

      <Button title="nextTurn" onPress={() => nextTurn()}></Button>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          //height: screenHeight,
          //width: screenWidth,
          backgroundColor: 'green',
          position: 'relative',
        }}>
        {/* <MenuPanel navigation={navigation} /> */}
        {/* <DoraPanel /> */}
        <SidePanel />
        <View
          style={{
            marginTop: -75,
            backgroundColor: 'orange',
            transform: [{rotateX: '45deg'}, {rotateZ: '0deg'}, {scale: 1}],
          }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'blue',
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
                  backgroundColor: 'blue',
                  position: 'absolute',
                  top: 280,
                }}>
                <WallTop wallWind={playerTopWind} />
                <View style={{position:"absolute",top:54,left:40,width:800,backgroundColor:"blue"}}>
                <StolenTilesPanelTop/>
                </View>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                right: 460,
                top: 50,
                height: 460,
                width: 250,
                justifyContent: 'center',
                backgroundColor: 'orange',
                alignItems: 'center',
              }}>
              <RiverLeft />
              <View
                style={{
                  backgroundColor: 'blue',
                  transform: [{rotateZ: '90deg'}],
                  alignItems: 'flex-start',
                  position: 'absolute',
                  right: 0,
                }}>
                <WallLeft wallWind={playerLeftWind} />
                <View style={{position:"absolute",width:800,top:54,left:40,backgroundColor:"blue"}}>
                <StolenTilesPanelLeft/>
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
                backgroundColor: 'pink',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <RiverRight />
              <View
                style={{
                  backgroundColor: 'blue',
                  transform: [{rotateZ: '270deg'}],
                  position: 'absolute',
                  left: 0,
                }}>
                <WallRight wallWind={playerRightWind} />
                <View style={{position:"absolute",top:54,left:40,width:800,backgroundColor:"blue"}}>
                <StolenTilesRight/>
                </View>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 460,
                width: 600,
                alignItems: 'center',
                marginBottom: 5,
                backgroundColor:"pink"
              }}>
              <RiverBottom />
              <View
                style={{
                  backgroundColor: 'blue',
                  position: 'absolute',
                  top: 280,
                  /* alignItems: 'flex-start', */
                }}>
                <WallBottom wallWind={playerBottomMainPlayerWind} />
                <View style={{position:"absolute",top:54,left:220}}>
                <StolenTilesPanel/>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{position: 'absolute', bottom: 0}}>
          {/* <PlayerPanel /> */}
        </View>
      </View>
    </ScrollView>
  );
} //TODO change the left and right tiles in compass with correct width and height
export default MahjongScreen;
//https://github.com/software-mansion/react-native-reanimated/issues/2750
