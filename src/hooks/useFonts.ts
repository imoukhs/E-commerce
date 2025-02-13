import {
  useFonts as useExpoFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import {
  OpenSans_400Regular,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';

export const useFonts = () => {
  const [fontsLoaded] = useExpoFonts({
    'Roboto-Bold': Roboto_700Bold,
    'Roboto-Regular': Roboto_400Regular,
    'OpenSans-Regular': OpenSans_400Regular,
    'OpenSans-Bold': OpenSans_700Bold,
  });

  return fontsLoaded;
}; 