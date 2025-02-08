import React from 'react';
import {Text, View} from 'react-native';

export const TableCell = ({data}: {data?: string | number}) => {
  return (
    <View
      style={{
        minHeight: 34,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
      }}>
      <Text
        style={[
          {color: 'black', fontFamily: 'TheLastShuriken', fontSize: 14},
          {textAlign: 'center'},
        ]}
        adjustsFontSizeToFit={true}
        numberOfLines={1}>
        {data}
      </Text>
    </View>
  );
};
