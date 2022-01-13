import moment from 'moment';
import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProjectItem from '../components/ProjectItem';

import { Text, View } from '../components/Themed';


export default function ProjectScreen() {
  const [projects, setProjects] = useState([{
    id: "1",
    title: "SFT Meeting",
    createdAt: (new Date()).toISOString()
  },
  {
    id: "2",
    title: "Annual Report",
    createdAt: (new Date()).toISOString()
  },
  {
    id: "3",
    title: "Prepare Reports",
    createdAt: (new Date()).toISOString()
  },
  {
    id: "4",
    title: "SFT Meeting",
    createdAt: (new Date()).toISOString()
  }]);

  return (
    <View style={styles.container}>
      {/* project list */}
    
      <FlatList
        data={projects}
        renderItem={({item})=><ProjectItem project={item}/>}
        keyExtractor={item=>item.id}
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
