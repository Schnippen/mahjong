import React from 'react';
import {View} from 'react-native';
import {SvgXml} from 'react-native-svg';

const DoraTileComponent = ({
  svg,
  tileRatioProp = 3,
  uncovered,
}: {
  svg: string;
  tileRatioProp: number;
  uncovered: boolean;
}) => {
  const tileRatio = tileRatioProp;
  const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
  const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
  const tileDepth = +(7.66 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
  const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
  const tileSecondLayer = +(tileHeight + tileDepth * 0.695).toFixed(2); // 69.5% of tile depth added to tile height
  const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2);
  const tileBorderRadiusHandPlayerPerspective = 8;
  //ramka 5 px - szare 13   = 18 +1 = 19+2=21
  //sare ma padding 1 z lewej i prawej, kontur ma grubość 2 //TODO create perspective that is scalable
  return (
    <View
      style={{
        backgroundColor: uncovered ? '#56a2c4' : '#e9ebe8',
        height: tileBottomLayer,
        width: tileWidth,
        justifyContent: 'flex-end',
        borderRadius: tileBorderRadiusHandPlayerPerspective,
        borderWidth: 1,
      }}>
      <View
        style={{
          backgroundColor: uncovered ? '#bdbbc0' : '#44809a',
          height: uncovered ? tileSecondLayer : tileSecondLayer - 2,
          width: tileWidth - 2,
          justifyContent: 'flex-end',
          borderRadius: tileBorderRadiusHandPlayerPerspective,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: uncovered ? '#e9ebe8' : '#98dffb',
            height: tileHeight,
            width: tileWidth - 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tileBorderRadiusHandPlayerPerspective,
          }}>
          {uncovered ? (
            <SvgXml
              width={tileImageWidth}
              height={tileImageHeight}
              xml={svg}
              style={{borderRadius: tileBorderRadiusHandPlayerPerspective}}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};
export default DoraTileComponent;
