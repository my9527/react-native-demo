# react-native-demo
a application powered by React-Native ,which back-end supported by NodeJs;





# log
1.运行失败(20180330)
     &emsp;&emsp;运行失败时 可能是 由于rn 45 版之后 有几个文件无法下载，[解决方案](https://blog.csdn.net/u013751625/article/details/75046147)
2.添加navigationbar(20180401)
    &emsp;&emsp;使用react-navigation 做整体导航，结合 stackNavigator / tabNavigator 做整体布局

3.可拖拽卡片实现
    &emsp;&emsp;为了实现探探 的 左滑又滑功能， 最终以 **PanResponder** 实现, 结合 **Animated** 组件
调整手势结束后的持续性动画
    &emsp;&emsp;panResponder 参考资料：[react-native使用PanResponder实现pinch手势][1]、[ React-Native PanResponder的学习与使用][2]
   &emsp;&emsp; Animated 参考资料：[ React Native Animated 动画详解 - 实例篇][3] 、 [ReactNative Animated动画详解][4]


[1]: https://blog.csdn.net/zramals/article/details/73294211
[2]: https://blog.csdn.net/u011272795/article/details/73330655
[3]: https://blog.csdn.net/sinat_17775997/article/details/60955657
[4]: http://www.alloyteam.com/2016/01/reactnative-animated/