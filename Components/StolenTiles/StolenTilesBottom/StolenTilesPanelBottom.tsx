import React from 'react'
import { View,FlatList } from 'react-native'
import EmptyComponent from '../../Wall/EmptyComponent'
import { StolenTilesPlayerFRONT } from './StolenTilesBottom'

const StolenTilesPanelBottom=()=> {

    const renderItem=()=>{
        return(
        <View style={{height:100,justifyContent:"center"}}>
            {/* <StolenTilesPlayerFRONT/> */}
        </View>
        )
    }

  return (
        <FlatList data={["1",]} 
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