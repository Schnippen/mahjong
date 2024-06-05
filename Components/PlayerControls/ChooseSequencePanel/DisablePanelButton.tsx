import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { handleDisablePanelButton } from "./handleDisablePanelButton";
import { DisablePanelButtonParams } from "./ChooseSequencePanel";


export const DisablePanelButton = ({setChiiPanelDisplayed,setDisplayChiiButton,setDisplayPonButton,setDisplayKanButton}:DisablePanelButtonParams) => {
    return (
      <TouchableWithoutFeedback onPress={() => handleDisablePanelButton({setChiiPanelDisplayed,setDisplayChiiButton,setDisplayPonButton,setDisplayKanButton})}>
        <View
          style={{
            height: 40,
            width: 40,
            backgroundColor: 'rgba(243, 251, 254, 0.3)',
            position: 'absolute',
            right: -10,
            bottom: -5,
            alignItems: 'center',
            borderRadius: 25,
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f3fbfe',
            }}>
            <Text>{'<'}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };