import * as env_const from '../../conf/env_const.js';
import axios from 'axios';

const state = {
  products: [],
};

const getters = {};

const actions = {
  async AllProducts({ commit }, headersPayload) {
    const url = env_const.base_url + '/fetch_products';
    return new Promise((resolve, reject) => {
      axios
        .post(url, {}, headersPayload)
        .then(({ data, status }) => {
          if (status === 200) {
            // console.log(data);
            commit('FETCH_ALL_PRODUCTS', data);
            resolve(data);
          }
        })
        .catch((error) => {
          // catching errors
          reject(error);
        });
    });
  },
  async UpdatedProducts({ commit }, headersPayload) {
    const url = env_const.base_url + '/fetch_updated_products';
    // console.log('Reached to UpdatedProducts action');
    return new Promise((resolve, reject) => {
      axios
        .post(url, {}, headersPayload)
        .then(({ data, status }) => {
          if (status === 200) {
            // console.log(data);
            // first clear existing products
            commit('CLEAR_PRODUCTS');
            // update with new product lists
            commit('FETCH_UPDATED_PRODUCTS', data);
            resolve(data);
          } else {
            // clear products(when no products are left)
            commit('CLEAR_PRODUCTS');
          }
        })
        .catch((error) => {
          // clear products(when no products are left)
          commit('CLEAR_PRODUCTS');
          // catching errors
          reject(error);
        });
    });
  },
  async ClearProducts({ commit }) {
    commit('CLEAR_PRODUCTS');
  },
};

const mutations = {
  CLEAR_PRODUCTS(state) {
    state.products = [];
  },
  FETCH_ALL_PRODUCTS(state, data) {
    state.products = data;
  },
  FETCH_UPDATED_PRODUCTS(state, data) {
    state.products = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
