import React from 'react'
import { View } from 'react-native'

function DeadWall() {
  return (
    <View
     style={{
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        height: 80,
        position: 'relative',
      }}>
      {/* <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        horizontal={true}
      /> */}
    </View>  )
}

export default DeadWall