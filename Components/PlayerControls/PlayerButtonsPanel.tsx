import React, { useEffect, useState } from "react";
import {TouchableWithoutFeedback, View } from "react-native";
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
import { FlashList } from "@shopify/flash-list";
import { tilesData } from "../../Data/tilesData";
import PlayerTileOnHand from "./PlayerTileOnHand";
import EmptyComponent from "../Wall/EmptyComponent";
import { Text } from "@rneui/themed";
import { discardTileFromHand, setStolenTilesOnBoard } from "../../Store/handReducer";
import { popFromTheRiver } from "../../Store/riverReducer";


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

  const exampleChii1=tilesData.slice(10,12)
  const exampleChii2=tilesData.slice(13,15)
  const examplePossibleChiis=[exampleChii1,exampleChii2]
  const showHand = handData.map(({ value, type, name, tileID }) => ({ value, type, name, tileID }));
  //console.log("showHand:",showHand);

  const [displayChiiButton,setDisplayChiiButton]=useState<boolean>(false)
  const [displayPonButton,setDisplayPonButton]=useState<boolean>(false)
  const [displayKanButton,setDisplayKanButton]=useState<boolean>(false)
  const [chiiPanelDisplayed,setChiiPanelDisplayed]=useState<boolean>(false)

  const handlePassStealingTiles=(dispatch:any)=>{
    setDisplayChiiButton(false)
    setDisplayPonButton(false)
    setDisplayKanButton(false)
    dispatch(INTERRUPT_TURN())
    console.log("SHIT")
  }

  const stopDisplayingStealingButtonsIfPanelChiiIsPresent=()=>{
    setDisplayChiiButton(false)
    setDisplayPonButton(false)
    setDisplayKanButton(false)
  }


  const addSequenceToHand=(possibleSequences:TTileObject[][],dispatch:any,currentDiscard:TTileObject[])=>{
    let flattenedSequence = possibleSequences.flat()
    let currentDiscardedTile = currentDiscard[0]
    let tilesOnHandWithoutDiscardedTile=flattenedSequence.filter(t=>t.tileID!==currentDiscardedTile.tileID)
    let tilesThatWillBeDisplayedAsStolen=flattenedSequence
    tilesOnHandWithoutDiscardedTile.forEach(tile => {
      dispatch(discardTileFromHand({player:"player1",tile:tile}))
    });
    
    dispatch(setStolenTilesOnBoard({player:"player1",tilesArray:tilesThatWillBeDisplayedAsStolen,name:"left",isOpen:true}))
    dispatch(popFromTheRiver({player:"player4"}))//TODO this is so, because of chii
    stopDisplayingStealingButtonsIfPanelChiiIsPresent()
  }

  const handleStealSequence=( handData: TTileObject[], currentDiscard: TTileObject[],dispatch:any)=>{
    const { result, possibleSequences } = stealSequence(handData, currentDiscard);
    if (result && possibleSequences.length === 1) {
        console.log("handleStealSequence", possibleSequences.map(i => i.map(t => t.name)));   
        addSequenceToHand(possibleSequences,dispatch,currentDiscard)
        return null;
    }
    if(result&&possibleSequences.length>1){
      console.log("handleStealSequence", possibleSequences.map(i => i.map(t => t.name)));
      setChiiPanelDisplayed(true)
      stopDisplayingStealingButtonsIfPanelChiiIsPresent()
    }
    return null;
  }

  const handleStealSelectedSequence=(index:number)=>{
    console.log("handleStealSelectedSequence")
    const { result, possibleSequences } = stealSequence(handData, currentDiscard);
    let choosenSequence = [possibleSequences[index]]
    addSequenceToHand(choosenSequence,dispatch,currentDiscard)
  }

  const handleDisablePanelButton=()=>{
    setChiiPanelDisplayed(false)
    //TODO add RON and TSUMO 
    let {result}= checkForSequence(handData,currentDiscard) 
    let val2 = checkForTriplet(handData,currentDiscard)
    let val3= checkForQuadruplet(handData,currentDiscard)
    result?setDisplayChiiButton(true):setDisplayChiiButton(false);
    val2?setDisplayPonButton(true):setDisplayPonButton(false);
    val3?setDisplayKanButton(true):setDisplayKanButton(false);
    (result||val2||val3)?dispatch(INTERRUPT_TURN()):null
  }

  const ChooseSequencePanel=()=>{

    const topPanelBackgroundColor="#3c7fc3"
    const panelBackgroundColor="rgba(22, 60, 85, 0.9)"

    const DisablePanelButton=()=>{
      return(
        <TouchableWithoutFeedback onPress={()=>handleDisablePanelButton()}>
        <View style={{height:40,width:40,backgroundColor:"rgba(243, 251, 254, 0.3)",position:"absolute",right:-10,bottom:-5,alignItems:"center",borderRadius:25,justifyContent:"center"}}>
          <View style={{height:35,width:35,borderRadius:25,justifyContent:"center",alignItems:"center",backgroundColor:"#f3fbfe"}}>
          <Text>{"<"}</Text>
          </View>
        </View>
        </TouchableWithoutFeedback>
      )
    }

  const renderItem=(item:TTileObject[],index:number)=>{
    console.log("renderItem:",item.map(i=>i.name),index)
    let data=item
    
    const SequenceToChoose=(item:TTileObject,index:number)=>{return(
    <View style={{height:80,backgroundColor:"transparent",justifyContent:"center",}}>
    <PlayerTileOnHand svg={item.image} tileRatioProp={1} />
    </View>
    )}

    return(
      <TouchableWithoutFeedback onPress={()=>{console.log(`selected ${index+1} option`),handleStealSelectedSequence(index)}}>
      <View style={{height:80,width:120,backgroundColor:"transparent",alignItems:"center"}}>
        <FlashList 
            data={data} //array with posible sequences
            renderItem={({ item,index }:{item:TTileObject,index:number}) => SequenceToChoose(item,index)}
            estimatedItemSize={2}
            horizontal={true}
            ListEmptyComponent={<EmptyComponent/>}
            scrollEnabled={false}
            />
    </View>
    </TouchableWithoutFeedback>
    )
  }
    //TODO maybe change the top and position absolute
    return(
      <View style={{minWidth:560,maxWidth:600,backgroundColor:"transparent",height:100,position:"absolute",bottom:40,alignItems:"center"}}>
          <View style={{width:240,height:100,backgroundColor:panelBackgroundColor,borderRadius:12}}>
            <View style={{height:20,width:240,alignItems:"center",backgroundColor:topPanelBackgroundColor,borderTopLeftRadius:12,borderTopRightRadius:12,position:"relative"}}>
            <Text style={{}}>Select</Text>
            <DisablePanelButton/>
            </View>
            <FlashList 
            data={examplePossibleChiis} //array with posible sequences
            renderItem={({ item,index }:{item:TTileObject[],index:number}) => renderItem(item,index)}
            estimatedItemSize={2}
            horizontal={true}
            ListEmptyComponent={<EmptyComponent/>}
            scrollEnabled={false}
            />
        </View>
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
      let {result} = checkForSequence(handData,currentDiscard) //this only allows button to be displayed
      result?setDisplayChiiButton(true):setDisplayChiiButton(false) 
      result?dispatch(INTERRUPT_TURN()):null//IMPORTANT
      console.log("BUTTONS-PANEL-SEQUENCE:",result, result?true:false)
    }
  },[isSequencePossible]) 

  useEffect(()=>{
    if(isTripletPossible){   
        console.log("isTripletPossible", "RUNNING")
        let val = checkForTriplet(handData,currentDiscard)
        val?setDisplayPonButton(true):setDisplayPonButton(false)
        val?dispatch(INTERRUPT_TURN()):null
        console.log("BUTTONS-PANEL-PON:",val,val?true:false)
      }
  },[isTripletPossible])

  useEffect(()=>{
    if(isQuadrupletPossible){     
        let val = checkForQuadruplet(handData,currentDiscard)
        val?setDisplayKanButton(true):setDisplayKanButton(false)
        val?dispatch(INTERRUPT_TURN()):null
        console.log("BUTTONS-PANEL-KAN:",val,val?true:false)
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
        zIndex: 1,
        justifyContent:"center"
      }}>
       {/*  <ChooseSequencePanel/> */}
      {chiiPanelDisplayed?<ChooseSequencePanel/>:null}
      <View style={{minWidth:560,maxWidth:600,backgroundColor:"transparent",height:40,position:"absolute",bottom:0,flexDirection:"row",justifyContent:"flex-end",alignItems:"center",columnGap:8}}>
        {displayKanButton?<ButtonKAN/>:null}
        {displayPonButton?<ButtonPON/>:null}
        {displayChiiButton?<ButtonCHII  handlePress={() =>handleStealSequence(handData,currentDiscard,dispatch)} />:null}
        {( displayChiiButton||displayPonButton||displayKanButton)?<ButtonPASS handlePress={() => handlePassStealingTiles(dispatch)} />:null}
      <NextTurn />
      </View>
    </View>)
  }

  export default PlayerButtonsPanel //WHEN TURN IS INTERRUPTED  discardTile