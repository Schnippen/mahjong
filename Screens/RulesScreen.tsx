import React, { useState } from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import {ButtonGoBack} from '../Components/Buttons/ButtonGoBack';
import { Tab, TabView } from '@rneui/themed';
import { FirstComponent } from '../Data/RulesData';


const SecondComponent=()=>{return(<View></View>)}

const ThirdComponent=()=>{return(<View></View>)}

function RulesScreen({navigation, route}: any) {
  const [index, setIndex] = useState(0);
  //https://reactnavigation.org/docs/tab-view/
  //https://snack.expo.dev/@satya164/react-native-tab-view-lazy-load
  //https://snack.expo.dev/@satya164/react-native-tab-view-custom-tabbar
  //https://mahjong.guide/a-beginners-guide-to-riichi-mahjong/
  //TODO add back button in top right weapons
  return (
    <>
    <StatusBar hidden={true} />
    <Tab
    value={index}
    onChange={(e) => setIndex(e)}
    indicatorStyle={{
      backgroundColor: 'white',
      height: 3,
    }}
    variant="primary"
  >
    <Tab.Item
      title="Basics"
      titleStyle={{ fontSize: 12 }}
    />
    <Tab.Item
      title="Playing"
      titleStyle={{ fontSize: 12 }}
    />
    <Tab.Item
      title="Yaku & Han"
      titleStyle={{ fontSize: 12 }}
    />
    <Tab.Item
      title="Scoring"
      titleStyle={{ fontSize: 12 }}
    />
  </Tab>
   <TabView value={index} onChange={setIndex} animationType="timing">
   <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
     <FirstComponent/>
   </TabView.Item>
   <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
   <SecondComponent/>
   </TabView.Item>
   <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
   <ThirdComponent/>
   </TabView.Item>
   <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
    <Text>TEXT</Text>
   </TabView.Item>
 </TabView>
 </>
  );
}

export default RulesScreen;
{/* <ScrollView
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
</ScrollView> */}