import { View } from "react-native";

export const HonbaStick = () => {
    const HonbaDot = () => (
      <View style={{ backgroundColor: 'black', borderRadius: 8, width: 2, height: 2 }} />
    );
  
    return (
      <View style={{ backgroundColor: '#e9ebe8', height: 12, width: 30, borderRadius: 4, borderWidth: 1,transform: [{rotateZ: '290deg'}] }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 4,flex:1 }}>
          <HonbaDot />
          <HonbaDot />
          <HonbaDot />
          <HonbaDot />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 4,flex:1 }}>
          <HonbaDot />
          <HonbaDot />
          <HonbaDot />
          <HonbaDot />
        </View>
      </View>
    );
  };