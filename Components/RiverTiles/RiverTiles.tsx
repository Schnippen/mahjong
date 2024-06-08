import React from 'react';
import {View} from 'react-native';
import {SvgXml} from 'react-native-svg';

export const TileInTheRiverComponentFront = ({
  svg,
  tileRatioProp = 3,
  isRiichi,
}: {
  svg: string;
  tileRatioProp: number;
  isRiichi: boolean;
}) => {
  //320 //60
  const tileRatio = tileRatioProp;
  const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
  const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
  const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
  const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileSecondLayer = +(tileHeight + tileDepth * 0.695).toFixed(2); // 69.5% of tile depth added to tile height
  const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2);
  const tileBorderRadiusHandPlayerPerspective = 8;
  const riverJustifyContent = true;
  //is ready for displaying riichi
  return (
    <View
      style={{
        backgroundColor: '#56a2c4',
        height: isRiichi ? tileHeight + 5 : tileBottomLayer,
        width: isRiichi ? tileHeight + 4 : tileWidth,
        justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
        borderRadius: tileBorderRadiusHandPlayerPerspective,
        borderWidth: 1,
        //transform: [{rotate: `${richiiTile ? 90 : 0}deg`}],
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: '#bdbbc0',
          height: isRiichi ? tileWidth + 13 : tileSecondLayer,
          width: isRiichi ? tileHeight : tileWidth - 2,
          justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#e9ebe8',
            height: isRiichi ? tileWidth - 2 : tileHeight,
            width: isRiichi ? tileHeight : tileWidth - 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tileBorderRadiusHandPlayerPerspective,
          }}>
          <SvgXml
            width={tileImageWidth}
            height={tileImageHeight}
            xml={svg}
            style={{
              borderRadius: tileBorderRadiusHandPlayerPerspective,
              transform: [{rotate: `${isRiichi ? 90 : 0}deg`}],
            }}
          />
        </View>
      </View>
    </View>
  );
};

export const TileInTheRiverComponentRight = ({
  svg,
  tileRatioProp = 3,
  index,
  isRiichi,
}: {
  svg: string;
  tileRatioProp: number;
  index: number;
  isRiichi: boolean;
}) => {
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
  const rightRiverTileWidth = index !== 18 ? tileHeight : tileWidth;
  const secondLayerWidthandLastTileWidth =
    index !== 18 ? tileSecondLayer - 10 : tileWidth;
  return (
    <View
      style={{
        backgroundColor: '#56a2c4',
        height: isRiichi ? tileWidth + 6 : tileHeight + 5,
        width: isRiichi ? tileHeight + 12 : rightRiverTileWidth,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderRadius: tileBorderRadiusHandPlayerPerspective,
        borderWidth: 1,
      }}>
      <View
        style={{
          backgroundColor: '#bdbbc0',
          height: isRiichi ? tileWidth + 3 : tileSecondLayer,
          width: isRiichi ? tileSecondLayer : secondLayerWidthandLastTileWidth,
          justifyContent: 'flex-end',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: '#e9ebe8',
            height: isRiichi ? tileWidth : tileHeight,
            width: isRiichi ? tileHeight - 2 : tileWidth,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tileBorderRadiusHandPlayerPerspective,
          }}>
          <SvgXml
            width={tileImageWidth}
            height={tileImageHeight}
            xml={svg}
            style={{
              borderRadius: tileBorderRadiusHandPlayerPerspective,
              transform: [{rotate: `${isRiichi ? 90 : 0}deg`}],
            }}
          />
        </View>
      </View>
    </View>
  );
};

export const TileInTheRiverComponentLeft = ({
  svg,
  tileRatioProp = 3,
  index,
  isRiichi,
}: {
  svg: string;
  tileRatioProp: number;
  index: number;
  isRiichi: boolean;
}) => {
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

  const rightRiverTileWidth = index !== 18 ? tileHeight : tileHeight;
  const secondLayerWidthandLastTileWidth =
    index !== 18 ? tileSecondLayer - 10 : tileSecondLayer - 10;

  return (
    <View
      style={{
        backgroundColor: '#56a2c4',
        height: isRiichi ? tileWidth + 6 : tileHeight + 5,
        width: isRiichi ? tileHeight + 12 : rightRiverTileWidth,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        borderRadius: tileBorderRadiusHandPlayerPerspective,
        borderWidth: 1,
      }}>
      <View
        style={{
          backgroundColor: '#bdbbc0',
          height: isRiichi ? tileWidth + 3 : tileSecondLayer,
          width: isRiichi ? tileSecondLayer : secondLayerWidthandLastTileWidth,
          justifyContent: 'flex-end',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            backgroundColor: '#e9ebe8',
            height: isRiichi ? tileWidth : tileHeight,
            width: isRiichi ? tileHeight - 6 : tileWidth,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tileBorderRadiusHandPlayerPerspective,
          }}>
          <SvgXml
            width={tileImageWidth}
            height={tileImageHeight}
            xml={svg}
            style={{
              borderRadius: tileBorderRadiusHandPlayerPerspective,
              transform: [{rotate: `${isRiichi ? 90 : 0}deg`}],
            }}
          />
        </View>
      </View>
    </View>
  );
};

export const TileInTheRiverComponentTop = ({
  svg,
  tileRatioProp = 3,
  index,
  isRiichi,
}: {
  svg: string;
  tileRatioProp: number;
  index: number;
  isRiichi: boolean;
}) => {
  //320 //60
  const tileRatio = tileRatioProp;
  const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
  const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
  const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
  const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileSecondLayer = +(tileHeight + tileDepth * 0.695).toFixed(2); // 69.5% of tile depth added to tile height
  const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2);
  const tileBorderRadiusHandPlayerPerspective = 8;
  let BottomLayer1default = index >= 6 ? tileHeight + 2 : tileBottomLayer;
  let BottomLayer2 = index >= 6 ? tileHeight : tileBottomLayer - 20;
  let MiddleLayerDefault = index >= 6 ? 0 : tileSecondLayer;
  let MiddleLayer2 = index >= 6 ? tileHeight - 10 : tileSecondLayer - 20;
  return (
    <View
      style={{
        backgroundColor: '#56a2c4',
        height: isRiichi ? BottomLayer2 : BottomLayer1default,
        width: isRiichi ? tileHeight + 4 : tileWidth,
        justifyContent: 'flex-end',
        borderRadius: tileBorderRadiusHandPlayerPerspective,
        borderWidth: 1,
      }}>
      <View
        style={{
          backgroundColor: '#bdbbc0',
          height: isRiichi ? MiddleLayer2 : MiddleLayerDefault,
          width: isRiichi ? tileHeight + 2 : tileWidth - 2,
          justifyContent: 'flex-end',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#e9ebe8',
            height: isRiichi ? tileWidth - 2 : tileHeight,
            width: isRiichi ? tileHeight : tileWidth - 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tileBorderRadiusHandPlayerPerspective,
          }}>
          <SvgXml
            width={tileImageWidth}
            height={tileImageHeight}
            xml={svg}
            style={{
              borderRadius: tileBorderRadiusHandPlayerPerspective,
              transform: [{rotate: `${isRiichi ? 90 : 0}deg`}],
            }}
          />
        </View>
      </View>
    </View>
  );
};
