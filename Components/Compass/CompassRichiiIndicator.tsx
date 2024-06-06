import React, { useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import RichiiStick from './RichiiStick/RichiiStick';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const CompassRichiiIndicator = ({
  isRichiiActive,
  degrees,
}: {
  isRichiiActive: boolean;
  degrees: number;
}) => {


  const opacity = useSharedValue(0);
  const translateY = useSharedValue(300);

  useEffect(() => {
    if (isRichiiActive) {
      opacity.value = withTiming(1, { duration: 500 });
      translateY.value = withTiming(0, { duration: 500 });
    } else {
      opacity.value = withTiming(0, { duration: 500 });
      translateY.value = withTiming(300, { duration: 500 });
    }
  }, [isRichiiActive, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });
  const styles = StyleSheet.create({
    animatedView: {
      position: 'relative',
      bottom: 0,
      width: 150,
      justifyContent:"center",
      alignItems:"center",
    }})

  const RiichiiComponent=()=>{
    return(
    <Animated.View  style={[styles.animatedView,animatedStyle]}>
      <RichiiStick degrees={degrees} />
    </Animated.View >)
  }

  return (
    <View
      style={{
        width: 200,
        height: 30,
        justifyContent: 'center',
        backgroundColor: '#5d5d69',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'black',
          height: 20,
          width: 150,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isRichiiActive ? <RiichiiComponent /> : null}
      </View>
    </View>
  );
};
export default CompassRichiiIndicator;
