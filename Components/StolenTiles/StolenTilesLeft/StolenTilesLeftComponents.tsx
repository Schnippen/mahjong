import React from "react";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

export const StolenTileComponentPlayerVERTICAL =({svg,tileRatioProp=3,index}:{svg:string,tileRatioProp:number,index:number})=>{
    const tileRatio = tileRatioProp;
    const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
    const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
    const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
    const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
    const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
    const tileSecondLayer = +(tileWidth + tileDepth * 0.695).toFixed(2); // 69.5% of tile depth added to tile height //tileWidth-2
    const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2);
    const tileBottomLayerRiverRight = tileWidth + tileDepth;
    const tileBorderRadiusHandPlayerPerspective = 8;
    const richiiTile = false; //TODO fix the perspective
    const rightRiverTileWidth = /* index !== 18 ?*/  tileHeight+10 ;
    const secondLayerWidthandLastTileWidth =
    tileSecondLayer-10 ;
    return (
      <View
        style={{
          backgroundColor: '#56a2c4',
          height: tileHeight + 5,
          width:rightRiverTileWidth,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          borderWidth: 1,
          transform: [{rotate: `${richiiTile ? 90 : 0}deg`}],
          zIndex:-index,
          marginRight:-19
        }}>
        <View
          style={{
            backgroundColor: '#bdbbc0',
            height: tileSecondLayer,
            width: secondLayerWidthandLastTileWidth+8,
            justifyContent: 'flex-start',
            borderRadius: tileBorderRadiusHandPlayerPerspective,
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              backgroundColor: '#e9ebe8',
              height: tileHeight,
              width: tileWidth,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tileBorderRadiusHandPlayerPerspective,
            }}>
            {/* <SvgXml
              width={tileImageWidth}
              height={tileImageHeight}
              xml={svg}
              style={{borderRadius: tileBorderRadiusHandPlayerPerspective}}
            /> */}
          </View>
        </View>
      </View>
    );
  };
 export  const StolenTileComponentPlayerHORIZONTAL =({svg,tileRatioProp=3,index}:{svg:string,tileRatioProp:number,index:number})=>{
    const tileRatio = tileRatioProp;
    const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
    const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
    const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
    const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
    const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
    const tileSecondLayer = +(tileWidth + tileDepth * 0.695).toFixed(2); // 69.5% of tile depth added to tile height //tileWidth-2
    const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2);
    const tileBottomLayerRiverRight = tileWidth + tileDepth;
    const tileBorderRadiusHandPlayerPerspective = 8;
    const richiiTile = false; //TODO fix the perspective
    const rightRiverTileWidth = /* index !== 18 ?*/  tileHeight ;
    const secondLayerWidthandLastTileWidth =
    tileSecondLayer-10 ;
    return (
      <View
        style={{
          backgroundColor: '#56a2c4',
          height: tileHeight+10,
          width:rightRiverTileWidth,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          borderWidth: 1,
          transform: [{rotate: `90deg`}],
          zIndex:-index,
          marginLeft:-2
        }}>
        <View
          style={{
            backgroundColor: '#bdbbc0',
            height: tileSecondLayer,
            width: secondLayerWidthandLastTileWidth+2,
            justifyContent: 'flex-start',
            borderRadius: tileBorderRadiusHandPlayerPerspective,
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: '#e9ebe8',
              height: tileHeight,
              width: tileWidth,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tileBorderRadiusHandPlayerPerspective,
            }}>
            {/* <SvgXml
              width={tileImageWidth}
              height={tileImageHeight}
              xml={svg}
              style={{borderRadius: tileBorderRadiusHandPlayerPerspective, transform: [{rotate: `deg`}],}}
            /> */}
            <Text style={{color:"black"}}>{index}</Text>
          </View>
        </View>
      </View>
    );
  };
  export const StolenTileComponentPlayerVERTICALReversed =({svg,tileRatioProp=3,index}:{svg:string,tileRatioProp:number,index:number})=>{
    const tileRatio = tileRatioProp;
    const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
    const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
    const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
    const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
    const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
    const tileSecondLayer = +(tileWidth + tileDepth * 0.695).toFixed(2); // 69.5% of tile depth added to tile height //tileWidth-2
    const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2);
    const tileBottomLayerRiverRight = tileWidth + tileDepth;
    const tileBorderRadiusHandPlayerPerspective = 8;
    const richiiTile = false; //TODO fix the perspective
    const rightRiverTileWidth = /* index !== 18 ?*/  tileHeight+8 ;
    const secondLayerWidthandLastTileWidth =
    tileSecondLayer ;
    const bottomColor='#56a2c4'
    const faceColor="#e9ebe8"

    return (
      <View
        style={{
          backgroundColor: faceColor,
          height: tileHeight + 5,
          width:rightRiverTileWidth,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          borderWidth: 1,
          transform: [{rotate: `${richiiTile ? 90 : 0}deg`}],
          zIndex:-index,
          marginRight:-12
        }}>
        <View
          style={{
            backgroundColor: '#bdbbc0',
            height: tileSecondLayer+1,
            width: secondLayerWidthandLastTileWidth,
            justifyContent: 'flex-end',
            borderRadius: tileBorderRadiusHandPlayerPerspective,
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              backgroundColor: bottomColor,
              height: tileHeight,
              width: tileWidth,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tileBorderRadiusHandPlayerPerspective,
            }}>
            {/* <SvgXml
              width={tileImageWidth}
              height={tileImageHeight}
              xml={svg}
              style={{borderRadius: tileBorderRadiusHandPlayerPerspective}}
            /> */}
            <Text style={{color:"black"}}>{index}</Text>
          </View>
        </View>
      </View>
    );
  };

