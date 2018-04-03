/**
 * Created by my on 2018/4/3.
 */
import React from 'react';
import {
    View,
    StyleSheet,
    PanResponder,
    Dimensions,
    Text,
    Animated,
    Easing
} from 'react-native';
import PropTypes from 'prop-types';

const win = Dimensions.get('window');

const CIRCLE_SIZE = win.width - 48;
const pLeft = win.width / 2 - CIRCLE_SIZE / 2;
const pTop = 20;


export default class PanCmpt extends React.Component {

    static defaultProps = {
        info: {
            name: '',
            id: 0,
            img: '',


        }
    }

    static propTypes = {
        info: PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            img: PropTypes.string.isRequired
        }).isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            needRemove: false,
            transformX: props.idx,
            pos: {
                _previousLeft: pLeft,
                lastLeft: pLeft,
                _previousTop: pTop,
                lastTop: pTop
            },
            style: new Animated.ValueXY({
                //x，y用来记录小球移动坐标
                x: pLeft,
                y: pLeft
            },)
        }
        this.onStartShouldSetPanResponder = this.onStartShouldSetPanResponder.bind(this);
        this.onMoveShouldSetPanResponder = this.onMoveShouldSetPanResponder.bind(this);
        this.onPanResponderGrant = this.onPanResponderGrant.bind(this);
        this.onPanResponderMove = this.onPanResponderMove.bind(this);
        this.onPanResponderRelease = this.onPanResponderRelease.bind(this);
    }

    componentWillMount(evt, gestureState) {

        this._panResponder = PanResponder.create({
            //用户开始触摸屏幕的时候，是否愿意成为响应者；默认返回false，无法响应，
            // 当返回true的时候则可以进行之后的事件传递。
            onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,

            //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
            onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,

            //开始手势操作，也可以说按下去。给用户一些视觉反馈，让他们知道发生了什么事情！（如：可以修改颜色）
            onPanResponderGrant: this.onPanResponderGrant,

            //最近一次的移动距离.如:(获取x轴y轴方向的移动距离 gestureState.dx,gestureState.dy)
            onPanResponderMove: this.onPanResponderMove,

            //用户放开了所有的触摸点，且此时视图已经成为了响应者。
            onPanResponderRelease: this.onPanResponderRelease,

            //另一个组件已经成为了新的响应者，所以当前手势将被取消。
            onPanResponderTerminate: this.onPanResponderEnd,
        });
    }

    componentDidMount() {

    }

    //用户开始触摸屏幕的时候，是否愿意成为响应者；
    onStartShouldSetPanResponder(evt, gestureState) {
        return true;
    }

    //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
    onMoveShouldSetPanResponder(evt, gestureState) {
        return true;
    }

    // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
    onPanResponderGrant(evt, gestureState) {


        this.state.style.setValue({
            x: this.state.pos._previousLeft,   //_previousLeft和_previousTop是两个变量，用来记录小球移动坐标
            y: this.state.pos.lastTop,
        })
    }

    // 最近一次的移动距离为gestureState.move{X,Y}
    onPanResponderMove(evt, gestureState) {
        const _previousLeft = this.state.pos.lastLeft + gestureState.dx;
        const _previousTop = this.state.pos.lastTop + gestureState.dy;

        //实时更新
        this.setState({
            pos: Object.assign(this.state.pos, {_previousLeft, _previousTop})
        });
        this.props.moving && this.props.moving(_previousLeft);
        this.animation(_previousLeft, _previousTop, 10).start();
    }

    // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
    // 一般来说这意味着一个手势操作已经成功完成。
    onPanResponderRelease(evt, gestureState) {

        this.changePosition();
    }

    /**
     根据位置做出相应处理
     **/
    changePosition() {


        let {_previousLeft, _previousTop, lastLeft, lastTop} = this.state.pos;
        lastLeft = _previousLeft;

        if (_previousLeft + CIRCLE_SIZE / 2 <= 0) {

            _previousLeft = lastLeft = -CIRCLE_SIZE;
            lastTop = _previousTop;


        } else if (_previousLeft + CIRCLE_SIZE / 2 >= Dimensions.get('window').width) {
            _previousLeft = lastLeft = Dimensions.get('window').width + CIRCLE_SIZE;
            lastTop = _previousTop;
        } else {
            _previousLeft = lastLeft = (win.width - CIRCLE_SIZE) / 2;

        }
        /* else {
             _previousLeft = lastLeft = Dimensions.get('window').width + CIRCLE_SIZE;
             lastTop = _previousTop;

         }*/

        const needRemove = _previousLeft < 0 || _previousLeft > win.width
        this.setState({

            needRemove: needRemove,
            pos: {_previousLeft, _previousTop, lastLeft, lastTop}

        });
        
        this.animation(_previousLeft, lastTop).start(() => {
            needRemove && this.props.removeHandle && this.props.removeHandle();

        });
    }

    animation(_previousLeft, lastTop, duration = 1000) {
        return Animated.timing(this.state.style, {
            toValue: {
                x: _previousLeft,
                y: lastTop
            },  //透明度动画最终值
            duration: duration,   //动画时长3000毫秒
            easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)  //缓动函数
        })

    }


    render() {
        const {_previousLeft, _previousTop, lastLeft, lastTop} = this.state.pos;
        return (
            <Animated.View
                {...this._panResponder.panHandlers}
                style={[styles.card, {
                    left: this.state.style.x,
                    top: this.state.style.y,
                    transform: [{scale: 1 - Math.abs(this.props.index - 2) / 20}, {translateY: -this.props.index * 20 - 10}]
                }]}>
                <Text>{_previousTop}</Text>
                <Text>{this.props.info.name}</Text>
                <Text>{this.props.info.id}</Text>
                <Text>{this.state.needRemove === true ? 'true' : 'false'}</Text>

            </Animated.View>
        );
    }
}
const styles = StyleSheet.create({
    card: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE * 1.2,
        borderRadius: 8,
        backgroundColor: 'white',
        position: 'absolute',
        borderWidth: 1,
        borderColor: '#515151'
    }
});