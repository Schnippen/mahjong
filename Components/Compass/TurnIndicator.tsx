import React, {useEffect} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useSharedValue} from 'react-native-reanimated';

const TurnIndicator = () => {
  const progress = useSharedValue(0);
  const playerTurn = true; //make it global
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#99DDCC', '#1A4D2E'], //#55E358
    );
    return {backgroundColor};
  });

  useEffect(() => {
    if (playerTurn) {
      const animation = withRepeat(withTiming(1, {duration: 1000}), -1, true);
      progress.value = animation;
    }
  }, [playerTurn]);

  return (
    <Animated.View
      style={[
        {
          height: 20,
          width: 100,
          //backgroundColor: 'lime',
          top: 0,
          left: 50,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        },
        animatedStyle,
      ]}
    />
  );
};

export default TurnIndicator;
