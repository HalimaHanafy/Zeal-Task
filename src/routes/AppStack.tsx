import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { AddEditUserScreen } from '../screens/AddEditUserScreen';
import { UserDetailsScreen } from '../screens/UserDetailsScreen';
import { AddLocationScreen } from '../screens/AddLocationScreen';

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
        headerTitleAlign:
          'center'
      }} />
      <Stack.Screen
        name="AddLocationScreen"
        component={AddLocationScreen}
        options={{
          headerBackButtonMenuEnabled:
            true,
          title: 'Add Location'
        }}
      />
      <Stack.Screen
        name="AddEditUserScreen"
        component={AddEditUserScreen}
        options={{
          headerBackButtonMenuEnabled:
            true,
          title: 'Add Edit User'
        }}
      />

      <Stack.Screen
        name="UserDetailsScreen"
        component={UserDetailsScreen}
        options={{
          headerBackButtonMenuEnabled:
            true,
          title: 'User Details'
        }}
      />

    </Stack.Navigator>
  );
};
