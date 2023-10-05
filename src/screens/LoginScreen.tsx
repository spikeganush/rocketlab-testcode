import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {FadeInUp, FadeInDown} from 'react-native-reanimated';
import {z} from 'zod';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import Rocket from '../components/Rocket';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormErrors = {
  email?: string;
  password?: string;
};

const LoginScreen = () => {
  const [formData, setFormData] = useState({email: '', password: ''});
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleSubmit = () => {
    try {
      const validatedData = loginSchema.parse(formData);
      console.log(validatedData);
      setFormErrors({});
    } catch (error) {
      const zodError = error as z.ZodError;
      const newFormErrors: FormErrors = {};
      zodError.errors.forEach(err => {
        if (err.path[0]) {
          newFormErrors[err.path[0] as keyof FormErrors] = err.message;
        }
      });
      setFormErrors(newFormErrors);
    }
  };

  useEffect(() => {
    if (!formErrors.email && !formErrors.password) {
      return;
    }
    const message = Object.values(formErrors)
      .join('\n')
      .replace('String', 'Password');
    Notifier.showNotification({
      title: 'Error',
      description: message,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'error',
      },
    });
  }, [formErrors]);

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

      <View className="flex items-center mx-5 space-y-5">
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
          className="bg-black/5 p-5 rounded-2xl w-full">
          <TextInput
            className="text-xl"
            placeholder="Email"
            placeholderTextColor={'gray'}
            value={formData.email}
            onChangeText={text => setFormData({...formData, email: text})}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          className="bg-black/5 p-5 rounded-2xl w-full mb-3">
          <TextInput
            className="text-xl"
            placeholder="Password"
            placeholderTextColor={'gray'}
            value={formData.password}
            onChangeText={text => setFormData({...formData, password: text})}
            secureTextEntry
          />
        </Animated.View>

        <Animated.View
          className="w-full"
          entering={FadeInDown.delay(600).duration(1000).springify()}>
          <TouchableOpacity
            className="w-full bg-rocketLab-blue p-3 rounded-2xl mb-3"
            onPress={handleSubmit}>
            <Text className="text-xl font-bold text-rocketLab-green text-center">
              Login
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default LoginScreen;
