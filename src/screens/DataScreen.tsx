import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useUserStore} from '@/src/store/userStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SCREENS} from '../utils/constant';

const DataScreen = () => {
  const user = useUserStore(state => state.user);
  const isLogged = useUserStore(state => state.isLogged);
  const resetUser = useUserStore(state => state.resetUser);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    if (!isLogged) {
      navigation.reset({index: 0, routes: [{name: SCREENS.LOGIN}]});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  return (
    <View className="flex items-center">
      <Text>{user?.name}</Text>
      <TouchableOpacity
        onPress={resetUser}
        className="w-1/2 bg-rocketLab-blue p-3 rounded-2xl mb-3 flex items-center mt-10">
        <Text className="text-rocketLab-green">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DataScreen;
