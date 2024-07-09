import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";

const AnimatedText = ({ text, delay }:{text:string,delay:number}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
      delay: delay,
    });
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.Text style={[styles.animatedText, animatedStyle]}>
      {text}
    </Animated.Text>
  );
};

export const Score = () => {
  const topPanelBackgroundColor = '#3c7fc3';

  return (
    <View style={styles.container}>
      <View style={[styles.topPanel, { backgroundColor: topPanelBackgroundColor }]}>
        <View style={styles.textContainer}>
          <AnimatedText text="50 " delay={0} />
          <AnimatedText text="Fu " delay={1000} />
        </View>
        <View style={styles.textContainer}>
          <AnimatedText text="5 " delay={2000} />
          <AnimatedText text="Han" delay={3000} />
        </View>
      </View>
      <View style={styles.bottomPanel}>
        <AnimatedText text="96000 " delay={4000} />
        <Text style={styles.pointsText}>PTS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 200,
    backgroundColor: "purple",
    paddingHorizontal: 5,
  },
  topPanel: {
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'row',
  },
  animatedText: {
    color: "#fbd54e",
    fontSize: 28,
    fontWeight: 'bold',
  },
  bottomPanel: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    backgroundColor: "red",
    alignItems: 'baseline',
  },
  pointsText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default Score;
