import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserId = () => {
  const [userId, setUserId] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const getUserId = await AsyncStorage.getItem('userId');
      setUserId(getUserId);
      setLoading(false);
    })();
  });

  return { userId: userId, loading };
};
