/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  Easing,
  FadeInUp,
  withSpring,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withDelay,
} from 'react-native-reanimated';

const LoginScreen = () => {
  const rocketTranslateY = useSharedValue(-500); // Initial position outside the screen
  const rocketTranslateX = useSharedValue(-200); // Initial position outside the screen
  const rocketScale = useSharedValue(0.1); // Initial small size

  useEffect(() => {
    rocketTranslateY.value = withDelay(500, withSpring(-120)); // Move to final position
    rocketTranslateX.value = withDelay(500, withSpring(-120)); // Move to final position
    rocketScale.value = withDelay(
      500,
      withTiming(1, {duration: 2000, easing: Easing.inOut(Easing.ease)}),
    ); // Grow to full size
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rocketAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: rocketTranslateY.value},
        {scale: rocketScale.value},
      ],
    };
  });

  return (
    <View className="bg-white h-full w-full">
      <Animated.Image
        entering={FadeInUp.duration(1000).damping(0.5)}
        className="h-full w-full absolute"
        source={require('../../assets/images/background.png')}
      />
      <View className="h-full w-full flex pb-48 items-center justify-center">
        <Animated.Text
          entering={FadeInUp.duration(1000).delay(0.2).damping(0.5)}
          className="text-rocketLab-green font-bold text-4xl">
          RocketLab
        </Animated.Text>
        <Animated.Text
          className="absolute"
          style={[{fontSize: 50}, rocketAnimatedStyle]}>
          🚀
        </Animated.Text>
        <Animated.Text
          entering={FadeInUp.duration(1000).delay(0.2).damping(0.5)}
          className="text-rocketLab-green font-bold text-4xl">
          Login
        </Animated.Text>
      </View>
    </View>
  );
};

export default LoginScreen;
