/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  Easing,
  FadeInUp,
  FadeInDown,
  withSpring,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  ReduceMotion,
} from 'react-native-reanimated';

const LoginScreen = () => {
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
        damping: 10,
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
    <View className="bg-white h-full w-full">
      <Animated.Image
        entering={FadeInUp.duration(1000).damping(0.5)}
        className="h-full w-full absolute"
        source={require('../../assets/images/background.png')}
      />
      <View className="h-1/2 w-full flex items-center justify-end pb-16 mb-10">
        <Animated.Text
          entering={FadeInUp.duration(1000).delay(200).damping(0.5)}
          className="text-rocketLab-green font-bold text-4xl">
          RocketLab
        </Animated.Text>
        <Animated.Text
          className="absolute"
          style={[{fontSize: 50}, rocketAnimatedStyle]}>
          🚀
        </Animated.Text>
        <Animated.Text
          entering={FadeInUp.duration(1000).delay(200).damping(0.5)}
          className="text-rocketLab-green font-bold text-4xl">
          Login
        </Animated.Text>
      </View>

      <View className="flex items-center mx-5 space-y-5">
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
          className="bg-black/5 p-5 rounded-2xl w-full">
          <TextInput placeholder="Email" placeholderTextColor={'gray'} />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          className="bg-black/5 p-5 rounded-2xl w-full mb-3">
          <TextInput
            placeholder="Password"
            placeholderTextColor={'gray'}
            secureTextEntry
          />
        </Animated.View>

        <Animated.View
          className="w-full"
          entering={FadeInDown.delay(600).duration(1000).springify()}>
          <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
            <Text className="text-xl font-bold text-white text-center">
              Login
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default LoginScreen;
