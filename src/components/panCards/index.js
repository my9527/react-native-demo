/**
 * Created by my on 2018/4/3.
 */

import React, {Component} from 'react';
import {
    View,
    Alert,
    Text,
    Dimensions
} from 'react-native';

import PanCmpt from '../panCard';


const {width} = Dimensions.get('window');


export default class PanCardsCmpt extends Component {

    static defaultProps = {
        cardList: []
    }

    constructor(props) {
        super(props);

        this.state = {
            left: 0
        }

    }

    removeFn(msg) {

    }

    moving(left) {
        this.setState({
            left
        })
    }

    render() {

        const {cardList} = this.props;
        return (
            <View>
                <View>
                    <Text>
                        left is ---->> {this.state.left}
                    </Text>
                </View>

                {cardList.map((card, idx) => {
                    return <PanCmpt
                        moving={this.moving.bind(this)}
                        removeHandle={e => {
                            cardList.pop();
                            if (cardList.length < 3) {
                                this.props.updateListHandle && this.props.updateListHandle();
                            }
                        }} info={{...card}} index={idx} key={card.id}/>
                })}

            </View>
        )
    }
}