/**
 * 该模块是工具模块，提供一些基本操作功能
 * 如扩展string的format和扩展date的format
 * 
 *      作者：杨瑜堃
 *      版本：1.0.1
 * 
 * 改模块暂无依赖项
*/

modules.define("tool", [], function () {

    /**
     * 对Date的扩展，将 Date 转化为指定格式的String 
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
     * 例子： 
     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {String} fmt 格式化字符串
     * @returns {String} 结果 
     */
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        for (var time in o) {
            if (isNaN(o[time])) {
                return "";
            }
        }
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    /**
     * 格式化字符串
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {String} str 要格式化的字符串
     * @param {Stringp[]} args 要格式化的替换值数组
     * @returns {String} 格式化结果 
     */
    String.prototype.format = function (str, args) {
        var result = this;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    if (args[key] != undefined) {
                        var reg = new RegExp("({)" + key + "(})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        var reg = new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
    };

    /**
     * 将str中的html符号转义,将转义“'，&，<，"，>”五个字符
     * @method unhtml
     * @param { String } str 需要转义的字符串
     * @return { String } 转义后的字符串
     * @example
     * ```javascript
     * var html = '<body>&</body>';
     *
     * //output: &lt;body&gt;&amp;&lt;/body&gt;
     * console.log( UE.utils.unhtml( html ) );
     *
     * ```
     */
    String.prototype.unhtml = function (reg) {
        return this ? this.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
            if (b) {
                return a;
            } else {
                return {
                    '<': '&lt;',
                    '&': '&amp;',
                    '"': '&quot;',
                    '>': '&gt;',
                    "'": '&#39;'
                }[a]
            }

        }) : '';
    }

    /**
     * 将str中的转义字符还原成html字符
     * @see UE.utils.unhtml(String);
     * @method html
     * @param { String } str 需要逆转义的字符串
     * @return { String } 逆转义后的字符串
     * @example
     * ```javascript
     *
     * var str = '&lt;body&gt;&amp;&lt;/body&gt;';
     *
     * //output: <body>&</body>
     * console.log( UE.utils.html( str ) );
     *
     * ```
     */
    String.prototype.html = function () {
        return this ? this.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (m) {
            return {
                '&lt;': '<',
                '&amp;': '&',
                '&quot;': '"',
                '&gt;': '>',
                '&#39;': "'",
                '&nbsp;': ' '
            }[m]
        }) : '';
    }

    /**
     * 判断传入的是否是文件
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {Object} obj 要判断的文件
     * @returns {Boolean} 结果 
     */
    function isFile(obj) {
        return toString.call(obj) === '[object File]';
    }

    /**
     * 判断对象是否是数字
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {Object} value 要判断的值
     * @returns {Boolean} 判断结果
     */
    function isNumber(value) {
        return typeof value === 'number';
    }

    /**
     * 判断对象是否是日期对象
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {Object} value 要判断的对象
     * @returns {Boolean}  判断结果
     */
    function isDate(value) {
        return toString.call(value) === '[object Date]';
    }

    /**
     * 判断对象是否是数组
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {Object} value 要判断的对象
     * @returns {Boolean}  判断结果
     */
    function isArray(value) {
        return Array.isArray(value);
    }

    /**
     * 判断一个数是否是小数(字符)
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {number} num 要判断的内容
     * @returns {Boolean} 结果
     */
    function isDecimal(num) {
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

    /**
     * 判断对象是否是字符串
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {Object} val 要判断的对象
     * @returns {Boolean}  判断结果
     */
    function isString(val) {
        return typeof val === 'string';
    }

    /**
     * 判断对象是否是函数
     *      作者：杨瑜堃
     *      版本：1.0.1
     * @param {Object} val 要判断的对象
     * @returns {Boolean} 判断结果
     */
    function isFunction(val) {
        return typeof val === 'function';
    }

    /**
    * 创建一个遮罩层，如果不手动消除，则10秒后自动消除
    * 此处一定注意，遮罩层的等待效果在loader.css文件中，请记得引入页面
    *      作者：杨瑜堃
    *      版本：1.0.1
    * @returns {Objec} 操作接口 
    */
    function Maskin() {

        var maskmsg = null;

        function show(msg) {
            var h = $(document).height();
            maskmsg = $('<div style="height:100%;width:100%;position:fixed;z-index:99999;background: rgba(255,255,255,0.8);left:0px;top:0px;">' +
                            '<div style="position:absolute;overflow:hidden;left:50%;top:50%;margin-left:-34px;margin-top:-34px;height:68px;width:68px;text-align:center;">' +
                                '<span class="circles-loader"></span>' +
                            '</div>' +
                        '</div>');
            if (msg) {
                maskmsg.find("div").text(msg);
            }
            maskmsg.appendTo("body");
            setTimeout(
            (function (maskmsg) {
                return function () {
                    maskmsg.remove();
                };
            })(maskmsg), 10000);
        }

        function hide() {
            if (maskmsg !== null) {
                maskmsg.remove();
            }
        }

        return {
            show: show,
            hide: hide
        }
    }

    return {
        isFile: isFile,
        isNumber: isNumber,
        isDate: isDate,
        isArray: isArray,
        isDecimal: isDecimal,
        isString: isString,
        isFunction: isFunction,
        Maskin: Maskin
    };
});