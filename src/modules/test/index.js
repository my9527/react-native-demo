/**
 * Created by my on 2018/4/2.
 */

import React from 'react';
import {View, Text, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class PageTest extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: params ? params.otherParam : 'A Nested Details Screen',
        };
    };

    render() {
        /* 2. Read the params from the navigation state */
        const {params} = this.props.navigation.state;
        const itemId = params ? params.itemId : null;
        const otherParam = params ? params.otherParam : null;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Details Screen</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>
                <Button
                    title="Update the title"
                    onPress={() =>
                        this.props.navigation.setParams({otherParam: 'Updated!'})}
                />
                <Button
                    title="Go to Details... again"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}