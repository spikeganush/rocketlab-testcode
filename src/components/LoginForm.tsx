import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {z} from 'zod';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '@/src/utils/constant';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useUserStore} from '../store/userStore';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormErrors = {
  email?: string;
  password?: string;
};

const LoginForm = () => {
  const [formData, setFormData] = useState({email: '', password: ''});
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const setUser = useUserStore(state => state.setUser);
  const setIsLogged = useUserStore(state => state.setIsLogged);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleSubmit = () => {
    try {
      const validatedData = loginSchema.parse(formData);
      console.log(validatedData);
      setFormErrors({});
      // TODO: use that navigation when login succeed
      setUser({
        email: validatedData.email,
        name: 'John Doe',
      });
      setIsLogged(true);
      navigation.reset({index: 0, routes: [{name: SCREENS.DATA}]});
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
  );
};

export default LoginForm;
