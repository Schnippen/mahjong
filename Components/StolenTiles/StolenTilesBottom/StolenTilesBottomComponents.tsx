import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";

export const StolenTileComponentPlayerVERTICAL =({svg,tileRatioProp=3,}:{svg:string,tileRatioProp:number})=>{
    //320 //60
   const tileRatio = tileRatioProp;
   const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
   const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
   const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
   const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
   const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
   const tileSecondLayer = +(tileHeight + (tileDepth * 0.695)).toFixed(2); // 69.5% of tile depth added to tile height
   const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2);
   const tileBorderRadiusHandPlayerPerspective = 8;
   const riverJustifyContent=true
   const richiiTile=false//TODO fix the perspective
   return(
       <View style={{backgroundColor:'#56a2c4',height:tileBottomLayer,width:tileWidth,justifyContent:riverJustifyContent?"flex-start":"flex-end",borderRadius:tileBorderRadiusHandPlayerPerspective,borderWidth:1,transform: [{rotate: `${richiiTile?90:0}deg`}]}}>
       <View style={{backgroundColor:"#bdbbc0",height:tileSecondLayer,width:tileWidth-2,justifyContent:riverJustifyContent?"flex-start":"flex-end",borderRadius:tileBorderRadiusHandPlayerPerspective,alignItems:"center"}}>
       <View style={{backgroundColor:"#e9ebe8", height:tileHeight,width:tileWidth-2,alignItems:"center",justifyContent:"center",borderRadius:tileBorderRadiusHandPlayerPerspective}}>
<SvgXml width={tileImageWidth} height={tileImageHeight} xml={svg} style={{borderRadius:tileBorderRadiusHandPlayerPerspective}} /></View>
       </View>
       </View>
   )
  }
 export  const StolenTileComponentPlayerHORIZONTAL =({svg,tileRatioProp=3,}:{svg:string,tileRatioProp:number})=>{
  //320 //60
  const tileRatio = tileRatioProp;
  const tileWidth = +(39 * tileRatio).toFixed(2); // default 30 x 3
  const tileHeight = +(30 * tileRatio).toFixed(2); // default 39 x 3+(30 * tileRatio).toFixed(2)
  const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
  const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileSecondLayer = +(tileHeight + (tileDepth * 0.695)).toFixed(2); // 69.5% of tile depth added to tile height
  const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2);
  const tileBorderRadiusHandPlayerPerspective = 8;
  const riverJustifyContent=true
  const richiiTile=false//TODO fix the perspective
  return(
   <View style={{backgroundColor:'#56a2c4',height:tileBottomLayer,width:tileWidth,justifyContent:riverJustifyContent?"flex-start":"flex-end",borderRadius:tileBorderRadiusHandPlayerPerspective,borderWidth:1,transform: [{rotate: `${richiiTile?90:0}deg`}]}}>
   <View style={{backgroundColor:"#bdbbc0",height:tileSecondLayer,width:tileWidth-2,justifyContent:riverJustifyContent?"flex-start":"flex-end",borderRadius:tileBorderRadiusHandPlayerPerspective,alignItems:"center"}}>
   <View style={{backgroundColor:"#e9ebe8", height:tileHeight,width:tileWidth-2,alignItems:"center",justifyContent:"center",borderRadius:tileBorderRadiusHandPlayerPerspective}}>
<SvgXml width={tileImageWidth} height={tileImageHeight} xml={svg} style={{borderRadius:tileBorderRadiusHandPlayerPerspective,transform: [{rotate: `${90}deg`}]}} /></View></View>
   </View>
  )
  }
  export const StolenTileComponentPlayerVERTICALReversed =({svg,tileRatioProp=3,}:{svg:string,tileRatioProp:number})=>{
    //320 //60
   const tileRatio = tileRatioProp;
   const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
   const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
   const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
   const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
   const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
   const tileSecondLayer = +(tileHeight + (tileDepth * 0.695)).toFixed(2); // 69.5% of tile depth added to tile height
   const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2);
   const tileBorderRadiusHandPlayerPerspective = 8;
   const riverJustifyContent=true
   const richiiTile=false//TODO fix the perspective
   const bottomColor='#56a2c4'
   const faceColor="#e9ebe8"
   return(
       <View style={{backgroundColor:faceColor,height:tileBottomLayer,width:tileWidth,justifyContent:riverJustifyContent?"flex-start":"flex-end",borderRadius:tileBorderRadiusHandPlayerPerspective,borderWidth:1,transform: [{rotate: `${richiiTile?90:0}deg`}]}}>
       <View style={{backgroundColor:"#bdbbc0",height:tileSecondLayer,width:tileWidth-2,justifyContent:riverJustifyContent?"flex-start":"flex-end",borderRadius:tileBorderRadiusHandPlayerPerspective,alignItems:"center"}}>
       <View style={{backgroundColor:bottomColor, height:tileHeight,width:tileWidth-2,alignItems:"center",justifyContent:"center",borderRadius:tileBorderRadiusHandPlayerPerspective}}>
{/*<SvgXml width={tileImageWidth} height={tileImageHeight} xml={null} style={{borderRadius:tileBorderRadiusHandPlayerPerspective}} />*/}</View>
       </View>
       </View>
   )
  }