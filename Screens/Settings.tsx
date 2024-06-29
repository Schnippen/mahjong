import {Button, ButtonGroup, Divider,Slider} from '@rneui/themed';
import React, { useState } from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import { getSettings, resetSettings, updateSetting } from '../Store/asyncStorage';
import { useAppDispatch } from '../Store/hooks';
import { setVoiceType, setVolume, toggleNumerals, toggleSounds, toggleVibrations } from '../Store/settingsReducer';
import { useFocusEffect, useIsFocused} from '@react-navigation/native';


function Settings({navigation}: {navigation: any}) {
  const panelBackgroundColor = 'rgba(22, 60, 85, 0.9)';
const [volumeState, setVolumeState] = useState(0);
const [selectedVoiceType, setSelectedVoiceType] = useState(0);
const [soundState, setSoundState] = useState(0);
const [vibrationsState, setVibrationsState] = useState(0);
const [numeralsActive,setNumeralsActive]=useState(0)
const dispatch = useAppDispatch()
//TODO
const loadSettings = async () => {
  const storedSettings = await getSettings();
  console.log("loadSettings:",storedSettings)
  //set all the haptics, volumes etc....
}

const goToHomeScreen=()=>{
  navigation.navigate("StartGameScreen")
}
//let isFocused = useIsFocused()
useFocusEffect(
  React.useCallback(() => {
    console.log("RUN")
    const fetchSettibgs = async () => {
      try {
        const storedSettings = await getSettings();
        console.log("loadSettings: FOCUS",storedSettings)
        let numerals = storedSettings.numerals===true?0:1
        let sound = storedSettings.sound ===true?0:1
        let vibrations =  storedSettings.vibrations===true?0:1
        let voices = storedSettings.voices==="FEMALE"?2:storedSettings.voices==="MALE"?1:0
        let volume = storedSettings.volume*10
        setNumeralsActive(numerals)
        setSelectedVoiceType(voices)
        setSoundState(sound)
        setVibrationsState(vibrations)
        setVolumeState(volume)
        dispatch(toggleNumerals(storedSettings.numerals))
        dispatch(toggleSounds(storedSettings.sound))
        dispatch(toggleVibrations(storedSettings.vibrations))
        dispatch(setVoiceType(voices))
        dispatch(setVolume(volume))
      } catch (e) {
        // Handle error
        console.info("useFocusEffect async-storage:",e)
      }
    };
    fetchSettibgs()
  }, [navigation])
);

const handleSound =async (value:number)=>{
  setSoundState(value);
  if(value===0){
    //true
    await updateSetting('sound', true);
    dispatch(toggleSounds(true))
  }else if(value===1){
    //false
    await updateSetting('sound', false);
    dispatch(toggleSounds(false))
  }
}

const handleVibrations =async (value:number)=>{
  setVibrationsState(value);
  if(value===0){
    //true
    await updateSetting('vibrations', true);
    dispatch(toggleVibrations(true))
  }else if(value===1){
    //false
    await updateSetting('vibrations', false);
    dispatch(toggleVibrations(false))
  }
}
const handleSelectedVoiceType=async (value:number)=>{
  setSelectedVoiceType(value);
    if(value===0){
    //OFF
    console.log("VALUE:",value)
    await updateSetting('voices', 'OFF');
    dispatch(setVoiceType('OFF'))
  }else if(value===1){
    //MALE
    console.log("VALUE:",value)
    await updateSetting('voices', 'MALE');
    dispatch(setVoiceType('MALE'))
  }
  else if(value===2){
    //FEMALE
    console.log("VALUE:",value)
    await updateSetting('voices', 'FEMALE');
    dispatch(setVoiceType('FEMALE'))
  }
}

const handleVolume=async (value:number)=>{
  setVolumeState(value);
  let val = value/10
  //console.log("Volume:",value/10)
    await updateSetting('volume', val);
    dispatch(setVolume(val))
}

const handleNumerals=async (value:number)=>{
  setNumeralsActive(value);
  if(value===0){
    //true
    await updateSetting('numerals', true);
    dispatch(toggleNumerals(true))
  }else if(value===1){
    //false
    await updateSetting('numerals', false);
    dispatch(toggleNumerals(false))
  }
}

const handleResetToDefault=async()=>{
  //reset
  await resetSettings()
  //set default
  const defaultSettings = await getSettings();
  console.log("RESET SETTINGS",defaultSettings)
  let numerals = defaultSettings.numerals===true?0:1
  let sound = defaultSettings.sound ===true?0:1
  let vibrations =  defaultSettings.vibrations===true?0:1
  let voices = defaultSettings.voices==="FEMALE"?2:1 
  let volume = defaultSettings.volume===1?10:0
  setNumeralsActive(numerals)
  setSelectedVoiceType(voices)
  setSoundState(sound)
  setVibrationsState(vibrations)
  setVolumeState(volume)
  dispatch(toggleNumerals(false))
  dispatch(toggleSounds(true))
  dispatch(toggleVibrations(true))
  dispatch(setVoiceType("FEMALE"))
  dispatch(setVolume(10))
}

const  ButtonGoBack =()=> {
  return (
    <TouchableWithoutFeedback onPress={() =>goToHomeScreen()}>
      <View
        style={{
          height: 40,
          width: 40,
          backgroundColor: 'rgba(243, 251, 254, 0.3)',

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
          <Text style={{color:"black"}}>{'X'}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

  return (
    <ScrollView
    style={{
      backgroundColor: panelBackgroundColor,
      width: '100%',
      height: "100%",
      padding:8,
    }}>
      <View style={{flexDirection:"row",alignItems:"center",height:100,flex:1}}>
        <View style={{flex:3,height:100,justifyContent:'center',}}>
          <Text style={{fontSize:48,fontWeight:"bold",}}>Settings:</Text>
        </View>
        <View style={{justifyContent:'center',alignItems:"flex-end", flex:1,height:100,paddingRight:40}}>
          <ButtonGoBack />
        </View>
      
      </View>
      
      <Button title="setItem" onPress={()=>{null}}/>
      <Button title="getItem" onPress={()=>loadSettings()}/>
      <Divider style={{width:"80%",margin:10,}} width={2} inset={true} orientation='horizontal'/>

    <ButtonGroup
      buttons={['Sound ON', 'Sound OFF',]}
      selectedIndex={soundState}
      onPress={(value) => {
        handleSound(value);
      }}
      containerStyle={{ marginBottom: 20 }}
    />
        <ButtonGroup
      buttons={['Vibrations ON', 'Vibrations OFF',]}
      selectedIndex={vibrationsState}
      onPress={(value) => {
        handleVibrations(value)
      }}
      containerStyle={{ marginBottom: 20 }}
    />
      <ButtonGroup
      buttons={['OFF', 'MALE', 'FEMALE']}
      selectedIndex={selectedVoiceType}
      onPress={(value) => {
        handleSelectedVoiceType(value)
      }}
      containerStyle={{ marginBottom: 20 }}
    />
    <Divider style={{width:"80%",margin:10,}} width={2} inset={true} orientation='horizontal'/>
    <View><Text style={{fontSize:28,fontWeight:"bold"}}>Set Volume:</Text></View>
    <View style={{
      padding: 20,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'stretch',
    }}>
          <Slider
            value={volumeState}
            onValueChange={handleVolume}
            maximumValue={10}
            minimumValue={0}
            //maximumTrackTintColor 
            //minimumTrackTintColor 
            step={1}
            allowTouchTrack
            trackStyle={{ height: 10, backgroundColor: '  ' }}
            thumbStyle={{ height: 50, width: 50, backgroundColor: 'transparent' }}
            //animationType='spring'
            //animateTransitions= //TODO
            thumbProps={{
              children: (
                <View style={{justifyContent:"center",alignItems:'center',height:50,width:50,backgroundColor:"#0d2d54",borderRadius:8}}>
                <Text style={{color:"#fbd54e",fontSize:20,fontWeight:"bold"}} >{volumeState}</Text>
                </View>
              ),
            }}
          />
        </View>
        <Divider style={{width:"80%",margin:10,}} width={2} inset={true} orientation='horizontal'/>
        <ButtonGroup
      buttons={['Numerals ON', 'Numerals OFF']}
      selectedIndex={numeralsActive}
      onPress={(value) => {
        handleNumerals(value)
      }}
      containerStyle={{ marginBottom: 20 }}
    />
        <Divider style={{width:"80%",margin:10,}} width={2} inset={true} orientation='horizontal'/>
        <Button title={"Reset to default"} onPress={()=>handleResetToDefault()}/>
        <View style={{marginBottom:40}}/>
    </ScrollView>
  );
}

export default Settings;