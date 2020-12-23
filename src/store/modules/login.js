import * as env_const from '../../conf/env_const.js';
import axios from 'axios';

const state = {
  authToken: '',
};

const getters = {};

const actions = {
  async Login({ commit }, payload) {
    // console.log(payload.username);
    const url = env_const.auth_url + '/login';
    // const self = this;
    return new Promise((resolve, reject) => {
      axios
        .post(url, payload)
        .then(({ data, status }) => {
          if (status === 200) {
            // console.log( data);
            const authToken = data.access_token;
            commit('ADD_AUTH_TOKEN', data.access_token);
            resolve(authToken);
          }
        })
        .catch((error) => {
          // catching new validation errors
          reject(error.response);
        });
    });
  },
  async Logout({ commit }) {
    commit('LOGOUT');
  },
};

const mutations = {
  ADD_AUTH_TOKEN(state, authToken) {
    state.authToken = authToken;
  },
  LOGOUT(state) {
    state.authToken = '';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
