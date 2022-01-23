/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable,Text } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ProjectScreen from '../screens/ProjectScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';
import TaskListScreen from '../screens/TaskListScreen';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { gql, useMutation } from '@apollo/client';

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

// delete all projects mutation
const DELETE_ALL_PROJECTS = gql`
  mutation Mutation {
    deleteAllProjects
  }`;

// delete all tasks mutation
const DELETE_ALL_TASKS = gql`
  mutation Mutation($projectId: String!) {
    deleteAllTasks(projectId: $projectId)
  }`;



function RootNavigator() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  // delete all projects mutation
  const [deleteAllProjects] = useMutation(DELETE_ALL_PROJECTS);

  // delete all tasks mutation
  const [deleteAllTasks] = useMutation(DELETE_ALL_TASKS);

  // user sign out
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('token').then(()=>{
        navigation.reset(
          {
            index: 0,
            routes:[{name: "SignIn"}]
          }
        )
      });
      
    } catch(e) {
      // remove error
    }
  
  } 

  // delete all projects function
  const onDeleteAllProjects = () =>{
    deleteAllProjects();
    alert("You have deleted all your projects. Please Refresh to see the changes.");
  }

  // delete all tasks function
  const onDeleteAllTasks = (projectId: string) =>{
    deleteAllTasks({variables:{
      projectId
    }});
    alert("You have deleted all your Tasks. Please Refresh to see the changes.");
  }

  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: Colors[colorScheme].background,
      headerStyle:{
        backgroundColor: Colors[colorScheme].tint
        
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
        headerBackTitleVisible: false,
        headerRight:()=>(
          // <Pressable onPress={signOut}>
          //   <MaterialCommunityIcons name="logout" size={24} color={Colors[colorScheme].background} />
          // </Pressable>
          <Pressable
            style={{
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 5,
              flexDirection: "row",
              
            }}
            onPress={onDeleteAllProjects}
          >
            <MaterialIcons 
              name="delete" 
              size={24} 
              color={Colors[colorScheme].background}
            />
            <Text style={{
              color: Colors[colorScheme].background,
              marginLeft: 2,
              textAlignVertical: "center"
              }}
            >
              Delete All
            </Text>
        </Pressable>
        )
      }}/>
      <Stack.Screen name="TaskList" component={TaskListScreen} options= {({ route }) =>({
        headerBackTitle: "Back",
        headerRight:() =>(
          // <Pressable onPress={signOut}>
          //   <MaterialCommunityIcons name="logout" size={24} color={Colors[colorScheme].background} />
          // </Pressable>
          <Pressable
            style={{
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 5,
              flexDirection: "row",
              
            }}
            onPress={()=>onDeleteAllTasks(route.params.projectId)}
          >
            <MaterialIcons 
              name="delete" 
              size={24} 
              color={Colors[colorScheme].background}
            />
            <Text style={{
              color: Colors[colorScheme].background,
              marginLeft: 2,
              textAlignVertical: "center"
              }}
            >
              Delete All
            </Text>
        </Pressable>
        )
        })} 
      />
      
    </Stack.Navigator>
  );
}

