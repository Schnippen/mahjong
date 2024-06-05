import React from "react";
import { TTileObject } from "../../../Types/types";
import { View } from "react-native";
import PlayerTileOnHand from "../PlayerTileOnHand";

export const SequenceToChoose = (item: TTileObject, index: number) => {
    return (
      <View
        style={{
          height: 80,
          backgroundColor: 'transparent',
          justifyContent: 'center',
        }}>
        <PlayerTileOnHand svg={item.image} tileRatioProp={1} />
      </View>
    );
  };