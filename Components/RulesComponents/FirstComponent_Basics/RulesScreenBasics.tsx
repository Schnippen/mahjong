import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SmallStyledText} from '../RulesComponents';
export const RulesScreenBasics = () => {
  const [dimensionsView, setDimensionsView] = useState({width: 0, height: 0});
  const onLayoutView = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    if (width !== dimensionsView.width || height !== dimensionsView.height) {
      setDimensionsView({width, height});
    }
  };
  return (
    <View style={{flex: 1, paddingVertical: 10}}>
      <ScrollView
        onLayout={onLayoutView}
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}>
        <SmallStyledText
          dHeight={dimensionsView.height}
          dWidth={dimensionsView.width}
          text={'Basics'}
        />
        <Text
          adjustsFontSizeToFit={true}
          style={{
            fontSize: 20,
            fontFamily: 'SofadiOne',
          }}>
          {
            'Riichi Mahjong is a Japanese variant of the Chinese game of Mahjong.\n'
          }
          {
            'Four players compete to complete a winning hand and score points from others.\n'
          }
          {'It shares similarities with Rummikub, gin rummy, and poker.\n\n'}
          {
            'Riichi Mahjong is played with 34 different tiles, of which there are four of each type, making up 136 tiles in total.\n'
          }
          {
            'The majority of the tiles consist of numbers 1 to 9 in three suits.\n\n'
          }
          {
            'Mahjong tile categories: A standard mahjong set consists of 34 different kinds of tiles, divided into 5 categories: Man, Pin, Sou, Wind, and Dragon.\n'
          }
          {'Each kind includes 4 identical tiles, totaling 136 tiles.\n\n'}
          {
            'A yaku is a specific pattern or combination in a mahjong hand that is necessary for winning. Each yaku has a designated han value. Without at least one yaku, a player cannot declare a win.\n'
          }
        </Text>
      </ScrollView>
    </View>
  );
};
