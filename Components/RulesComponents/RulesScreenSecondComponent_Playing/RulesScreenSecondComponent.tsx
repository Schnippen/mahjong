import React, {useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {boardColor} from '../../../Data/colors';
import {SmallStyledText} from '../RulesComponents';

export const RulesScreenSecondComponent = () => {
  const [dimensions, setDimensions] = useState({width: 0, height: 0});

  const onLayout = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    setDimensions({width, height});
  };
  return (
    <ScrollView
      style={{
        padding: 10,
        backgroundColor: boardColor,
      }}
      onLayout={onLayout}>
      <SmallStyledText
        dHeight={dimensions.height}
        dWidth={dimensions.width}
        text={'Playing'}
      />
      <Text
        adjustsFontSizeToFit={true}
        style={{
          width: '100%',
          fontSize: 20,
        }}>
        {'Tiles are shuffled into walls, and players get 13 tiles each.\n'}
        {'The dealer starts by drawing a tile, then discards one.\n'}
        {
          'Play moves counterclockwise, with players drawing or calling tiles to form sets.\n\n'
        }
        {'Sets can be melded (face-up) or concealed.\n'}
        {
          'A winning hand has 14 tiles (4 sets + 1 pair) and must include a yaku.\n'
        }
        {
          'Play ends when a player wins or the wall is depleted (except the dead wall).\n\n'
        }
        {
          'Riichi can be declared if the hand is closed and one tile from winning.\n'
        }
        {'Riichi adds value to the hand but limits further changes.\n'}
        {
          'The game ends after South round or if a player’s points drop below zero.\n'
        }
      </Text>
    </ScrollView>
  );
};
