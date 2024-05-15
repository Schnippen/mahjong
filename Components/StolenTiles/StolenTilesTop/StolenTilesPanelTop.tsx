import React from 'react'
import { FlatList, View } from 'react-native'
import EmptyComponent from '../../Wall/EmptyComponent'
import { StolenTilesPlayerFRONT, StolenTilesPlayerKANCLOSED, StolenTilesPlayerRIGHT } from './StolenTilesTop'

const StolenTilesTop=()=> {

    const renderItem=()=>{
        return(
        <View style={{height:100,justifyContent:"center"}}>
          <StolenTilesPlayerRIGHT/>
        </View>
        )
    }

  return (
        <FlatList data={["1","1","1","1"]} 
        renderItem={renderItem}
        ListEmptyComponent={<EmptyComponent/>}     
        keyExtractor={(item, index) => index.toString()}
        horizontal
        inverted
        scrollEnabled={false}
        />
  )
}

export default StolenTilesTop