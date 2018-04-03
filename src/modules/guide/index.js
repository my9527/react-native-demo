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
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import {StackNavigator, SafeAreaView} from 'react-navigation';


const {width, height} = Dimensions.get('window');
type Props = {};


export default class PageGuide extends Component<Props> {
    static navigationOptions = {
        headerTitle: '',
        headerStyle: {
            backgroundColor: 'white',
        },
        // header: null
    };


    renderGuides = () => {
        const guideImgs = [require('../../res/images/guide/I2.png'), require('../../res/images/guide/I1.png')]
        return guideImgs.map((img, idx) => {
            return <Image key={idx} source={img} style={styles.image} resizeMode="contain"/>
        })
    };

    render() {

        return (
            <SafeAreaView>
                <View style={styles.pageGuide}>
                    <View style={styles.swiperCnt}>
                        <Swiper height={300}>
                            {this.renderGuides()}
                        </Swiper>
                    </View>
                    <View style={styles.cnt}>
                        <View style={styles.startBtnWrapper}>
                            <Button
                                width={2 * width / 3}
                                color="white"
                                style={styles.startBtn}
                                title="探探"
                                onPress={() => {
                                    /* 1. Navigate to the Details route with params */
                                    this.props.navigation.replace('Home', {
                                        itemId: 86,
                                        otherParam: 'First Details',
                                    });
                                }}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    pageGuide: {
        backgroundColor: 'white',
        height: height
    },
    swiperCnt: {
        display: 'flex',
        justifyContent: 'center',
        height: 300
    },
    image: {
        width: width,
        height: 300,
    },
    cnt: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        paddingTop: 20
    },
    startBtnWrapper: {

        backgroundColor: "#f4511e",
        width: 2 * width / 3,
        height: 40,
        borderRadius: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    startBtn: {
        color: "#f4511e",
        display: 'flex',
        backgroundColor: "#f4511e",
        width: 2 * width / 3
    }
})


