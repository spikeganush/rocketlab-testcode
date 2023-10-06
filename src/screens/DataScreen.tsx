import {View, FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useUserStore} from '@/src/store/userStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SCREENS, TARGET_LAT, TARGET_LNG} from '../utils/constant';
import {fakeUsers} from '@/src/types/generalTypes';
import {haversineDistance} from '../utils/harversineDistance';
import {getData} from '../services/fakeUserService';

const DataScreen = () => {
  const isLogged = useUserStore(state => state.isLogged);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [data, setData] = useState<fakeUsers[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isLogged) {
      navigation.reset({index: 0, routes: [{name: SCREENS.LOGIN}]});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  const fetchData = async () => {
    setRefreshing(true);
    const returnData = await getData();
    setData(returnData);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}: {item: fakeUsers}) => {
    const distance = haversineDistance(
      parseFloat(item.address.geo.lat),
      parseFloat(item.address.geo.lng),
      TARGET_LAT,
      TARGET_LNG,
    ).toFixed(2);
    return (
      <View className="w-2/6 p-2 flex justify-between">
        <Text className="font-bold text-lg">{item.name}</Text>
        <Text>{item.address?.city}</Text>
        <Text className="font-bold mt-2 text-xs">{item.email}</Text>
        <Text className="font-bold mt-2 text-xs">Distance: {distance} km</Text>
      </View>
    );
  };

  return (
    <View className="flex items-center">
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        onRefresh={fetchData}
        refreshing={refreshing}
      />
    </View>
  );
};

export default DataScreen;
