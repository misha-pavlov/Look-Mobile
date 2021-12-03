import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useIsUserAuthorized = () => {
  const [isUserAuthorized, setIsUserAuthorized] = useState<string>(null);

  useEffect(() => {
    (async () => {
      const getIsUserAuthorized = await AsyncStorage.getItem('isUserAuthorized');
      console.log('getIsUserAuthorized = ', getIsUserAuthorized);
      setIsUserAuthorized(getIsUserAuthorized);
    })();
  }, []);

  return { isUserAuthorized };
};
