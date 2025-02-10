import React, {ReactNode} from 'react';
import {Text, View} from 'react-native';
import {tilesData} from '../../Data/tilesData';
import {TTileObject} from '../../Types/types';
import DoraTileComponent from '../DoraPanel/DoraTileComponent';
import {colorFaceLayer} from '../../Data/colors';
import {getFontSize} from '../../Functions/utils/getFontSize';
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

const ExampleDragons = [
  tilesData.slice(72, 78),
  tilesData.slice(42, 45),
  tilesData.slice(0, 1),
  tilesData.slice(0, 1),
  tilesData.slice(119, 120),
  tilesData.slice(119, 120),
  tilesData.slice(119, 120),
].flat();
const ExampleTanyao = [
  tilesData.slice(73, 79),
  tilesData.slice(37, 38),
  tilesData.slice(37, 38),
  tilesData.slice(37, 38),
  tilesData.slice(40, 43),
  tilesData.slice(1, 2),
  tilesData.slice(1, 2),
].flat();
const ExamplePinfu = [
  tilesData.slice(73, 78),
  tilesData.slice(39, 42),
  tilesData.slice(4, 6),
  tilesData.slice(8, 9),
  tilesData.slice(8, 9),
  tilesData.slice(6, 7),
].flat();

const ExampleIipeukou = [
  tilesData.slice(72, 75),
  tilesData.slice(72, 75),
  tilesData.slice(39, 42),
  tilesData.slice(4, 7),
  tilesData.slice(8, 9),
  tilesData.slice(8, 9),
].flat();
const ExampleChiitoitsu = [
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(4, 5),
  tilesData.slice(4, 5),
  tilesData.slice(112, 113),
  tilesData.slice(112, 113),
  tilesData.slice(134, 135),
  tilesData.slice(134, 135),
  tilesData.slice(40, 41),
  tilesData.slice(40, 41),
  tilesData.slice(78, 79),
  tilesData.slice(78, 79),
  tilesData.slice(3, 4),
  tilesData.slice(3, 4),
].flat();
const ExampleToiToi = [
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(4, 5),
  tilesData.slice(4, 5),
  tilesData.slice(4, 5),
  tilesData.slice(112, 113),
  tilesData.slice(112, 113),
  tilesData.slice(112, 113),
  tilesData.slice(78, 79),
  tilesData.slice(78, 79),
  tilesData.slice(78, 79),
  tilesData.slice(134, 135),
  tilesData.slice(134, 135),
].flat();
const ExampleIttsu = [
  tilesData.slice(72, 81),
  tilesData.slice(36, 40),
  tilesData.slice(39, 40),
].flat();
const ExampleSanshokuDoukou = [
  tilesData.slice(74, 75),
  tilesData.slice(74, 75),
  tilesData.slice(74, 75),
  tilesData.slice(38, 39),
  tilesData.slice(38, 39),
  tilesData.slice(38, 39),
  tilesData.slice(2, 3),
  tilesData.slice(2, 3),
  tilesData.slice(2, 3),
  tilesData.slice(6, 9),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
].flat();
const ExampleSanshokuDoujun = [
  tilesData.slice(72, 75),
  tilesData.slice(36, 39),
  tilesData.slice(0, 3),
  tilesData.slice(3, 6),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
].flat();
const ExampleSankantsu = [
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
  tilesData.slice(37, 38),
  tilesData.slice(37, 38),
  tilesData.slice(37, 38),
  tilesData.slice(37, 38),
  tilesData.slice(3, 4),
  tilesData.slice(3, 4),
  tilesData.slice(3, 4),
  tilesData.slice(3, 4),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
].flat();
const ExampleSanankou = [
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(73, 74),
  tilesData.slice(73, 74),
  tilesData.slice(73, 74),
  tilesData.slice(74, 75),
  tilesData.slice(74, 75),
  tilesData.slice(74, 75),
  tilesData.slice(41, 44),
  tilesData.slice(1, 2),
  tilesData.slice(1, 2),
].flat();
const ExampleShousangen = [
  tilesData.slice(72, 75),
  tilesData.slice(39, 42),
  tilesData.slice(108, 109),
  tilesData.slice(108, 109),
  tilesData.slice(108, 109),
  tilesData.slice(112, 113),
  tilesData.slice(112, 113),
  tilesData.slice(112, 113),
  tilesData.slice(119, 120),
  tilesData.slice(119, 120),
].flat();
const ExampleHonroutou = [
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(80, 81),
  tilesData.slice(80, 81),
  tilesData.slice(80, 81),
  tilesData.slice(36, 37),
  tilesData.slice(36, 37),
  tilesData.slice(36, 37),
  tilesData.slice(8, 9),
  tilesData.slice(8, 9),
  tilesData.slice(8, 9),
  tilesData.slice(119, 120),
  tilesData.slice(119, 120),
].flat();
const ExampleChantaiyao = [
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(36, 39),

  tilesData.slice(42, 45),

  tilesData.slice(6, 9),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
].flat();
const ExampleRyanpeikou = [
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(73, 74),
  tilesData.slice(73, 74),
  tilesData.slice(74, 75),
  tilesData.slice(74, 75),
  tilesData.slice(48, 49),
  tilesData.slice(48, 49),
  tilesData.slice(49, 50),
  tilesData.slice(49, 50),
  tilesData.slice(51, 52),
  tilesData.slice(51, 52),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
].flat();
const ExampleJunchanTaiyao = [
  tilesData.slice(72, 75),
  tilesData.slice(78, 81),
  tilesData.slice(48, 49),
  tilesData.slice(48, 49),
  tilesData.slice(49, 50),
  tilesData.slice(49, 50),
  tilesData.slice(51, 52),
  tilesData.slice(51, 52),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
].flat();
const ExampleHonitsu = [
  tilesData.slice(72, 78),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
  tilesData.slice(125, 126),
  tilesData.slice(125, 126),
  tilesData.slice(125, 126),
  tilesData.slice(119, 120),
  tilesData.slice(119, 120),
].flat();
const ExampleChinistsu = [
  tilesData.slice(72, 77),
  tilesData.slice(76, 77),
  tilesData.slice(76, 77),
  tilesData.slice(77, 78),
  tilesData.slice(77, 78),
  tilesData.slice(78, 79),
  tilesData.slice(78, 79),
  tilesData.slice(79, 80),
  tilesData.slice(80, 81),
].flat();
const ExampleDaisangen = [
  tilesData.slice(72, 75),
  tilesData.slice(37, 38),
  tilesData.slice(37, 38),
  tilesData.slice(108, 109),
  tilesData.slice(108, 109),
  tilesData.slice(108, 109),
  tilesData.slice(112, 113),
  tilesData.slice(112, 113),
  tilesData.slice(112, 113),
  tilesData.slice(119, 120),
  tilesData.slice(119, 120),
  tilesData.slice(119, 120),
].flat();
const ExampleSuuankou = [
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(2, 3),
  tilesData.slice(2, 3),
  tilesData.slice(2, 3),
  tilesData.slice(4, 5),
  tilesData.slice(4, 5),
  tilesData.slice(4, 5),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
  tilesData.slice(125, 126),
  tilesData.slice(125, 126),
  tilesData.slice(125, 126),
].flat();
const ExampleTsuuiisou = [
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
  tilesData.slice(125, 126),
  tilesData.slice(125, 126),
  tilesData.slice(125, 126),
  tilesData.slice(130, 131),
  tilesData.slice(130, 131),
  tilesData.slice(130, 131),
  tilesData.slice(108, 109),
  tilesData.slice(108, 109),
  tilesData.slice(108, 109),
  tilesData.slice(112, 113),
  tilesData.slice(112, 113),
].flat();
const ExampleRyuuiisou = [
  tilesData.slice(1, 2),
  tilesData.slice(1, 2),
  tilesData.slice(1, 2),
  tilesData.slice(2, 3),
  tilesData.slice(2, 3),
  tilesData.slice(2, 3),
  tilesData.slice(3, 4),
  tilesData.slice(3, 4),
  tilesData.slice(3, 4),
  tilesData.slice(5, 6),
  tilesData.slice(5, 6),
  tilesData.slice(5, 6),
  tilesData.slice(112, 113),
  tilesData.slice(112, 113),
].flat();
const ExampleChinroutou = [
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(80, 81),
  tilesData.slice(80, 81),
  tilesData.slice(80, 81),
  tilesData.slice(36, 37),
  tilesData.slice(36, 37),
  tilesData.slice(36, 37),
  tilesData.slice(44, 45),
  tilesData.slice(44, 45),
  tilesData.slice(44, 45),
  tilesData.slice(8, 9),
  tilesData.slice(8, 9),
].flat();
const ExampleKokushiMusou = [
  tilesData.slice(72, 73),
  tilesData.slice(80, 81),
  tilesData.slice(36, 37),
  tilesData.slice(44, 45),
  tilesData.slice(0, 1),
  tilesData.slice(0, 1),
  tilesData.slice(8, 9),
  tilesData.slice(120, 121),
  tilesData.slice(125, 126),
  tilesData.slice(130, 131),
  tilesData.slice(134, 135),
  tilesData.slice(108, 109),
  tilesData.slice(112, 113),
  tilesData.slice(119, 120),
].flat();
const ExampleShousuunshii = [
  tilesData.slice(72, 75),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
  tilesData.slice(125, 126),
  tilesData.slice(125, 126),
  tilesData.slice(125, 126),
  tilesData.slice(130, 131),
  tilesData.slice(130, 131),
  tilesData.slice(130, 131),
  tilesData.slice(134, 135),
  tilesData.slice(134, 135),
].flat();
const ExampleSuukantsu = [
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
  tilesData.slice(75, 76),
  tilesData.slice(37, 38),
  tilesData.slice(37, 38),
  tilesData.slice(37, 38),
  tilesData.slice(37, 38),
  tilesData.slice(1, 2),
  tilesData.slice(1, 2),
  tilesData.slice(1, 2),
  tilesData.slice(1, 2),

  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
].flat();
const ExampleChuurenPoutou = [
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(72, 81),
  tilesData.slice(80, 81),
  tilesData.slice(80, 81),
].flat();
const ExampleDaisuushii = [
  tilesData.slice(72, 73),
  tilesData.slice(72, 73),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
  tilesData.slice(120, 121),
  tilesData.slice(125, 126),
  tilesData.slice(125, 126),
  tilesData.slice(125, 126),
  tilesData.slice(130, 131),
  tilesData.slice(130, 131),
  tilesData.slice(130, 131),
  tilesData.slice(134, 135),
  tilesData.slice(134, 135),
  tilesData.slice(134, 135),
].flat();
export const ExampleYakuData = [
  {name: 'Dragons', data: ExampleDragons},
  {name: 'Tanyao', data: ExampleTanyao},
  {name: 'Pinfu', data: ExamplePinfu},
  {name: 'Iipeukou', data: ExampleIipeukou},
  {name: 'Chiitoitsu', data: ExampleChiitoitsu},
  {name: 'ToiToi', data: ExampleToiToi},
  {name: 'Ittsu', data: ExampleIttsu},
  {name: 'Sanshoku Doukou', data: ExampleSanshokuDoukou},
  {name: 'Sanshoku Doujun', data: ExampleSanshokuDoujun},
  {name: 'Sankantsu', data: ExampleSankantsu},
  {name: 'Sanankou', data: ExampleSanankou},
  {name: 'Shousangen', data: ExampleShousangen},
  {name: 'Chantaiyao', data: ExampleChantaiyao},
  {name: 'Ryanpeikou', data: ExampleRyanpeikou},
  {name: 'Junchan Taiyao', data: ExampleJunchanTaiyao},
  {name: 'Honitsu', data: ExampleHonitsu},
  {name: 'Chinistsu', data: ExampleChinistsu},
  {name: 'Daisangen', data: ExampleDaisangen},
  {name: 'Suuankou', data: ExampleSuuankou},
  {name: 'Tsuuiisou', data: ExampleTsuuiisou},
  {name: 'Ryuuiisou', data: ExampleRyuuiisou},
  {name: 'Chinroutou', data: ExampleChinroutou},
  {name: 'Kokushi Musou', data: ExampleKokushiMusou},
  {name: 'Shousuunshii', data: ExampleShousuunshii},
  {name: 'Chuuren Poutou', data: ExampleChuurenPoutou},
  {name: 'Daisuushii', data: ExampleDaisuushii},
];
export const getYakuDataByName = (name: string): TTileObject[] => {
  const yaku = ExampleYakuData.find(item => item.name === name);
  return yaku ? yaku.data : [];
};
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
  let textSize = getFontSize(22);
  return (
    <Text
      textBreakStrategy="balanced"
      style={{
        width: '100%',
        textAlign: center ? 'center' : 'left',
        fontSize: textSize, // Dynamic text size, but is there a better way to do this? YES getFontSize function! 10.02.2025,
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
        height: 26,
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
