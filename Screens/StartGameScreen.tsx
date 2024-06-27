import React from 'react'
import { Button, Text, View } from 'react-native'

function StartGameScreen({navigation}: {navigation: any}) {

  const goToSettingScreen=()=>{
    navigation.navigate("SettingsScreen")
  }
  const goToGameScreen=()=>{
    navigation.navigate("MahjongScreen")
  }

  return (
    <View style={{flex:1,backgroundColor:'green'}}>
        <Text>Start Screen</Text>
        <Text>Start Game</Text>
        <Text>Settings</Text>
        <Button title='Settings' onPress={()=>goToSettingScreen()}/>
        <Button title='Start Game' onPress={()=>goToGameScreen()}/>
    </View>
  )
}

export default StartGameScreen