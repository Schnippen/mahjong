import React, {ReactNode} from 'react';
import {Text, View} from 'react-native';
import {tilesData} from '../../Data/tilesData';
import {TTileObject} from '../../Types/types';
import DoraTileComponent from '../DoraPanel/DoraTileComponent';
import {colorFaceLayer} from '../../Data/colors';
//TODO make style responsive
export const dataExample = tilesData.slice(0, 9);
export const RulesDataSou = tilesData.slice(0, 9);
export const RulesDataPinzu = tilesData.slice(36, 45);
export const RulesDataManzu = tilesData.slice(72, 81);
export const RulesDataWinds = [
  tilesData.slice(120, 121),
  tilesData.slice(125, 126),
  tilesData.slice(130, 131),
  tilesData.slice(134, 135),
].flat();
export const RulesDataDragons = [
  tilesData.slice(108, 109),
  tilesData.slice(112, 113),
  tilesData.slice(119, 120),
].flat();
export const RulesDataSequenceFirst = [
  tilesData.slice(39, 42),
  tilesData.slice(72, 75),
  tilesData.slice(78, 81),
].flat();
export const RulesDataSequenceSecond = [
  tilesData.slice(8, 11),
  tilesData.slice(38, 40),
  tilesData.slice(4, 5),
  tilesData.slice(112, 113),
  tilesData.slice(108, 109),
  tilesData.slice(119, 120),
].flat();
export const RulesDataTriplet = [
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
export const RulesDataKantsu = [
  tilesData.slice(36, 37),
  tilesData.slice(36, 37),
  tilesData.slice(36, 37),
  tilesData.slice(36, 37),
  tilesData.slice(119, 120),
  tilesData.slice(119, 120),
  tilesData.slice(119, 120),
  tilesData.slice(119, 120),
].flat();
export const RulesDataKantsuSecond = [
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
  tilesData.slice(5, 6),
  tilesData.slice(5, 6),
  tilesData.slice(5, 6),
  tilesData.slice(5, 6),
].flat();
export const renderItemRules = ({
  item,
  index,
}: {
  item: TTileObject;
  index: number;
}) => {
  return (
    <DoraTileComponent svg={item.image} tileRatioProp={1.3} uncovered={true} />
  );
};
export const SequenceRenderItem = ({
  item,
  index,
}: {
  item: TTileObject;
  index: number;
}) => {
  return (
    <View style={{marginRight: (index + 1) % 3 === 0 ? 10 : 0}}>
      {renderItemRules({item, index})}
    </View>
  );
};
export const KantsuRenderItem = ({
  item,
  index,
}: {
  item: TTileObject;
  index: number;
}) => {
  return (
    <View style={{marginRight: (index + 1) % 4 === 0 ? 10 : 0}}>
      {renderItemRules({item, index})}
    </View>
  );
};
export const SmallStyledText = ({
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
        fontSize: Math.min(dWidth, dHeight) * 0.08, // Dynamic text size, but is there a better way to do this?
        color: 'white',
        paddingVertical: 5,
        fontFamily: 'TheLastShuriken',
        //backgroundColor: 'pink',
      }}>
      {text}
    </Text>
  );
};

export const RulesScrenClosedHandComponent = ({text}: {text: string}) => {
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
export const RulesScreenClosedHandBracket = ({
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
