import {useEffect, useState} from 'react';
import {TTileObject} from '../../Types/types';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import PlayersTileOnHand from '../PlayerControls/PlayerTileOnHand';
import React from 'react';

export const WinningHandTile = ({
  item,
  index,
}: {
  item: TTileObject;
  index: number;
}) => {
  const [loading, setLoading] = useState(true);
  const translateX =
    /* index === 14 ? useSharedValue(0) :  */ useSharedValue(-50);
  const opacity = useSharedValue(0);
  let time = index * 500; // change it?

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      translateX.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
      opacity.value = withTiming(1, {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      });
    }, time);

    return () => clearTimeout(timer);
  }, [time]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
      opacity: opacity.value,
    };
  });

  if (loading) {
    return null;
  }

  return (
    <Animated.View style={[{backgroundColor: 'white'}, animatedStyle]}>
      <PlayersTileOnHand svg={item.image} tileRatioProp={1.2} />
    </Animated.View>
  );
};
