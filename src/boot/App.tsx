/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@/src/screens/LoginScreen';
import DataScreen from '@/src/screens/DataScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NotifierWrapper} from 'react-native-notifier';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SCREENS} from '@/src/utils/constant';
import {useUserStore} from '@/src/store/userStore';

const Stack = createNativeStackNavigator();

export default function App() {
  const isLogged = useUserStore(state => state.isLogged);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NotifierWrapper>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={isLogged ? SCREENS.DATA : SCREENS.LOGIN}
              screenOptions={{headerShown: false}}>
              <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
              <Stack.Screen name={SCREENS.DATA} component={DataScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </NotifierWrapper>
    </GestureHandlerRootView>
  );
}
