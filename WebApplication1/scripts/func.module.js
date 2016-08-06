﻿/**
 * 该模块是一些公用方法模块
 * 
 *      作者：杨瑜堃
 *      版本：1.0.1
 * 
 * 改模依赖自：tool
*/

modules.define("func", ["tool", "vers"], function (tool, vers) {

    var browser = vers.browser;

    /**
     * 生成UUID
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @returns {String}  UUID
     */
    function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }

    /**
     * 生成GUID
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @returns {String} GUID
     */
    function guid() {
        var s4 = function () { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); };
        return (s4() + s4() + "" + s4() + "" + s4() + "" + s4() + "" + s4() + s4() + s4()).toUpperCase();
    }

    /**
     * 根据表达式计算结果
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param expression 计算表达式
     * @param precision 计算的精度值，如果精度>15或者<0，将按照精度值2来返回结果。默认为2
     * @param isFourHomesFive 是否四舍五入
     * @returns {Number} 计算结果
     */
    function calculateByExpression(expression, precision, isFourHomesFive) {
        try {
            if (precision > 15 || precision < 0 || !precision) {
                precision = 2;
            }
            return toFixed(eval(expression), precision, isFourHomesFive);
        } catch (e) {
            throw new Error("对{0}进行解析计算出错，错误原因是：{1}".format(expression, e.message));
        }
    }

    /**
     * 对数字进行固定精度操作
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {number} number 要固定精度的数字
     * @param {type} precision 要固定的精度位数，如果精度>15或者小于0，直接返回输入的数字。默认为2
     * @param {type} isFourHomesFive 固定精度时是否四舍五入
     */
    function toFixed(number, precision, isFourHomesFive) {
        try {
            if (!precision) precision = 2;

            if (precision > 15 || precision < 0) {
                return number;
            }

            var numberStr = number.toString();

            if (isFourHomesFive) {
                if (numberStr.indexOf(".") > 0) {
                    var left = numberStr.substring(0, numberStr.indexOf("."));
                    var right = numberStr.substr(numberStr.indexOf(".") + 1, precision + 1);

                    if (right.length > precision) {
                        if (parseInt(right[precision]) >= 5) {
                            var temp = parseInt(right.substr(0, [precision])) + 1;
                            return parseFloat("{0}.{1}".format(left, temp));
                        } else {
                            return parseFloat("{0}.{1}".format(left, right.substring(0, precision)));
                        }
                    } else {
                        return number;
                    }
                } else {
                    return number;
                }
            } else {
                if (numberStr.indexOf(".") > 0) {
                    return parseFloat(numberStr.substring(0, numberStr.indexOf(".") + precision + 1));
                } else {
                    return number;
                }
            }
        } catch (e) {
            throw new Error("对数字进行固定精度操作出错，错误原因是：{0}".format(e.message));
        }
    }

    /**
     * 校验对象不为undefined和空
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {Object} value 要判断的对象
     * @returns {Boolean} 结果
     */
    function definededAndNotNull(value) {
        return typeof value !== 'undefined' && value !== null;
    }

    /**
     * 判断对象是否是含有值的数组
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {Object} value 要判断的对象
     * @returns {Boolean} 结果
     */
    function isHasValuesArray(value) {
        try {
            if (tool.isArray(value)) {
                return value.length > 0;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    /**
     * pushState创建历史记录
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {Object} state state对象，至少包含title和url属性。url不能跨域
     * @returns {Boolean} 执行结果
     */
    function pushStateToHistroy(state) {
        try {
            if (history.pushState && 'pushState' in history) {
                document.title = state.title;
                window.history.pushState(state, state.title, state.url);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    /**
     * 判断是否是手机电话
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {String} val 要判断的值
     * @returns {Boolean} 执行结果
     */
    function isMobilePhone(val) {
        var patrn = /^((13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8})*$/;
        if (patrn.exec(val))
            return true;
        return false;
    }

    /**
     * 是否是网址
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {String} val 要判断的值
     * @returns {Boolean} 执行结果
     */
    function isWebAddress(val) {
        var strRegex = /(http(s)?:\/\/|^$)([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        var patrn = new RegExp(strRegex);
        if (patrn.exec(val))
            return true;
        return false;
    }

    /**
     * 判断对象是否是电话号码
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {String} val 要判断的值
     * @returns {Boolean} 判断结果
     */
    function isPhone(val) {
        var patrn = /^(\d{3}-\d{8}|\d{4}-\d{7})*$/;
        if (patrn.exec(val))
            return true;
        return false;
    }

    /**
     * 比较两个时间的大小，如出现异常将抛出
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {String} startTimeString 开始时间字符串
     * @param {String} endTimeString 结束时间字符串
     * @returns {Boolean} 判断结果
     */
    function timeCompare(startTimeString, endTimeString) {
        try {
            return Date.parse(startTimeString) >= Date.parse(endTimeString);
        } catch (e) {
            throw new Error("比较两个时间的大小出错，原因是：{0}".format(e.message));
        }
    }

    /**
     * 传进一个数据对象集合，根据指定的字段名称，将对应的值取出，以逗号分隔，每个字段以单引号引用，返回一个组合好的字符串。
     * 如：'123','123'
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {type} rows 数据对象的集合
     * @param {type} fieldName 要取出的字段名称
     * @returns {Boolean} 组合好的字符串
     */
    function createStringSplitByCommaFromArray(rows, fieldName) {
        try {
            var retString = "";
            for (var i = 0; i < rows.length; i++) {
                retString += "'" + rows[i][fieldName] + "',";
            }
            retString = retString.replace(/,$/gi, "");
            return retString;
        } catch (e) {
            throw new Error("组合字符串出错，原因是：{0}".format(e.message));
        }
    }

    /**
     * 格式化json序列化的时间格式
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {String} jsondate 时间
     * @param {String} format 格式
     * @returns {String} 结果
     */
    function formatJsonDate(jsondate, format) {
        jsondate = jsondate + "";
        if (!/^\/Date[(].+[)]\/$/.test(jsondate)) return jsondate.replace("T", " ");
        jsondate = jsondate.replace("/Date(", "").replace(")/", "");
        if (jsondate.indexOf("+") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("+"));
        }
        else if (jsondate.indexOf("-") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("-"));
        }
        var datetime = new Date(parseInt(jsondate, 10));
        if (!format) format = "yyyy-MM-dd";
        return datetime.Format(format);
    }

    /**
     * 选取范围内的随机数，如果只输入一个参数，就是0-输入的参数之间的随机数
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {Number} under 范围起点
     * @param {Number} over 范围终点
     * @returns {Number} 随机的数字
     */
    function randomBy(under, over) {
        switch (arguments.length) {
            case 1: return parseInt(Math.random() * under + 1);
            case 2: return parseInt(Math.random() * (over - under + 1) + under);
            default: return 0;
        }
    }

    /**
     * template辅助方法,用于格式化指定的过滤器。需要template支持
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {Object} template template模板接口
     * @param {String} filterName 过滤器名称
     * @param {Function} callBack 处理数据的函数
     */
    function templateHelper(template, filterName, callBack) {
        try {
            template.helper(filterName, callBack);
        } catch (e) {
            throw new Error("template辅助方法出错，错误原因是：{0}".format(e.message));
        }
    }

    /**
     * jQuery Ajax调用封装
     * @param {String} url 调用地址
     * @param {Object} data 表示Ajax调用传递的参数
     * @param {Function} onSuccess 成功回调函数,函数签名为  function(data), data参数为调用结果
     * @param {Function} unSucess 服务端返回失败时的回调
     * @param {Boolean} modal 是否作为模态对话框显示，默认为true
     * @param {Boolean} async 是否异步调用，默认为true
     * @param {Function} onError 失败回调函数,函数签名为  function (XMLHttpRequest, textStatus, errorThrown)
     * @param {Function} onComplete Ajax调用完成回调函数,函数签名为  function (XMLHttpRequest, textStatus)
     * @param {String} dataType Ajax返回数据类型,默认为 "text"
     */
    function post(url, data, onSuccess, unSucess, modal, async, onError, onComplete, dataType) {

        modal = (modal === false ? false : true);
        if (modal) {
            tool.Maskin().show();
        }

        var jsonData = {
            data: data
        };

        var ajaxHandler = $.ajax({
            type: "post",
            url: url,
            cache: false,
            contentType: "application/x-www-form-urlencoded",
            dataType: (dataType ? dataType : "text"),
            data: zip(jsonData),
            async: (async == false ? async : true),
            success: function (json) {
                if (modal) {
                    tool.Maskin().hide();
                }

                var result = JSON.parse(json || null);
                try {
                    result.Data = JSON.parse(result.Data || null);
                } catch (e) {
                }

                if (result.Succeeded) {
                    onSuccess(result);
                }

                if (!result.Succeeded && unSucess) {
                    unSucess(result);
                }
            },
            error: onError ? onError : function () {
                ajaxHandler.abort();
                tool.Maskin().hide();
            },
            //请求完成后最终执行参数
            complete: function (XMLHttpRequest, status) {
                if (status === 'timeout') {
                    //超时,status还有success,error等值的情况
                    alert("访问超时");
                    ajaxHandler.abort();
                    tool.Maskin().hide();
                }
            }
        });
    }

    /**
     * 在dom树ready之后执行给定的回调函数
     * @method domReady
     * @remind 如果在执行该方法的时候， dom树已经ready， 那么回调函数将立刻执行
     * @param { Function } fn dom树ready之后的回调函数
     * @example     
     *
     * UE.utils.domReady( function () {
     *
     *     console.log('123');
     *
     * } );
     *    
     */
    var domReady = function () {

        var fnArr = [];

        function doReady(doc) {
            //确保onready只执行一次
            doc.isReady = true;
            for (var ci; ci = fnArr.pop() ; ci()) {
            }
        }

        /**
         * 文档加载完成后触发
         * @param {type} onready 准备完成后的回调
         * @param {type} win 指定的dom
         */
        function ready(onready, win) {
            win = win || window;
            var doc = win.document;
            onready && fnArr.push(onready);
            if (doc.readyState === "complete") {
                doReady(doc);
            } else {
                doc.isReady && doReady(doc);

                if (browser.ie && browser.version != 11) {
                    (function () {
                        if (doc.isReady) return;
                        try {
                            doc.documentElement.doScroll("left");
                        } catch (error) {
                            setTimeout(arguments.callee, 0);
                            return;
                        }
                        doReady(doc);
                    })();
                    win.attachEvent('onload', function () {
                        doReady(doc)
                    });
                } else {
                    doc.addEventListener("DOMContentLoaded", function () {
                        doc.removeEventListener("DOMContentLoaded", arguments.callee, false);
                        doReady(doc);
                    }, false);
                    win.addEventListener('load', function () {
                        doReady(doc)
                    }, false);
                }
            }
        }
        return {
            ready: ready
        };
    }();

    /**
     * 对参数进行URL编码
     * @param {json} jsonObj 要编码的对象
     * @returns {string} 编码结果
     */
    function zip(jsonObj) {
        if (!jsonObj) return jsonObj;
        if (jsonObj instanceof String) {
            return encodeURIComponent(jsonObj);
        } else {
            return encodeURIComponent(JSON.stringify(jsonObj));
        }
    }

    /**
     * 判断是否是跨域url
     * @param {String} url
     * @returns {Boolean} 
     */
    function isCrossDomainUrl(url) {
        var a = document.createElement('a');
        a.href = url;
        if (browser.ie) {
            a.href = a.href;
        }
        return !(a.protocol == location.protocol && a.hostname == location.hostname &&
        (a.port == location.port || (a.port == '80' && location.port == '') || (a.port == '' && location.port == '80')));
    }

    /**
     * 删除对象中空的属性
     * @param {Object} obj
     * @returns {Object} 
     */
    function clearEmptyAttrs(obj) {
        for (var p in obj) {
            if (obj[p] === '') {
                delete obj[p]
            }
        }
        return obj;
    }

    /**
     * 字符串转json
     * @param {String} s
     * @returns {Json} 
     */
    function str2json(s) {
        if (!tool.isString(s)) return null;
        if (window.JSON) {
            return JSON.parse(s);
        } else {
            return (new Function("return " + s.trim()))();
        }
    }
        
    return {
        definededAndNotNull: definededAndNotNull,
        templateHelper: templateHelper,
        formatJsonDate: formatJsonDate,
        toFixed: toFixed,
        randomBy: randomBy,
        post: post,
        isCrossDomainUrl: isCrossDomainUrl,
        domReady: domReady,
        uuid: uuid,
        guid: guid,
        calculateByExpression: calculateByExpression,
        isHasValuesArray: isHasValuesArray,
        pushStateToHistroy: pushStateToHistroy,
        isMobilePhone: isMobilePhone,
        isWebAddress: isWebAddress,
        isPhone: isPhone,
        timeCompare: timeCompare,
        createStringSplitByCommaFromArray: createStringSplitByCommaFromArray,
        clearEmptyAttrs: clearEmptyAttrs,
        str2json: str2json
    };
});