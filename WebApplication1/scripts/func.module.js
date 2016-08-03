modules.define("func", ["tool"], function (tool) {

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
            if (this.isArray(value)) {
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
        toFixed: toFixed
    };
});