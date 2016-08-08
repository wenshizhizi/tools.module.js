$(function () {
    var ue = modules.get("ue");
    var func = modules.get("func");

    
    
    function getHTML() {
        return ue.getHtmlContent();
    }



    //初始化界面点击事件
    (function init() {

        ue.ueModuleCfg.date = true;
        //ue.ueModuleCfg.charts = true;

        ue.initUE();

        $("#btn").on("click", function () {
            alert(getHTML());
            alert(ue.getTextContent());
        });

    })();
});

