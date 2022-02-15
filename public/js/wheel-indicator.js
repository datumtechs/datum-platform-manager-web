/**
 * Generates event when user makes new movement (like a swipe on a touchscreen).
 * @version 1.2.2
 * @link https://github.com/Promo/wheel-indicator
 * @license MIT
 */

/* global module, window, document */

const WheelIndicator = (function () {
    function Module(options) {
        const DEFAULTS = {
            callback() { },
            elem: document,
            preventMouse: true
        }

        this.eventWheel = 'onwheel' in document ? 'wheel' : 'mousewheel'
        this._options = extend(DEFAULTS, options) // extend合并选项
        this._deltaArray = [ 0, 0, 0 ] // 这数组是啥??
        this._isAcceleration = false // 加速度开关
        this._isStopped = true // 是否是停止状态
        this._direction = '' // 方向
        this._timer = '' // 全局setTimer
        this._isWorking = true // 是否在运作

        const self = this // 防止this指向
        this._wheelHandler = function (event) {
            if (self._isWorking) { // 监听事件处理器 首先触发#01
                processDelta.call(self, event)

                if (self._options.preventMouse) {
                    preventDefault(event)
                }
            }
        }

        addEvent(this._options.elem, this.eventWheel, this._wheelHandler)
    }

    Module.prototype = {
        constructor: Module,

        turnOn() {
            this._isWorking = true

            return this
        },

        turnOff() {
            this._isWorking = false

            return this
        },

        setOptions(options) {
            this._options = extend(this._options, options)

            return this
        },

        getOption(option) {
            const neededOption = this._options[ option ]

            if (neededOption !== undefined) {
                return neededOption
            }

            throw new Error('Unknown option')
        },

        destroy() {
            removeEvent(this._options.elem, this.eventWheel, this._wheelHandler)

            return this
        }
    }

    function triggerEvent(event) {
        event.direction = this._direction
        this._options.callback(event)
    }

    var getDeltaY = function (event) { // 第二步处理#02
        if (event.wheelDelta && !event.deltaY) { // ie兼容 ie能找到wheelDelta 找不到event
            getDeltaY = function (event) {
                return event.wheelDelta * -1
            }
        } else {
            getDeltaY = function (event) {
                return event.deltaY // 现代浏览器只去deltaY
            }
        }

        return getDeltaY(event)
    }

    function preventDefault(event) {
        event = event || window.event

        if (event.preventDefault) {
            event.preventDefault()
        } else {
            event.returnValue = false
        }
    }

    function processDelta(event) { // 处理增量
        const
            self = this
        const delta = getDeltaY(event) // deltaX, deltaY 滚轮的坐标轴
        /**
         *  返回int +-100
         *  firefox 找不到 wheelDelta 返回deltaY+-3
         *  chrome  会找到 两者都能找到 event.wheelDelta -120 && !event.deltaY==100
         *  IE      找不到 deltaY 可以找到wheelDelta(与火狐相反)
         *
         *
         */

        if (delta === 0) return

        const direction = delta > 0 ? 'down' : 'up' // 给出闭包 this.direction
        const arrayLength = self._deltaArray.length // 初始值为3个0的一元数组
        let changedDirection = false
        let repeatDirection = 0
        let sustainableDirection; let i

        clearTimeout(self._timer) // 取消既有延迟

        self._timer = setTimeout(function () { // 延迟150毫秒设置
            // 相当于在此处做了节流
            self._deltaArray = [ 0, 0, 0 ]
            self._isStopped = true
            self._direction = direction
        }, 150)

        // check how many of last three deltas correspond to certain direction
        // 检查最后三个三角洲中有多少对应于某个方向
        for (i = 0; i < arrayLength; i++) {
            if (self._deltaArray[ i ] !== 0) {
                self._deltaArray[ i ] > 0 ? ++repeatDirection : --repeatDirection
            }
        }

        // if all of last three deltas is greater than 0 or lesser than 0 then direction is switched
        // 如果最后三个三角形都大于0或小于0，则切换方向
        if (Math.abs(repeatDirection) === arrayLength) {
            // determine type of sustainable direction 可持续方向的类型
            // (three positive or negative deltas in a row) 连续三个正三角形或负三角形
            sustainableDirection = repeatDirection > 0 ? 'down' : 'up'

            if (sustainableDirection !== self._direction) {
                // direction is switched
                changedDirection = true // 方向在此转换 那么这个changedDirection有什么意义呢
                self._direction = direction
            }
        }

        // if wheel`s moving and current event is not the first in array
        // 如果控制盘移动且  当前事件不是数组中的第一个
        if (!self._isStopped) { // 非停止的
            // console.log("进入了正在运动中的状态");

            if (changedDirection) {
                self._isAcceleration = true // 加速度???
                // 在运动中 只有改变方向 才能触发
                // console.log("进行中 改变方向");
                triggerEvent.call(this, event)
            } else {
                // check only if movement direction is sustainable  仅在运动方向可持续时检查
                // console.log("是否重复方向,重复个数:" +
                //     repeatDirection);
                // 大多数事件在这里被过滤掉了
                if (Math.abs(repeatDirection) === arrayLength) {
                    // must take deltas to don`t get a bug
                    // [-116, -109, -103]
                    // [-109, -103, 1] - new impulse
                    // console.log("将进入研究数组");
                    analyzeArray.call(this, event) // 此处研究数组??
                }
                // console.log("该动作被过滤了");
            }
        }

        // if wheel is stopped and current delta value is the first in array
        // 如果轮子停止并且当前增量值是数组中的第一个
        if (self._isStopped) {
            // console.log("进入了静止中的状态");
            self._isStopped = false
            self._isAcceleration = true
            self._direction = direction

            triggerEvent.call(this, event) // 将事件传递出去
        }
        // 更新滑动方向组
        self._deltaArray.shift() // 删除数组第一个元素
        self._deltaArray.push(delta) // 尾部追加一个元素
    }

    function analyzeArray(event) {
        // console.log("已进入研究数组");

        const deltaArray0Abs = Math.abs(this._deltaArray[ 0 ])
        const deltaArray1Abs = Math.abs(this._deltaArray[ 1 ])
        const deltaArray2Abs = Math.abs(this._deltaArray[ 2 ])
        const deltaAbs = Math.abs(getDeltaY(event))

        if ((deltaAbs > deltaArray2Abs) && // 这里的判断是 三次都在增加速度
            (deltaArray2Abs > deltaArray1Abs) &&
            (deltaArray1Abs > deltaArray0Abs)) {
            if (!this._isAcceleration) { // 加速度为否时 这里应该是处模板问题了 会出现加速度
                // console.log("判断加速度存在,同时加速度开关打开,触发一次滚动------------------------");
                triggerEvent.call(this, event) // 这里又触发了一次
                this._isAcceleration = true
            }
        }

        if ((deltaAbs < deltaArray2Abs) &&
            (deltaArray2Abs <= deltaArray1Abs)) {
            // console.log("判断加速度不存在.关闭加速度开关");

            this._isAcceleration = false
        }

        // 同样的加速度都在这里被释放掉了
        // console.log("同样了经过研究也被过滤了");
    }

    function addEvent(elem, type, handler) { // 绑定事件 原生
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, isPassiveSupported() ? { // 是否支持passive
                passive: false
            } : false)
        } else if (elem.attachEvent) { // IE兼容 绑定事件 事件名称要加on
            elem.attachEvent('on' + type, handler)
        }
    }

    function removeEvent(elem, type, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, isPassiveSupported()
                ? {
                    passive: false
                }
                : false)
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + type, handler)
        }
    }

    function extend(defaults, options) {
        const extended = {} // 目标值
        let prop

        for (prop in defaults) { // 遍历基础选项
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[ prop ] = defaults[ prop ]
            }
        }

        for (prop in options) { // 遍历传入选项
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[ prop ] = options[ prop ]
            }
        }

        return extended
    }

    return Module
})()

if (typeof exports === 'object') {
    module.exports = WheelIndicator
}

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
function isPassiveSupported() {
    let passiveSupported = false
    try {
        const options = Object.defineProperty({}, 'passive', {
            get() {
                passiveSupported = true
            }
        })

        window.addEventListener('test', null, options)
        window.removeEventListener('test', null, options)
    } catch (err) { }

    return passiveSupported
}
