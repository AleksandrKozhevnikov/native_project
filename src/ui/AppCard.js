import React from 'react';
import {StyleSheet, View} from 'react-native';

export const AppCard = (props) => (
    <View style={styles.default}>{props.children}</View>
)   


const styles = StyleSheet.create({
    default: {
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 25,
        width: '80%',
        borderRadius: 10,
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})