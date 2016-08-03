﻿modules.define("func", ["tool"], function (tool) {

    /**
     * 生成UUID
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
     * @returns {String} GUID
     */
    function guid() {
        var s4 = function () { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); };
        return (s4() + s4() + "" + s4() + "" + s4() + "" + s4() + "" + s4() + s4() + s4()).toUpperCase();
    }

    /**
     * 根据表达式计算结果
     * @param expression 计算表达式
     * @param precision 计算的精度值，如果精度>15或者<0，将按照精度值2来返回结果。默认为2
     * @param isFourHomesFive 是否四舍五入
     * @returns {Number} 计算结果
     */
    function calculateByExpression(expression, precision, isFourHomesFive) {
        try {
            if (precision > 15 || precision < 0) {
                return 
            }
            if (!isFourHomesFive) {
                return parseFloat(this.numberFormat(eval(expression), !precision || precision === null || precision === undefined || precision === "" ? 2 : precision));
            } else {
                return parseFloat(eval(expression).toFixed(!precision || precision === null || precision === undefined || precision === "" ? 2 : precision));
            }
        } catch (e) {
            throw new Error(tool.formatStr("对{0}进行解析计算出错，错误原因是：{1}", [expression, e.message]));
        }
    }

    /**
     * 对数字进行固定精度操作
     * @param {number} number 要固定精度的数字
     * @param {type} precision 要固定的精度位数，如果精度>15或者小于0，直接返回输入的数字。默认为2
     * @param {type} isFourHomesFive 固定精度时是否四舍五入
     */
    function toFixed(number, precision, isFourHomesFive) {
        try {
            if (precision > 15 || precision < 0){
                return number;
            }


        } catch (e) {
            throw new Error(tool.formatStr("对数字进行固定精度操作出错，错误原因是：{0}", [e.message]));
        }
    }

    function numberFormat(number, precision) {
        /// <summary>格式化小数至指定精度，返回的值是String。</summary>
        /// <param name="number" type="Number">要格式化的数字</param>
        /// <param name="precision" type="Number">精度到多少位</param>
        /// <returns type="String"></returns>
        try {
            if (!this.isNumber(number)) throw createErrorInfo("参数1[{0}]并非数字类型数据，请确保输入的参数类型为数字", [number]);
            if (!this.isNumber(precision)) throw createErrorInfo("参数2[{0}]并非数字类型数据，请确保输入的参数类型为数字", [precision]);
            if (precision > 15 || precision < 0) throw createErrorInfo("所设置的精度{0}已超过最大精度边界15或者最小边界0", [precision]);

            if (parseInt(number) === number) {
                return number.toFixed(precision);
            } else {
                var p = number.toString().split('.');
                var r = p[0] + ".";
                var i = p[1].length;
                if (i < precision) {
                    r = number.toFixed(i + (precision - i));
                } else {
                    r += p[1].substring(0, precision);
                }
                return r;
            }
        } catch (e) {
            throw createErrorInfo("执行格式化小数精度出错，错误原因是：{0}", [e.message]);
        }
    }

    function definededAndNotNull(value) {
        /// <summary>校验对象不为undefined和空</summary>     
        /// <param name="value" type="Object">要判断的对象</param>             
        /// <returns type="Boolean"></returns>
        return typeof value !== 'undefined' && value !== null;
    }

    function isNumber(value) {
        /// <summary>判断对象是否是数字</summary>     
        /// <param name="value" type="Object">要判断的对象</param>             
        /// <returns type="Boolean">判断结果</returns>
        return typeof value === 'number';
    }

    function isDate(value) {
        /// <summary>判断对象是否是日期对象</summary>     
        /// <param name="value" type="Object">要判断的对象</param>             
        /// <returns type="Boolean">判断结果</returns>
        return toString.call(value) === '[object Date]';
    }

    function isArray(value) {
        /// <summary>判断对象是否是数组</summary>     
        /// <param name="value" type="Object">要判断的对象</param>             
        /// <returns type="Boolean"></returns>
        try {
            return Array.isArray(value);
        } catch (e) {
            return false;
        }
    }

    function isHasValuesArray(value) {
        /// <summary>判断对象是否是含有值得数组</summary>     
        /// <param name="value" type="Object">要判断的对象</param>             
        /// <returns type="Boolean"></returns>
        try {
            if (this.isArray(value)) {
                return value.length > 0;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    function pushStateToHistroy(state) {
        /// <summary>pushState创建历史记录</summary>     
        /// <param name="value" type="Object">state对象，至少包含title和url属性。url不能跨域</param>             
        /// <returns type="Boolean">执行结果</returns>
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

    function isDecimal(num) {
        /// <summary>判断一个数是否是小数(字符)</summary>     
        /// <param name="value" type="number">要判断的内容</param>             
        /// <returns type="Boolean"></returns>   
        try {
            if (typeof num === 'number') {
                var numString = num.toString();
                if (numString.indexOf('.') > 0) {
                    return parseInt(numString.substring(numString.indexOf(".") + 1)) > 0;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    function isString(val) {
        /// <summary>判断对象是否是字符串</summary>     
        /// <param name="val" type="Object">要判断的对象</param>             
        /// <returns type="Boolean">判断结果</returns>
        return typeof val === 'string';
    }

    function isFunction(val) {
        /// <summary>判断对象是否是函数</summary>     
        /// <param name="val" type="Object">要判断的对象</param>             
        /// <returns type="Boolean">判断结果</returns>
        return typeof val === 'function';
    }



    function isMobilePhone(val) {
        /// <summary>
        /// 判断是否是手机电话
        /// </summary>
        /// <param name="val" type="String">要判断的值</param>
        /// <returns type="Boolean"></returns>
        var patrn = /^((13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8})*$/;
        if (patrn.exec(val))
            return true;
        return false;
    }

    function isWebAddress(val) {
        /// <summary>
        /// 是否是网址
        /// </summary>
        /// <param name="val" type="String">要判断的值</param>
        /// <returns type="Boolean"></returns>
        var strRegex = /(http(s)?:\/\/|^$)([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        var patrn = new RegExp(strRegex);
        if (patrn.exec(val))
            return true;
        return false;
    }

    function isPhone(val) {
        /// <summary>判断对象是否是电话号码</summary>     
        /// <param name="val" type="Object">要判断的对象</param>             
        /// <returns type="Boolean">判断结果</returns>
        var patrn = /^((13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8})*$/;
        if (patrn.exec(val))
            return true;
        var patrn = /^(\d{3}-\d{8}|\d{4}-\d{7})*$/;
        if (patrn.exec(val))
            return true;
        return false;
    }

    function timeCompare(startTimeString, endTimeString) {
        /// <summary>比较两个时间的大小</summary>     
        /// <param name="startTimeString" type="String">开始时间</param>             
        /// <param name="endTimeString" type="String">结束时间</param>
        /// <returns type="Boolean"></returns>
        try {
            return Date.parse(startTimeString) >= Date.parse(endTimeString);
        } catch (e) {
            return false;
        }
    }

    function createStringSplitByCommaFromArray(rows, fieldName) {
        /// <summary>传进一个数据对象集合，根据指定的字段名称，将对应的值取出，以逗号分隔，每个字段以单引号引用，返回一个组合好的字符串</summary>     
        /// <param name="rows" type="Object[]">数据对象的集合</param>
        /// <param name="fieldName" type="String">要取出的字段名称</param>    
        /// <returns type="String"></returns>
        try {
            var retString = "";
            $.each(rows, function (index, item) {
                retString += "'" + item[fieldName] + "',";
            });
            retString = retString.replace(/,$/gi, "");
            return retString;
        } catch (e) {
            throw e;
        }
    }

    function formatJsonDate(jsondate, format) {
        /// <summary>
        ///     格式化时间
        /// </summary>     
        /// <param name="jsondate" type="String">json时间文本</param>    
        /// <param name="format" type="String">格式化文本</param> 
        /// <returns type="String">格式化的字符串</returns>
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

    function randomBy(under, over) {
        /// <summary>
        ///     选取范围内的随机数，如果只输入一个参数，就是0-输入的参数之间的随机数
        /// </summary>     
        /// <param name="under" type="Number">范围起点</param>    
        /// <param name="over" type="Number">范围终点</param> 
        /// <returns type="Number">随机的数字</returns>
        switch (arguments.length) {
            case 1: return parseInt(Math.random() * under + 1);
            case 2: return parseInt(Math.random() * (over - under + 1) + under);
            default: return 0;
        }
    }

    function templateHelper(template, filterName, callBack) {
        /// <summary>template辅助方法,用于格式化指定的过滤器。</summary>
        /// <param name="template" type="Object">template模板对象</param>
        /// <param name="filterName" type="String">过滤器名称</param>
        /// <param name="callBack" type="Function">处理数据的函数</param>
        /// <returns type="void"></returns>
        try {
            template.helper(filterName, callBack);
        } catch (e) {
            throw e;
        }
    }

    function getClientType() {
        /// <summary>
        /// 获取客户端类型：3.安卓 4.IOS 2.微信
        /// </summary>
        /// <returns type="Number"></returns>
        var clientType = -1;

        if (version.android === true) clientType = 3;
        if (version.iPhone === true) clientType = 4;
        if (version.weixin === true) clientType = 2;
        return clientType;
    }

    /* 
    * jQuery Ajax调用封装
    * url:			调用地址
    * data:			可选参数,表示Ajax调用参数
    * onSuccess:	可选参数,成功回调函数,函数签名为  function(data), data参数为调用结果
    * unSucess:	    可选参数,服务端返回失败时的回调
    * modal:		可选参数,是否作为模态对话框显示，默认为true
    * async:		可选参数,是否异步调用，默认为true
    * onError:		可选参数,失败回调函数,函数签名为  function (XMLHttpRequest, textStatus, errorThrown)
    * onComplete:	可选参数,Ajax调用完成回调函数,函数签名为  function (XMLHttpRequest, textStatus)
    * dataType:		可选参数,Ajax返回数据类型,默认为 "text"
    */
    function AjaxPost(url, data, onSuccess, unSucess, modal, async, onError, onComplete, dataType) {
        var mask = null;
        modal = (modal === false ? false : true);
        if (modal) {
            mask = new Maskwin();
            mask.show();
        }

        var jsonData = {
            data: data
        };
        //var tempData = JSON.stringify(data).UrlEncode();
        //var tempBytes = loader.loadDatas(tempData);
        //var sortArray = tempBytes.sort(function (a, b) { return a - b; });
        //var doData = sortArray.toString();

        //jsonData.sign = loader.loadData(doData);
        //jsonData.dec = "111";

        var ajaxHandler = $.ajax({
            type: "post",
            url: url,
            cache: false,
            contentType: "application/x-www-form-urlencoded",
            dataType: (dataType ? dataType : "text"),
            data: zip(jsonData),
            async: (async == false ? async : true),
            success: function (json) {
                if (mask) {
                    mask.hide();
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
                mask.hide();
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                if (status === 'timeout') { //超时,status还有success,error等值的情况
                    alert("访问超时");
                    ajaxHandler.abort();
                    mask.hide();
                }
            }
        });
    }

    function showErrorPage(url) {
        try {
            var div = $("<div/>");
            div.css("padding", "5px");
            div.dialog({
                title: "不好意思出错啦",
                width: 600,
                height: 400,
                buttons: [{
                    text: '确定',
                    iconCls: 'icon-ok',
                    handler: function () {
                        div.dialog("close");
                    }
                }],
                onClose: function () {
                    //关闭时摧毁该窗口
                    div.dialog("destroy");
                }
            }).dialog("open").dialog("refresh", url);
        } catch (e) {
            throw e;
        }
    }

    function getTimeStamp(jsondate) {
        if (!jsondate) {
            return "";
        }
        jsondate = jsondate + "";
        if (!/^\/Date[(].+[)]\/$/.test(jsondate)) return jsondate.replace("T", " ");
        jsondate = jsondate.replace("/Date(", "").replace(")/", "");
        if (jsondate.indexOf("+") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("+"));
        }
        else if (jsondate.indexOf("-") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("-"));
        }
        return jsondate;
    }

    /**
     * 对参数进行编码
     * @param {json} jsonObj
     * @returns {string} 
     */
    function zip(jsonObj) {
        if (!jsonObj) return jsonObj;
        if (jsonObj instanceof String) {
            return encodeURIComponent(jsonObj);
        } else {
            return encodeURIComponent(JSON.stringify(jsonObj));
        }
    }

    /*
    * file转base编码，并压缩file
    * 用法如下
        func.FileToBase64(file, function(base64) {
            func.AutoResizeImage(base64, 0, 0, function (zipbase64) {
            
            });
        });
    */
    function FileToBase64(file, fn) {
        //利用html5转base64
        if ("FileReader" in window) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (fn) {
                    return fn(this.result);
                }
            };
            //将文件读取为DataURL
            reader.readAsDataURL(file);
        }
    }

    /*
    * base64图像压缩
    * base64:base64编码
    * maxWidth:最大图像宽度，0为auto
    * maxHeight:最大图像高度，0为auto
    * fn(base64):压缩完成后回调，返回base64编码
    * 用法如下
        func.AutoResizeImage(base64, 0, 0, function (zipbase64) {
        
        });
    */
    function AutoResizeImage(base64, maxWidth, maxHeight, fn) {
        //开始压缩图片
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function () {
            //获取当前最合适的图像比率
            var hRatio;
            var wRatio;
            var Ratio = 1;
            var w = img.width;
            var h = img.height;
            wRatio = maxWidth / w;
            hRatio = maxHeight / h;
            if (maxWidth == 0 && maxHeight == 0) {
                Ratio = 1;
            } else if (maxWidth == 0) { //
                if (hRatio < 1) Ratio = hRatio;
            } else if (maxHeight == 0) {
                if (wRatio < 1) Ratio = wRatio;
            } else if (wRatio < 1 || hRatio < 1) {
                Ratio = (wRatio <= hRatio ? wRatio : hRatio);
            }
            if (Ratio < 1) {
                w = w * Ratio;
                h = h * Ratio;
            }

            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas清屏 	

            //缩小
            img.width = w;
            img.height = h;

            //重置canvans宽高
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, img.width, img.height); // 将图像绘制到canvas上
            var zipbase64 = canvas.toDataURL('image/png'); //输出base64
            //if (img.size > (1024 * 1024 * 0.5)) {
            //    alert("图片太大，压缩后仍然超过0.5M!");
            //    return;
            //}
            fn(zipbase64, img.width, img.height);
        };
        img.src = base64;
        if (img.complete || img.complete === undefined) {
            img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            img.src = base64;
        }
    }

    function alert(msg, title, icon, callback) {
        /// <summary>
        /// 弹出easy的message
        /// </summary>
        /// <param name="msg" type="String">消息内容</param>
        /// <param name="title" type="String">消息框标题</param>
        /// <param name="icon" type="String">icon</param>
        /// <param name="callback" type="Function">点击确定后的回调</param>
        if (callback) {
            $.messager.alert(title, msg, icon, callback);
        } else {
            $.messager.alert(title, msg, icon);
        }
    }

    return {
        uuid: uuid,
        calculateByExpression: calculateByExpression,
        numberFormat: numberFormat,
        definededAndNotNull: definededAndNotNull,
        isNumber: isNumber,
        isDate: isDate,
        isArray: isArray,
        isHasValuesArray: isHasValuesArray,
        pushStateToHistroy: pushStateToHistroy,
        isDecimal: isDecimal,
        isString: isString,
        isFunction: isFunction,
        isFile: isFile,
        fromJson: fromJson,
        isMobilePhone: isMobilePhone,
        isWebAddress: isWebAddress,
        isPhone: isPhone,
        timeCompare: timeCompare,
        createStringSplitByCommaFromArray: createStringSplitByCommaFromArray,
        formatJsonDate: formatJsonDate,
        randomBy: randomBy,
        templateHelper: templateHelper,
        getClientType: getClientType,
        FileToBase64: FileToBase64,
        AutoResizeImage: AutoResizeImage,
        alert: alert,
        post: AjaxPost,
        showErrorPage: showErrorPage
    };
});