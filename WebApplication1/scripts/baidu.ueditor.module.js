/*!
 * Yangyukun Script Library
 * version: 1.0.1
 * build: Sun Aug 07 2016 21:44:15 GMT+0800 (中国标准时间)
 * Released under MIT license
 * 
 */

modules.define("ue", [], function UEDomain() {
    var ue = null;

    function initUe(){
        if (ue === null) { ue = UE.getEditor('container'); }
    }

    /**
     * 
     * 初始化内容
     * 
     * @method initContent
     * @for UEDomain
     * @author [杨瑜堃]
     * @version 1.0.1
     * @param {String} content 富文本内容
     * @throws 未能初始化ue则抛出异常
     */
    function initContent(content) {
        try {
            initUe();
            if (ue) {
                ue.ready(function () {
                    ue.setContent(content);                    
                });
            } else {
                throw new Error("未能初始化ue对象");
            }
        } catch (e) {
            throw new Error("未能初始化ue对象");
        }
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
        initUe();
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
     * @returns {String} 文本内容
     */
    function getTextContent() {
        initUe();
        return ue.getContentTxt();
    }

    return {        
        initContent: initContent,
        getHtmlContent: getHtmlContent,
        getTextContent: getTextContent
    };
});