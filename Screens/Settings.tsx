import { Button } from '@rneui/themed'
import React from 'react'
import { Text, View } from 'react-native'

function Settings({navigation}:{navigation:any}) {
  return (
    <View>
      <Button onPress={() => navigation.goBack()} title={"GO BACK"}></Button><Text>Settings</Text></View>
  )
}

export default Settings