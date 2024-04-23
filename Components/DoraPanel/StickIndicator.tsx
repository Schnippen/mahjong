import { Text, View } from "react-native"
import { HonbaStick } from "./HonbaStick"
import { RichiiStick } from "./RichiiStick"

export const StickIndicator=()=>{
    return(
    <View style={{backgroundColor:"orange",flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100%"}}>
      <RichiiStick/>
      <Text>x 0</Text>
      <HonbaStick/>
      <Text>x 0</Text>
    </View>)
  }