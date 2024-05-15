import React from 'react'
import { View } from 'react-native'
import { mahjongTilesSVGsArray } from '../../../Assets/MahjongTiles/MahjongTiles';
import { StolenTileComponentPlayerHORIZONTAL, StolenTileComponentPlayerVERTICAL, StolenTileComponentPlayerVERTICALReversed } from "./StolenTilesRightComponents"

export const  StolenTilesPlayerLEFT=({index}:{index:number})=>{
    const data = mahjongTilesSVGsArray
    const firstIndex=index*2
    const secondIndex=(index+1)*2
    const thirdIndex=(index+2)*2
    console.log(firstIndex,secondIndex,thirdIndex)
  return (
    <View style={{backgroundColor:"brown",width:150,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
    <StolenTileComponentPlayerHORIZONTAL svg={data[19]} tileRatioProp={1.5} index={firstIndex}/>
    <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5} index={secondIndex}/>
    <StolenTileComponentPlayerVERTICAL svg={data[33]} tileRatioProp={1.5} index={thirdIndex}/>
  </View>
  )
} 

export const  StolenTilesPlayerRIGHT=({index}:{index:number})=>{
  const data = mahjongTilesSVGsArray
  const firstIndex=index*2
    const secondIndex=(index+1)*2
    const thirdIndex=(index+2)*2
    console.log(firstIndex,secondIndex,thirdIndex)
return (
  <View style={{backgroundColor:"brown",width:150,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5} index={firstIndex}/>
  <StolenTileComponentPlayerVERTICAL svg={data[33]} tileRatioProp={1.5} index={secondIndex}/>
  <StolenTileComponentPlayerHORIZONTAL svg={data[19]} tileRatioProp={1.5} index={thirdIndex}/>
</View>
)
} 

export const  StolenTilesPlayerFRONT=({index}:{index:number})=>{
  const data = mahjongTilesSVGsArray
  const firstIndex=index*2
    const secondIndex=(index+1)*2
    const thirdIndex=(index+2)*2
    console.log(firstIndex,secondIndex,thirdIndex)
return (
  <View style={{backgroundColor:"brown",width:170,height:80,flexDirection:"row",alignItems:"flex-start",justifyContent:"center"}}>
  <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5} index={firstIndex}/>
  <StolenTileComponentPlayerHORIZONTAL svg={data[19]} tileRatioProp={1.5} index={secondIndex}/>
  <StolenTileComponentPlayerVERTICAL svg={data[33]} tileRatioProp={1.5} index={thirdIndex}/>
</View>
)
} 

export const  StolenTilesPlayerKANLEFT=({index}:{index:number})=>{
  const data = mahjongTilesSVGsArray
return (
  <View style={{backgroundColor:"brown",width:195,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerHORIZONTAL svg={data[19]} tileRatioProp={1.5} index={index}/>
  <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5} index={index}/>
  <StolenTileComponentPlayerVERTICAL svg={data[33]} tileRatioProp={1.5} index={index}/>
  <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5} index={index}/>
</View>
)
} 
export const  StolenTilesPlayerKANRIGHT=({index}:{index:number})=>{
  const data = mahjongTilesSVGsArray
return (
  <View style={{backgroundColor:"brown",width:195,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5} index={index}/>
  <StolenTileComponentPlayerVERTICAL svg={data[33]} tileRatioProp={1.5} index={index}/>
  <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5} index={index}/>
  <StolenTileComponentPlayerHORIZONTAL svg={data[19]} tileRatioProp={1.5} index={index}/>
</View>
)
} 
export const  StolenTilesPlayerKANFRONT=({index}:{index:number})=>{
  const data = mahjongTilesSVGsArray //TODO be sure that rowGap changes accordingly to perspective
return (
  <View style={{backgroundColor:"brown",width:195,height:80,flexDirection:"row",alignItems:"flex-end",justifyContent:"center"}}>
  <StolenTileComponentPlayerVERTICAL svg={data[23]} tileRatioProp={1.5} index={index}/>
  <View style={{flexDirection:"column",rowGap:-18}}>
  <StolenTileComponentPlayerHORIZONTAL svg={data[19]} tileRatioProp={1.5} index={index}/>
  <StolenTileComponentPlayerHORIZONTAL svg={data[19]} tileRatioProp={1.5} index={index}/>
  </View>
  <StolenTileComponentPlayerVERTICAL svg={data[33]} tileRatioProp={1.5} index={index}/>
</View>
)
}
export const  StolenTilesPlayerKANCLOSED=({index}:{index:number})=>{
  const data = mahjongTilesSVGsArray //TODO be sure that rowGap changes accordingly to perspective
  const firstIndex=index*2
  const secondIndex=(index+1)*2
  const thirdIndex=(index+2)*2
  const fourthIndex=(index+3)*2
return (
  <View style={{backgroundColor:"red",width:245,height:80,flexDirection:"row",alignItems:"flex-start",justifyContent:"center"}}>
  <StolenTileComponentPlayerVERTICALReversed svg={data[23]} tileRatioProp={1.5} index={firstIndex}/>
  <StolenTileComponentPlayerHORIZONTAL svg={data[33]} tileRatioProp={1.5} index={secondIndex}/>
  <StolenTileComponentPlayerHORIZONTAL svg={data[33]} tileRatioProp={1.5} index={thirdIndex}/>
  <StolenTileComponentPlayerVERTICALReversed svg={data[33]} tileRatioProp={1.5} index={fourthIndex}/>
</View>
)
}