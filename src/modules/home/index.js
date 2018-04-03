/**
 * Created by my on 2018/3/30.
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Dimensions,
    Alert
} from 'react-native';
import {StackNavigator, SafeAreaView} from 'react-navigation';

import PanCmpt from '../../components/panCard';
import PanCards from '../../components/panCards';


const {width, height} = Dimensions.get('window');
type Props = {};


export default class PageHome extends Component<Props> {
    static navigationOptions = {
        headerTitle: 'Home'
    };

    constructor(props) {
        super(props);

        this.state = {
            cardList: [{
                id: 1,
                img: '',
                name: 'yl',
                age: 25
            }, {
                id: 2,
                img: '',
                name: 'zl',
                age: 24
            }, {
                id: 3,
                img: '',
                name: 'ct',
                age: 25
            }]
        }
    }

    renderBtns() {

        const urls = [{
            name: 'Detail',
            title: '详情'

        }, {
            name: 'Test',
            title: '测试'

        }, {
            name: 'Pan',
            title: 'pan'

        }]

        return urls.map(url => {
            return <Button
                width={2 * width / 3}
                title={url.title}
                key={url.name}
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    this.props.navigation.navigate(url.name, {
                        itemId: 86,
                        otherParam: 'First Details',
                    });
                }}
            />
        })
    }

    removeFn(msg) {
        Alert.alert('标题内容', msg);
    }

    updateCardList() {
        this.setState({
            cardList: [{
                name: 'ct',
                age: 25,
                id: Date.now(),
                img: ''
            }, ...this.state.cardList]
        })
    }


    render() {

        const {cardList} = this.state;

        return (

            <SafeAreaView>
                <View style={styles.pageHome}>
                    <Text>This is home</Text>
                    {this.renderBtns()};
                    <View style={styles.cardsWrapper}>
                        <PanCards updateListHandle={e => this.updateCardList()} cardList={cardList}></PanCards>
                    </View>
                </View>

            </SafeAreaView>


        );
    }
}

const styles = StyleSheet.create({
    pageHome: {
        backgroundColor: 'white',
        height: height
    },
    cardsWrapper: {
        position: 'relative'
    }
})


