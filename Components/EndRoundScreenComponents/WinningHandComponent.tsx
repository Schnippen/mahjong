import React from 'react';
import {useAppSelector} from '../../Store/hooks';
import {FlatList, Text, View} from 'react-native';
import {RootState} from '../../Store/store';
import EmptyComponent from '../Wall/EmptyComponent';
import {tilesData} from '../../Data/tilesData';
import {WinningHandTile} from './WinningHandTile';
import {Dimensions} from 'react-native';
export const WinningHand = () => {
  // winning hand state
  const exampleData2 = tilesData.slice(25, 26);
  /* const {hand: winningHand, winningTile} = useAppSelector(
    (state: RootState) => state.gameReducer.winningHand,
  );
  const {winningAction} = useAppSelector(
    (state: RootState) => state.gameReducer.winningHand,
  ); */
  const {
    gameReducer: {winningHand},
  } = useAppSelector((state: RootState) => state);
  //let data = winningTile[0] !== null ? winningTile[0] : exampleData2[0];
  let winningHandDisplay = winningHand.hand;
  let winningTile = winningHand.winningTile;
  let winningAction = winningHand.winningAction;
  console.log(
    'endRoundScreen winningHandDisplay:',
    winningHandDisplay.map(i => i.name),
  );
  console.log(
    'endRoundScreen winningHand:',
    winningTile.map(t => t.name),
  );
  console.log('endRoundScreen totalHan:', winningHand.totalHan);
  console.log('endRoundScreen fu:', winningHand.fu);
  //console.log('WINNING TILE', data);
  //const screenWidth = Dimensions.get('screen').width;

  return (
    //maybe make container wider
    <View
      style={{
        backgroundColor: 'transparent',
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
          backgroundColor: 'transparent',
          justifyContent: 'center',
        }}>
        <FlatList
          horizontal={true}
          scrollEnabled={false}
          data={winningHandDisplay} //winning hand
          renderItem={({item, index}) => (
            <WinningHandTile key={index} item={item} index={index} />
          )}
          ListEmptyComponent={<EmptyComponent />}
          initialNumToRender={13}
          keyExtractor={(item, index) => item.tileID.toString()}
        />
      </View>
      <View
        style={{width: 40, backgroundColor: 'transparent', height: 40}}></View>
      <View
        style={{
          height: 56,
          backgroundColor: 'transparent',
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
            backgroundColor: 'transparent',
            top: -40,
            left: -32,
            alignItems: 'center',
            justifyContent: 'center',
            height: 36,
          }}>
          <Text
            style={{
              fontFamily: 'TheLastShuriken',
              fontSize: 20,
              color: '#fbd54e',
            }}>
            {winningAction}
          </Text>
        </View>
        <View
          style={{
            height: 66,
            width: 46,
            position: 'absolute',
            backgroundColor: 'transparent',
            left: (36 - 46) / 2,
            borderWidth: 4,
            borderColor: '#fbd54e',
            borderRadius: 8,
          }}
        />
        <FlatList
          horizontal={true}
          scrollEnabled={false}
          data={winningTile} //winning hand
          renderItem={({item, index}) => (
            <WinningHandTile key={index} item={item} index={index} />
          )}
          ListEmptyComponent={<EmptyComponent />}
          initialNumToRender={13}
          keyExtractor={(item, index) => item.tileID.toString()}
        />
      </View>
    </View>
  );
};
