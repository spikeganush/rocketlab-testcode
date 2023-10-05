import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import DataScreen from '../screens/DataScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NotifierWrapper} from 'react-native-notifier';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NotifierWrapper>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Data" component={DataScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </NotifierWrapper>
    </GestureHandlerRootView>
  );
}
