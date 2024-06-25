import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {tilesData} from '../Data/tilesData';
import EmptyComponent from '../Components/Wall/EmptyComponent';
import {TTileObject} from '../Types/types';
import PlayersTileOnHand from '../Components/PlayerControls/PlayerTileOnHand';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

function EndRoundScreen() {
  const topPanelBackgroundColor = '#3c7fc3';
  const panelBackgroundColor = 'rgba(22, 60, 85, 0.9)';
  const exampleData = tilesData.slice(12, 26);

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const handleButton = () => {
    console.log('haptic button');
    ReactNativeHapticFeedback.trigger('impactLight', options);
  };
  //https://reactnative.dev/docs/vibration

  const RenderItem = ({item, index}: {item: TTileObject; index: number}) => {
    return <PlayersTileOnHand svg={item.image} tileRatioProp={1.3} />;
  };

  const WinningHand = () => {
    return (
      <View style={{backgroundColor: 'red', width: 600, height: 64}}>
        <FlashList
          horizontal={true}
          scrollEnabled={false}
          data={exampleData}
          renderItem={RenderItem}
          ListEmptyComponent={<EmptyComponent />}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={14}
        />
      </View>
    );
  };

  const YakuRow = () => {
    //it will be animated
    //fade in one after another
    //add voice calls
    return (
      <View>
        <Text>HATSU</Text>
        <Text>1 HAN</Text>
      </View>
    );
  };

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
          width: '90%',
          height: 300,
          borderRadius: 8,
        }}>
        <View
          style={{
            backgroundColor: topPanelBackgroundColor,
            height: 20,
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
          }}></View>
        <Text>EndRoundScreen</Text>
        <Text>Doras</Text>
        <Text>URA DORA</Text>
        <Text>Winning Hand:</Text>
        <WinningHand />
        {/*     <Text>Win by TSUMO OR RON</Text>
        <Text>TABLE WITH YAKUS</Text>
        <Text>Player X won</Text>
        <Text>Table with each player</Text>
        <Text>in corner 50fu 2 HAN</Text>
        <Text>3200!! Points</Text>
        <Text>player's name</Text>
        <Text>screenshot button</Text>
        <Text>next round button</Text> */}
        <Button title="haptic" onPress={() => handleButton()} />
      </View>
    </View>
  );
}
//later show global scores??? mayme add table like in mahjongsoft
//add stars 1st, 2nd etc
export default EndRoundScreen;
