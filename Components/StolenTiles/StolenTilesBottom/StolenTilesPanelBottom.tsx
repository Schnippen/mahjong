import React from 'react'
import { View,FlatList } from 'react-native'
import EmptyComponent from '../../Wall/EmptyComponent'
import { StolenTilesPlayerFRONT, StolenTilesPlayerKANCLOSED, StolenTilesPlayerKANFRONT, StolenTilesPlayerKANLEFT, StolenTilesPlayerKANRIGHT, StolenTilesPlayerLEFT, StolenTilesPlayerRIGHT } from './StolenTilesBottom'
import {useSelector} from 'react-redux';
import {RootState} from '../../../Store/store';
import { TstolenTiles } from '../../../Types/types';

const StolenTilesPanelBottom=()=> {
    const state = useSelector(
        (state: RootState) => state.handReducer.player1StolenTiles,
      );
     /*  StolenTilesPlayerLEFT
      StolenTilesPlayerRIGHT
      StolenTilesPlayerFRONT
      StolenTilesPlayerKANLEFT
      StolenTilesPlayerKANRIGHT
      StolenTilesPlayerKANFRONT
      StolenTilesPlayerKANCLOSED */


      const renderItem = ({ item }: { item: TstolenTiles }) => {
        let itemName = item.name;
        console.log(item.tiles.map(t=>t.name))
        if (itemName === "left") {
          return <StolenTilesPlayerLEFT data={item}/>;
        } else if (itemName === "right") {
          return <StolenTilesPlayerRIGHT  data={item}/>;
        } else if (itemName === "top") {
          return <StolenTilesPlayerFRONT  data={item}/>;
        } else if (itemName === "kanLeft") {
          return <StolenTilesPlayerKANLEFT  data={item}/>;
        } else if (itemName === "kanRight") {
          return <StolenTilesPlayerKANRIGHT  data={item} />;
        } else if (itemName === "kanFront") {
          return <StolenTilesPlayerKANFRONT   data={item}/>;
        } else if (itemName === "kanClosed") {
          return <StolenTilesPlayerKANCLOSED   data={item}/>;
        } else {
          return (
            <View style={{ height: 100, justifyContent: "center" }}>
              {/* You can add a default view or component here */}
            </View>
          );
        }
      };
    

  return (
        <FlatList data={state} 
        renderItem={renderItem}
        ListEmptyComponent={<EmptyComponent/>}     
        keyExtractor={(item, index) => index.toString()}
        horizontal
        inverted
        scrollEnabled={false}
        />
  )
}

export default StolenTilesPanelBottom