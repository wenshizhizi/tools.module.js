
//例：该模块名称为test，依赖其他5个模块，分别是func，vers，tool，array，object，通过参数的方式传递给当前模块
modules.define("test", ["func", 'vers', 'tool', 'array', 'object','ue'], function TestDomain(func, vers, tool, array, object,ue) {

    //测试tool模块

    //1.string的扩展方法format 
    function testStringFormat() {
        console.log("这是示例：{0},{1}".format("替换1", "替换2"));
    }

    //2.string的扩展方法unhtml  
    function testStringUnhtml() {
        console.log("<div>示例</div>".unhtml());
    }

    //3.string的扩展方法html  
    function testStringHtml() {
        console.log("&lt;div&gt;示例&lt;/div&gt;".html());
    }

    //4.date的扩展方法format  
    function testDateFormat() {
        console.log((new Date()).Format("yyyy-M-d h:m:s.S"));
        console.log((new Date()).Format("yyyy-MM-dd hh:mm:ss.S"));
    }

   

    func.domReady.ready(function () {
        //ue.initContent("asdfasdfasdf");
        //alert(ue.getHtmlContent());
        //alert(ue.getTextContent());

        var ue = UE.getEditor('container');

        ue.set

    });
    
    return {
        testStringFormat: testStringFormat,
        testStringUnhtml: testStringUnhtml,
        testStringHtml: testStringHtml,
        testDateFormat: testDateFormat
    };
});

//var t = modules.get("func");
//t.domReady.ready(function () {
//    var ue = UE.getEditor('container');
//    ue.ready(function () {
//        ue.setContent('hello');
//    });
//});