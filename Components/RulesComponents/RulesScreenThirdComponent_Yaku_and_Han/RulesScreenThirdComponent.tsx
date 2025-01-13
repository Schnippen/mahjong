import React, {useState} from 'react';
import {
  RulesScreen1Han,
  RulesScreen2Han,
  RulesScreen36Han,
  RulesScreenDoubleYakuman,
  RulesScreenNoYaku,
  RulesScreenRyuukyoku,
  RulesScreenYakuman,
} from './RulesScrenYakus';
import {ButtonGroup} from '@rneui/themed';
import {View} from 'react-native';
import {boardColor, MahjongTileColor} from '../../../Data/colors';

export const RulesScreenThirdComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  //TODO optimize else if to array
  const onLayout = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    setDimensions({width, height});
  };
  return (
    <View
      style={{backgroundColor: boardColor, flexDirection: 'row', flex: 1}}
      onLayout={onLayout}>
      <ButtonGroup
        buttons={[
          '1 Han (no Yaku)',
          '1 Han',
          '2 Han',
          '3-6 Han',
          'Yakuman',
          'Double Yakuman',
          'Ryuukyoku',
        ]}
        selectedIndex={selectedIndex}
        onPress={value => {
          setSelectedIndex(value);
        }}
        containerStyle={{
          flexDirection: 'column',
          flex: 1 / 5,
          backgroundColor: MahjongTileColor,
          height: dimensions.height - 10,
          margin: 0,
          padding: 0,
        }}
        textStyle={{fontFamily: 'TheLastShuriken'}}
        selectedButtonStyle={{backgroundColor: '#56A2C4'}}
      />
      {selectedIndex === 0 ? (
        <RulesScreenNoYaku />
      ) : selectedIndex === 1 ? (
        <RulesScreen1Han />
      ) : selectedIndex === 2 ? (
        <RulesScreen2Han />
      ) : selectedIndex === 3 ? (
        <RulesScreen36Han />
      ) : selectedIndex === 4 ? (
        <RulesScreenYakuman />
      ) : selectedIndex === 5 ? (
        <RulesScreenDoubleYakuman />
      ) : selectedIndex === 6 ? (
        <RulesScreenRyuukyoku />
      ) : null}
    </View>
  );
};
