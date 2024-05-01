import React from 'react';
import {View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Triangle from './Triangle';
import {dragonsSVGArray} from '../../Assets/MahjongTiles/MahjongTiles';

const CompassWindIndicator = () => {
  //16=south
  //17=north
  //28=west
  //39=east #bc2f38
  let index = 1;
  let defaultWindBackground = 'beige';
  let currentWindBackground = index === 1 ? '#bc2f38' : defaultWindBackground;
  return (
    //65 45
    <View
      style={{
        borderBottomLeftRadius: 8,
        width: 60,
        height: 60,
        backgroundColor: currentWindBackground,
        position: 'absolute',
        bottom: 0,
        left: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
      }}>
      <Triangle />
      <SvgXml
        width={50}
        height={50}
        xml={dragonsSVGArray[index]}
        style={{marginLeft: 2, marginBottom: 2}}
      />
    </View>
  );
};
export default CompassWindIndicator;
