import React, {useState} from 'react';
import {
  RulesScreen1Han,
  RulesScreen2Han,
  RulesScreen36Han,
  RulesScreenDoubleYakuman,
  RulesScreenNoYaku,
  RulesScreenRyuukyoku,
  RulesScreenYakuman,
} from './RulesScreenYakus';
import {ButtonGroup} from '@rneui/themed';
import {View} from 'react-native';
import {boardColor, MahjongTileColor} from '../../../Data/colors';
import {ScreenList} from '../../../Types/types';
import {useNavigation} from '@react-navigation/native';
//  const navigation = useNavigation();

// let startGameParams={gameInitializer:'start'}
//navigationFunction={() => {goToScreen('MahjongScreen',startGameParams);}}
export type TypeGoToScreen = {screen: ScreenList; params?: object};

export const RulesScreenThirdComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  //TODO optimize else if to array
  //TODO go back nie działa tak jak należy, cofa do startscreen a nie do rules screen
  const onLayout = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    setDimensions({width, height});
  };
  const navigation = useNavigation();

  const componentsArray = [
    <RulesScreenNoYaku />,
    <RulesScreen1Han navigation={navigation} />,
    <RulesScreen2Han navigation={navigation} />,
    <RulesScreen36Han navigation={navigation} />,
    <RulesScreenYakuman navigation={navigation} />,
    <RulesScreenDoubleYakuman navigation={navigation} />,
    <RulesScreenRyuukyoku />,
  ];

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
      {componentsArray[selectedIndex]}
    </View>
  );
};
