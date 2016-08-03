// ģ�����
var modules = (function Manager() {
    var modules = {};

    /**
     * ����ģ��
     * @param {String} name ģ�������
     * @param {String[]} deps ��ģ����Ҫ������ģ������
     * @param {Function} impl ģ��ʵ�� 
     */
    function define(name, deps, impl) {
        for (var i = 0; i < deps.length; i++) {
            //��ȡ������ģ��
            deps[i] = modules[deps[i]];
        }
        /**
         * ����ģ��������ͨ������������չ         
        */
        modules[name] = impl.apply(impl, deps);
    }

    /**
     * ͨ�����ƻ�ȡģ��
     * @param {String} name ģ������
     * @returns {Function} ģ�� 
     */
    function get(name) {
        return modules[name];
    }

    return {
        define: define,
        get: get
    };
})();