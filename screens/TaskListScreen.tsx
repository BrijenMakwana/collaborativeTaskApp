import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, StyleSheet, TextInput} from 'react-native';
import TaskListItem from '../components/TaskListItem';


import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TaskListScreen() {

  const [title, setTitle] = useState("");
  const [taskListItem, setTaskListItem] = useState([{
    id: "1",
    content: "Prepare a report",
    isChecked: true
  },
  {
    id: "2",
    content: "Attend a meeting",
    isChecked: true
  },
  {
    id: "3",
    content: "Make a call to manager",
    isChecked: false
  },
  {
    id: "4",
    content: "Submit the file",
    isChecked: true
  },
  {
    id: "5",
    content: "Prepare a report",
    isChecked: true
  },
  {
    id: "6",
    content: "Attend a meeting",
    isChecked: true
  },
  {
    id: "7",
    content: "Make a call to manager",
    isChecked: false
  },
  {
    id: "8",
    content: "Submit the file",
    isChecked: true
  },
  {
    id: "9",
    content: "Make a call to manager",
    isChecked: false
  },
  {
    id: "10",
    content: "Submit the file",
    isChecked: true
  }]);

  const createNewTask = (atIndex: number) =>{
    //console.warn(`new task list created at index ${atIndex}`);
  }

  return (
    
    <View style={styles.container}>
      {/* title of the tasklist */}
      
      <TextInput
        style={styles.title}
        placeholder="title"
        value={title}
        onChangeText={(text)=>setTitle(text)}
        />

      {/* render each tasks */}
      <FlatList
        data={taskListItem}
        renderItem={({item,index})=>
          <TaskListItem taskListItem={item} onSubmit={()=>createNewTask(index + 1)}/>
        }
        keyExtractor={item=>item.id}
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
