import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, StyleSheet, TextInput} from 'react-native';
import TaskListItem from '../components/TaskListItem';


import { Text, View } from '../components/Themed';
import { useQuery,useMutation,gql } from '@apollo/client';


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

export default function TaskListScreen() {

  const [title, setTitle] = useState("");
  const [taskLists, setTaskLists] = useState([]);

  

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

  const createNewTask = (atIndex: number) =>{
    //console.warn(`new task list created at index ${atIndex}`);

    createTaskList({
      variables:{
        content: "",
        projectId: route.params.projectId
      }
    })
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
          <TaskListItem taskListItem={item} onSubmit={()=>createNewTask(index + 1)}/>
        }
        keyExtractor={item=>item._id}
      />
      
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
