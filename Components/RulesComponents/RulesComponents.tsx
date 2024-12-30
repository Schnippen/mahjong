import React, {useState} from 'react';
import {FlatList, ScrollView, Dimensions, Text, View} from 'react-native';
import {Divider} from '@rneui/themed';
import {
  RulesCallChii,
  RulesCallingTilesFirst,
  RulesCallingTilesSecond,
  RulesCallKan,
  RulesCallPon,
  RulesCallRon,
  RulesCallTsumo,
  RulesFlowers,
  RulesKan,
  RulesOverview,
  RulesPlayingFirstParagraph,
  RulesPlayingSecondParagraph,
  RulesPlayingThirdParagraph,
  RulesTheHand,
  RulesTheTiles,
} from '../../Data/RulesData';
import EmptyComponent from '../Wall/EmptyComponent';
import {tilesData} from '../../Data/tilesData';
import {TTileObject} from '../../Types/types';
import DoraTileComponent from '../DoraPanel/DoraTileComponent';

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
  tilesData.slice(3, 4),
  tilesData.slice(3, 4),
  tilesData.slice(3, 4),
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
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
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
const RulesSouTiles = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={RulesDataSou}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        scrollEnabled={false}
        style={{minHeight: 45}}
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};
const RulesPinzuTiles = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={RulesDataPinzu}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        scrollEnabled={false}
        style={{minHeight: 45}}
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};
const RulesManzuTiles = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={RulesDataManzu}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        scrollEnabled={false}
        style={{minHeight: 45}}
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};
const RulesWindsTiles = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={RulesDataWinds}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        scrollEnabled={false}
        style={{minHeight: 45}}
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};
const RulesDragonsTiles = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={RulesDataDragons}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        scrollEnabled={false}
        style={{minHeight: 45}}
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};
const RulesSequenceTilesFirst = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={RulesDataSequenceFirst}
        renderItem={SequenceRenderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        scrollEnabled={false}
        style={{minHeight: 45}}
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};
const RulesSequenceTilesSecond = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={RulesDataSequenceSecond}
        renderItem={SequenceRenderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        scrollEnabled={false}
        style={{minHeight: 45}}
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};
const RulesTripletTiles = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={RulesDataTriplet}
        renderItem={SequenceRenderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        scrollEnabled={false}
        style={{minHeight: 45}}
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};
const RulesKantsuTiles = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={RulesDataKantsu}
        renderItem={KantsuRenderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        scrollEnabled={false}
        style={{minHeight: 45}}
        getItemLayout={(data, index) => ({
          length: 39,
          offset: 39 * index,
          index,
        })}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};
const BoldTitle = ({
  text,
  height = 60,
  fontHeight = height * 0.66,
  centerHorizontally = false,
  normal = false,
}: {
  text: string;
  normal?: boolean;
  height?: number;
  fontHeight?: number;
  centerHorizontally?: boolean;
}) => {
  return (
    <View
      style={{
        flex: 1,
        height: 60,
        alignSelf: centerHorizontally ? 'center' : 'auto',
      }}>
      <Text
        style={{
          fontSize: fontHeight,
          justifyContent: 'center',
          fontFamily: 'TheLastShuriken',
          fontWeight: normal ? 'bold' : 'normal',
        }}>
        {text}
      </Text>
    </View>
  );
};
const Divider80Percent = () => {
  return (
    <View
      style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Divider style={{width: '80%', marginVertical: 12}} insetType="middle" />
    </View>
  );
};
const ParagraphView = ({
  paragraph,
  fontSize = 20,
  centerText = false,
}: {
  paragraph: string;
  fontSize?: number;
  centerText?: boolean;
}) => {
  return (
    <View
      style={{
        backgroundColor: 'gray',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
      }}>
      <Text
        style={{
          fontSize: fontSize,
          textAlign: 'left', // Better alignment for multiple lines
          lineHeight: 28, // Improve readability
          paddingHorizontal: 15,
          maxWidth: '100%',
          alignSelf: centerText ? 'center' : 'flex-start',
        }}>
        {paragraph}
      </Text>
    </View>
  );
};
export const FirstComponent = () => {
  return (
    <ScrollView style={{padding: 10}}>
      <BoldTitle text="Basics" />
      <ParagraphView paragraph={RulesOverview} />
      <Divider80Percent />
      <BoldTitle text="The Tiles" />
      <ParagraphView paragraph={RulesTheTiles} />
      <BoldTitle
        text="Souzu (aka Sou, Bamboo, Sticks):"
        height={40}
        centerHorizontally={true}
      />
      <RulesSouTiles />
      <ParagraphView
        centerText={true}
        paragraph={`Note that the 1 Sou is represented with a bird, usually a peacock or owl, rather than a single stick`}
      />
      <BoldTitle
        text="Pinzu (aka Pin, Circles, Dots):"
        height={40}
        centerHorizontally={true}
      />
      <RulesPinzuTiles />
      <BoldTitle
        text="Manzu (aka Man, Characters, Cracks):"
        height={40}
        centerHorizontally={true}
      />
      <RulesManzuTiles />
      <ParagraphView
        centerText={true}
        paragraph={`The numbers are represented with the Chinese/Japanese number
        characters`}
      />
      <BoldTitle text="Winds:" height={40} centerHorizontally={true} />
      <RulesWindsTiles />
      <ParagraphView
        centerText={true}
        paragraph={`(East, South, West, North respectively)`}
      />
      <BoldTitle text="Dragons:" height={40} centerHorizontally={true} />
      <RulesDragonsTiles />
      <ParagraphView
        centerText={true}
        paragraph={`(Green, Red, White respectively)`}
      />
      <Divider80Percent />
      <ParagraphView centerText={true} paragraph={RulesFlowers} />
      <Divider80Percent />
      <BoldTitle text="The Hand" />
      <ParagraphView paragraph={RulesTheHand} />
      <Divider80Percent />
      <ParagraphView
        paragraph={`The core aim of a player while playing mahjong is to create a winning hand by forming sets. There are three types of set:`}
      />
      <BoldTitle
        text="Sequence (Shuntsu)"
        height={40}
        centerHorizontally={true}
      />
      <ParagraphView
        paragraph={`This is the easiest set to form, and consist of a run of three consecutive tiles of the same suit, for example:`}
      />
      <RulesSequenceTilesFirst />
      <ParagraphView
        paragraph={`A sequence cannot wrap around the ends of a suit, cannot be made of tiles from different suits and cannot be made from honour tiles, so the following are not valid sequences:`}
      />
      <RulesSequenceTilesSecond />
      <Divider80Percent />
      <BoldTitle
        text="Triplet (Koutsu)"
        height={40}
        centerHorizontally={true}
      />
      <ParagraphView
        centerText={true}
        paragraph={`A triplet consists of three of the same tile, eg:`}
      />
      <RulesTripletTiles />
      <Divider80Percent />
      <BoldTitle text="Kan (Kantsu)" height={40} centerHorizontally={true} />
      <RulesKantsuTiles />
      <ParagraphView paragraph={RulesKan} />
      <View style={{marginBottom: 40}} />
    </ScrollView>
  );
};

export const SecondComponent = () => {
  return (
    <ScrollView style={{padding: 10}}>
      <BoldTitle text="Playing" />
      <ParagraphView paragraph={RulesPlayingFirstParagraph} />
      <ParagraphView paragraph={RulesPlayingSecondParagraph} />
      <ParagraphView paragraph={RulesPlayingThirdParagraph} />
      <Divider80Percent />
      <BoldTitle text="Calling Tiles" />
      <BoldTitle
        text={RulesCallingTilesFirst}
        height={40}
        centerHorizontally={true}
        normal={true}
      />
      <ParagraphView paragraph={RulesCallChii} />
      <ParagraphView paragraph={RulesCallPon} />
      <ParagraphView paragraph={RulesCallKan} />
      <ParagraphView paragraph={RulesCallRon} />
      <ParagraphView paragraph={RulesCallTsumo} />
      {/*   <ParagraphView paragraph={RulesCallingTilesSecond} /> add this later*/}
      <Divider80Percent />

      <BoldTitle text="Winds:" height={40} centerHorizontally={true} />
      <Divider80Percent />
      <BoldTitle text="Winning" />
      <Divider80Percent />
      <BoldTitle text="Riichi" />
      <Divider80Percent />
      <BoldTitle text="Dora" />
    </ScrollView>
  );
};
export const ThirdComponent = () => {
  return <View></View>;
};
