import React, {useState} from 'react';
import {boardColor, MahjongTileColor} from '../../../Data/colors';
import {View} from 'react-native';
import {ButtonGroup} from '@rneui/themed';
import {RulesScreenBasics} from './RulesScreenBasics';
import {RulesScreenFirstComponentTheTiles} from './RulesScreenFirstComponentTheTiles';
import {RulesScreenTheHandGroup} from './RulesScreenTheHandGroup';

export const RulesScreenFirstComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});

  const onLayout = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    setDimensions({width, height});
  };

  return (
    <View
      style={{backgroundColor: boardColor, flexDirection: 'row', flex: 1}}
      onLayout={onLayout}>
      <ButtonGroup
        buttons={['Basics', 'The Tiles', 'The Hand']}
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
          //justifyContent: 'center',
          //alignItems: 'center',
        }}
        textStyle={{fontFamily: 'TheLastShuriken'}}
        selectedButtonStyle={{backgroundColor: '#56A2C4'}}
        //selectedTextStyle
      />
      {selectedIndex === 0 ? (
        <RulesScreenBasics />
      ) : selectedIndex === 1 ? (
        <RulesScreenFirstComponentTheTiles />
      ) : (
        <RulesScreenTheHandGroup />
      )}
    </View>
  );
};
