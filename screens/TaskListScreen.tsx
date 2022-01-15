import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Modal, StyleSheet, TextInput} from 'react-native';
import TaskListItem from '../components/TaskListItem';


import { Text, View } from '../components/Themed';
import { useQuery,useMutation,gql } from '@apollo/client';
import UIFab from '../components/UIElements/UIFab';
import UIPrompt from '../components/UIElements/UIPrompt';


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

  const [title, setTitle] = useState("");
  const [taskLists, setTaskLists] = useState([]);

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

      {/* render each tasks */}
      <FlatList
        data={taskLists}
        renderItem={({item,index})=>
          <TaskListItem taskListItem={item} onSubmit={createNewTask}/>
        }
        keyExtractor={item=>item._id}
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
  }
});
