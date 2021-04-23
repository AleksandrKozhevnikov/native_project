import React from 'react';
import {View, StyleSheet} from 'react-native';
import {THEME} from '../theme';
import {AppTextItalic} from '../ui/AppTextItalic';

export const Navbar = ({title}) => {
    return (
        <View style={styles.navbar}>
            <AppTextItalic style={styles.text}>{title}</AppTextItalic>
        </View>
        
    )
};

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 12,
        backgroundColor: THEME.MAIN_COLOR
    },
    text: {
        color: '#fff',
        fontSize: 17
    }
})