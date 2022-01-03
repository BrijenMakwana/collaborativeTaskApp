import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import CheckBox from './CheckBox';

export type TaskListItemProps ={
    taskListItem:{
        id: string;
        content: string;
        isChecked: boolean;
    },
    onSubmit: () => void;
}

const TaskListItem = (props: TaskListItemProps ) => {
    const [isChecked,setIsChecked] = useState(props.taskListItem.isChecked);
    const [content, setContent] = useState(props.taskListItem.content);


    // remove task when click on Backspace while content is null
    const removeTask = ({nativeEvent}) =>{
        
        if(nativeEvent.key === "Backspace" && content === ""){
            console.warn("removed");
        }
    }

    return (
        <View style={styles.container}>
            {/* checkbox */}
            <CheckBox isChecked={isChecked} onPress={()=>setIsChecked(!isChecked)}/>

            {/* text input for tasks */}
            <TextInput
                placeholder='new task'
                style={[
                    styles.input,
                    {color: isChecked ? "grey" : "white",
                    textDecorationLine: isChecked ? "line-through" : "none"}
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
