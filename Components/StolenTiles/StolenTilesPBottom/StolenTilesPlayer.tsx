import React from 'react'
import { View } from 'react-native'
import { mahjongTilesSVGsArray } from '../../../Assets/MahjongTiles/MahjongTiles';
import { StolenTileComponentPlayerHORIZONTAL, StolenTileComponentPlayerVERTICAL, StolenTileComponentPlayerVERTICALReversed } from '../StolenTilesTop/StolenTilesTopComponents';

export const  StolenTilesPlayerLEFT=()=>{
    const data = mahjongTilesSVGsArray
  return (
    <View style={{backgroundColor:"brown",width:150,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
    <StolenTileComponentPlayerHORIZONTAL svg={data[19]} tileRatioProp={1.5}/>
    <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5}/>
    <StolenTileComponentPlayerVERTICAL svg={data[33]} tileRatioProp={1.5}/>
  </View>
  )
} 

export const  StolenTilesPlayerRIGHT=()=>{
  const data = mahjongTilesSVGsArray
return (
  <View style={{backgroundColor:"brown",width:150,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={data[33]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerHORIZONTAL svg={data[19]} tileRatioProp={1.5}/>
</View>
)
} 

export const  StolenTilesPlayerFRONT=()=>{
  const data = mahjongTilesSVGsArray
return (
  <View style={{backgroundColor:"brown",width:150,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerHORIZONTAL svg={data[19]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={data[33]} tileRatioProp={1.5}/>
</View>
)
} 

export const  StolenTilesPlayerKANLEFT=()=>{
  const data = mahjongTilesSVGsArray
return (
  <View style={{backgroundColor:"brown",width:195,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerHORIZONTAL svg={data[19]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={data[33]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5}/>
</View>
)
} 
export const  StolenTilesPlayerKANRIGHT=()=>{
  const data = mahjongTilesSVGsArray
return (
  <View style={{backgroundColor:"brown",width:195,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={data[33]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerHORIZONTAL svg={data[19]} tileRatioProp={1.5}/>
</View>
)
} 
export const  StolenTilesPlayerKANFRONT=()=>{
  const data = mahjongTilesSVGsArray //TODO be sure that rowGap changes accordingly to perspective
return (
  <View style={{backgroundColor:"brown",width:195,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5}/>
  <View style={{flexDirection:"column",rowGap:-18}}>
  <StolenTileComponentPlayerHORIZONTAL svg={data[19]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerHORIZONTAL svg={data[19]} tileRatioProp={1.5}/>
  </View>
  <StolenTileComponentPlayerVERTICAL svg={data[33]} tileRatioProp={1.5}/>
</View>
)
}
export const  StolenTilesPlayerKANCLOSED=()=>{
  const data = mahjongTilesSVGsArray //TODO be sure that rowGap changes accordingly to perspective
return (
  <View style={{backgroundColor:"brown",width:181,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerVERTICALReversed svg={data[23]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={data[33]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={data[33]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICALReversed svg={data[33]} tileRatioProp={1.5}/>
</View>
)
}