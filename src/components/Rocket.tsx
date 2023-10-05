/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const Rocket = () => {
  const rocketTranslateY = useSharedValue(120); // Initial position outside the screen
  const rocketTranslateX = useSharedValue(-280); // Initial position outside the screen
  const rocketScale = useSharedValue(0.1); // Initial small size

  useEffect(() => {
    rocketTranslateY.value = withDelay(
      600,
      withSpring(-100, {
        mass: 1,
        damping: 10,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
        reduceMotion: ReduceMotion.System,
      }),
    ); // Move to final position
    rocketTranslateX.value = withDelay(
      600,
      withSpring(120, {
        mass: 1,
        damping: 15,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
        reduceMotion: ReduceMotion.System,
      }),
    ); // Move to final position
    rocketScale.value = withDelay(
      600,
      withTiming(1, {duration: 600, easing: Easing.inOut(Easing.ease)}),
    ); // Grow to full size
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rocketAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: rocketTranslateY.value},
        {translateX: rocketTranslateX.value},
        {scale: rocketScale.value},
      ],
    };
  });
  return (
    <Animated.Text
      className="absolute"
      style={[{fontSize: 50}, rocketAnimatedStyle]}>
      🚀
    </Animated.Text>
  );
};

export default Rocket;
