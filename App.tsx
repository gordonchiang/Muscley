import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/redux/store';
import { RootDrawer } from './src/navigation/RootDrawer';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={ store }>
        <NavigationContainer>
          <RootDrawer />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
