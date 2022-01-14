import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CheckBox from './CheckBox';

export type TaskListItemProps ={
    taskListItem:{
        _id: string;
        content: string;
        isCompleted: boolean;
    },
    onSubmit: () => void;
}

const TaskListItem = (props: TaskListItemProps ) => {
    const colorScheme = useColorScheme();

    const [isCompleted,setIsCompleted] = useState(props.taskListItem.isCompleted);
    const [content, setContent] = useState(props.taskListItem.content);


    // remove task when click on Backspace while content is null
    const removeTask = ({nativeEvent}) =>{
        
        if(nativeEvent.key === "Backspace" && content === ""){
            console.warn("removed");
        }
    }
    console.log(props.taskListItem)

    return (
        <View style={styles.container}>
            {/* checkbox */}
            <CheckBox isChecked={isCompleted} onPress={()=>setIsCompleted(!isCompleted)}/>

            {/* text input for tasks */}
            <TextInput
                placeholder='new task'
                style={[
                    styles.input,
                    {
                        color: isCompleted ? Colors[colorScheme].seperator : Colors[colorScheme].text,
                        textDecorationLine: isCompleted ? "line-through" : "none"
                    }
                ]}
                multiline
                value={content}
                onChangeText={(text)=>setContent(text)}
                onSubmitEditing={props.onSubmit}
                onKeyPress={removeTask}
            />
        </View>
            
    )
}

export default TaskListItem

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        width: "100%",
        padding: 5,
        marginVertical: 4,
        alignItems: "center"
    },
    input:{
        flex: 1,
        marginLeft: 10,
        fontSize: 18
        
    }
})
