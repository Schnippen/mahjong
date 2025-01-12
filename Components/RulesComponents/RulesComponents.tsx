import React, {ReactDOM, ReactNode, useState} from 'react';
import {FlatList, ScrollView, Dimensions, Text, View} from 'react-native';
import {ButtonGroup, Divider} from '@rneui/themed';
import EmptyComponent from '../Wall/EmptyComponent';
import {tilesData} from '../../Data/tilesData';
import {TTileObject} from '../../Types/types';
import DoraTileComponent from '../DoraPanel/DoraTileComponent';
import {boardColor, colorFaceLayer, MahjongTileColor} from '../../Data/colors';
import {FlashList} from '@shopify/flash-list';
//TODO make style responsive
const dataExample = tilesData.slice(0, 9);
const RulesDataSou = tilesData.slice(0, 9);
const RulesDataPinzu = tilesData.slice(36, 45);
const RulesDataManzu = tilesData.slice(72, 81);
const RulesDataWinds = [
  tilesData.slice(120, 121),
  tilesData.slice(125, 126),
  tilesData.slice(130, 131),
  tilesData.slice(134, 135),
].flat();
const RulesDataDragons = [
  tilesData.slice(108, 109),
  tilesData.slice(112, 113),
  tilesData.slice(119, 120),
].flat();
const RulesDataSequenceFirst = [
  tilesData.slice(39, 42),
  tilesData.slice(72, 75),
  tilesData.slice(78, 81),
].flat();
const RulesDataSequenceSecond = [
  tilesData.slice(8, 11),
  tilesData.slice(38, 40),
  tilesData.slice(4, 5),
  tilesData.slice(112, 113),
  tilesData.slice(108, 109),
  tilesData.slice(119, 120),
].flat();
const RulesDataTriplet = [
  tilesData.slice(40, 41),
  tilesData.slice(40, 41),
  tilesData.slice(40, 41),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
  tilesData.slice(112, 113),
  tilesData.slice(112, 113),
  tilesData.slice(112, 113),
  /*   tilesData.slice(3, 4),
  tilesData.slice(3, 4),
  tilesData.slice(3, 4), */
].flat();
const RulesDataKantsu = [
  tilesData.slice(36, 37),
  tilesData.slice(36, 37),
  tilesData.slice(36, 37),
  tilesData.slice(36, 37),
  tilesData.slice(119, 120),
  tilesData.slice(119, 120),
  tilesData.slice(119, 120),
  tilesData.slice(119, 120),
].flat();
const RulesDataKantsuSecond = [
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
  tilesData.slice(5, 6),
  tilesData.slice(5, 6),
  tilesData.slice(5, 6),
  tilesData.slice(5, 6),
].flat();
const renderItem = ({item, index}: {item: TTileObject; index: number}) => {
  return (
    <DoraTileComponent svg={item.image} tileRatioProp={1.3} uncovered={true} />
  );
};
const SequenceRenderItem = ({
  item,
  index,
}: {
  item: TTileObject;
  index: number;
}) => {
  return (
    <View style={{marginRight: (index + 1) % 3 === 0 ? 10 : 0}}>
      {renderItem({item, index})}
    </View>
  );
};
const KantsuRenderItem = ({
  item,
  index,
}: {
  item: TTileObject;
  index: number;
}) => {
  return (
    <View style={{marginRight: (index + 1) % 4 === 0 ? 10 : 0}}>
      {renderItem({item, index})}
    </View>
  );
};
const SmallStyledText = ({
  text,
  dWidth,
  dHeight,
  center = true,
}: {
  text: string;
  dWidth: number;
  dHeight: number;
  center?: boolean;
}) => {
  return (
    <Text
      textBreakStrategy="balanced"
      style={{
        width: '100%',
        textAlign: center ? 'center' : 'left',
        fontSize: Math.min(dWidth, dHeight) * 0.08, // Dynamic text size
        color: 'white',
        paddingVertical: 5,
        fontFamily: 'TheLastShuriken',
        //backgroundColor: 'pink',
      }}>
      {text}
    </Text>
  );
};

const RulesScrenClosedHandComponent = ({text}: {text: string}) => {
  return (
    <View
      style={{
        backgroundColor: colorFaceLayer,
        minWidth: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 20,
        paddingHorizontal: 5,
      }}>
      <Text>{text}</Text>
    </View>
  );
};
const RulesScreenClosedHandBracket = ({
  children,
  dimensionsViewwidth,
}: {
  dimensionsViewwidth: number;
  children: ReactNode;
}) => {
  return (
    <View
      style={{
        width: dimensionsViewwidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {children}
    </View>
  );
};
const RulesScreenBasics = () => {
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

const TheNumberedTiles = ({
  dimensionsView,
}: {
  dimensionsView: {['width']: number; ['height']: number};
}) => {
  return (
    <ScrollView>
      <View style={{marginTop: 30}}>
        <FlashList
          data={RulesDataSou}
          renderItem={renderItem}
          estimatedItemSize={9}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          estimatedListSize={{height: 60, width: dimensionsView.width}}
          scrollEnabled={false}
          ListEmptyComponent={<EmptyComponent />}
        />
        <SmallStyledText
          text={'Souzu (aka Sou, Bamboo, Sticks)'}
          dWidth={dimensionsView.width}
          dHeight={dimensionsView.height}
        />
      </View>
      <View>
        <FlashList
          data={RulesDataPinzu}
          renderItem={renderItem}
          estimatedItemSize={9}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          scrollEnabled={false}
          estimatedListSize={{height: 60, width: dimensionsView.width}}
          ListEmptyComponent={<EmptyComponent />}
        />
        <SmallStyledText
          text={'Pinzu (aka Pin, Circles, Dots)'}
          dWidth={dimensionsView.width}
          dHeight={dimensionsView.height}
        />
      </View>
      <View style={{marginBottom: 30}}>
        <FlashList
          data={RulesDataManzu}
          renderItem={renderItem}
          estimatedItemSize={9}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          scrollEnabled={false}
          estimatedListSize={{height: 60, width: dimensionsView.width}}
          ListEmptyComponent={<EmptyComponent />}
        />
        <SmallStyledText
          text={'Manzu (aka Man, Characters)'}
          dWidth={dimensionsView.width}
          dHeight={dimensionsView.height}
        />
      </View>
    </ScrollView>
  );
};
const TheHonorTiles = ({
  dimensionsView,
}: {
  dimensionsView: {['width']: number; ['height']: number};
}) => {
  return (
    <>
      <View style={{alignItems: 'center', height: 60}}>
        <FlashList
          data={RulesDataWinds}
          renderItem={renderItem}
          estimatedItemSize={9}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          estimatedListSize={{height: 60, width: dimensionsView.width}}
          scrollEnabled={false}
          ListEmptyComponent={<EmptyComponent />}
        />
        <SmallStyledText
          text={'East, South, West, North respectively'}
          dWidth={dimensionsView.width}
          dHeight={dimensionsView.height}
        />
      </View>
    </>
  );
};
const TheDragonsTiles = ({
  dimensionsView,
}: {
  dimensionsView: {['width']: number; ['height']: number};
}) => {
  return (
    <>
      <View style={{alignItems: 'center', height: 60}}>
        <FlashList
          data={RulesDataDragons}
          renderItem={renderItem}
          estimatedItemSize={9}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          estimatedListSize={{height: 60, width: dimensionsView.width}}
          scrollEnabled={false}
          ListEmptyComponent={<EmptyComponent />}
        />
        <SmallStyledText
          text={'Green, Red, White respectively'}
          dWidth={dimensionsView.width}
          dHeight={dimensionsView.height}
        />
      </View>
    </>
  );
};
const RulesScreenFirstComponentTheTiles = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [dimensionsView, setDimensionsView] = useState({width: 0, height: 0});
  const onLayoutView = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    if (width !== dimensionsView.width || height !== dimensionsView.height) {
      setDimensionsView({width, height});
    }
  };
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
const RulesScreenTheHandGroup = () => {
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

const RulesScreenNoYaku = () => {
  const [dimensionsView, setDimensionsView] = useState({width: 0, height: 0});
  const onLayoutView = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    if (width !== dimensionsView.width || height !== dimensionsView.height) {
      setDimensionsView({width, height});
    }
  };
  return (
    <ScrollView style={{flex: 1}} onLayout={onLayoutView}>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Dora'}
        center={false}
      />

      <Text style={{fontSize: 20}}>
        A tile is flipped at the start of hand, known as a Dora Indicator, and
        its succeeding tile is known as a Dora. Each Dora adds 1 Han to the
        winning hand, and no Han if a hand doesn't win.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Kandora'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        A new Dora Indicator is flipped after a Quad is called, and its
        succeeding tile is know as a Kandora. Each Kandora adds 1 Han to the
        winning hand and no Han if a hand doesn't win
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Uradora'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        The tiles underneath the Dora and Kandora Indicators are flipped after a
        Riichi hand is won. Their succeeding tiles are Uradora, each of which
        adds 1 Han to the hand won with Riichi only. If no hand is won, there'll
        be no Uradora
      </Text>
      <View style={{marginBottom: 20}}></View>
    </ScrollView>
  );
};
const RulesScreen1Han = () => {
  const [dimensionsView, setDimensionsView] = useState({width: 0, height: 0});
  const onLayoutView = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    if (width !== dimensionsView.width || height !== dimensionsView.height) {
      setDimensionsView({width, height});
    }
  };
  return (
    <ScrollView style={{flex: 1}} onLayout={onLayoutView}>
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{flex: 1 / 3}}>
          <SmallStyledText
            dHeight={dimensionsView.height}
            dWidth={dimensionsView.width}
            text={'Riichi'}
            center={false}
          />
        </View>
        <RulesScrenClosedHandComponent text={'Closed hand only'} />
      </RulesScreenClosedHandBracket>
      <Text style={{fontSize: 20}}>
        Win after declaring Riichi. You may declare Riichi with a closed Tenpai
        hand (no Chii, Pon, or Kan), then discard a tile and place a 1,000-point
        Riichi Stick. After that, you cannot call Chii, Pon, or meld a Quad. You
        can make a Concealed Quad only if it doesn't change the original waiting
        pattern.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Ippatsu'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Call Ron or Tsumo within an uninterrupted turn (no player calls Chii,
        Pon, or Kan) after declaring Riichi.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Seat Wind'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with a Triplet or Quad of your allocated Seat Winds in your hand.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Prevailing wind'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with a Triplet or Quad of Prevailing Winds in your hand.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Dragons'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with a Triplet or Quad of White, Green or Red Dragons in your hand.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Tanyao'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with no Terminal or Honor Tiles in your hand. (Terminals: 1-Man,
        9-Man, 1-Pin, 9-Pin, 1-Sou, 9-Sou; Honors: East, South, West and North
        Winds, White, Green and Red Dragons)
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Menzen Tsumo'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win on a self-drawn tile (Tsumo) with your closed hand (no Chii, Pon, or
        Kan). A closed hand will still be closed after declaring a Concealed
        Quad.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Pinfu'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with a closed hand containing four Sequences and a pair (not
        Yakuhai), and the winning tile completes a Sequence with a two-sided
        wait. Sequence: A set of three consecutive tiles of the same suit, such
        as 123-Man, 456-Sou or 789-Pin. Pair (not Yakuhai): Two identical number
        tiles (not Dragons, Seat Winds, or Prevailing Winds). Two-sided wait:
        Winning on either side of a Sequence, such as winning on 1-Man or 4-Man
        with 23-Man. If you have 12-Man, only 3-Man can complete the Sequence,
        which is not a two-sided wait.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Iipeukou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with a closed hand containing two identical Sequences.
      </Text>
      {/*TODO Chankan rinshan kaihou houtei raoyui hatei raoyue*/}
    </ScrollView>
  );
}; //TODO add examples
const RulesScreen2Han = () => {
  const [dimensionsView, setDimensionsView] = useState({width: 0, height: 0});
  const onLayoutView = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    if (width !== dimensionsView.width || height !== dimensionsView.height) {
      setDimensionsView({width, height});
    }
  };
  return (
    <ScrollView
      style={{backgroundColor: 'red', flex: 1}}
      onLayout={onLayoutView}>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Double Riichi'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Declare Riichi with your starting hand in the first uninterrupted turn
        (no player calls Chii, Pon, or Kan).
      </Text>
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{flex: 1 / 3}}>
          <SmallStyledText
            dHeight={dimensionsView.height}
            dWidth={dimensionsView.width}
            text={'Chiitoitsu'}
            center={false}
          />
        </View>
        <RulesScrenClosedHandComponent text={'Closed hand only'} />
      </RulesScreenClosedHandBracket>
      <Text style={{fontSize: 20}}>
        Win with a closed hand containing seven different pairs.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Toitoi'}
        center={false}
      />
      <Text style={{fontSize: 20}}>Win with four Triplets or Quads.</Text>
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{flex: 1 / 3}}>
          <SmallStyledText
            dHeight={dimensionsView.height}
            dWidth={dimensionsView.width}
            text={'Ittsu'}
            center={false}
          />
        </View>
        <RulesScrenClosedHandComponent text={'Closed: 2 Han, Open: 1 Han'} />
      </RulesScreenClosedHandBracket>
      <Text style={{fontSize: 20}}>
        Win with three consecutive Sequences (i.e., 123, 456, 789) in the same
        suit. (Worth one Han less if the hand is open)
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Sanshoku Doukou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with three Triplets or Quads of the same number, one in each suit.
      </Text>
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{flex: 1 / 2}}>
          <SmallStyledText
            dHeight={dimensionsView.height}
            dWidth={dimensionsView.width}
            text={'Sanshoku Doujun'}
            center={false}
          />
        </View>
        <RulesScrenClosedHandComponent text={'Closed: 2 Han, Open: 1 Han'} />
      </RulesScreenClosedHandBracket>
      <Text style={{fontSize: 20}}>
        Win with three Sequences of the same numerical sequence, one in each of
        the three suits. (Worth one Han less if the hand is open)
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Sankantsu'}
        center={false}
      />
      <Text style={{fontSize: 20}}>Win with four Triplets or Quads.</Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Sanankou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with three Concealed Triplets or Quads.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Shousangen'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with a hand containing two Triplets or Quads of Dragons (White,
        Green or Red) plus a pair of Dragons.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Honroutou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with four Triplets or Quads and a pair or Chiitoitsu in your hand
        containing only Terminal and Honor Tiles.
      </Text>
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{flex: 1 / 2}}>
          <SmallStyledText
            dHeight={dimensionsView.height}
            dWidth={dimensionsView.width}
            text={'Chantaiyao'}
            center={false}
          />
        </View>
        <RulesScrenClosedHandComponent text={'Closed: 2 Han, Open: 1 Han'} />
      </RulesScreenClosedHandBracket>
      <Text style={{fontSize: 20}}>
        Win with four Sequences, Triplets or Quads and a pair. All groups and
        the pair must contain Terminal and/or Honor Tiles. (Terminals: 1-Man,
        9-Man, 1-Pin, 9-Pin, 1-Sou, 9-Sou; Honors: East, South, West and North
        Winds, White, Green and Red Dragons. Worth one Han less if the hand is
        open)
      </Text>
    </ScrollView>
  );
};
const RulesScreen36Han = () => {
  const [dimensionsView, setDimensionsView] = useState({width: 0, height: 0});
  const onLayoutView = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    if (width !== dimensionsView.width || height !== dimensionsView.height) {
      setDimensionsView({width, height});
    }
  };
  return (
    <ScrollView style={{flex: 1}} onLayout={onLayoutView}>
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{flex: 1 / 2}}>
          <SmallStyledText
            dHeight={dimensionsView.height}
            dWidth={dimensionsView.width}
            text={'Ryanpeikou'}
            center={false}
          />
        </View>
        <RulesScrenClosedHandComponent text={'3 Han - Closed hand only'} />
      </RulesScreenClosedHandBracket>
      <Text style={{fontSize: 20}}>
        Win with four Sequences forming two distinct lipeikou (two identical
        Sequences) in your closed hand. This Yaku does not combine with
        Chiitoitsu.
      </Text>
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{flex: 1 / 3}}>
          <SmallStyledText
            dHeight={dimensionsView.height}
            dWidth={dimensionsView.width}
            text={'Junchan Taiyao'}
            center={false}
          />
        </View>
        <RulesScrenClosedHandComponent text={'Closed: 3 Han, Open: 2 Han'} />
      </RulesScreenClosedHandBracket>
      <Text style={{fontSize: 20}}>
        Win with four Sequences, Triplets or Quads containing Terminals, and a
        pair of Terminals in your hand. (Worth one Han less if the hand is open)
      </Text>
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{flex: 1 / 3}}>
          <SmallStyledText
            dHeight={dimensionsView.height}
            dWidth={dimensionsView.width}
            text={'Honitsu'}
            center={false}
          />
        </View>
        <RulesScrenClosedHandComponent text={'Closed: 3 Han, Open: 2 Han'} />
      </RulesScreenClosedHandBracket>
      <Text style={{fontSize: 20}}>
        Win with a hand containing Number Tiles in the same suit and Honor
        Tiles. (Worth one Han less if the hand is open)
      </Text>
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{flex: 1 / 2}}>
          <SmallStyledText
            dHeight={dimensionsView.height}
            dWidth={dimensionsView.width}
            text={'Chinistsu'}
            center={false}
          />
        </View>
        <RulesScrenClosedHandComponent text={'Closed: 6 Han, Open: 5 Han'} />
      </RulesScreenClosedHandBracket>
      <Text style={{fontSize: 20}}>
        Win with a hand containing only Number Tiles in the same suit. (Worth
        one Han less if the hand is open)
      </Text>
    </ScrollView>
  );
};
const RulesScreenYakuman = () => {
  const [dimensionsView, setDimensionsView] = useState({width: 0, height: 0});
  const onLayoutView = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    if (width !== dimensionsView.width || height !== dimensionsView.height) {
      setDimensionsView({width, height});
    }
  };
  return (
    <ScrollView style={{flex: 1}} onLayout={onLayoutView}>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Tenhou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win as the dealer East player on your initial self-drawn tile in the
        first turn. *If Tenhou is achieved with Suuankou, Chuuren Poutou, or
        Kokushi Musou, it is always counted as Suuankou Tanki, Chuuren Kyuumen,
        or Kokushi Juusanmen, respectively.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Chiihou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win by Tsumo as a non-dealer not East player on the self-drawn tile in
        the first uninterrupted turn no player calls Chii, Pon, or Kan.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Daisangen'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with three Triplets or Quads of Dragon Tiles (White, Green and Red
        Dragons).
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Suuankou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with four Concealed Triplets in your closed hand.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Suuankou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with four Concealed Triplets in your closed hand.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Tsuuiisou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with a hand containing only Honor Tiles.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Ryuuiisou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with a hand containing only green tiles, i.e., 2-Sou, 3-Sou, 4-Sou,
        6-Sou, 8-Sou and/or Green Dragons.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Chinroutou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with a hand containing only green tiles, i.e., 2-Sou, 3-Sou, 4-Sou,
        6-Sou, 8-Sou and/or Green Dragons.
      </Text>
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{flex: 1 / 3}}>
          <SmallStyledText
            dHeight={dimensionsView.height}
            dWidth={dimensionsView.width}
            text={'Kokushi Musou'}
            center={false}
          />
        </View>
        <RulesScrenClosedHandComponent text={'Closed hand only'} />
      </RulesScreenClosedHandBracket>
      <Text style={{fontSize: 20}}>
        Win with a closed hand containing each of the thirteen different
        Terminal and Honor Tiles, plus one extra Terminal or Honor Tile.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Shousuunshii'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with a hand containing three Triplets or Quads of Wind Tiles and a
        pair of the fourth Wind Tiles.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Suukantsu'}
        center={false}
      />
      <Text style={{fontSize: 20}}>Win with a hand containing four Quads.</Text>
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{flex: 1 / 3}}>
          <SmallStyledText
            dHeight={dimensionsView.height}
            dWidth={dimensionsView.width}
            text={'Chuuren Poutou'}
            center={false}
          />
        </View>
        <RulesScrenClosedHandComponent text={'Closed hand only'} />
      </RulesScreenClosedHandBracket>
      <Text style={{fontSize: 20}}>
        Win with a closed hand consisting of the tiles 1112345678999 in the same
        suit, plus any one extra tile in the same suit.
      </Text>
    </ScrollView>
  );
}; //TODO there is probably no code for Chiihou
const RulesScreenDoubleYakuman = () => {
  const [dimensionsView, setDimensionsView] = useState({width: 0, height: 0});
  const onLayoutView = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    if (width !== dimensionsView.width || height !== dimensionsView.height) {
      setDimensionsView({width, height});
    }
  };
  return (
    <ScrollView style={{backgroundColor: 'red', flex: 1}}>
      {/*   <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Suuankou Tanki'}
      />
      <Text>Closed hand only</Text>
      <Text>
        Achieve Tenpai with a single-wait for Suuankou, and win on a tile that
        forms a pair in your hand.
      </Text> */}
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Daisuushii'}
      />
      <Text>Win with four Triplets or Quads of Wind Tiles</Text>
    </ScrollView>
  );
};
const RulesScreenRyuukyoku = () => {
  const [dimensionsView, setDimensionsView] = useState({width: 0, height: 0});
  const onLayoutView = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    if (width !== dimensionsView.width || height !== dimensionsView.height) {
      setDimensionsView({width, height});
    }
  };
  return (
    <ScrollView style={{backgroundColor: 'red', flex: 1}}>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Suukaikan'}
      />
      <Text>
        The game will end as an abortive draw when two or more players meld a
        total of four Quads.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Kyuushu Kyuuhai'}
      />
      <Text>
        When you have nine or more different Terminal and/or Honor Tiles, you
        may abort your hand in the first turn before any tiles are called.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Suucha Riichi'}
      />
      <Text>
        The game will end as an abortive draw when all four players declare
        Riichi.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'1 Han (No Yaku)'}
      />
      <Text>1</Text>
    </ScrollView>
  );
};

export const RulesScreenThirdComponent = () => {
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
export const RulesScreenFourthComponent = () => {
  return (
    <ScrollView style={{backgroundColor: boardColor}}>
      <Text>TODO</Text>
    </ScrollView>
  );
};
