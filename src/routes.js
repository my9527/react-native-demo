/**
 * Created by my on 2018/3/30.
 */


import React, {Component} from 'react-native';
import {StackNavigator, SafeAreaView} from 'react-navigation';

import PageHome from './modules/home';
import PageTest from './modules/test';
import PageGuide from './modules/guide';
import PagePan from './modules/pan';

const RootStack = StackNavigator(
    {
        Guide: {
            screen: PageGuide,
        },
        Home: {
            screen: PageHome
        },
        Detail: {
            screen: PageTest,
        },
        Pan: {
            screen: PagePan,
        },
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);

export default RootStack;