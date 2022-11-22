import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootDrawer from './src/navigation/RootDrawer';

const App = () => {
  return (
    <NavigationContainer>
      <RootDrawer />
    </NavigationContainer>
  );
};

export default App;
