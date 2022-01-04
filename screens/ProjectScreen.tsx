import moment from 'moment';
import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProjectItem from '../components/ProjectItem';

import { Text, View } from '../components/Themed';


export default function ProjectScreen() {
  const [projects, setProjects] = useState([{
    id: "1",
    title: "SFT Meeting",
    createdAt: (new Date()).toString()
  },
  {
    id: "2",
    title: "Annual Report",
    createdAt: (new Date()).toString()
  },
  {
    id: "3",
    title: "Prepare Reports",
    createdAt: (new Date()).toString()
  },
  {
    id: "4",
    title: "SFT Meeting",
    createdAt: (new Date()).toString()
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
