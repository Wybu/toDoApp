import React from 'react';
import { SafeAreaView } from 'react-native';
import { TuongTacNhomScreen } from './src/modules/TuongTacNhom/TuongTacNhomScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="TuongTacNhom" 
          component={TuongTacNhomScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

