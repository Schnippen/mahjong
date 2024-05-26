import {TouchableWithoutFeedback, View} from 'react-native';
import {TTileObject} from '../../../Types/types';
import EmptyComponent from '../../Wall/EmptyComponent';
import React from 'react';
import {Text} from '@rneui/themed';
import PlayerTileOnHand from '../PlayerTileOnHand';
import {FlashList} from '@shopify/flash-list';

const DisablePanelButton = () => {
  return (
    <TouchableWithoutFeedback onPress={() => handleDisablePanelButton()}>
      <View
        style={{
          height: 40,
          width: 40,
          backgroundColor: 'rgba(243, 251, 254, 0.3)',
          position: 'absolute',
          right: -10,
          bottom: -5,
          alignItems: 'center',
          borderRadius: 25,
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 35,
            width: 35,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f3fbfe',
          }}>
          <Text>{'<'}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const SequenceToChoose = (item: TTileObject, index: number) => {
  return (
    <View
      style={{
        height: 80,
        backgroundColor: 'transparent',
        justifyContent: 'center',
      }}>
      <PlayerTileOnHand svg={item.image} tileRatioProp={1} />
    </View>
  );
};

const renderItem = (item: TTileObject[], index: number) => {
  console.log(
    'renderItem:',
    item.map(i => i.name),
    index,
  );
  let data = item;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log(`selected ${index + 1} option`),
          handleStealSelectedSequence(index);
      }}>
      <View
        style={{
          height: 80,
          width: 120,
          backgroundColor: 'transparent',
          alignItems: 'center',
        }}>
        <FlashList
          data={data} //array with posible sequences
          renderItem={({item, index}: {item: TTileObject; index: number}) =>
            SequenceToChoose(item, index)
          }
          estimatedItemSize={2}
          horizontal={true}
          ListEmptyComponent={<EmptyComponent />}
          scrollEnabled={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const ChooseSequencePanel = () => {
  const topPanelBackgroundColor = '#3c7fc3';
  const panelBackgroundColor = 'rgba(22, 60, 85, 0.9)';

  return (
    <View
      style={{
        minWidth: 560,
        maxWidth: 600,
        backgroundColor: 'transparent',
        height: 100,
        position: 'absolute',
        bottom: 40,
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 240,
          height: 100,
          backgroundColor: panelBackgroundColor,
          borderRadius: 12,
        }}>
        <View
          style={{
            height: 20,
            width: 240,
            alignItems: 'center',
            backgroundColor: topPanelBackgroundColor,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            position: 'relative',
          }}>
          <Text style={{}}>Select</Text>
          <DisablePanelButton />
        </View>
        <FlashList
          data={chiiPanelState} //array with posible sequences
          renderItem={({item, index}: {item: TTileObject[]; index: number}) =>
            renderItem(item, index)
          }
          estimatedItemSize={2}
          horizontal={true}
          ListEmptyComponent={<EmptyComponent />}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};
export default ChooseSequencePanel;
