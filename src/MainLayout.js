import React, {useContext} from 'react'
import {View, StyleSheet} from 'react-native';
import {Navbar} from './components/Navbar';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import {ScreenContext} from './context/screen/screenContext';


export const MainLayout = () => {
    const {todoId} = useContext(ScreenContext)

    return (
        <View style={styles.main} >
          <Navbar title='NEED TO DO'/>
          {todoId ? <TodoScreen/> : <MainScreen/>}
        </View>
    )
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})