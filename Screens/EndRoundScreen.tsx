import React from 'react';
import { FlatList, Text, View} from 'react-native';
import {tilesData} from '../Data/tilesData';
import EmptyComponent from '../Components/Wall/EmptyComponent';
import {TTileObject} from '../Types/types';
import PlayersTileOnHand from '../Components/PlayerControls/PlayerTileOnHand';
import { EndRoundScreenCurentDorasList } from '../Components/EndRoundScreenComponents/EndRoundScreenCurentDorasList';
import { EndRoundScreenCurentUraDorasList } from '../Components/EndRoundScreenComponents/EndRoundScreenCurentUraDorasList';
import { ButtonTakeScreenshot } from '../Components/EndRoundScreenComponents/ButtonTakeScreenshot';
import { ButtonEndRound } from '../Components/EndRoundScreenComponents/ButtonEndRound';
import { YakuRow } from '../Components/EndRoundScreenComponents/YakuRow';

function EndRoundScreen() {
  const topPanelBackgroundColor = '#3c7fc3';
  const panelBackgroundColor = 'rgba(22, 60, 85, 0.9)';
  const exampleData = tilesData.slice(12, 26);

  //props, winning hand of a player, winning tile by tsumo or ron

  const RenderItem = ({item, index}: {item: TTileObject; index: number}) => {
    return <PlayersTileOnHand svg={item.image} tileRatioProp={1.2} />;
  };

  const WinningHand = () => {
    // winning hand state
    return (
      <View style={{backgroundColor: 'red', width: 600, height: 70,borderRadius:8,paddingHorizontal:4,justifyContent:"center",alignItems:"center",paddingLeft:5}}>
        <View style={{width:"100%",height:56,backgroundColor:"blue",justifyContent:'center'}}>
        <FlatList
          horizontal={true}
          scrollEnabled={false}
          data={exampleData}
          renderItem={RenderItem}
          ListEmptyComponent={<EmptyComponent />}
          keyExtractor={(item, index) => item.tileID.toString()}/>
        </View>
      </View>
    );
  };

    const YakuList=()=>{
      return(
        <View style={{backgroundColor:"brown",width:"100%",paddingHorizontal:5}}>
          <FlatList
          data={[0,1,2,3,4,5,6,7,8,9,10]}
          ListEmptyComponent={<EmptyComponent/>}
          renderItem={YakuRow}
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

    const ButtonContainers=()=>{
      return(
        <View style={{backgroundColor:"blue",flexDirection:'row',justifyContent:'space-around',alignItems:"center",flex:1,}}>
        <ButtonTakeScreenshot/>
        <ButtonEndRound/>
        </View>
      )
    }

    const Score=()=>{
      return(
        <View style={{height:120,width:200,backgroundColor:"purple",paddingHorizontal:5}}>
          <View style={{flexDirection:'row', backgroundColor:topPanelBackgroundColor,}}>
            <View style={{flexDirection:'row'}}>
            <Text style={{color:"#fbd54e",fontSize:28,fontWeight:'bold'}}>50 </Text>
            <Text style={{color:"#fbd54e",fontSize:28}}>Fu </Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={{color:"#fbd54e",fontSize:28,fontWeight:'bold'}}>5 </Text>
            <Text style={{color:"#fbd54e",fontSize:28}}>Han</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',justifyContent:"flex-start",backgroundColor:"red",alignItems:'baseline'}} >
            <Text style={{fontSize:40,fontWeight:'bold'}}>96000 </Text>
          <Text style={{fontSize:28,fontWeight:'bold'}}>PTS</Text>
          </View>
        </View>
      )
    }

    const ScoreContainer=()=>{
      return(        
      <View style={{backgroundColor:"pink",flexDirection:'row',width:420}}>
        <Score/>
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
        <ButtonContainers/>
        </View>
      </View>
    </View>
  );
}
//later show global scores??? mayme add table like in mahjongsoft
//add stars 1st, 2nd etc
export default EndRoundScreen;
