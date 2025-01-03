import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {ButtonGoBack} from '../Components/Buttons/ButtonGoBack';
//import {Tab, TabView} from '@rneui/themed';
import {
  FirstComponent,
  SecondComponent,
  ThirdComponent,
} from '../Components/RulesComponents/RulesComponents';
import {boardColor, MahjongTileColor} from '../Data/colors';
import {TabView, SceneMap} from 'react-native-tab-view';

function RulesScreen({navigation, route}: any) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  //const [index, setIndex] = useState(1);
  //https://reactnavigation.org/docs/tab-view/
  //https://snack.expo.dev/@satya164/react-native-tab-view-lazy-load
  //https://snack.expo.dev/@satya164/react-native-tab-view-custom-tabbar
  //use lazy loading
  //https://snack.expo.dev/@satya164/react-native-tab-view-lazy-load
  //https://mahjong.guide/a-beginners-guide-to-riichi-mahjong/
  //TODO add back button in top right position absolute
  //RulesScreen is too performance heavy, it must be split up using reactnavigation tab view, not rneui

  /*   TabView is a controlled component, which means the index needs to be updated via the onIndexChange callback.
   */
  /*   ScrollView can lead to performance problems since it doesn't virtualize content and renders everything at once. */

  const renderScene = SceneMap({
    first: FirstComponent,
    second: SecondComponent,
  });

  const routes = [
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ];

  return (
    <>
      <StatusBar hidden={true} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        lazy={true}
      />
    </>
  );
}

export default RulesScreen;
{
  /*  <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: '#e9ebe8', //'#56a2c4'
          height: 3,
        }}
        variant="primary">
        <Tab.Item title="Basics" titleStyle={{fontSize: 12}} />
        <Tab.Item title="Playing" titleStyle={{fontSize: 12}} />
        <Tab.Item title="Yaku & Han" titleStyle={{fontSize: 12}} />
        <Tab.Item title="Scoring" titleStyle={{fontSize: 12}} />
      </Tab>
      <TabView value={index} onChange={setIndex} animationType="timing">
        <TabView.Item style={{backgroundColor: boardColor, width: '100%'}}>
          <FirstComponent />
        </TabView.Item>
        <TabView.Item style={{backgroundColor: boardColor, width: '100%'}}>
          <SecondComponent />
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
          <ThirdComponent />
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
          <Text>TEXT</Text>
        </TabView.Item>
      </TabView> */
  /* <ScrollView
style={{
  backgroundColor: boardColor,
  width: '100%',
  height: '100%',
  padding: 8,
}}>
<StatusBar hidden={true} />
<View
  style={{
    alignItems: 'center',
    height: 80,
    flex: 1,
    paddingTop: 4,
  }}>
  <Text style={{fontSize: 48, fontWeight: 'bold'}}>Rules</Text>
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      height: 80,
      width: 100,
      position: 'absolute',
      right: 0,
    }}>
    <ButtonGoBack navigation={navigation} />
  </View>
</View>
</ScrollView> */
}
