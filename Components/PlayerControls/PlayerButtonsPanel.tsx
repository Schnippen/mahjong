import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '../../Store/store';
import { CHECK_FOR_KAN, CHECK_FOR_PON, CHECK_IF_CHII_IS_ON_LEFT_SIDE, INTERRUPT_TURN } from "../../Store/gameReducer";
import { checkForSequence } from "../../Functions/checkForSequence";
import { checkForTriplet } from "../../Functions/checkForTriplet";
import { Button } from "@rneui/themed";
import { TTileObject } from "../../Types/types";
import { discardTile } from "../../Functions/discardTileFunction";
import { ButtonCHII, ButtonKAN, ButtonPASS, ButtonPON } from "../Buttons/ButtonSteal/ButtonSteal";
import { checkForQuadruplet } from "../../Functions/checkForQuadruplet";
import { stealSequence } from "../../Functions/stealSequence";


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

const PlayerButtonsPanel=()=>{
    const dispatch = useDispatch();

  const yourWind = useSelector(
    (state: RootState) => state.playersReducer.player1.player1Wind,
  );
  const latestTurn = useSelector(
    (state: RootState) => state.gameReducer.latestPlayerTurn
  );
  const currentTurn = useSelector(
    (state: RootState) => state.gameReducer.currentTurn
  )
  const handData = useSelector(
    (state: RootState) => state.handReducer.player1Hand,
  );
  const currentDiscard = useSelector(
    (state: RootState) => state.riverReducer.currentDiscard,
  );

  //states for caltulation of CHII PON KAN
  const isSequencePossible = useSelector(
    (state: RootState) => state.gameReducer.player1Actions.CHII
  );
  const isTripletPossible = useSelector(
    (state: RootState) => state.gameReducer.player1Actions.PON
  );
  const isQuadrupletPossible = useSelector(
    (state: RootState) => state.gameReducer.player1Actions.KAN
  );



  const showHand = handData.map(({ value, type, name, tileID }) => ({ value, type, name, tileID }));
  //console.log("showHand:",showHand);

  const [displayChiiButton,setDisplayChiiButton]=useState<boolean>(false)
  const [displayPonButton,setDisplayPonButton]=useState<boolean>(false)
  const [displayKanButton,setDisplayKanButton]=useState<boolean>(false)

  const [chiiPanelDisplayed,setChiiPanelDisplayed]=useState<boolean>(false)

  const passStealingTiles=(dispatch:any)=>{
    setDisplayChiiButton(false)
    setDisplayPonButton(false)
    setDisplayPonButton(false)
    dispatch(INTERRUPT_TURN())
    console.log("SHIT")
  }

  const handleStealSequence=( handData: TTileObject[], currentDiscard: TTileObject[],dispatch:any)=>{
    const { result, possibleSequences } = stealSequence(handData, currentDiscard);

    if (result && possibleSequences.length === 1) {
        console.log("handleStealSequence", possibleSequences.map(i => i.map(t => t.name)));
        // dispatch()
        return null;
    }
    if(result&&possibleSequences.length>1){
      console.log("handleStealSequence", possibleSequences.map(i => i.map(t => t.name)));
      setChiiPanelDisplayed(true)
    }
    return null;
  }
  const ChooseSequencePanel=()=>{
    return(
      <View style={{height:200,width:250,backgroundColor:"gray"}}>

      </View>
    )
  }

 useEffect(() => {
  dispatch(CHECK_IF_CHII_IS_ON_LEFT_SIDE({playersWind:yourWind,playerNumber:"player1"}))
  dispatch(CHECK_FOR_PON({playersWind:yourWind,playerNumber:"player1"}))
  dispatch(CHECK_FOR_KAN({playersWind:yourWind,playerNumber:"player1"}))
}, [latestTurn]);

  useEffect(()=>{
    //console.log("useEFFECT")
    if(isSequencePossible){//player on your left discarded tile 
        console.log("isSequencePossible", "RUNNING")
        //console.log(currentDiscard)
      let val = checkForSequence(handData,currentDiscard) //this only allows button to be displayed
      val?setDisplayChiiButton(true):setDisplayChiiButton(false)
      val?dispatch(INTERRUPT_TURN()):null
      console.log("BUTTONS-PANEL-PON:",val)
    }
  },[isSequencePossible])

  useEffect(()=>{
    if(isTripletPossible){   
        console.log("isTripletPossible", "RUNNING")
        let val = checkForTriplet(handData,currentDiscard)
        val?setDisplayPonButton(true):setDisplayPonButton(false)
        val?dispatch(INTERRUPT_TURN()):null
        console.log("BUTTONS-PANEL-PON:",val)
      }
  },[isTripletPossible])

  useEffect(()=>{
    if(isQuadrupletPossible){     
        let val = checkForQuadruplet(handData,currentDiscard)
        val?setDisplayKanButton(true):setDisplayKanButton(false)
        val?dispatch(INTERRUPT_TURN()):null
        console.log("BUTTONS-PANEL-PON:",val)
      }
  },[isQuadrupletPossible])


//chii first check left
//if left than calculate if show button
//if show button, than execute or dismiss

//pon any wind besides players, 
//if wind than calculte if show button
//if show button, than execute or dismiss

  //console.log("playerPanel STEALING_POSSIBLE by wind:","chii:",isSequencePossible,"pon:",isTripletPossible,"kan:",isQuadrupletPossible)
  //console.log("DISPLAY:","CHII:",displayChiiButton,"PON:",displayPonButton,"KAN:",displayKanButton)
  //console.log(yourWind!==latestTurn)
    return(
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
        {displayKanButton?<ButtonKAN/>:null}
        {displayPonButton?<ButtonPON/>:null}
        {displayChiiButton?<ButtonCHII  handlePress={() =>handleStealSequence(handData,currentDiscard,dispatch)} />:null}
        {( displayChiiButton||displayPonButton||displayKanButton)?<ButtonPASS handlePress={() => passStealingTiles(dispatch)} />:null}
      <NextTurn />
    </View>)
  }
//&&( displayChiiButton||displayPonButton||displayKanButton)
  export default PlayerButtonsPanel //WHEN TURN IS INTERRUPTED  discardTile("player1", tile,dispatch) DOES NOT WORK!!!