import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {z} from 'zod';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {useNavigation} from '@react-navigation/native';
import {API_KEY, SCREENS} from '@/src/utils/constant';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useUserStore} from '@/src/store/userStore';
import ky from 'ky';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormErrors = {
  email?: string;
  password?: string;
};

type ResultLogin = {
  authLogin: {
    firstname: string;
    refreshToken: string;
    token: string;
  };
};

type ErrorLogin = {
  authLogin: string;
};

const LoginForm = () => {
  const [formData, setFormData] = useState({email: '', password: ''});
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [seePassword, setSeePassword] = useState(false);
  const setUser = useUserStore(state => state.setUser);
  const setIsLogged = useUserStore(state => state.setIsLogged);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const toggleSeePassword = () => {
    setSeePassword(prev => !prev);
  };

  const isResultLogin = (
    result: ErrorLogin | ResultLogin,
  ): result is ResultLogin => {
    return (
      (result as ResultLogin).authLogin !== undefined &&
      (result as ResultLogin).authLogin.token !== undefined
    );
  };

  const handleSubmit = async () => {
    try {
      const validatedData = loginSchema.parse(formData);

      const payload = {
        authLogin: {
          email: formData.email,
          pass: formData.password,
        },
      };

      const result: ErrorLogin | ResultLogin = await ky
        .post('https://testvm1.rokt.io/api/jsonql', {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
          json: payload,
        })
        .json();

      console.log(result);

      setFormErrors({});
      if (result?.authLogin === 'invalid credentials') {
        Notifier.showNotification({
          title: 'Error',
          description: 'Invalid email or password',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'error',
          },
        });
      }

      if (isResultLogin(result)) {
        setUser({
          name: result.authLogin.firstname,
          email: validatedData.email,
        });

        setIsLogged(true);
        navigation.reset({index: 0, routes: [{name: SCREENS.DATA}]});
      }
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
        className="bg-black/5 p-5 rounded-2xl w-full mb-3 relative z-0">
        <TextInput
          className="text-xl"
          placeholder="Password"
          placeholderTextColor={'gray'}
          value={formData.password}
          onChangeText={text => setFormData({...formData, password: text})}
          secureTextEntry={!seePassword}
        />
        <View className="absolute right-0 top-1/2 z-10">
          {seePassword ? (
            <TouchableOpacity onPress={toggleSeePassword}>
              <Image
                source={require('@/assets/images/eye-outline.png')}
                className="w-[50px] h-[50px] mr-3"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleSeePassword}>
              <Image
                source={require('@/assets/images/eye-off-outline.png')}
                className="w-[50px] h-[50px] mr-3"
              />
            </TouchableOpacity>
          )}
        </View>
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
