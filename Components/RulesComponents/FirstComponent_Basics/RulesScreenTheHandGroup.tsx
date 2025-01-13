import {ButtonGroup} from '@rneui/themed';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {MahjongTileColor} from '../../../Data/colors';
import {
  KantsuRenderItem,
  RulesDataKantsu,
  RulesDataKantsuSecond,
  RulesDataSequenceFirst,
  RulesDataSequenceSecond,
  RulesDataTriplet,
  SequenceRenderItem,
  SmallStyledText,
} from '../RulesComponents';
import {FlashList} from '@shopify/flash-list';
import EmptyComponent from '../../Wall/EmptyComponent';

const RulesScreenTheHand = ({
  dimensionsView,
}: {
  dimensionsView: {['width']: number; ['height']: number};
}) => {
  return (
    <View style={{flex: 1, paddingVertical: 10}}>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'The Hand'}
      />
      <Text style={{fontSize: 16, lineHeight: 24, marginBottom: 10}}>
        Players start with 13 tiles. On each turn:{'\n'}- Draw 1 tile from the
        wall or claim a discard, making 14 tiles temporarily.{'\n'}- If the hand
        has 4 groups and 1 pair (3+3+3+3+2=14) and includes a valid yaku, the
        player can declare a win.{'\n'}- If not, discard 1 tile to return to 13
        tiles.{'\n'}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          width: '100%',
          fontSize: 16,
        }}>
        The goal is to form sets to create a winning hand
      </Text>
    </View>
  );
};
const RulesScreenSequence = ({
  dimensionsView,
}: {
  dimensionsView: {['width']: number; ['height']: number};
}) => {
  return (
    <View style={{flex: 1, paddingVertical: 10}}>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Sequence'}
      />
      <Text style={{fontSize: 16, textAlign: 'center'}}>
        A sequence consists of three consecutive number tiles of the same suit.
        {'\n'}
      </Text>
      <FlashList
        data={RulesDataSequenceFirst}
        renderItem={SequenceRenderItem}
        estimatedItemSize={9}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        estimatedListSize={{height: 60, width: dimensionsView.width}}
        scrollEnabled={false}
        ListEmptyComponent={<EmptyComponent />}
      />
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          marginTop: 10,
        }}>
        Note: Not all linear tile arrangements qualify as sequences.{'\n'}
      </Text>
      <FlashList
        data={RulesDataSequenceSecond}
        renderItem={SequenceRenderItem}
        estimatedItemSize={9}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        estimatedListSize={{height: 60, width: dimensionsView.width}}
        scrollEnabled={false}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};
const RulesScreenTriplet = ({
  dimensionsView,
}: {
  dimensionsView: {['width']: number; ['height']: number};
}) => {
  return (
    <View style={{flex: 1, paddingVertical: 10}}>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Triplet'}
      />
      <Text style={{fontSize: 16, marginBottom: 10}}>
        A triplet is three identical tiles:{'\n'}- Melded Triplet: Formed by
        calling "pon" or winning with "ron" on a discard.{'\n'}- Concealed
        Triplet: Formed from tiles drawn from the wall.
      </Text>
      <FlashList
        data={RulesDataTriplet}
        renderItem={SequenceRenderItem}
        estimatedItemSize={9}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        estimatedListSize={{height: 60, width: dimensionsView.width}}
        scrollEnabled={false}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};
const RulesScreenKan = ({
  dimensionsView,
}: {
  dimensionsView: {['width']: number; ['height']: number};
}) => {
  return (
    <View style={{flex: 1, paddingVertical: 10}}>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Kan / Quads'}
      />
      <Text style={{fontSize: 16, marginBottom: 10}}>
        A quad is four identical tiles:{'\n'}- Melded Quad: Declared using a
        discard.{'\n'}- Concealed Quad: Created from drawn tiles.
      </Text>
      <FlashList
        data={RulesDataKantsu}
        renderItem={KantsuRenderItem}
        estimatedItemSize={9}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        estimatedListSize={{height: 60, width: dimensionsView.width}}
        scrollEnabled={false}
        ListEmptyComponent={<EmptyComponent />}
      />
      <FlashList
        data={RulesDataKantsuSecond}
        renderItem={KantsuRenderItem}
        estimatedItemSize={9}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        estimatedListSize={{height: 60, width: dimensionsView.width}}
        scrollEnabled={false}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};
export const RulesScreenTheHandGroup = () => {
  const [dimensionsView, setDimensionsView] = useState({width: 0, height: 0});
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const onLayoutView = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    setDimensionsView({width, height});
  };
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <ButtonGroup
        buttons={['The Hand', 'Sequence', 'Triplet', 'Kan']}
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
        textStyle={{fontFamily: 'TheLastShuriken'}}
        selectedButtonStyle={{backgroundColor: '#56A2C4'}}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
        onLayout={onLayoutView}>
        {selectedIndex === 0 ? (
          <RulesScreenTheHand dimensionsView={dimensionsView} />
        ) : selectedIndex === 1 ? (
          <RulesScreenSequence dimensionsView={dimensionsView} />
        ) : selectedIndex === 2 ? (
          <RulesScreenTriplet dimensionsView={dimensionsView} />
        ) : (
          <RulesScreenKan dimensionsView={dimensionsView} />
        )}
      </View>
    </View>
  );
};
