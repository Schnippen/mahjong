import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
  ExampleYakuData,
  getYakuDataByName,
  RulesScreenClosedHandBracket,
  RulesScrenClosedHandComponent,
  SmallStyledText,
} from '../RulesComponents';
import ButtonYakuExample from '../../Buttons/ButtonYakuExample';

export const RulesScreenNoYaku = () => {
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
      <View style={{marginBottom: 20}} />
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
      <View style={{marginBottom: 20}} />
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
      <View style={{marginBottom: 20}} />
    </ScrollView>
  );
};
export const RulesScreen1Han = ({navigation}: {navigation: any}) => {
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
        <View style={{width: '100%'}}>
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
      <View style={{marginBottom: 20}} />
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
      <View style={{marginBottom: 20}} />
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Seat Wind'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with a Triplet or Quad of your allocated Seat Winds in your hand.
      </Text>
      <View style={{marginBottom: 20}} />
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Prevailing wind'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with a Triplet or Quad of Prevailing Winds in your hand.
      </Text>
      <View style={{marginBottom: 20}} />
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Dragons'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with a Triplet or Quad of White, Green or Red Dragons in your hand.
      </Text>
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Dragons',
          data: getYakuDataByName('Dragons'),
        }}
      />
      <View style={{marginBottom: 20}} />
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
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{name: 'Tanyao', data: getYakuDataByName('Tanyao')}}
      />
      <View style={{marginBottom: 20}} />
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
      {/*      <ButtonYakuExample
        
        screen="RulesScreenYakuExample"
        params={{name: 'Ippatsu', data: 'pootis'}}
      /> */}
      <View style={{marginBottom: 20}} />
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
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{name: 'Pinfu', data: getYakuDataByName('Pinfu')}}
      />
      <View style={{marginBottom: 20}} />
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Iipeukou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with a closed hand containing two identical Sequences.
      </Text>
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{name: 'Iipeukou', data: getYakuDataByName('Iipeukou')}}
      />
      {/*TODO Chankan rinshan kaihou houtei raoyui hatei raoyue*/}
      <View style={{marginBottom: 20}} />
    </ScrollView>
  );
}; //TODO add examples
export const RulesScreen2Han = ({navigation}: {navigation: any}) => {
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
        text={'Double Riichi'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Declare Riichi with your starting hand in the first uninterrupted turn
        (no player calls Chii, Pon, or Kan).
      </Text>
      <View style={{marginBottom: 20}} />
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{width: '100%'}}>
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
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{name: 'Chiitoitsu', data: getYakuDataByName('Chiitoitsu')}}
      />
      <View style={{marginBottom: 20}} />
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Toitoi'}
        center={false}
      />
      <Text style={{fontSize: 20}}>Win with four Triplets or Quads.</Text>
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{name: 'ToiToi', data: getYakuDataByName('ToiToi')}}
      />
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{marginBottom: 20}} />
        <View style={{width: '100%'}}>
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
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{name: 'Ittsu', data: getYakuDataByName('Ittsu')}}
      />
      <View style={{marginBottom: 20}} />
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Sanshoku Doukou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with three Triplets or Quads of the same number, one in each suit.
      </Text>
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Sanshoku Doukou',
          data: getYakuDataByName('Sanshoku Doukou'),
        }}
      />
      <View style={{marginBottom: 20}} />
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
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Sanshoku Doujun',
          data: getYakuDataByName('Sanshoku Doujun'),
        }}
      />
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Sankantsu'}
        center={false}
      />
      <Text style={{fontSize: 20}}>Win with four Triplets or Quads.</Text>
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Sankantsu',
          data: getYakuDataByName('Sankantsu'),
        }}
      />
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Sanankou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with three Concealed Triplets or Quads.
      </Text>
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Sanankou',
          data: getYakuDataByName('Sanankou'),
        }}
      />
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
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Shousangen',
          data: getYakuDataByName('Shousangen'),
        }}
      />
      <View style={{marginBottom: 20}} />
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
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Honroutou',
          data: getYakuDataByName('Honroutou'),
        }}
      />
      <View style={{marginBottom: 20}} />
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{flexDirection: 'row', flex: 1 / 2, alignItems: 'center'}}>
          <SmallStyledText
            dHeight={dimensionsView.height}
            dWidth={dimensionsView.width}
            text={'Chantaiyao'}
            center={false}
          />
          <RulesScrenClosedHandComponent text={'Closed: 2 Han, Open: 1 Han'} />
        </View>
      </RulesScreenClosedHandBracket>
      <Text style={{fontSize: 20}}>
        Win with four Sequences, Triplets or Quads and a pair. All groups and
        the pair must contain Terminal and/or Honor Tiles. (Terminals: 1-Man,
        9-Man, 1-Pin, 9-Pin, 1-Sou, 9-Sou; Honors: East, South, West and North
        Winds, White, Green and Red Dragons. Worth one Han less if the hand is
        open)
      </Text>
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Chantaiyao',
          data: getYakuDataByName('Chantaiyao'),
        }}
      />
      <View style={{marginBottom: 20}} />
    </ScrollView>
  );
};
export const RulesScreen36Han = ({navigation}: {navigation: any}) => {
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
        <View style={{flexDirection: 'row', flex: 1 / 2, alignItems: 'center'}}>
          <SmallStyledText
            dHeight={dimensionsView.height}
            dWidth={dimensionsView.width}
            text={'Ryanpeikou'}
            center={false}
          />
          <RulesScrenClosedHandComponent text={'3 Han - Closed hand only'} />
        </View>
      </RulesScreenClosedHandBracket>
      <Text style={{fontSize: 20}}>
        Win with four Sequences forming two distinct lipeikou (two identical
        Sequences) in your closed hand. This Yaku does not combine with
        Chiitoitsu.
      </Text>
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Ryanpeikou',
          data: getYakuDataByName('Ryanpeikou'),
        }}
      />
      <View style={{marginBottom: 20}} />
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{flexDirection: 'row', flex: 1 / 2, alignItems: 'center'}}>
          <SmallStyledText
            dHeight={dimensionsView.height}
            dWidth={dimensionsView.width}
            text={'Junchan Taiyao'}
            center={false}
          />
          <RulesScrenClosedHandComponent text={'Closed: 3 Han, Open: 2 Han'} />
        </View>
      </RulesScreenClosedHandBracket>
      <Text style={{fontSize: 20}}>
        Win with four Sequences, Triplets or Quads containing Terminals, and a
        pair of Terminals in your hand. (Worth one Han less if the hand is open)
      </Text>
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Junchan Taiyao',
          data: getYakuDataByName('Junchan Taiyao'),
        }}
      />
      <View style={{marginBottom: 20}} />
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{width: '100%'}}>
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
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Honitsu',
          data: getYakuDataByName('Honitsu'),
        }}
      />
      <View style={{marginBottom: 20}} />
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
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Chinistsu',
          data: getYakuDataByName('Chinistsu'),
        }}
      />
      <View style={{marginBottom: 20}} />
    </ScrollView>
  );
};
export const RulesScreenYakuman = ({navigation}: {navigation: any}) => {
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
      <View style={{marginBottom: 20}} />
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
      <View style={{marginBottom: 20}} />
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
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Daisangen',
          data: getYakuDataByName('Daisangen'),
        }}
      />
      <View style={{marginBottom: 20}} />
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Suuankou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with four Concealed Triplets in your closed hand.
      </Text>
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Suuankou',
          data: getYakuDataByName('Suuankou'),
        }}
      />
      <View style={{marginBottom: 20}} />
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Tsuuiisou'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with a hand containing only Honor Tiles.
      </Text>
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Tsuuiisou',
          data: getYakuDataByName('Tsuuiisou'),
        }}
      />
      <View style={{marginBottom: 20}} />
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
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Ryuuiisou',
          data: getYakuDataByName('Ryuuiisou'),
        }}
      />
      <View style={{marginBottom: 20}} />
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
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Chinroutou',
          data: getYakuDataByName('Chinroutou'),
        }}
      />
      <View style={{marginBottom: 20}} />
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{marginBottom: 20}} />
        <View style={{width: '100%'}}>
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
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Kokushi Musou',
          data: getYakuDataByName('Kokushi Musou'),
        }}
      />
      <View style={{marginBottom: 20}} />
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
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Shousuunshii',
          data: getYakuDataByName('Shousuunshii'),
        }}
      />
      <View style={{marginBottom: 20}} />
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Suukantsu'}
        center={false}
      />
      <Text style={{fontSize: 20}}>Win with a hand containing four Quads.</Text>
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Suukantsu',
          data: getYakuDataByName('Suukantsu'),
        }}
      />
      <View style={{marginBottom: 20}} />
      <RulesScreenClosedHandBracket dimensionsViewwidth={dimensionsView.width}>
        <View style={{width: '100%'}}>
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
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Chuuren Poutou',
          data: getYakuDataByName('Chuuren Poutou'),
        }}
      />
      <View style={{marginBottom: 20}} />
    </ScrollView>
  );
}; //TODO there is probably no code for Chiihou
export const RulesScreenDoubleYakuman = ({navigation}: {navigation: any}) => {
  const [dimensionsView, setDimensionsView] = useState({width: 0, height: 0});
  const onLayoutView = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    if (width !== dimensionsView.width || height !== dimensionsView.height) {
      setDimensionsView({width, height});
    }
  };
  return (
    <ScrollView style={{flex: 1}} onLayout={onLayoutView}>
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
        center={false}
      />
      <Text style={{fontSize: 20}}>
        Win with four Triplets or Quads of Wind Tiles
      </Text>
      <ButtonYakuExample
        screen="RulesScreenYakuExample"
        params={{
          name: 'Daisuushii',
          data: getYakuDataByName('Daisuushii'),
        }}
      />
      <View style={{marginBottom: 20}} />
    </ScrollView>
  );
};
export const RulesScreenRyuukyoku = () => {
  const [dimensionsView, setDimensionsView] = useState({width: 0, height: 0});
  const onLayoutView = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    if (width !== dimensionsView.width || height !== dimensionsView.height) {
      setDimensionsView({width, height});
    }
  };
  //textBreakStrategy="balanced"
  return (
    <ScrollView style={{flex: 1}} onLayout={onLayoutView}>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Suukaikan'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        The game will end as an abortive draw when two or more players meld a
        total of four Quads.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Kyuushu Kyuuhai'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        When you have nine or more different Terminal and/or Honor Tiles, you
        may abort your hand in the first turn before any tiles are called.
      </Text>
      <SmallStyledText
        dHeight={dimensionsView.height}
        dWidth={dimensionsView.width}
        text={'Suucha Riichi'}
        center={false}
      />
      <Text style={{fontSize: 20}}>
        The game will end as an abortive draw when all four players declare
        Riichi.
      </Text>
      <View style={{marginBottom: 20}} />
    </ScrollView>
  );
};
