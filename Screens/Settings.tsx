import {ButtonGroup, Divider, Slider} from '@rneui/themed';
import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getSettings, resetSettings, updateSetting} from '../Store/asyncStorage';
import {useAppDispatch} from '../Store/hooks';
import {
  setVoiceType,
  setVolume,
  toggleNumerals,
  toggleSounds,
  toggleVibrations,
} from '../Store/settingsReducer';
import {useFocusEffect} from '@react-navigation/native';
import {soundFunc} from '../Functions/playSounds/soundFunc';
import {
  handleImpactHeavy,
  handleImpactLight,
  handleImpactMedium,
} from '../Functions/utils/hapticFeedback';
import {boardColor} from '../Data/colors';
import {ButtonGoBack} from '../Components/Buttons/ButtonGoBack';
//TODO fix this, boolean is not switching fast enough
function Settings({navigation}: {navigation: any}) {
  const panelBackgroundColor = boardColor;
  const [volumeState, setVolumeState] = useState(0);
  const [selectedVoiceType, setSelectedVoiceType] = useState(0);
  const [soundState, setSoundState] = useState(0);
  const [vibrationsState, setVibrationsState] = useState(0);
  const [numeralsActive, setNumeralsActive] = useState(0);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});

  const onLayout = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    setDimensions({width, height});
  };
  let containerWidth = dimensions.width / 1.1;
  const dispatch = useAppDispatch();
  //TODO
  const loadSettings = async () => {
    const storedSettings = await getSettings();
    console.log('loadSettings:', storedSettings);
    //set all the haptics, volumes etc....
  };
  //TODO when you change sound from true to false you have to restrt app somehow, it does not update 
  //let isFocused = useIsFocused()
  useFocusEffect(
    React.useCallback(() => {
      console.log('RUN');
      const fetchSettings = async () => {
        try {
          const storedSettings = await getSettings();
          console.log('loadSettings: FOCUS', storedSettings);
          let numerals = storedSettings.numerals === true ? 0 : 1;
          let sound = storedSettings.sound === true ? 0 : 1;
          let vibrations = storedSettings.vibrations === true ? 0 : 1;
          let voices =
            storedSettings.voices === 'FEMALE'
              ? 2
              : storedSettings.voices === 'MALE'
              ? 1
              : 0;
          let volume = storedSettings.volume * 10;
          setNumeralsActive(numerals);
          setSelectedVoiceType(voices);
          setSoundState(sound);
          setVibrationsState(vibrations);
          setVolumeState(volume);
          dispatch(toggleNumerals(storedSettings.numerals));
          dispatch(toggleSounds(storedSettings.sound));
          dispatch(toggleVibrations(storedSettings.vibrations));
          dispatch(setVoiceType(voices));
          dispatch(setVolume(volume));
        } catch (e) {
          // Handle error
          console.info('useFocusEffect async-storage:', e);
        }
      };
      fetchSettings();
    }, [navigation]),
  );

  const handleSound = async (value: number) => {
    setSoundState(value);
    if (value === 0) {
      //true
      await updateSetting('sound', true);
      dispatch(toggleSounds(true));
      soundFunc({type: 'popUp'});
    } else if (value === 1) {
      //false
      await updateSetting('sound', false);
      dispatch(toggleSounds(false));
    }
  };

  const handleVibrations = async (value: number) => {
    setVibrationsState(value);
    if (value === 0) {
      //true
      await updateSetting('vibrations', true);
      dispatch(toggleVibrations(true));
      handleImpactMedium();
      soundFunc({type: 'popUp'});
    } else if (value === 1) {
      //false
      await updateSetting('vibrations', false);
      dispatch(toggleVibrations(false));
      soundFunc({type: 'pop'});
    }
  };
  const handleSelectedVoiceType = async (value: number) => {
    setSelectedVoiceType(value);
    if (value === 0) {
      //OFF
      console.log('VALUE:', value);
      await updateSetting('voices', 'OFF');
      dispatch(setVoiceType('OFF'));
      handleImpactLight();
    } else if (value === 1) {
      //MALE
      console.log('VALUE:', value);
      await updateSetting('voices', 'MALE');
      dispatch(setVoiceType('MALE'));
      handleImpactLight();
    } else if (value === 2) {
      //FEMALE
      console.log('VALUE:', value);
      await updateSetting('voices', 'FEMALE');
      dispatch(setVoiceType('FEMALE'));
      handleImpactLight();
    }
  };

  const handleVolume = async (value: number) => {
    setVolumeState(value);
    let val = value / 10;
    //console.log("Volume:",value/10)
    await updateSetting('volume', val);
    dispatch(setVolume(val));
    handleImpactLight();
  };

  const handleNumerals = async (value: number) => {
    setNumeralsActive(value);
    if (value === 0) {
      //true
      await updateSetting('numerals', true);
      dispatch(toggleNumerals(true));
      soundFunc({type: 'popUp'});
    } else if (value === 1) {
      //false
      await updateSetting('numerals', false);
      dispatch(toggleNumerals(false));
      soundFunc({type: 'pop'});
    }
  };

  const handleResetToDefault = async () => {
    //reset
    await resetSettings();
    //set default
    const defaultSettings = await getSettings();
    console.log('RESET SETTINGS', defaultSettings);
    let numerals = defaultSettings.numerals === true ? 0 : 1;
    let sound = defaultSettings.sound === true ? 0 : 1;
    let vibrations = defaultSettings.vibrations === true ? 0 : 1;
    let voices = defaultSettings.voices === 'FEMALE' ? 2 : 1;
    let volume = defaultSettings.volume === 1 ? 10 : 0;
    setNumeralsActive(numerals);
    setSelectedVoiceType(voices);
    setSoundState(sound);
    setVibrationsState(vibrations);
    setVolumeState(volume);
    dispatch(toggleNumerals(false));
    dispatch(toggleSounds(true));
    dispatch(toggleVibrations(true));
    dispatch(setVoiceType('FEMALE'));
    dispatch(setVolume(10));
    handleImpactHeavy();
    soundFunc({type: 'pop'});
  };

  const SliderContainer = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            padding: 20,

            justifyContent: 'center',
            alignItems: 'stretch',
            width: containerWidth,
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
            trackStyle={{height: 10, backgroundColor: '  '}}
            thumbStyle={{height: 50, width: 50, backgroundColor: 'transparent'}}
            minimumTrackTintColor="#bdbbc0"
            maximumTrackTintColor="#e9ebe8"
            //animationType='spring'
            //animateTransitions= //TODO
            thumbProps={{
              children: (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    width: 50,
                    backgroundColor: '#56a2c4',
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{
                      color: '#fbd54e',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {volumeState}
                  </Text>
                </View>
              ),
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={{
        backgroundColor: panelBackgroundColor,
        width: '100%',
        height: '100%',
        padding: 8,
      }}
      onLayout={onLayout}>
      <StatusBar hidden={true} />
      <View
        style={{
          alignItems: 'center',
          height: 80,
          flex: 1,
          paddingTop: 4,
        }}>
        <Text style={{fontSize: 48, fontWeight: 'bold'}}>Settings</Text>
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
      <Divider
        style={{width: '80%', margin: 10}}
        width={2}
        inset={true}
        orientation="horizontal"
      />
      <View style={{alignItems: 'center'}}>
        <ButtonGroup
          buttons={['Sound ON', 'Sound OFF']}
          selectedIndex={soundState}
          onPress={value => {
            handleSound(value);
          }}
          containerStyle={{
            marginBottom: 20,
            backgroundColor: '#e9ebe8',
            width: containerWidth,
          }}
          selectedButtonStyle={{backgroundColor: '#56a2c4'}}
        />
      </View>

      <View style={{alignItems: 'center'}}>
        <ButtonGroup
          buttons={['Vibrations ON', 'Vibrations OFF']}
          selectedIndex={vibrationsState}
          onPress={value => {
            handleVibrations(value);
          }}
          containerStyle={{
            marginBottom: 20,
            backgroundColor: '#e9ebe8',
            width: containerWidth,
          }}
          selectedButtonStyle={{backgroundColor: '#56a2c4'}}
        />
      </View>

      <View style={{alignItems: 'center'}}>
        <ButtonGroup
          buttons={['OFF', 'MALE', 'FEMALE']}
          selectedIndex={selectedVoiceType}
          onPress={value => {
            handleSelectedVoiceType(value);
          }}
          containerStyle={{
            marginBottom: 20,
            backgroundColor: '#e9ebe8',
            width: containerWidth,
          }}
          selectedButtonStyle={{backgroundColor: '#56a2c4'}}
        />
      </View>

      <Divider
        style={{width: '80%', margin: 10}}
        width={2}
        inset={true}
        orientation="horizontal"
      />
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>Set Volume</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <SliderContainer />
      </View>
      <Divider
        style={{width: '80%', margin: 10}}
        width={2}
        inset={true}
        orientation="horizontal"
      />
      <View style={{alignItems: 'center'}}>
        <ButtonGroup
          buttons={['Numerals ON', 'Numerals OFF']}
          selectedIndex={numeralsActive}
          onPress={value => {
            handleNumerals(value);
          }}
          containerStyle={{
            marginBottom: 20,
            backgroundColor: '#e9ebe8',
            width: containerWidth,
          }}
          selectedButtonStyle={{backgroundColor: '#56a2c4'}}
        />
      </View>

      <Divider
        style={{width: '80%', margin: 10}}
        width={2}
        inset={true}
        orientation="horizontal"
      />
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            height: 45,
            backgroundColor: '#56a2c4',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            width: containerWidth,
          }}
          activeOpacity={0.9}
          onPress={() => handleResetToDefault()}>
          <Text>Reset to default</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginBottom: 40}} />
    </ScrollView>
  );
}

export default Settings;

//Debug template buttons
/*       <Button
        title="setItem"
        onPress={() => {
          null;
        }}
      />
      <Button title="getItem" onPress={() => loadSettings()} /> */
