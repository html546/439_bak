export const state = () => ({
    locales: ['en', 'tc'],
    locale: localStorage.getItem('locale') || 'en',
    // islogin: false,
    message: JSON.parse(localStorage.getItem('message')) || '',
    page1: localStorage.getItem('page1') || 1,
    page2: localStorage.getItem('page2') || 1,
    page3: localStorage.getItem('page3') || 1,
    notice: localStorage.getItem('notice') || 1,
    email: localStorage.getItem('email') || 1,
    prize_page: localStorage.getItem('prize_page') || 1,
    finance: localStorage.getItem('finance') || 1,
    manage: localStorage.getItem('manage') || 1,
    operate: localStorage.getItem('operate') || 1
})

export const mutations = {
    SET_LANG(state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            localStorage.setItem('locale', locale);
            state.locale = locale;
        }
    },
    SET_PAGE(state, page) {
        localStorage.setItem('page1', page);
        state.page1 = page;
    },
    SET_PAGE2(state, page) {
        localStorage.setItem('page2', page);
        state.page2 = page;
    },
    SET_PAGE3(state, page) {
        localStorage.setItem('page3', page);
        state.page3 = page;
    },
    SET_NOTICE(state, page) {
        localStorage.setItem('notice', page);
        state.notice = page;
    },
    SET_EMAIL(state, page) {
        localStorage.setItem('email', page);
        state.email = page;
    },
    SET_PRIZEPAGE(state, page) {
        localStorage.setItem('prize_page', page);
        state.prize_page = page;
    },
    SET_FINANCE(state, page) {
        localStorage.setItem('finance', page);
        state.finance = page;
    },
    SET_MANAGE(state, page) {
        localStorage.setItem('manage', page);
        state.manage = page;
    },
    SET_OPERATE(state, page) {
        localStorage.setItem('operate', page);
        state.operate = page;
    },
    /* setLogin(state) {
        state.islogin = true;
    },
    clearLogin(state) {
        state.islogin = false;
    }, */
    setMessage(state, message) {
        localStorage.setItem('message', JSON.stringify(message));
        state.message = message;
    },
    clearMessage(state) {
        localStorage.removeItem('message');
        localStorage.removeItem('page1');
        localStorage.removeItem('page2');
        localStorage.removeItem('page3');
        localStorage.removeItem('notice');
        localStorage.removeItem('email');
        state.message = '';
    }
}

export const actions = {
    setMessage({ commit }, message) {
        commit('setMessage', message)
    },
    /* setLogin({ commit }) {
        commit('setLogin');
    },
    clearLogin({ commit }) {
        commit('clearLogin');
    }, */
    clearMessage({ commit }) {
        commit('clearMessage');
    }
}