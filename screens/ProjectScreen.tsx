import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, Pressable, StyleSheet } from 'react-native';
import ProjectItem from '../components/ProjectItem';
import { Text, View } from '../components/Themed';
import { useQuery,gql, useMutation } from '@apollo/client';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { Entypo } from '@expo/vector-icons';
import UITextInput from '../components/UIElements/UITextInput';
import UIButton from '../components/UIElements/UIButton';
import UIFab from '../components/UIElements/UIFab';
import UIPrompt from '../components/UIElements/UIPrompt';

const MY_PROJECTS = gql`
  query MyProjects {
    myProjects {
        _id
        title
        createdAt
      }
}`;
const CREATE_PROJECT =  gql`
  mutation createProject($title: String!) {
    createProject(title: $title) {
      _id
      title
      createdAt
    }
  }
`;


export default function ProjectScreen() {
  const colorScheme = useColorScheme(); 
  const [modalVisible, setModalVisible] = useState(false);

  const [projects, setProjects] = useState([]);
  const [newProjectTitle,setNewProjectTitle] = useState("");

  const { data, error, loading } = useQuery(MY_PROJECTS);

  const [createProject] = useMutation(CREATE_PROJECT,{
    refetchQueries: [
      MY_PROJECTS, // DocumentNode object parsed with gql
      'MyProjects' // Query name
    ],
  })

  useEffect(() => {
    if(error){
      Alert.alert("Error fatching projects",error.message);
    }
  }, [error])

  useEffect(() => {
    if(data){
      setProjects(data.myProjects)
    }
  }, [data])

  const onCreateProject = () =>{
    createProject({
      variables:{
        title: newProjectTitle
      }
    })
    resetModal();
   
   
  }

  const resetModal = () =>{
     // go away the modal after adding
     setModalVisible(!modalVisible);

     // setting title back to empty string
     setNewProjectTitle("");
  }
 
  return (
    <View style={[styles.container,{
      opacity: modalVisible ? 0.4 : 1
    }]}>
      {/* project list */}
    
      <FlatList
        data={projects}
        renderItem={({item})=><ProjectItem project={item}/>}
        keyExtractor={item=>item._id}
        style={{marginBottom: 20}}
      />
      

      <UIFab onPress={resetModal}/>

      {/* modal for new project */}
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
          placeholder="Enter project title"
          value={newProjectTitle}
          onChangeText={(text)=>setNewProjectTitle(text)}
          onPress={onCreateProject}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 300,
    width: "90%",
    height: 230,
    left: 20,
    borderRadius: 10,
    backgroundColor: "#212121"
   },
  close:{
    marginRight: 30,
    padding: 5,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  }
});
