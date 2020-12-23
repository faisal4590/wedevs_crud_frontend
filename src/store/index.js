import Vuex from 'vuex';
import Vue from 'vue';
import Login from './modules/login';
import Products from './modules/products';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login: Login,
    products: Products,
  },
  plugins: [createPersistedState()],
});
