import {TouchableWithoutFeedback, View} from 'react-native';
import {TTileObject, TplayerString, WindTypes} from '../../../Types/types';
import EmptyComponent from '../../Wall/EmptyComponent';
import React from 'react';
import {Text} from '@rneui/themed';
import PlayerTileOnHand from '../PlayerTileOnHand';
import {FlashList} from '@shopify/flash-list';
import { handleDisablePanelButton } from './handleDisablePanelButton';
import { DisablePanelButton } from './DisablePanelButton';
import { discardTileFromHand } from '../../../Store/playersReducer';
import { handleStealSelectedSequence } from './handleStealSelectedSequence';
import { SequenceToChoose } from './SequenceToChoose';

//TODO move to types.ts typescript dispatch
export type DisablePanelButtonParams ={
  setChiiPanelDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayChiiButton:React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayPonButton:React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayKanButton:React.Dispatch<React.SetStateAction<boolean>>,
  
}
  
  type ChiiPanelStateParams = {
    chiiPanelState: TTileObject[][]; 
  };
  type ChooseSequencePanelDispatch={
    dispatch:any
    setChiiPanelState:React.Dispatch<React.SetStateAction<TTileObject[][]>>
    playerWind:WindTypes
    playerWhoLeftTheTile:TplayerString
  }
   type CombinedPanelParams = DisablePanelButtonParams & ChiiPanelStateParams&ChooseSequencePanelDispatch;


//TODO typescript dispatch
type renderItemTypes={item: TTileObject[], index: number, setChiiPanelDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayChiiButton:React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayPonButton:React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayKanButton:React.Dispatch<React.SetStateAction<boolean>>,dispatch:any,
  setChiiPanelState:React.Dispatch<React.SetStateAction<TTileObject[][]>>,
  playerWind:WindTypes,
  playerWhoLeftTheTile:TplayerString}

const chiiPanelState:[] =[]

const renderItem = ({item,index,setChiiPanelDisplayed,setDisplayChiiButton,setDisplayPonButton,setDisplayKanButton,dispatch,setChiiPanelState,playerWind,playerWhoLeftTheTile}:renderItemTypes) => {
  console.log(
    'renderItem:',
    item.map(i => i.name),
    index,
  );
  let data = item;
  return (
    <TouchableWithoutFeedback
    onPress={() => {
      console.log(`selected ${index + 1} option`);
      handleStealSelectedSequence({
        selectedSequence: item,
        index,
        setChiiPanelDisplayed,
        setDisplayChiiButton,
        setDisplayPonButton,
        setDisplayKanButton,
        dispatch,
        setChiiPanelState, 
        playerWhoLeftTheTile, 
        playerWind,
      });
    }}
  >
      <View
        style={{
          height: 80,
          width: 120,
          backgroundColor: 'transparent',
          alignItems: 'center',
        }}>
        <FlashList
          data={data} //array with posible sequences
          renderItem={({item, index}: {item: TTileObject; index: number}) =>
            SequenceToChoose(item, index)
          }
          estimatedItemSize={2}
          horizontal={true}
          ListEmptyComponent={<EmptyComponent />}
          scrollEnabled={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};


const ChooseSequencePanel = ({setChiiPanelDisplayed,setDisplayChiiButton,setDisplayPonButton,setDisplayKanButton,chiiPanelState,dispatch,setChiiPanelState,playerWind,playerWhoLeftTheTile}:CombinedPanelParams) => {
  const topPanelBackgroundColor = '#3c7fc3';
  const panelBackgroundColor = 'rgba(22, 60, 85, 0.9)';

  return (
    <View
      style={{
        minWidth: 560,
        maxWidth: 600,
        backgroundColor: 'transparent',
        height: 100,
        position: 'absolute',
        bottom: 40,
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 240,
          height: 100,
          backgroundColor: panelBackgroundColor,
          borderRadius: 12,
        }}>
        <View
          style={{
            height: 20,
            width: 240,
            alignItems: 'center',
            backgroundColor: topPanelBackgroundColor,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            position: 'relative',
          }}>
          <Text style={{}}>Select</Text>
          <DisablePanelButton setChiiPanelDisplayed={setChiiPanelDisplayed} setDisplayChiiButton={setDisplayChiiButton} setDisplayPonButton={setDisplayPonButton} setDisplayKanButton={setDisplayKanButton} />
        </View>
        <FlashList
          data={chiiPanelState} //array with posible sequences
          renderItem={({item, index}: {item: TTileObject[]; index: number}) =>
            renderItem({item, index,setChiiPanelDisplayed,setDisplayChiiButton,setDisplayPonButton,setDisplayKanButton,dispatch,setChiiPanelState,playerWind,playerWhoLeftTheTile})
          }
          estimatedItemSize={2}
          horizontal={true}
          ListEmptyComponent={<EmptyComponent />}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};
export default ChooseSequencePanel;