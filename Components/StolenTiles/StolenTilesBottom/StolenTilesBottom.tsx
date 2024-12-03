import React from 'react';
import {View} from 'react-native';
import {mahjongTilesSVGsArray} from '../../../Assets/MahjongTiles/MahjongTiles';
import {
  StolenTileComponentPlayerHORIZONTAL,
  StolenTileComponentPlayerVERTICAL,
  StolenTileComponentPlayerVERTICALReversed,
} from '../StolenTilesBottom/StolenTilesBottomComponents';
import {TstolenTiles} from '../../../Types/types';
let placeHolder = `<svg width="100" height="100">
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="green"
      stroke-width="4"
      fill="yellow"
    />
  </svg>`;

export const StolenTilesPlayerLEFT = ({data}: {data: TstolenTiles}) => {
  //const shit = mahjongTilesSVGsArray
  //console.log("stolenTIlesBottom:",data)
  let image = data.tiles[0].image?data.tiles[0].image:placeHolder

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        width: 150,
        height: 115,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <StolenTileComponentPlayerHORIZONTAL
        svg={image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
    </View>
  );
};

export const StolenTilesPlayerRIGHT = ({data}: {data: TstolenTiles}) => {
  //const shit = mahjongTilesSVGsArray  
  let image = data.tiles[0].image?data.tiles[0].image:placeHolder

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        width: 150,
        height: 115,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerHORIZONTAL
        svg={image}
        tileRatioProp={1.5}
      />
    </View>
  );
};

export const StolenTilesPlayerFRONT = ({data}: {data: TstolenTiles}) => {
  let image = data.tiles[0].image?data.tiles[0].image:placeHolder

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        width: 150,
        height: 115,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerHORIZONTAL
        svg={image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
    </View>
  );
};

export const StolenTilesPlayerKANLEFT = ({data}: {data: TstolenTiles}) => {
  let image = data.tiles[0].image?data.tiles[0].image:placeHolder

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        width: 195,
        height: 80,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <StolenTileComponentPlayerHORIZONTAL
        svg={image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
    </View>
  );
};
export const StolenTilesPlayerKANRIGHT = ({data}: {data: TstolenTiles}) => {
  let image = data.tiles[0].image?data.tiles[0].image:placeHolder

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        width: 195,
        height: 115,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerHORIZONTAL
        svg={image}
        tileRatioProp={1.5}
      />
    </View>
  );
};
export const StolenTilesPlayerKANFRONT = ({data}: {data: TstolenTiles}) => {
  //TODO be sure that rowGap changes accordingly to perspective
  let image = data.tiles[0].image?data.tiles[0].image:placeHolder

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        width: 155,
        height: 115,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
      <View style={{flexDirection: 'column', rowGap: -18}}>
        <StolenTileComponentPlayerHORIZONTAL
          svg={image}
          tileRatioProp={1.5}
        />
        <StolenTileComponentPlayerHORIZONTAL
          svg={image}
          tileRatioProp={1.5}
        />
      </View>
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
    </View>
  );
};
export const StolenTilesPlayerKANCLOSED = ({data}: {data: TstolenTiles}) => {
  console.log('STOLEN KAN:', data.name);
  let image = data.tiles[0].image?data.tiles[0].image:placeHolder
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        width: 181,
        height: 115,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <StolenTileComponentPlayerVERTICALReversed
        svg={image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICAL
        svg={image}
        tileRatioProp={1.5}
      />
      <StolenTileComponentPlayerVERTICALReversed
        svg={image}
        tileRatioProp={1.5}
      />
    </View>
  );
};

//TODO check if kans work as intended
