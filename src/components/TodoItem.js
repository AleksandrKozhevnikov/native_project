import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';


export const TodoItem = ({todo, onRemove, onOpen}) => {


    return (
        <TouchableOpacity 
            activeOpacity={0.4} 
            onPress={() => onOpen(todo.id)}
            onLongPress={onRemove.bind(null, todo.id)}
        >
            <View style={styles.wrapper}>
                <View style={styles.item}>
                    <Text>{todo.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center'
    },
    item: {
        marginTop: 15,
        alignItems: 'center', 
        width: '85%',
        padding: 15,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10
    },
})