import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import {Dimensions, Text} from 'react-native';
import {getFontSize} from '../../Functions/utils/getFontSize';

const TilesLeftInTheGame = () => {
  const tilesToEnd = useSelector(
    (state: RootState) => state.wallReducer.tilesLeftInWall,
  );
  /*   let dimension = {
    fontScale: Dimensions.get('screen').fontScale,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    scale: Dimensions.get('screen').scale,
  };
  console.log(
    'measurements:',
    'font',
    dimension.fontScale,
    dimension.height,
    dimension.width,
    dimension.scale,
  ); */ // window: measurements: 1.350000023841858 360 726.6666666666666 3   - 1st phone
  // screen: measurements: 1.350000023841858 802.6666666666666 360 3 - 1st phone
  //window measurements: 1 360 722.3333333333334 3 - 2nd phone
  //screen easurements: 1 360 800 3 -2nd phone

  let textSize = getFontSize(40);

  return (
    <Text
      style={{
        flex: 1,
        fontSize: textSize,
        width: '100%',
        textAlign: 'center',
        color: '#4affff',
      }}
      adjustsFontSizeToFit={true}
      numberOfLines={1}
      minimumFontScale={0.5}>
      {tilesToEnd}
    </Text>
  );
};

export default TilesLeftInTheGame;
