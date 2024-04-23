import { View } from "react-native";
import { SvgXml } from "react-native-svg";

export const TileInTheRiverComponentFront =({svg,tileRatioProp=3,}:{svg:string,tileRatioProp:number})=>{
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
       <SvgXml width={tileImageWidth} height={tileImageHeight} xml={svg} style={{borderRadius:tileBorderRadiusHandPlayerPerspective}} />
       </View>
       </View>
       </View>
   )
}

export const TileInTheRiverComponentRight =({svg,tileRatioProp=3,index}:{svg:string,tileRatioProp:number,index:number})=>{
    console.log("Right:",index)

    const tileRatio = tileRatioProp;
    const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
    const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
    const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
    const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
    const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
    const tileSecondLayer = +(tileWidth+(tileDepth*0.695)).toFixed(2); // 69.5% of tile depth added to tile height //tileWidth-2
    const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2);
    const tileBottomLayerRiverRight=tileWidth+tileDepth
    const tileBorderRadiusHandPlayerPerspective = 8;
    const richiiTile=false//TODO fix the perspective
    const rightRiverTileWidth=index!==18?tileHeight:tileWidth
const secondLayerWidthandLastTileWidth = index!==18?tileSecondLayer-10:tileWidth
    return(
        <View style={{backgroundColor:'#56a2c4',height:tileHeight+5,width:rightRiverTileWidth,justifyContent:"flex-end",alignItems:"flex-end",borderRadius:tileBorderRadiusHandPlayerPerspective,borderWidth:1,transform: [{rotate: `${richiiTile?90:0}deg`}]}}>
        <View style={{backgroundColor:"#bdbbc0",height:tileSecondLayer,width:secondLayerWidthandLastTileWidth,justifyContent:"flex-end",borderRadius:tileBorderRadiusHandPlayerPerspective,alignItems:"flex-end"}}>
        <View style={{backgroundColor:"#e9ebe8", height:tileHeight,width:tileWidth,alignItems:"center",justifyContent:"center",borderRadius:tileBorderRadiusHandPlayerPerspective}}>
        <SvgXml width={tileImageWidth} height={tileImageHeight} xml={svg} style={{borderRadius:tileBorderRadiusHandPlayerPerspective}} />
        </View>
        </View>
        </View>
    )
}

export const TileInTheRiverComponentLeft =({svg,tileRatioProp=3,}:{svg:string,tileRatioProp:number})=>{
    
    const tileRatio = tileRatioProp;
    const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
    const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
    const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
    const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
    const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
    const tileSecondLayer = +(tileWidth+(tileDepth*0.695)).toFixed(2); // 69.5% of tile depth added to tile height //tileWidth-2
    const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2);
    const tileBottomLayerRiverRight=tileWidth+tileDepth
    const tileBorderRadiusHandPlayerPerspective = 8;
    const richiiTile=false//TODO fix the perspective
    return(
        <View style={{backgroundColor:'#56a2c4',height:tileHeight+5,width:tileHeight,justifyContent:"flex-start",alignItems:"flex-start",borderRadius:tileBorderRadiusHandPlayerPerspective,borderWidth:1,transform: [{rotate: `${richiiTile?90:0}deg`}]}}>
        <View style={{backgroundColor:"#bdbbc0",height:tileSecondLayer,width:tileSecondLayer-10,justifyContent:"flex-start",borderRadius:tileBorderRadiusHandPlayerPerspective,alignItems:"flex-start"}}>
        <View style={{backgroundColor:"#e9ebe8", height:tileHeight,width:tileWidth,alignItems:"center",justifyContent:"center",borderRadius:tileBorderRadiusHandPlayerPerspective}}>
        <SvgXml width={tileImageWidth} height={tileImageHeight} xml={svg} style={{borderRadius:tileBorderRadiusHandPlayerPerspective}} />
        </View>
        </View>
        </View>
    )
}