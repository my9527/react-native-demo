/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet
} from 'react-native';

// 根路由
import RootStack from './src/routes';

type  Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <RootStack style={styles.app}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex'
    },
    app: {
        backgroundColor: "white"
    }
})