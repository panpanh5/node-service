import Vue from "vue";
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
    plugins: [createPersistedState()],
    // 存储值
    state: {
        item: ['123']
    },
    // 可以进行异步操作，但是拿不到值---用commit方法通过mutations来修改state里面的值
    mutations: {},
    // 可以进行异步操作并且拿到异步值
    actions: {},
    getters: {
        // 派生数据
    }
})
export default store
