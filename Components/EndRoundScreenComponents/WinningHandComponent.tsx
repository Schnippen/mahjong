import React from 'react';
import {useAppSelector} from '../../Store/hooks';
import {FlatList, Text, View} from 'react-native';
import {RootState} from '../../Store/store';
import EmptyComponent from '../Wall/EmptyComponent';
import {tilesData} from '../../Data/tilesData';
import {WinningHandTile} from './WinningHandTile';
import {Dimensions} from 'react-native';

/* const LastWinningTile = () => {
  return (
    <View
      style={{
        height: 56,
        backgroundColor: 'purple',
        justifyContent: 'center',
        position: 'relative',
      }}
      onLayout={event => {
        const {x, y, width, height} = event.nativeEvent.layout;
        console.log(x, y, width, height);
      }}>
      <View
        style={{
          position: 'absolute',
          width: 100,
          backgroundColor: 'black',
          top: -40,
          left: -32,
          alignItems: 'center',
          justifyContent: 'center',
          height: 36,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 26}}>RON</Text>
      </View>
      <View
        style={{
          height: 66,
          width: 46,
          position: 'absolute',
          backgroundColor: 'pink',
          left: (36 - 46) / 2,
          borderWidth: 4,
          borderColor: '#fbd54e',
          borderRadius: 8,
        }}
      />
      <WinningHandTile item={exampleData2[0]} index={14} />
    </View>
  );
}; */

//animated ron or tsumo
/*        <View
         style={{
           position: 'absolute',
           width: 100,
           backgroundColor: 'black',
           top: -40,
           left: -32,
           alignItems: 'center',
           justifyContent: 'center',
           height: 36,
         }}>
         <Text style={{fontWeight: 'bold', fontSize: 26}}>RON</Text>
       </View>; */

export const WinningHand = () => {
  // winning hand state
  const exampleData = tilesData.slice(12, 25);
  const exampleData2 = tilesData.slice(25, 26);
  const {hand: winningHand, winningTile} = useAppSelector(
    (state: RootState) => state.gameReducer.winningHand,
  );
  let data = winningTile[0] === null ? exampleData2[0] : winningTile[0];
  console.log('WINNING TILE', data);
  //const screenWidth = Dimensions.get('screen').width;

  return (
    //maybe make container wider
    <View
      style={{
        backgroundColor: 'blue',
        width: '100%',
        height: 70,
        borderRadius: 8,
        paddingHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: 470,
          height: 56,
          backgroundColor: 'blue',
          justifyContent: 'center',
        }}>
        <FlatList
          horizontal={true}
          scrollEnabled={false}
          data={winningHand} //winning hand
          renderItem={({item, index}) => (
            <WinningHandTile key={index} item={item} index={index} />
          )}
          ListEmptyComponent={<EmptyComponent />}
          initialNumToRender={13}
          keyExtractor={(item, index) => item.tileID.toString()}
        />
      </View>
      <View style={{width: 40, backgroundColor: 'yellow', height: 40}}></View>
      <View
        style={{
          height: 56,
          backgroundColor: 'purple',
          justifyContent: 'center',
          position: 'relative',
          width: 39,
        }}
        /* onLayout={event => {
          const {x, y, width, height} = event.nativeEvent.layout;
          console.log(x, y, width, height);
        }} */
      >
        <View
          style={{
            position: 'absolute',
            width: 100,
            backgroundColor: 'black',
            top: -40,
            left: -32,
            alignItems: 'center',
            justifyContent: 'center',
            height: 36,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 26}}>RON</Text>
        </View>
        <View
          style={{
            height: 66,
            width: 46,
            position: 'absolute',
            backgroundColor: 'pink',
            left: (36 - 46) / 2,
            borderWidth: 4,
            borderColor: '#fbd54e',
            borderRadius: 8,
          }}
        />
        <WinningHandTile item={exampleData2[0]} index={14} />
      </View>
    </View>
  );
};
