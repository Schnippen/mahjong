import React from 'react';
import {StatusBar, useWindowDimensions} from 'react-native';
import {ButtonGoBack} from '../Components/Buttons/ButtonGoBack';
//import {Tab, TabView} from '@rneui/themed';
import {boardColor, colorFaceLayer, MahjongTileColor} from '../Data/colors';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {RulesScreenFourthComponent} from '../Components/RulesComponents/RulesScreenFourthComponent_Scoring/RulesScreenFourthComponent';
import {RulesScreenThirdComponent} from '../Components/RulesComponents/RulesScreenThirdComponent_Yaku_and_Han/RulesScreenThirdComponent';
import {RulesScreenSecondComponent} from '../Components/RulesComponents/RulesScreenSecondComponent_Playing/RulesScreenSecondComponent';
import {RulesScreenFirstComponent} from '../Components/RulesComponents/FirstComponent_Basics/RulesScreenFirstComponent';

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
  //https://fbflipper.com/docs/getting-started/react-native/
  /*   TabView is a controlled component, which means the index needs to be updated via the onIndexChange callback.
   */
  /*   ScrollView can lead to performance problems since it doesn't virtualize content and renders everything at once. */
  //https://reactnavigation.org/docs/tab-view/#tabbar
  const renderScene = SceneMap({
    first: RulesScreenFirstComponent,
    second: RulesScreenSecondComponent,
    third: RulesScreenThirdComponent,
    fourth: RulesScreenFourthComponent,
  });

  const routes = [
    {key: 'first', title: 'Basics'},
    {key: 'second', title: 'Playing'},
    {key: 'third', title: 'Yaku & Han'},
    {key: 'fourth', title: 'Scoring'},
  ];
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#C47956'}}
      style={{backgroundColor: colorFaceLayer}}
      bounces={true}
    />
  );
  return (
    <>
      <StatusBar hidden={true} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        lazy={true}
        // lazy={({ route }) => route.name === 'Example'}
        renderTabBar={renderTabBar}
        style={{backgroundColor: boardColor}} // when scroling horizontally, there is sometimes white background?!
      />
    </>
  );
}

export default RulesScreen;
