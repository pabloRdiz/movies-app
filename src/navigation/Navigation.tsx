import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { NavigationScreens, RouteStackParams } from './Navigation.types';

const Stack = createStackNavigator<RouteStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // cardStyle: { backgroundColor: '#fff' },
      }}>
      <Stack.Screen
        name={NavigationScreens.HOME_SCREEN}
        component={HomeScreen}
      />
      <Stack.Screen
        name={NavigationScreens.DETAIL_SCREEN}
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};
