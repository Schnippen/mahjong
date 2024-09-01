import React from 'react';
import {useAppSelector} from '../../Store/hooks';
import {RootState} from '../../Store/store';
import {YakuType} from '../../Types/types';
import {FlatList, View} from 'react-native';
import EmptyComponent from '../Wall/EmptyComponent';
import {YakuRow} from './YakuRow';

const YakuList = () => {
  const winningHand = useAppSelector(
    (state: RootState) => state.gameReducer.winningHand,
  );
  let winningHandData = winningHand.yakuList;
  /*   let yakuListExample: YakuType[] = [
    {han: 1, yakuName: 'ToiToi'},
    {han: 3, yakuName: 'Tanyao'},
    {han: 1, yakuName: 'Junchan'},
    {han: 2, yakuName: 'Yakuhai'},
    {han: 13, yakuName: 'Chinitsu'},
    {han: 4, yakuName: 'Tsuuiisou'},
  ];
 */
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        width: '100%',
        paddingHorizontal: 5,
        minHeight: 136,
      }}>
      <FlatList
        data={winningHandData}
        ListEmptyComponent={<EmptyComponent />}
        renderItem={({item, index}) => (
          <YakuRow
            key={index}
            data={item}
            time={index * 2400} /* onRendered={handleRendered} */
          />
        )}
        numColumns={4}
        columnWrapperStyle={{columnGap: 10, marginVertical: 2}}
        contentContainerStyle={{marginVertical: 5}}
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default YakuList;
