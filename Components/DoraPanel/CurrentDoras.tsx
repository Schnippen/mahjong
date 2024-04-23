import React from "react";
import { FlatList } from "react-native";
import { mahjongTilesSVGsArray } from "../../Assets/MahjongTiles/MahjongTiles";
import { DoraTileComponent } from "./DoraTileComponent";

export const CurrentDoras=()=>{
    const currentDoras1=mahjongTilesSVGsArray.slice(3,8)
    const renderItem = ({ item }:{item:string}) => (
      <DoraTileComponent svg={item} tileRatioProp={1} />
    );
    return(
      <FlatList
      data={currentDoras1}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      scrollEnabled={false}
      style={{backgroundColor:"pink"}}
    />
    
    )
  }