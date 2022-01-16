import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Alert, FlatList, KeyboardAvoidingView, Modal, StyleSheet, TextInput} from 'react-native';
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
        avatar
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

  // delete tasklist

  const DELETE_TASKLIST = gql`
    mutation DeleteTaskList($_id: String!) {
      deleteTaskList(_id: $_id)
    }`;

export default function TaskListScreen() {
  const colorScheme = useColorScheme();

  const [title, setTitle] = useState("");
  const [taskLists, setTaskLists] = useState([]);
  const [users,setUsers] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTask,setNewTask] = useState("");

  

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

  // mutation for deleting a tasklist
  const [deleteTaskList,
    { data: deleteTaskListData, error: deleteTaskListError,loading: deleteTaskListLoading}
  ] = useMutation(DELETE_TASKLIST, 
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

  const deleteTask = (id: string) =>{

    deleteTaskList({
      variables:{
        _id: id
      }
    })
  }

  const resetModal = () =>{
    // go away the modal after adding
    setModalVisible(!modalVisible);

    // setting title back to empty string
    setNewTask("");
 }

  return (
    
    <View style={styles.container}>
      {/* title of the project */}
      
      <TextInput
        style={styles.title}
        placeholder="title"
        value={title}
        onChangeText={(text)=>setTitle(text)}
        />

      {/* collaborators avatars */}
      { users.length>1 ?
      (<View style={styles.collaborators}>
        <FlatList
          data={users}
          renderItem={({item})=><UIAvatar uri={item.avatar}/>}
          keyExtractor={item=>item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <View style={[styles.peopleIcon,{
              backgroundColor: Colors[colorScheme].seperator,
              borderColor: Colors[colorScheme].tint
            }]}>
              <Ionicons name="people" size={20} color={Colors[colorScheme].text} />
              <View style={[styles.numberOfUsersContainer,{
                backgroundColor: Colors[colorScheme].tint
              }]}>
                <Text  
                  style={[styles.numberOfUsersText,{
                    color: Colors[colorScheme].seperator,
                      }]}
                >
                  {users.length}
                </Text>
              </View>
              
            </View>
          }
        />
          {/* <UIAvatar uri='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'/> */}
       
      </View>): (<View></View>)
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
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
       
      >
        <UIPrompt
          onClose={resetModal}
          placeholder="Enter new task"
          value={newTask}
          onChangeText={(text)=>setNewTask(text)}
          onPress={createNewTask}
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
