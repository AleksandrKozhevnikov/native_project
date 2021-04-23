import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Alert, Text, Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 


export const AddTodo = ({onSubmit}) => {
    const [valueState, setValue] = useState('')

    const presshandler = () => {
        if (valueState.trim()) {
            onSubmit(valueState);
            setValue('');
            Keyboard.dismiss()
        } else {
           Alert.alert('Fill the form!')
        }
    }
    return (
        <View style={styles.block}>
            <TextInput 
                style={styles.input} 
                placeholder='Type into me...'
                onChangeText={setValue}
                value={valueState}>
            </TextInput>
            <AntDesign.Button
                style={styles.button}
                name='pluscircle'
                size={30}
                color='black'
                onPress={presshandler}>
                <Text style={styles.buttonText}>Add</Text>
            </AntDesign.Button>
                
            
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 20,
        paddingRight: 10,
        paddingLeft: 10
    },
    input: {
        width: '60%',
        height: 70,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#fff',
        fontSize: 20
    },
    buttonText: {
        fontSize: 18
    }
})