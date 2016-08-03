modules.define("tool", [], function () {

    /**
     * 格式化字符串
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
     * 判断传入的是否是文件
     * @param {Object} obj 要判断的文件
     * @returns {Boolean} 结果 
     */
    function isFile(obj) {
        return toString.call(obj) === '[object File]';
    }

    /**
     * 判断对象是否是数字
     * @param {Object} value 要判断的值
     * @returns {Boolean} 判断结果
     */
    function isNumber(value) {
        return typeof value === 'number';
    }

    /**
     * 判断对象是否是日期对象
     * @param {Object} value 要判断的对象
     * @returns {Boolean}  判断结果
     */
    function isDate(value) {
        return toString.call(value) === '[object Date]';
    }

    /**
     * 判断对象是否是数组
     * @param {Object} value 要判断的对象
     * @returns {Boolean}  判断结果
     */
    function isArray(value) {
        return Array.isArray(value);
    }

    return {
        isFile: isFile,
        isNumber: isNumber,
        isDate: isDate,
        isArray: isArray
    }
});