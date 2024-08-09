import React from 'react';
import {View} from 'react-native';
import {mahjongTilesSVGsArray} from '../../../Assets/MahjongTiles/MahjongTiles';
import {
  StolenTileComponentPlayerHORIZONTAL,
  StolenTileComponentPlayerVERTICAL,
  StolenTileComponentPlayerVERTICALReversed,
} from '../StolenTilesBottom/StolenTilesBottomComponents';
import {TstolenTiles} from '../../../Types/types';

export const StolenTilesPlayerLEFT = ({data}: {data: TstolenTiles}) => {
  //const shit = mahjongTilesSVGsArray
  //console.log("stolenTIlesBottom:",data)
  return (
    <View
      style={{
        backgroundColor: 'brown',
        width: 150,
        height: 80,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <StolenTileComponentPlayerHORIZONTAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
    </View>
  );
};

export const StolenTilesPlayerRIGHT = ({data}: {data: TstolenTiles}) => {
  //const shit = mahjongTilesSVGsArray
  return (
    <View
      style={{
        backgroundColor: 'brown',
        width: 150,
        height: 80,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerHORIZONTAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
    </View>
  );
};

export const StolenTilesPlayerFRONT = ({data}: {data: TstolenTiles}) => {
  return (
    <View
      style={{
        backgroundColor: 'brown',
        width: 150,
        height: 80,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerHORIZONTAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
    </View>
  );
};

export const StolenTilesPlayerKANLEFT = ({data}: {data: TstolenTiles}) => {
  return (
    <View
      style={{
        backgroundColor: 'brown',
        width: 195,
        height: 80,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <StolenTileComponentPlayerHORIZONTAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
    </View>
  );
};
export const StolenTilesPlayerKANRIGHT = ({data}: {data: TstolenTiles}) => {
  return (
    <View
      style={{
        backgroundColor: 'brown',
        width: 195,
        height: 80,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerHORIZONTAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
    </View>
  );
};
export const StolenTilesPlayerKANFRONT = ({data}: {data: TstolenTiles}) => {
  //TODO be sure that rowGap changes accordingly to perspective
  return (
    <View
      style={{
        backgroundColor: 'brown',
        width: 195,
        height: 80,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
      <View style={{flexDirection: 'column', rowGap: -18}}>
        <StolenTileComponentPlayerHORIZONTAL
          svg={data.tiles[0].image}
          tileRatioProp={1.5}
        />
        <StolenTileComponentPlayerHORIZONTAL
          svg={data.tiles[0].image}
          tileRatioProp={1.5}
        />
      </View>
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
    </View>
  );
};
export const StolenTilesPlayerKANCLOSED = ({data}: {data: TstolenTiles}) => {
  console.log('STOLEN KAN:',data.tiles[0]); //TODO when i add values to  data.tiles[0] it creates error,
  return (
    <View
      style={{
        backgroundColor: 'brown',
        width: 181,
        height: 80,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <StolenTileComponentPlayerVERTICALReversed
        /* svg={data.tiles[0].image} */
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={data.tiles[0].image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICALReversed
       /*  svg={data.tiles[0].image} */
        tileRatioProp={1.5}
      />
    </View>
  );
};


//TODO check if kans work as intended 