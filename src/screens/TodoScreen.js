import React, {useState, useContext} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {THEME} from '../theme'
import {AppCard} from '../ui/AppCard'
import {EditModal} from '../components/EditModal'
import { FontAwesome } from '@expo/vector-icons'
import {AppButton} from '../ui/AppButton'
import {ScreenContext} from '../context/screen/screenContext'
import {TodoContext} from '../context/todo/todoContext'



export const TodoScreen = () => {
    const [modal, setModal] = useState(false)
    const {todos, removeTodo, updateTodo} = useContext(TodoContext)
    const {todoId, changeScreen} = useContext(ScreenContext)
    
    const todo = todos.find(item => item.id === todoId)

    const saveTakeId = title => {
        updateTodo(todo.id, title)
        setModal(false)
    }

    return (
        <View>
            <EditModal 
                modalClose={() => setModal(false)} 
                visible={modal}
                value={todo.title}
                onSave={saveTakeId}
            />
            <View style={styles.card}>
                <AppCard >
                    <Text style={styles.title}>{todo.title}</Text>
                    <View style={styles.editButton}>
                        <AppButton
                            style={styles.editButton}
                            color={'grey'} 
                            onPress={() => setModal(true)}>
                                <FontAwesome name='edit' size={18}/>
                        </AppButton>
                    </View>
                </AppCard>
            </View>
            
            
            <View style={styles.container}>
                <View style={styles.button}>
                    <AppButton
                        onPress={() => changeScreen(null)}>
                            Back
                    </AppButton> 
                </View>
               <View style={styles.button}>  
                    <AppButton
                        color={THEME.DANGER_COLOR} 
                        onPress={() => removeTodo(todo.id)}>
                            Delete
                    </AppButton>
               </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    editButton: {
        width: '21%',
        marginBottom: 20
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        width: '30%'
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 25
    }
})