import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Alert, FlatList, KeyboardAvoidingView, Modal, StyleSheet, TextInput, Pressable} from 'react-native';
import TaskListItem from '../components/TaskListItem';


import { Text, View } from '../components/Themed';
import { useQuery,useMutation,gql } from '@apollo/client';
import UIFab from '../components/UIElements/UIFab';
import UIPrompt from '../components/UIElements/UIPrompt';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import UIAvatar from '../components/UIElements/UIAvatar';

import { Ionicons } from '@expo/vector-icons';


// get project details for tasklists
const GET_PROJECT = gql`
  query GetProject($_id: String!) {
    getProject(_id: $_id) {
      title
      taskLists {
        _id
        content
        isCompleted
      }
      users {
        _id
      }
    }
  }`;

// create tasklist

const CREATE_TASKLIST = gql`
  mutation CreateTaskList($content: String!, $projectId: String!) {
    createTaskList(content: $content, projectId: $projectId) {
      _id
      content
      isCompleted
      project {
        _id
      }
    }
  }
  `;

  // add users to the project

  const ADD_USER_TO_PROJECT = gql`
    mutation AddUserToProject($projectId: String!, $userEmail: String!) {
      addUserToProject(projectId: $projectId, userEmail: $userEmail) {
        _id
      }
    }
    `;


  

export default function TaskListScreen() {
  const colorScheme = useColorScheme();

  const [title, setTitle] = useState("");
  const [taskLists, setTaskLists] = useState([]);
  const [users,setUsers] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTask,setNewTask] = useState("");

  const [addUserModal,setAddUserModal] = useState(false);
  const [newUser,setNewUser] = useState("")

  

  const route = useRoute();

  // query for getting tasklists in a project
  const { data, error, loading } = useQuery(GET_PROJECT,{variables: {_id: route.params.projectId}});


  // mutation for creating a new tasklist
  const [createTaskList,
    { data: createTaskListData, error: createTaskListError,loading: createTaskListLoading}
  ] = useMutation(CREATE_TASKLIST, 
    {
    refetchQueries: [
      GET_PROJECT, // DocumentNode object parsed with gql
      'GetProject' // Query name
    ],
  });

  // mutation for adding new users to a project
  const [addUserToProject,{data: addUserToProjectData,error:addUserToProjectError}] = useMutation(ADD_USER_TO_PROJECT, 
    {
    refetchQueries: [
      GET_PROJECT, // DocumentNode object parsed with gql
      'GetProject' // Query name
    ],
  });

  

  
  useEffect(() => {
   if(error){
     Alert.alert("Error fatching project",error.message)
   }
  }, [error])

  useEffect(() => {
    if(data){
      setTitle(data.getProject.title)
      setTaskLists(data.getProject.taskLists);
      setUsers(data.getProject.users);
      
      
    }
   }, [data])

  const createNewTask = () =>{
    //console.warn(`new task list created at index ${atIndex}`);

    createTaskList({
      variables:{
        content: newTask,
        projectId: route.params.projectId
      }
    });
      
     setNewTask("");
     setModalVisible(false);
  }

  const resetModal = () =>{
    // go away the modal after adding
    setModalVisible(!modalVisible);

    // setting title back to empty string
    setNewTask("");
 }


 useEffect(() => {
   if(addUserToProjectError){
     Alert.alert("error adding user",addUserToProjectError.message);
   }
   
 }, [addUserToProjectError])

  const addNewUser = () =>{
    //console.warn(`new task list created at index ${atIndex}`);

    addUserToProject({
      variables:{
        projectId: route.params.projectId,
        userEmail: newUser
      }
    });
    
   setNewUser("");
   setAddUserModal(false);
}
  const resetAddUserModal = () =>{
    // go away the modal after adding
    setAddUserModal(!addUserModal);

    // setting title back to empty string
    setNewUser("");
  }

  return (
    
    <View style={styles.container}>
      {/* title of the project */}
      
      <Text style={styles.title}>{title}</Text>

      {/* collaborators avatars */}
      { users.length>1 ?
      (
      <View style={styles.collaborators}>
        <FlatList
          data={users}
          renderItem={({item})=><UIAvatar _id={item._id}/>}
          keyExtractor={item=>item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <Pressable 
              style={[styles.peopleIcon,{
                backgroundColor: Colors[colorScheme].seperator,
                borderColor: Colors[colorScheme].tint
            }]}
              onPress={resetAddUserModal}
            >
              <Ionicons name="people" size={20} color={Colors[colorScheme].text} />

              {/* container of user counts */}
              <View style={[styles.numberOfUsersContainer,{
                backgroundColor: Colors[colorScheme].tint
              }]}>

                {/* number of users */}
                <Text  
                  style={[styles.numberOfUsersText,{
                    color: Colors[colorScheme].seperator,
                      }]}
                >
                  {users.length}
                </Text>
              </View>
              
            </Pressable>
          }
        />       
      </View>
      ):

      // render if only you are in a tasklist
      (
        <Pressable 
          style={[styles.peopleIcon,{
            backgroundColor: Colors[colorScheme].seperator,
            borderColor: Colors[colorScheme].tint
            }]}
          onPress={resetAddUserModal}
        >
          <Ionicons name="md-person-add" size={20} color={Colors[colorScheme].text} />
        
        </Pressable>
        )
}
      {/* render each tasks */}
      <FlatList
        data={taskLists}
        renderItem={({item,index})=>
          <TaskListItem taskListItem={item} onSubmit={createNewTask}/>
        }
        keyExtractor={item=>item._id}
        style={{marginBottom: 10}}
      />

      {/* fab component for adding new task */}
      <UIFab onPress={resetModal}/>

      {/* modal for adding new task */}

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
       
      >
        <UIPrompt
          onClose={resetModal}
          placeholder="Enter new task"
          value={newTask}
          onChangeText={(text)=>setNewTask(text)}
          onPress={createNewTask}
        />
      </Modal>

      {/* modal for adding new users */}

      <Modal
        animationType="slide"
        transparent
        visible={addUserModal}
       
      >
        <UIPrompt
          onClose={resetAddUserModal}
          placeholder="Enter new user email"
          value={newUser}
          onChangeText={(text)=>setNewUser(text)}
          onPress={addNewUser}
        />
      </Modal>
      
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title:{
    color: "white",
    fontSize: 26,
    padding: 7,
    fontWeight: "bold"
  },
  collaborators:{
    padding: 10,
    //backgroundColor: "red",
    width: "100%",

    
  },
  peopleIcon:{
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10

  },
  numberOfUsersContainer: {
    position: "absolute",
    left: 35,
    bottom: 23,
    borderRadius: 30,
    height: 25,
    width: 25,
    alignItems: "center",
    justifyContent: "center"
    
  },
  numberOfUsersText:{
    fontSize: 17,
    fontWeight: "bold",
    
    
  }
});
