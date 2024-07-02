import React from 'react';
import { FlatList, StyleSheet, Text, View} from 'react-native';
import {tilesData} from '../Data/tilesData';
import EmptyComponent from '../Components/Wall/EmptyComponent';
import { YakuType} from '../Types/types';
import { EndRoundScreenCurentDorasList } from '../Components/EndRoundScreenComponents/EndRoundScreenCurentDorasList';
import { EndRoundScreenCurentUraDorasList } from '../Components/EndRoundScreenComponents/EndRoundScreenCurentUraDorasList';
import { ButtonTakeScreenshot } from '../Components/EndRoundScreenComponents/ButtonTakeScreenshot';
import { YakuRow } from '../Components/EndRoundScreenComponents/YakuRow';
import { RootState } from '../Store/store';
import { useAppSelector } from '../Store/hooks';
import { WinningHand } from '../Components/EndRoundScreenComponents/WinningHandComponent';
import { Score } from '../Components/EndRoundScreenComponents/AnimatedScore';
import { resetToNextRound } from '../Functions/resetToNextRound';
import { useAppDispatch } from '../Store/hooks';
import { Button } from '@rneui/themed';

//TODO love this 
/* onLayout={(event) => {
  const {x, y, width, height} = event.nativeEvent.layout;
  console.log(x,y,width,height)
}} */

function EndRoundScreen({navigation}:{navigation:any}) {
  const topPanelBackgroundColor = '#3c7fc3';
  const panelBackgroundColor = 'rgba(22, 60, 85, 0.9)';
  const exampleData = tilesData.slice(12, 25);
  const exampleData2= tilesData.slice(25, 26);
  //props, winning hand of a player, winning tile by tsumo or ron

  const dispatch = useAppDispatch()


    const YakuList=()=>{
      const winningHand = useAppSelector((state: RootState) => state.gameReducer.winningHand);
      let shit = winningHand.yakuList
      let shitExample:YakuType[]=[{han:1,yakuName:"ToiToi"},{han:3,yakuName:"Tanyao"},{han:1,yakuName:"Junchan"},{han:2,yakuName:"Yakuahi"},{han:13,yakuName:"Chinitsu"},{han:4,yakuName:"Tsuuiisou"}]
    

      return(
        <View style={{backgroundColor:"brown",width:"100%",paddingHorizontal:5,minHeight:136}} 
        >
          <FlatList
          data={shitExample}
          ListEmptyComponent={<EmptyComponent/>}
          renderItem={({ item, index }) => (
            <YakuRow key={index} data={item} time={index * 2000} /* onRendered={handleRendered} */ />
          )}          
          numColumns={4}
          columnWrapperStyle={{columnGap:10,marginVertical:2}}
          contentContainerStyle={{marginVertical:5,}}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )
    }

    const EndRoundScreenDoras=()=>{
      return( 
        <View style={{backgroundColor:"pink",width:240,flexDirection:"row",borderRadius:8,paddingHorizontal:10,justifyContent:"center",alignItems:"center"}}>
        <View style={{backgroundColor:"blue",flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:28}}>Doras</Text>
        </View>
        <View style={{backgroundColor:"red", alignItems:"center",justifyContent:'center',flex:2}}>
         <EndRoundScreenCurentDorasList /> 
        </View>
        </View>)
    }

    const EndRoundScreenUraDoras=()=>{
      return( 
        <View style={{backgroundColor:"pink",width:240,flexDirection:"row",borderRadius:8,paddingHorizontal:10,justifyContent:"center",alignItems:"center"}}>
        <View style={{backgroundColor:"blue",flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:28}}>Ura</Text>
        </View>
        <View style={{backgroundColor:"red", alignItems:"center",justifyContent:'center',flex:2,height:40}}>
         <EndRoundScreenCurentUraDorasList /> 
        </View>
        </View>)
    }

    const ButtonContainers=({dispatch,navigation}:{dispatch:any,navigation:any})=>{
      
      return(
        <View style={{backgroundColor:"blue",flexDirection:'row',justifyContent:'space-around',alignItems:"center",flex:1,}}>
        <ButtonTakeScreenshot/>
        <Button
      title="OK"
      buttonStyle={{
        borderColor: 'rgba(78, 116, 289, 1)',
        borderRadius:8
      }}
      type="outline"
      raised
      titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
      containerStyle={{
        width: 80,
/*         marginHorizontal: 50,
        marginVertical: 10, */
        borderRadius:8,
      }}
       onPress={()=>
        resetToNextRound({dispatch,navigation})
       }
    />
        </View>
      )
    }



    const ScoreContainer=()=>{
      return(        
      <View style={{backgroundColor:"pink",flexDirection:'row',width:420}}>
        <Score />{/* toValue={96000} duration={5000}  */}
        <View style={{flexDirection:'row',alignItems:"center",justifyContent:'center',backgroundColor:"blue"}}>
          <Text style={{color:"#fbd54e",fontSize:42,fontWeight:'bold'}}>Mangan</Text>
        </View>
        </View>)}

//TODO https://github.com/gre/react-native-view-shot
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
          height: "100%",
        }}>
        <View style={{width:'100%', flexDirection:"row",gap:10,justifyContent:"flex-start",}}>  
        <EndRoundScreenDoras/>
        <EndRoundScreenUraDoras/>
        </View>
        <WinningHand />
        <YakuList/>
        <View style={{flexDirection:'row',flex:1,backgroundColor:"lime"}}>
        <ScoreContainer/>
        <ButtonContainers dispatch={dispatch} navigation={navigation}/>
        </View>
      </View>
    </View>
  );
}
//later show global scores??? mayme add table like in mahjongsoft
//add stars 1st, 2nd etc
export default EndRoundScreen;