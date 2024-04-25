import React from 'react';
import {View} from 'react-native';
import {SvgXml} from 'react-native-svg';

export const WallTile = ({
  svg,
  tileRatioProp = 3,
  zIndex,
}: {
  svg: string;
  tileRatioProp: number;
  zIndex: number;
}) => {
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
  const isTileFaceUp = false; //TODO fix the perspective
  const colorBottomLayer = '#98dffb';
  const colorSecondLayer = '#44809a';
  const colorFaceLayer = '#a39f9e';
  return (
    <View
      style={{
        backgroundColor: colorFaceLayer,
        height: tileBottomLayer,
        width: tileWidth,
        justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
        borderRadius: tileBorderRadiusHandPlayerPerspective,
        borderWidth: 1,
        zIndex: zIndex,
      }}>
      <View
        style={{
          backgroundColor: colorSecondLayer,
          height: tileSecondLayer - 5,
          width: tileWidth - 2,
          justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: colorBottomLayer,
            height: tileHeight,
            width: tileWidth - 2,
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
              transform: [{rotate: `${0}deg`}],
            }}
          />
        </View>
      </View>
    </View>
  );
};

export const WallTileLeft = ({
  svg,
  tileRatioProp = 3,
  zIndex,
}: {
  svg: string;
  tileRatioProp: number;
  zIndex: number;
}) => {
  const tileRatio = tileRatioProp;
  const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
  const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
  const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
  const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileSecondLayer = +(tileHeight + tileDepth * 0.695).toFixed(2); // 69.5% of tile depth added to tile height
  const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2); //TODO check the Riverleft values
  const tileBorderRadiusHandPlayerPerspective = 8;
  const riverJustifyContent = true;
  const isTileFaceUp = false; //TODO fix the perspective
  const colorBottomLayer = '#98dffb';
  const colorSecondLayer = '#44809a';
  const colorFaceLayer = '#a39f9e';
  return (
    <View
      style={{
        backgroundColor: colorFaceLayer,
        height: tileWidth + 8,
        width: tileBottomLayer - 6,
        justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
        borderRadius: tileBorderRadiusHandPlayerPerspective,
        borderWidth: 1,
        zIndex: zIndex,
        marginTop: -6,
      }}>
      <View
        style={{
          backgroundColor: colorSecondLayer,
          height: tileWidth + 2,
          width: tileSecondLayer - 5,
          justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            backgroundColor: colorBottomLayer,
            height: tileWidth - 2,
            width: tileHeight,
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
              transform: [{rotate: `${90}deg`}],
            }}
          />
        </View>
      </View>
    </View>
  );
};
export const WallTileRight = ({
  svg,
  tileRatioProp = 3,
  zIndex,
}: {
  svg: string;
  tileRatioProp: number;
  zIndex: number;
}) => {
  const tileRatio = tileRatioProp;
  const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
  const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
  const tileDepth = +(14 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
  const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileSecondLayer = +(tileHeight + tileDepth * 0.695).toFixed(2); // 69.5% of tile depth added to tile height
  const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2); //TODO check the Riverleft values
  const tileBorderRadiusHandPlayerPerspective = 8;
  const riverJustifyContent = true;
  const isTileFaceUp = false; //TODO fix the perspective
  const colorBottomLayer = '#98dffb';
  const colorSecondLayer = '#44809a';
  const colorFaceLayer = '#a39f9e';
  return (
    <View
      style={{
        backgroundColor: colorFaceLayer,
        height: tileWidth + 8,
        width: tileBottomLayer - 6,
        justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
        borderRadius: tileBorderRadiusHandPlayerPerspective,
        borderWidth: 1,
        zIndex: zIndex,
        marginTop: -6,
        alignItems: 'flex-end',
      }}>
      <View
        style={{
          backgroundColor: colorSecondLayer,
          height: tileWidth + 2,
          width: tileSecondLayer - 5,
          justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: colorBottomLayer,
            height: tileWidth - 2,
            width: tileHeight,
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
              transform: [{rotate: `${90}deg`}],
            }}
          />
        </View>
      </View>
    </View>
  );
};

export const WallTileTop = ({
  svg,
  tileRatioProp = 3,
  zIndex,
}: {
  svg: string;
  tileRatioProp: number;
  zIndex: number;
}) => {
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
  const isTileFaceUp = false; //TODO fix the perspective
  const colorBottomLayer = '#98dffb';
  const colorSecondLayer = '#44809a';
  const colorFaceLayer = '#a39f9e';
  return (
    <View
      style={{
        backgroundColor: colorFaceLayer,
        height: tileBottomLayer,
        width: tileWidth,
        justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
        borderRadius: tileBorderRadiusHandPlayerPerspective,
        borderWidth: 1,
        zIndex: zIndex,
      }}>
      <View
        style={{
          backgroundColor: colorSecondLayer,
          height: tileSecondLayer - 5,
          width: tileWidth - 2,
          justifyContent: riverJustifyContent ? 'flex-start' : 'flex-end',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: colorBottomLayer,
            height: tileHeight,
            width: tileWidth - 2,
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
              transform: [{rotate: `${0}deg`}],
            }}
          />
        </View>
      </View>
    </View>
  );
};