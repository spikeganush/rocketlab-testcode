import ky from 'ky';
import {API_KEY, TARGET_LAT, TARGET_LNG} from '@/src/utils/constant';
import {DatafetchResult, fakeUsers} from '@/src/types/generalTypes';
import {haversineDistance} from '@/src/utils/harversineDistance';

export const getData = async (): Promise<fakeUsers[] | null> => {
  try {
    const dataFetched: DatafetchResult = await ky
      .post('https://testvm1.rokt.io/api/jsonql', {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        json: {
          fakeUsers: {},
        },
      })
      .json();

    if (!dataFetched || !Array.isArray(dataFetched.fakeUsers)) {
      console.error('Invalid data format');
      return null;
    }

    const sortedData = dataFetched.fakeUsers.sort((a, b) => {
      const distanceA = haversineDistance(
        parseFloat(a.address.geo.lat),
        parseFloat(a.address.geo.lng),
        TARGET_LAT,
        TARGET_LNG,
      );

      const distanceB = haversineDistance(
        parseFloat(b.address.geo.lat),
        parseFloat(b.address.geo.lng),
        TARGET_LAT,
        TARGET_LNG,
      );

      return distanceA - distanceB;
    });

    return sortedData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
};
