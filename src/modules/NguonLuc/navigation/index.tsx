import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectListScreen from '../screens/ProjectListScreen';
import ResourceDetailScreen from '../screens/ResourceDetailScreen';
import CostDetailScreen from '../screens/CostDetailScreen';

const Stack = createNativeStackNavigator();

export const NguonLucNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProjectList" component={ProjectListScreen} />
      <Stack.Screen name="ResourceDetail" component={ResourceDetailScreen} />
      <Stack.Screen name="CostDetail" component={CostDetailScreen} />
    </Stack.Navigator>
  );
}; 