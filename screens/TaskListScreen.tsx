import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, StyleSheet, TextInput} from 'react-native';
import TaskListItem from '../components/TaskListItem';


import { Text, View } from '../components/Themed';
import { useQuery,gql } from '@apollo/client';

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


export default function TaskListScreen() {

  const [title, setTitle] = useState("");
  const [taskLists, setTaskLists] = useState([]);

  

  const route = useRoute();
  const { data, error, loading } = useQuery(GET_PROJECT,{variables: {_id: route.params.projectId}});

  
  useEffect(() => {
   if(error){
     Alert.alert("Error fatching project",error.message)
   }
  }, [error])

  useEffect(() => {
    if(data){
      setTitle(data.getProject.title)
      setTaskLists(data.getProject.taskLists);
      console.log(data.getProject);
    }
   }, [data])

  const createNewTask = (atIndex: number) =>{
    //console.warn(`new task list created at index ${atIndex}`);
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
    fontSize: 20,
    padding: 7,
    fontWeight: "bold"
  }
});
