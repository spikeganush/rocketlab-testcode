import {View, FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useUserStore} from '@/src/store/userStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SCREENS} from '../utils/constant';
import ky from 'ky';

const DataScreen = () => {
  const isLogged = useUserStore(state => state.isLogged);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [data, setData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isLogged) {
      navigation.reset({index: 0, routes: [{name: SCREENS.LOGIN}]});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  const getData = async () => {
    setRefreshing(true);
    const dataFetched = await ky.get('https://dummyjson.com/products').json();
    setData(dataFetched);
    setRefreshing(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}: any) => {
    return (
      <View className="w-2/6 p-2">
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>{item.category}</Text>
        <Text>${item.price}</Text>
      </View>
    );
  };

  return (
    <View className="flex items-center">
      <FlatList
        data={data.products}
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
