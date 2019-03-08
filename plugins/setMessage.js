import Vue from 'vue';

Vue.prototype.$getUserMessage = (store) => {
    //在页面加载时读取sessionStorage里的状态信息
    if (window.localStorage.getItem("store") && window.localStorage.getItem('store') !== '') {
        store.commit('setMessage', JSON.parse(window.localStorage.getItem('store')));
        console.log(store);
        console.log('66666');
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
        console.log(store.state.message);
        if (store.state.message !== '') {
            console.log('44444444444');
            localStorage.setItem('store', JSON.stringify(store.state.message));
        }
    })
}