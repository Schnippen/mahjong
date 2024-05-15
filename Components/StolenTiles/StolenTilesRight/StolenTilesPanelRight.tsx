// StolenTilesRight.tsx
import React from 'react';
import { View, FlatList } from 'react-native';
import EmptyComponent from '../../Wall/EmptyComponent';
import { StolenTilesPlayerFRONT, StolenTilesPlayerKANCLOSED } from './StolenTilesRight';
const StolenTilesRight = () => {
  const renderItem = ({ index }: { index: number }) => {
    console.log("StolenTilesRight:",index+1);
    let indexProp=index+1
    return (
      <View style={{ height: 100, justifyContent: 'center' }}>
        <StolenTilesPlayerKANCLOSED index={indexProp} />
      </View>
    );
  };

  return (
    <FlatList
      data={['1']}
      renderItem={renderItem}
      ListEmptyComponent={<EmptyComponent />}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      inverted
      scrollEnabled={false}
    />
  );
};

export default StolenTilesRight;
