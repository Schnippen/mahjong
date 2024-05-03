import React, {useEffect} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useSharedValue} from 'react-native-reanimated';

const TurnIndicator = ({isPlayersTurn = false}: {isPlayersTurn: boolean}) => {
  const progress = useSharedValue(0);
  //const isPlayersTurn = true; //make it global
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#1A4D2E', '#99DDCC'], //#55E358 1A4D2E
    );
    return {backgroundColor};
  });

  useEffect(() => {
    if (isPlayersTurn) {
      const animation = withRepeat(withTiming(1, {duration: 2000}), -1, true);
      progress.value = animation;
    }
  }, [isPlayersTurn]);

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
