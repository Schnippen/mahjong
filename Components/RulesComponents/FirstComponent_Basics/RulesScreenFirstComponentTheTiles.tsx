import {ButtonGroup} from '@rneui/themed';
import React, {useState} from 'react';
import {View} from 'react-native';
import {MahjongTileColor} from '../../../Data/colors';
import {
  TheNumberedTiles,
  TheHonorTiles,
  TheDragonsTiles,
} from './RulesScreenFirstTheTiles';
import {getFontSize} from '../../../Functions/utils/getFontSize';

export const RulesScreenFirstComponentTheTiles = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [dimensionsView, setDimensionsView] = useState({width: 0, height: 0});
  const onLayoutView = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    if (width !== dimensionsView.width || height !== dimensionsView.height) {
      setDimensionsView({width, height});
    }
  };
  let textSize = getFontSize(14);
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <ButtonGroup
        buttons={['Number Tiles', 'Honor Tiles', 'Wind Tiles']}
        selectedIndex={selectedIndex}
        onPress={value => {
          setSelectedIndex(value);
        }}
        containerStyle={{
          flexDirection: 'column',
          flex: 1 / 4,
          backgroundColor: MahjongTileColor,
          height: dimensionsView.height - 10,
          margin: 0,
          padding: 0,
          //justifyContent: 'center',
          //alignItems: 'center',
        }}
        textStyle={{
          fontFamily: 'TheLastShuriken',
          textAlign: 'center',
          fontSize: textSize,
          color: 'black',
        }}
        selectedButtonStyle={{backgroundColor: '#56A2C4'}}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
        onLayout={onLayoutView}>
        {selectedIndex === 0 ? (
          <TheNumberedTiles dimensionsView={dimensionsView} />
        ) : selectedIndex === 1 ? (
          <TheHonorTiles dimensionsView={dimensionsView} />
        ) : (
          <TheDragonsTiles dimensionsView={dimensionsView} />
        )}
      </View>
    </View>
  );
};
