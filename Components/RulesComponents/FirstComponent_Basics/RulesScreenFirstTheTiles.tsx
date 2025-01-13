import React from 'react';
import EmptyComponent from '../../Wall/EmptyComponent';
import {ScrollView, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {
  renderItemRules,
  RulesDataDragons,
  RulesDataManzu,
  RulesDataPinzu,
  RulesDataSou,
  RulesDataWinds,
  SmallStyledText,
} from '../RulesComponents';
export const TheNumberedTiles = ({
  dimensionsView,
}: {
  dimensionsView: {['width']: number; ['height']: number};
}) => {
  return (
    <ScrollView>
      <View style={{marginTop: 30}}>
        <FlashList
          data={RulesDataSou}
          renderItem={renderItemRules}
          estimatedItemSize={9}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          estimatedListSize={{height: 60, width: dimensionsView.width}}
          scrollEnabled={false}
          ListEmptyComponent={<EmptyComponent />}
        />
        <SmallStyledText
          text={'Souzu (aka Sou, Bamboo, Sticks)'}
          dWidth={dimensionsView.width}
          dHeight={dimensionsView.height}
        />
      </View>
      <View>
        <FlashList
          data={RulesDataPinzu}
          renderItem={renderItemRules}
          estimatedItemSize={9}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          scrollEnabled={false}
          estimatedListSize={{height: 60, width: dimensionsView.width}}
          ListEmptyComponent={<EmptyComponent />}
        />
        <SmallStyledText
          text={'Pinzu (aka Pin, Circles, Dots)'}
          dWidth={dimensionsView.width}
          dHeight={dimensionsView.height}
        />
      </View>
      <View style={{marginBottom: 30}}>
        <FlashList
          data={RulesDataManzu}
          renderItem={renderItemRules}
          estimatedItemSize={9}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          scrollEnabled={false}
          estimatedListSize={{height: 60, width: dimensionsView.width}}
          ListEmptyComponent={<EmptyComponent />}
        />
        <SmallStyledText
          text={'Manzu (aka Man, Characters)'}
          dWidth={dimensionsView.width}
          dHeight={dimensionsView.height}
        />
      </View>
    </ScrollView>
  );
};
export const TheHonorTiles = ({
  dimensionsView,
}: {
  dimensionsView: {['width']: number; ['height']: number};
}) => {
  return (
    <>
      <View style={{alignItems: 'center', height: 100}}>
        <FlashList
          data={RulesDataWinds}
          renderItem={renderItemRules}
          estimatedItemSize={9}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          estimatedListSize={{height: 60, width: dimensionsView.width}}
          scrollEnabled={false}
          ListEmptyComponent={<EmptyComponent />}
        />
        <SmallStyledText
          text={'East, South, West, North respectively'}
          dWidth={dimensionsView.width}
          dHeight={dimensionsView.height}
        />
      </View>
    </>
  );
};
export const TheDragonsTiles = ({
  dimensionsView,
}: {
  dimensionsView: {['width']: number; ['height']: number};
}) => {
  return (
    <>
      <View style={{alignItems: 'center', height: 100}}>
        <FlashList
          data={RulesDataDragons}
          renderItem={renderItemRules}
          estimatedItemSize={9}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          estimatedListSize={{height: 60, width: dimensionsView.width}}
          scrollEnabled={false}
          ListEmptyComponent={<EmptyComponent />}
        />
        <SmallStyledText
          text={'Green, Red, White respectively'}
          dWidth={dimensionsView.width}
          dHeight={dimensionsView.height}
        />
      </View>
    </>
  );
};
