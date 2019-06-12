import Vue from 'vue';

/* export default (app) => {
    app.format1 = function (val) {
        var time = new Date(val);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        return y + '-' + add0(m) + '-' + add0(d);
    }
} */
Vue.prototype.$format1 = (val) => {
    var time = new Date(val);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + '-' + add0(m) + '-' + add0(d);
}
Vue.prototype.$format2 = (val) => {
    var time = new Date(val);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var H = time.getHours();
    var M = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(H) + ":" + add0(M) + ':' + add0(s);
}
function add0(m) { return m < 10 ? '0' + m : m }
