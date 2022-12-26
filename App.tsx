import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/redux/store';
import { RootDrawer } from './src/navigation/RootDrawer';

export default function App() {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <RootDrawer />
      </NavigationContainer>
    </Provider>
  );
}
