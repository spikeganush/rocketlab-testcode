import {View, FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useUserStore} from '@/src/store/userStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SCREENS} from '../utils/constant';
import ky from 'ky';

type fakeUsers = {
  address: {
    city: string;
    geo: {
      lat: string;
      lng: string;
    };
    street: string;
    suite: string;
    zipcode: string;
  };
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  email: string;
  id: string;
  name: string;
  phone: string;
  username: string;
  website: string;
};

type DatafetchResult = {
  fakeUsers: fakeUsers[];
};

const targetLat = 39.833333;
const targetLng = -98.583333;

const DataScreen = () => {
  const isLogged = useUserStore(state => state.isLogged);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [data, setData] = useState<DatafetchResult | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isLogged) {
      navigation.reset({index: 0, routes: [{name: SCREENS.LOGIN}]});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  const haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const getData = async () => {
    setRefreshing(true);
    const dataFetched: DatafetchResult = await ky
      .post('https://testvm1.rokt.io/api/jsonql', {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'c37861c7-7414-4a40-bbd8-3343662e4483',
        },
        json: {
          fakeUsers: {},
        },
      })
      .json();

    const sortedData = dataFetched.fakeUsers.sort((a, b) => {
      const distanceA = haversineDistance(
        parseFloat(a.address.geo.lat),
        parseFloat(a.address.geo.lng),
        targetLat,
        targetLng,
      );

      const distanceB = haversineDistance(
        parseFloat(b.address.geo.lat),
        parseFloat(b.address.geo.lng),
        targetLat,
        targetLng,
      );

      return distanceA - distanceB;
    });

    setData({fakeUsers: sortedData});
    setRefreshing(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}: {item: fakeUsers}) => {
    const distance = haversineDistance(
      parseFloat(item.address.geo.lat),
      parseFloat(item.address.geo.lng),
      targetLat,
      targetLng,
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
        data={data?.fakeUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        onRefresh={getData}
        refreshing={refreshing}
      />
    </View>
  );
};

export default DataScreen;
