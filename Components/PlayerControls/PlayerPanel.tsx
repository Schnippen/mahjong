import React, { useEffect, useState } from 'react';
import {Dimensions, View} from 'react-native';
import {ButtonAI, ButtonCHII, ButtonPASS} from '../Buttons/ButtonSteal/ButtonSteal';
import PlayersHandComponent from './PlayerHand';
import {TTileObject} from '../../Types/types';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '../../Store/store';
import { Button } from '@rneui/themed';
import { discardTile } from '../../Functions/discardTileFunction';
import { Dispatch, UnknownAction } from 'redux';
import { playerToYourLeftWind } from '../../Functions/checkPlayersToYourLeftWind';
import { CHECK_FOR_CHII } from '../../Store/gameReducer';
import { checkForSequence } from '../../Functions/checkForSequence';


const chooseRandomTile=(hand:TTileObject[])=>{
  let max = hand.length-1
  let dropLastTile = max
  let dropRandomTile= Math.floor(Math.random()*max)
  let sixtyPercentChance= Math.floor(Math.random()*11)<=6
  let result = sixtyPercentChance?dropLastTile:dropRandomTile
  let tileToDiscard = hand[result]
  //console.log("tileToDiscard:",max, dropLastTile, result, tileToDiscard?.name )
  return tileToDiscard
}
const NextTurn = () => {
  const gameTurn = useSelector(
    (state: RootState) => state.gameReducer.currentTurn,
  );
  const dispatch = useDispatch();

  const humanPlayerHand = useSelector(
    (state: RootState) => state.handReducer.player1Hand,
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

  const humanPlayerWind = useSelector(
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

  const AITurn = (gameTurn: string, humanPlayerWind: string, playerProps: {
    player: string;
    hand: TTileObject[];
  } | null) => {
    if (!playerProps || gameTurn === humanPlayerWind) {
      return;
    }

    let tileToDiscard = chooseRandomTile(playerProps.hand);
    let playerX = playerProps?.player;
    console.log("AITURN", playerProps?.player, tileToDiscard?.name);
    discardTile(playerX, tileToDiscard,dispatch)
  };

  const playerProps =
    gameTurn === playerRightWind
      ? { player: "player2", hand: playerRightHand }
      : gameTurn === playerTopWind
      ? { player: "player3", hand: playerTopHand }
      : gameTurn === playerLeftWind
      ? { player: "player4", hand: playerLeftHand }
      : null;

  if (playerProps === null) return null;

  return (
    <Button
      title={"AITURN"}
      onPress={() => AITurn(gameTurn, humanPlayerWind, playerProps)}
    />
  );
};

const PlayerPanel = () => {
  const screenWidth = Dimensions.get('window').width;
  const dispatch = useDispatch();

  const yourWind = useSelector(
    (state: RootState) => state.playersReducer.player1.player1Wind,
  );
  const sequenceChecking = useSelector(
    (state: RootState) => state.gameReducer.player1Actions.CHII
  );
  const latestTurn = useSelector(
    (state: RootState) => state.gameReducer.latestPlayerTurn
  );
  const handData = useSelector(
    (state: RootState) => state.handReducer.player1Hand,
  );
  const currentDiscard = useSelector(
    (state: RootState) => state.riverReducer.currentDiscard,
  );
  let [counter,setcounter]=useState(0)
  // Update left player's wind whenever the latest player turn changes
 useEffect(() => {
  dispatch(CHECK_FOR_CHII({playersWind:yourWind,playerNumber:"player1"}))
    }, [latestTurn]);

  useEffect(()=>{
    setcounter(counter=>counter+1)

    if(sequenceChecking){
      console.log("")
      checkForSequence(handData,currentDiscard)
    }
/*     if(PON){
      return  checkForPON
    } */
  },[sequenceChecking])
  console.log("playerPanel STEALING_POSSIBLE",sequenceChecking)

  return (
    <View
      style={{
        height: 70,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'pink',
        position: 'relative',
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 8,
          justifyContent: 'flex-end',
          //backgroundColor: 'brown',
          position: 'absolute',
          top: -50,
          right: 25,
          zIndex: 1,
        }}>
        {/*     <ButtonCHII />
        <ButtonPASS /> */}
        <NextTurn />
      </View>
      <PlayersHandComponent />
    </View>
  );
};
export default PlayerPanel;
