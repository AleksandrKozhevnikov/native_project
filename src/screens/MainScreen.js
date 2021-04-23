import React, {useState, useEffect, useContext, useCallback} from 'react';
import {StyleSheet, View, FlatList, Image, Dimensions} from 'react-native';
import {AddTodo} from '../components/AddTodo';
import {TodoItem} from '../components/TodoItem';
import { ScreenContext } from '../context/screen/screenContext';
import { TodoContext } from '../context/todo/todoContext';
import { THEME } from '../theme';
import { AppButton } from '../ui/AppButton';
import { AppLoader } from '../ui/AppLoader';
import {AppTextBold} from '../ui/AppTextBold';


export const MainScreen = () => {
    const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext)
    const {changeScreen} = useContext(ScreenContext)
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width)



    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])


    useEffect(() => {
        loadTodos()
    }, [])
    
    useEffect(() => {
        
        const update = () => {
            const width = Dimensions.get('window').width
            setDeviceWidth(width)
        }

        Dimensions.addEventListener('change', update)

        return (
            Dimensions.removeEventListener('change', update)
        )
    })

    

    if(loading) {
        return <AppLoader/>
    }

    if(error) {
        return (
            <View style={styles.center}>
                <AppTextBold style={styles.error}>{error}</AppTextBold>
                <AppButton onPress={loadTodos}>Reload</AppButton>
            </View>
        )
    }




    let content =  (
        <View style={{deviceWidth}}>
            <FlatList
            keyExtractor={item => item.id}
            data={todos}
            renderItem={({item}) => 
                <TodoItem 
                    todo={item} 
                    onRemove={removeTodo} 
                    onOpen={changeScreen}>  
                </TodoItem>}
            />
        </View>
    )

    if (todos.length === 0) {
        content = (
            <View style={styles.imageWrapper}>
                <Image style={styles.image} source={require('../../assets/react.png')}/>
            </View>
        )
    }

    return (
        <View>
            <AddTodo onSubmit={addTodo} />
            {content}
        </View>
    )
}


const styles = StyleSheet.create({
    imageWrapper: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 250
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        color: THEME.MAIN_COLOR,
        fontSize: 15
    }
})