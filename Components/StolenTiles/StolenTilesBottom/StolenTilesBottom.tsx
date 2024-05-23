import React from 'react'
import { View } from 'react-native'
import { mahjongTilesSVGsArray } from '../../../Assets/MahjongTiles/MahjongTiles';
import { StolenTileComponentPlayerHORIZONTAL, StolenTileComponentPlayerVERTICAL, StolenTileComponentPlayerVERTICALReversed } from "../StolenTilesBottom/StolenTilesBottomComponents"
import { TstolenTiles } from '../../../Types/types';

export const  StolenTilesPlayerLEFT=({data}:{data:TstolenTiles})=>{
    //const shit = mahjongTilesSVGsArray
    //console.log("stolenTIlesBottom:",data)
  return (
    <View style={{backgroundColor:"brown",width:150,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
    <StolenTileComponentPlayerHORIZONTAL svg={data.tiles[0].image} tileRatioProp={1.5}/>
    <StolenTileComponentPlayerVERTICAL svg={data.tiles[1].image} tileRatioProp={1.5}/>
    <StolenTileComponentPlayerVERTICAL svg={data.tiles[2].image} tileRatioProp={1.5}/>
  </View>
  )
} 

export const  StolenTilesPlayerRIGHT=({data}:{data:TstolenTiles})=>{
  const shit = mahjongTilesSVGsArray
return (
  <View style={{backgroundColor:"brown",width:150,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerVERTICAL svg={shit[23]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={shit[33]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerHORIZONTAL svg={shit[19]} tileRatioProp={1.5}/>
</View>
)
} 

export const  StolenTilesPlayerFRONT=({data}:{data:TstolenTiles})=>{
  const shit = mahjongTilesSVGsArray
return (
  <View style={{backgroundColor:"brown",width:150,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerVERTICAL svg={shit[23]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerHORIZONTAL svg={shit[19]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={shit[33]} tileRatioProp={1.5}/>
</View>
)
} 

export const  StolenTilesPlayerKANLEFT=({data}:{data:TstolenTiles})=>{
  const shit = mahjongTilesSVGsArray
return (
  <View style={{backgroundColor:"brown",width:195,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerHORIZONTAL svg={shit[19]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={shit[23]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={shit[33]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={shit[23]} tileRatioProp={1.5}/>
</View>
)
} 
export const  StolenTilesPlayerKANRIGHT=({data}:{data:TstolenTiles})=>{
  const shit = mahjongTilesSVGsArray
return (
  <View style={{backgroundColor:"brown",width:195,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerVERTICAL svg={shit[23]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={shit[33]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={shit[23]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerHORIZONTAL svg={shit[19]} tileRatioProp={1.5}/>
</View>
)
} 
export const  StolenTilesPlayerKANFRONT=({data}:{data:TstolenTiles})=>{
  const shit = mahjongTilesSVGsArray //TODO be sure that rowGap changes accordingly to perspective
return (
  <View style={{backgroundColor:"brown",width:195,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerVERTICAL svg={shit[23]} tileRatioProp={1.5}/>
  <View style={{flexDirection:"column",rowGap:-18}}>
  <StolenTileComponentPlayerHORIZONTAL svg={shit[19]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerHORIZONTAL svg={shit[19]} tileRatioProp={1.5}/>
  </View>
  <StolenTileComponentPlayerVERTICAL svg={shit[33]} tileRatioProp={1.5}/>
</View>
)
}
export const  StolenTilesPlayerKANCLOSED=({data}:{data:TstolenTiles})=>{
  const shit = mahjongTilesSVGsArray //TODO be sure that rowGap changes accordingly to perspective
return (
  <View style={{backgroundColor:"brown",width:181,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerVERTICALReversed svg={shit[23]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={shit[33]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICAL svg={shit[33]} tileRatioProp={1.5}/>
  <StolenTileComponentPlayerVERTICALReversed svg={shit[33]} tileRatioProp={1.5}/>
</View>
)
}