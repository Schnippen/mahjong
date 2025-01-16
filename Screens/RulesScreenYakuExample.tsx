import React from 'react';
import {FlatList, StatusBar, Text, View} from 'react-native';
import EmptyComponent from '../Components/Wall/EmptyComponent';
import {renderItemRules} from '../Components/RulesComponents/RulesComponents';
import {boardColor} from '../Data/colors';
import {TTileObject} from '../Types/types';
import {ButtonGoBack} from '../Components/Buttons/ButtonGoBack';
import ButtonYakuGoBack from '../Components/Buttons/ButtonYakuGoBack';

const RulesScreenYakuExample = ({
  route,
}: {
  route: {params: {name: string; data: TTileObject[]}};
}) => {
  const {name, data} = route.params;
  /*   console.log(
    'RulesScreenYakuExample',
    'data: ',
    data.length,
    data.map(i => i.name),
  ); */
  const YakuExampleFlatlist = ({data}: {data: TTileObject[]}) => {
    if (!data || data.length === 0) {
      return <View />;
    }

    return (
      <FlatList
        data={data}
        renderItem={renderItemRules}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={true}
        ListEmptyComponent={<EmptyComponent />}
        horizontal
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: boardColor,
        padding: 10,
      }}>
      <StatusBar hidden={true} />
      <View style={{position: 'absolute', top: 20, right: 20, zIndex: 999}}>
        <ButtonGoBack />
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'TheLastShuriken',
            flex: 1,
            alignSelf: 'center',
            textAlignVertical: 'center',
          }}>
          {name} Example:
        </Text>
        <YakuExampleFlatlist data={data} />
        <ButtonYakuGoBack />
      </View>
    </View>
  );
};

export default RulesScreenYakuExample;
