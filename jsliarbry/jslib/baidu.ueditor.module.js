/*!
 * Yangyukun Script Library
 * version: 1.0.1
 * build: Sun Aug 07 2016 21:44:15 GMT+0800 (中国标准时间)
 * Released under MIT license
 * 
 */

modules.define("ue", [], function UEDomain() {

    var ue = null;

    //编辑器初始化模块配置
    var uemodulecfg = {
        //锚点
        "anchor": false,
        //撤销
        "undo": false,
        //重做
        "redo": false,
        //加粗
        "bold": false,
        //首行缩进
        "indent": false,
        //截图
        "snapscreen": false,
        //斜体
        "italic": false,
        //下划线
        "underline": false,
        //删除线
        "strikethrough": false,
        //下标
        "subscript": false,
        //字符边框
        "fontborder": false,
        //上标
        "superscript": false,
        //格式刷
        "formatmatch": false,
        //源代码
        "source": false,
        //引用
        "blockquote": false,
        //纯文本粘贴模式
        "pasteplain": false,
        //全选
        "selectall": false,
        //打印
        "print": false,
        //预览
        "preview": false,
        //分隔线
        "horizontal": false,
        //清除格式
        "removeformat": false,
        //时间
        "time": false,
        //日期
        "date": false,
        //取消链接
        "unlink": false,
        //前插入行
        "insertrow": false,
        //前插入列
        "insertcol": false,
        //右合并单元格
        "mergeright": false,
        //下合并单元格
        "mergedown": false,
        //删除行
        "deleterow": false,
        //删除列
        "deletecol": false,
        //拆分成行
        "splittorows": false,
        //拆分成列
        "splittocols": false,
        //完全拆分单元格
        "splittocells": false,
        //删除表格标题
        "deletecaption": false,
        //插入标题
        "inserttitle": false,
        //合并多个单元格
        "mergecells": false,
        //删除表格
        "deletetable": false,
        //清空文档
        "cleardoc": false,
        //"表格前插入行"
        "insertparagraphbeforetable": false,
        //代码语言
        "insertcode": false,
        //字体
        "fontfamily": false,
        //字号
        "fontsize": false,
        //段落格式
        "paragraph": false,
        //单图上传
        "simpleupload": false,
        //多图上传
        "insertimage": false,
        //表格属性
        "edittable": false,
        //单元格属性
        "edittd": false,
        //超链接
        "link": false,
        //表情
        "emotion": false,
        //特殊字符
        "spechars": false,
        //查询替换
        "searchreplace": false,
        //Baidu地图
        "map": false,
        //Google地图
        "gmap": false,
        //视频
        "insertvideo": false,
        //帮助
        "help": false,
        //居左对齐
        "justifyleft": false,
        //居右对齐
        "justifyright": false,
        //居中对齐
        "justifycenter": false,
        //两端对齐
        "justifyjustify": false,
        //字体颜色
        "forecolor": false,
        //背景色
        "backcolor": false,
        //有序列表
        "insertorderedlist": false,
        //无序列表
        "insertunorderedlist": false,
        //全屏
        "fullscreen": false,
        //从左向右输入
        "directionalityltr": false,
        //从右向左输入
        "directionalityrtl": false,
        //段前距
        "rowspacingtop": false,
        //段后距
        "rowspacingbottom": false,
        //分页
        "pagebreak": false,
        //插入Iframe
        "insertframe": false,
        //默认
        "imagenone": false,
        //左浮动
        "imageleft": false,
        //右浮动
        "imageright": false,
        //附件
        "attachment": false,
        //居中
        "imagecenter": false,
        //图片转存
        "wordimage": false,
        //行间距
        "lineheight": false,
        //编辑提示
        "edittip ": false,
        //自定义标题
        "customstyle": false,
        //自动排版
        "autotypeset": false,
        //百度应用
        "webapp": false,
        //字母大写
        "touppercase": false,
        //字母小写
        "tolowercase": false,
        //背景
        "background": false,
        //模板
        "template": false,
        //涂鸦
        "scrawl": false,
        //音乐
        "music": false,
        //插入表格
        "inserttable": false,
        // 从草稿箱加载
        "drafts": false,
        // 图表
        "charts": false
    };

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
        var initCfg = getCfg();
        ue = UE.getEditor("container", {
            onready: function () {
                //debugger
                if (defaultContent) {
                    ue.setContent(defaultContent);
                }
            },
            toolbars: [
                initCfg
            ]
        });
    }

    /**
     * 
     * 获取编辑器的配置（私有方法）
     * 
     * @method getCfg
     * @for UEDomain
     * @author [杨瑜堃]
     * @version 1.0.1
     * @param {string[]} 初始化配置    
     */
    function getCfg() {
        var cfg = [];
        for (var k in uemodulecfg) {
            if (uemodulecfg[k] === true) {
                cfg.push(k);
            }
        }
        return cfg;
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
        ueModuleCfg: uemodulecfg,
        initUE: initUE,
        getHtmlContent: getHtmlContent,
        getTextContent: getTextContent
    };
});