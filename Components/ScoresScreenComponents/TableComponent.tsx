import React from 'react';
import {View} from 'react-native';

export const TableComponent = ({children}: {children?: any}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        maxHeight: 274,
        paddingTop: 10,
        paddingHorizontal: 10,
      }}>
      {children}
    </View>
  );
};
