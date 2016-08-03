modules.define("bar", [], function () {
    function hello(who) {
        return "let me introduce:" + who;
    }
    return {
        hello: hello
    };
});


modules.define("foo", ["bar"], function (bar) {
    var hungry = "hippo";

    function awesome() {
        console.log(bar.hello(hungry).toUpperCase());
    }

    return {
        awesome: awesome
    };
});

var bar = modules.get("bar");
var foo = modules.get("foo");

console.log(
    bar.hello("hippo")
    );

foo.awesome();

bar = null;
foo = null;

bar = modules.get("bar");
foo = modules.get("foo");

console.log(
    bar.hello("hippo")
    );

foo.awesome();