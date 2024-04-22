import { Button } from '@rneui/themed'
import React from 'react'

function ButtonSettings({navigation,toggleOverlay}:{navigation:any,toggleOverlay:() => void}) {
  return (
    <Button buttonStyle={{height:40,width:40,backgroundColor:"blue",borderWidth:1,borderColor:"beige"}} radius={50}   onPress={toggleOverlay}
    title={"S"}/>
  )
}

export default ButtonSettings