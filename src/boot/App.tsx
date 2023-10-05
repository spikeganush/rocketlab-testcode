/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
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
  const resetUser = useUserStore(state => state.resetUser);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NotifierWrapper>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={isLogged ? SCREENS.DATA : SCREENS.LOGIN}
              screenOptions={{headerShown: false}}>
              <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
              <Stack.Screen
                name={SCREENS.DATA}
                component={DataScreen}
                options={{
                  headerShown: true,
                  headerTitle: 'Data Screen',
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={resetUser}
                      className="w-1/2 bg-rocketLab-blue p-3 rounded-2xl mb-3 flex items-center mt-2">
                      <Text className="text-rocketLab-green">Logout</Text>
                    </TouchableOpacity>
                  ),
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </NotifierWrapper>
    </GestureHandlerRootView>
  );
}
