import { View } from "react-native";

export const RichiiStick = () => {
    return (
      <View style={{ backgroundColor: '#e9ebe8', height: 12, width: 30, borderRadius: 4, borderWidth: 1 ,justifyContent:"center",alignItems:"center" ,transform: [{rotateZ: '290deg'}]}}>
            <View style={{backgroundColor:"#bd383b", height:4,width:4,borderRadius:8}}/>
      </View>
    );
  };