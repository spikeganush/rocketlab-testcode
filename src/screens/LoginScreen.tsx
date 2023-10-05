import {View} from 'react-native';
import React from 'react';
import Animated, {FadeInUp} from 'react-native-reanimated';
import Rocket from '../components/Rocket';
import LoginForm from '../components/LoginForm';

const LoginScreen = () => {
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
        <Rocket />
        <Animated.Text
          entering={FadeInUp.duration(1000).delay(200).damping(0.5)}
          className="text-rocketLab-green font-bold text-4xl">
          Login
        </Animated.Text>
      </View>
      <LoginForm />
    </View>
  );
};

export default LoginScreen;
