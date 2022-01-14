import moment from 'moment';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet } from 'react-native';
import ProjectItem from '../components/ProjectItem';
import { Text, View } from '../components/Themed';
import { useQuery,gql } from '@apollo/client';

const MY_PROJECTS = gql`
  query MyProjects {
    myProjects {
        _id
        title
        createdAt
      }
}`;


export default function ProjectScreen() {
  const [projects, setProjects] = useState([]);

  const { data, error, loading } = useQuery(MY_PROJECTS);

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
 
  return (
    <View style={styles.container}>
      {/* project list */}
    
      <FlatList
        data={projects}
        renderItem={({item})=><ProjectItem project={item}/>}
        keyExtractor={item=>item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
