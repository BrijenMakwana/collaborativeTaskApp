import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet } from 'react-native';
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
import EmptyList from '../components/EmptyList';

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

  const [refreshing, setRefreshing] = useState(false);

  const { data, error, loading, refetch } = useQuery(MY_PROJECTS);

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

  // refetch all projects
  const refetchProjects = () => {

    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false)
    }, 2000);
    
  }
 
  return (
    
    <KeyboardAvoidingView behavior="padding" style={[styles.container,{
      opacity: modalVisible ? 0.4 : 1,
      backgroundColor: Colors[colorScheme].background
    }]}>
      {loading && <ActivityIndicator size="large" color={Colors[colorScheme].tint} style={{padding: 50}}/>}
      {/* project list */}

      <FlatList
        data={projects}
        renderItem={({item})=><ProjectItem project={item} onRefetch={refetchProjects}/>}
        keyExtractor={item=>item._id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyList text="Currently you don't have any projects"/>}
        onRefresh={refetchProjects}
        refreshing={refreshing}
      />
      <View style={{height:70}}/>

      <UIFab onPress={resetModal}/>

      {/* modal for new project */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
       
      >
        <UIPrompt
          onClose={resetModal}
          placeholder="Enter project title"
          value={newProjectTitle}
          onChangeText={(text)=>setNewProjectTitle(text)}
          onPress={onCreateProject}
        />
      </Modal>
    </KeyboardAvoidingView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
 
});
