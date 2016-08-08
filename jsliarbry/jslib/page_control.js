$(function () {
    var ue = modules.get("ue");
    var func = modules.get("func");

    ue.initUE();
    
    function getHTML() {
        return ue.getHtmlContent();
    }



    //初始化界面点击事件
    (function () {


        $("#btn").on("click", function () {
            alert(getHTML());
            alert(ue.getTextContent());
        });

    })();
});

