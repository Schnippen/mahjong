import React, {useCallback, useRef, useState} from 'react';
import {FlatList, Platform, Share, StyleSheet, Text, View} from 'react-native';
import {tilesData} from '../Data/tilesData';
import EmptyComponent from '../Components/Wall/EmptyComponent';
import {YakuType} from '../Types/types';
import {EndRoundScreenCurentDorasList} from '../Components/EndRoundScreenComponents/EndRoundScreenCurentDorasList';
import {EndRoundScreenCurentUraDorasList} from '../Components/EndRoundScreenComponents/EndRoundScreenCurentUraDorasList';
import {YakuRow} from '../Components/EndRoundScreenComponents/YakuRow';
import {RootState} from '../Store/store';
import {useAppSelector} from '../Store/hooks';
import {WinningHand} from '../Components/EndRoundScreenComponents/WinningHandComponent';
import {resetToNextRound} from '../Functions/resetToNextRound';
import {useAppDispatch} from '../Store/hooks';
import {Button} from '@rneui/themed';
import {captureScrenshot} from '../Functions/utils/captureScreenshot';
import ScoreContainer from '../Components/EndRoundScreenComponents/EndRoundScreenScoreContainer';
import EndRoundScreenDoras from '../Components/EndRoundScreenComponents/EndRoundScreenDoras';
import EndRoundScreenUraDoras from '../Components/EndRoundScreenComponents/EndRoundScreenUraDoras';

//TODO love this
/* onLayout={(event) => {
  const {x, y, width, height} = event.nativeEvent.layout;
  console.log(x,y,width,height)
}} */

function EndRoundScreen({navigation}: {navigation: any}) {
  const topPanelBackgroundColor = '#3c7fc3';
  const panelBackgroundColor = 'rgba(22, 60, 85, 0.9)';
  const exampleData = tilesData.slice(12, 25);
  const exampleData2 = tilesData.slice(25, 26);
  //props, winning hand of a player, winning tile by tsumo or ron

  const dispatch = useAppDispatch();

  const YakuList = () => {
    const winningHand = useAppSelector(
      (state: RootState) => state.gameReducer.winningHand,
    );
    let winningHandData = winningHand.yakuList;
    let yakuListExample: YakuType[] = [
      {han: 1, yakuName: 'ToiToi'},
      {han: 3, yakuName: 'Tanyao'},
      {han: 1, yakuName: 'Junchan'},
      {han: 2, yakuName: 'Yakuhai'},
      {han: 13, yakuName: 'Chinitsu'},
      {han: 4, yakuName: 'Tsuuiisou'},
    ];

    return (
      <View
        style={{
          backgroundColor: 'brown',
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

  const ButtonContainers = ({
    dispatch,
    navigation,
  }: {
    dispatch: any;
    navigation: any;
  }) => {
    return (
      <View
        style={{
          backgroundColor: 'blue',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          flex: 1,
        }}>
        <Button
          title="[◉°]"
          buttonStyle={{
            borderColor: 'rgba(78, 116, 289, 1)',
            borderRadius: 8,
          }}
          type="outline"
          raised
          titleStyle={{color: 'rgba(78, 116, 289, 1)'}}
          containerStyle={{
            width: 50,
            /*         marginHorizontal: 50,
        marginVertical: 10, */
            borderRadius: 8,
          }}
          onPress={() => {
            console.log('SCRENSHOT Pressed'),
              /*    hasAndroidPermission()
        savePicture() */
              captureScrenshot();
          }}
        />
        <Button
          title="OK"
          buttonStyle={{
            borderColor: 'rgba(78, 116, 289, 1)',
            borderRadius: 8,
          }}
          type="outline"
          raised
          titleStyle={{color: 'rgba(78, 116, 289, 1)'}}
          containerStyle={{
            width: 80,
            /*         marginHorizontal: 50,
        marginVertical: 10, */
            borderRadius: 8,
          }}
          onPress={() => resetToNextRound({dispatch, navigation})}
        />
      </View>
    );
  };

  //TODO https://github.com/gre/react-native-view-shot

  /* const captureViewShot =async ()=> {
const imageURI = await viewShotRef.current.capture()
Share.share({title:"Image",url:imageURI})
} */
  /* savePicture() */

  /* 
  const captureViewShot = async () => {
    const uri = await viewShotRef.current.capture();
    console.log('Captured image URI:', uri);
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.save(uri, { type: 'photo', album: 'YourAlbumName' });
    Share.open({ title: 'Image', url: uri });
  }; */

  // wait for all animations to finish
  //https://github.com/gre/react-native-view-shot?tab=readme-ov-file#capturescreen-android-and-ios-only
  //TODO add sound of snapshot
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: panelBackgroundColor,
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'flex-start',
            //paddingTop: 2,
          }}>
          <EndRoundScreenDoras />
          <EndRoundScreenUraDoras />
        </View>
        <WinningHand />
        <YakuList />
        <View style={{flexDirection: 'row', flex: 1, backgroundColor: 'lime'}}>
          <ScoreContainer />
          <ButtonContainers dispatch={dispatch} navigation={navigation} />
        </View>
      </View>
    </View>
  );
}
//later show global scores??? maybe add table like in mahjongsoft
//add stars 1st, 2nd etc
export default EndRoundScreen;
