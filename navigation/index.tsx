/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ProjectScreen from '../screens/ProjectScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';
import TaskListScreen from '../screens/TaskListScreen';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: Colors[colorScheme].tint,
      headerStyle:{
        backgroundColor: "#212121"
      }
    }}>
      <Stack.Screen name="Splash" component={SplashScreen} options={{
        headerShown: false
      }} />
      <Stack.Screen name="SignIn" component={SignInScreen} options={{
        title: "Login"
      }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{
        title: "Sign Up"
      }} />
      <Stack.Screen name="Project" component={ProjectScreen} options={{
        headerBackTitleVisible: false
      }}/>
      <Stack.Screen name="TaskList" component={TaskListScreen}  />
      
    </Stack.Navigator>
  );
}

