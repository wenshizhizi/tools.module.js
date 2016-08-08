/*!
 * Yangyukun Script Library
 * version: 1.0.1
 * build: Sun Aug 07 2016 21:44:15 GMT+0800 (中国标准时间)
 * Released under MIT license
 * 
 */

modules.define("ue", [], function UEDomain() {

    var ue = null;

    /**
     * 
     * 初始化编辑器,请注意，调用该方法请在dom加载完后再调用
     * 
     * @method initUE
     * @for UEDomain
     * @author [杨瑜堃]
     * @version 1.0.1
     * @param {String} content 富文本内容     
     */
    function initUE(defaultContent) {
        ue = UE.getEditor("container", {
            onready: function () {
                //debugger
                if (defaultContent) {
                    ue.setContent(defaultContent);
                }
            }
        });
    }


    /**
     * 
     * 获取html内容
     * 
     * @method getHtmlContent
     * @for UEDomain
     * @author [杨瑜堃]
     * @version 1.0.1
     * @returns {String} html内容
     */
    function getHtmlContent() {
        return ue.getContent();
    }
       
    /**
     * 
     * 获取文本内容
     * 
     * @method getTextContent
     * @for UEDomain
     * @author [杨瑜堃]
     * @version 1.0.1
     * @returns {String}  文本内容
     */
    function getTextContent() {
        return ue.getContentTxt();
    }

    return {
        initUE: initUE,
        getHtmlContent: getHtmlContent,
        getTextContent: getTextContent
    };
});