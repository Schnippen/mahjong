import {Slider} from '@rneui/themed';
import React from 'react';
import {Text, View} from 'react-native';

export const SliderContainer = ({
  volumeState,
  containerWidth,
  handleVolume,
}: {
  volumeState: number;
  containerWidth: number;
  handleVolume: (value: number) => Promise<void>;
}) => {
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
                  backgroundColor: '#e9ebe8',
                  borderRadius: 10,
                  borderColor: '#56a2c4',
                  borderWidth: 3,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    fontFamily: 'TheLastShuriken',
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
