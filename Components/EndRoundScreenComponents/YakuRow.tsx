import React from "react";
import { Text, View } from "react-native";

export const YakuRow = () => {
    const topPanelBackgroundColor = '#3c7fc3';

    return (
      <View style={{flexDirection:"row",height:38,width:140,backgroundColor:topPanelBackgroundColor,borderRadius:4,alignItems:'center',paddingHorizontal:4,borderWidth:1,borderColor:'black',}}>
        <View style={{flex:3,justifyContent:"center",height:38}}>
          <Text style={{fontWeight:"bold",textAlign:"center"}}>Sanshoku Doukou</Text>
          </View>
        
        <View style={{flexDirection:"row",backgroundColor:"#113764",height:24,borderRadius:4,flex:2,alignItems:'center',justifyContent:"center"}}>
        <Text style={{color:"#fbd54e",fontWeight:"bold",}}>1</Text>
        <Text style={{color:"#fbd54e"}}>HAN</Text>
        </View> 
      </View>
    );};