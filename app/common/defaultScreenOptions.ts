import { colors } from '../config/colors';
import { HeaderBackImage } from './HeaderBackImage';

export const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: colors.black,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  headerBackImage: () => HeaderBackImage,
  headerBackTitleVisible: false,
  headerTitleStyle: { color: colors.black },
};
