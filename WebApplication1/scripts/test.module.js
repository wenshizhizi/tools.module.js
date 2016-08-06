modules.define("test", ["func", 'vers', 'tool', 'array', 'object'], function (func, vers, tool, array, object) {
    var arr = [4, 5, 7, 1, 3, 4, 6];
    array.sort(arr, function (v1, v2) {
        return v1 > v2;
    });
    
    array.each(arr, function (value,key) {
        console.log(value);

    })

    func.domReady.ready(function () {
        alert("加载完毕");
    });

    return {
        func: func,
        vers: vers,
        tool: tool
    };
});