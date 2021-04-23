import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Button, Modal, Alert} from 'react-native';
import {THEME} from '../theme';
import { AppButton } from '../ui/AppButton';


export const EditModal = ({visible, modalClose, value, onSave}) => {

    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if(title.trim().length < 3) {
            Alert.alert('Error!', 'The minimum description length is 3 symbols')
        } else {
            onSave(title)
        }
    }

    const cancelHandler = () => {
        setTitle(value)
        modalClose()
    }

    return (
        <Modal 
            visible={visible} 
            animationType='fade'>
            <View style={styles.wrapper}>
                <TextInput 
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder={title}
                />
                    <View style={styles.buttons}>
                        <View style={styles.button}>
                            <AppButton
                                color={THEME.DANGER_COLOR} 
                                onPress={cancelHandler} >
                                Cancel
                            </AppButton>
                        </View>
                        <View style={styles.button}>
                            <AppButton onPress={saveHandler}>
                                Save
                            </AppButton>
                        </View>
                    </View>
            </View>
        </Modal>
     
    )
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '70%',
        height: 70,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        textAlign: 'center'
    },
    buttons: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        width: '35%'
    }
})