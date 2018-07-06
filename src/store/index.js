import Vue from 'vue';
import Vuex from 'vuex';
import Api from '../api';

Vue.use(Vuex);
Vue.use(Api);

export default new Vuex.Store({
  state: {
    user: {
      id: null,
      name: null,
      username: null,
      email: null,
      token: null,
    },
    errors: {
      error: false,
      msg: null,
      status: null,
    },
  },
  getters: {
    getName: state => state.user.name,
    getUserName: state => state.user.username,
    getEmail: state => state.user.email,
    getToken: state => state.user.token,
    getError: state => state.errors,
  },
  mutations: {
    setUserDetails(state, response) {
      state.user.id = response.user.id;
      state.user.name = response.user.name;
      state.user.username = response.user.username;
      state.user.email = response.user.email;
      state.user.token = response.token.token;
    },
    setError(state, response) {
      state.errors.error = true;
      state.errors.msg = response.message;
      state.errors.status = response.status;
    },
    resetError(state) {
      state.errors.error = false;
      state.errors.msg = null;
      state.errors.status = null;
    },
  },
  actions: {
    signUp: (state, payload) => {
      Api
        .post('/signup', {
          name: payload.name,
          username: payload.username,
          email: payload.email,
          password: payload.password,
        })
        .then((response) => {
          state.commit('setUserDetails', response.data.data);
          state.commit('resetError');
        })
        .catch((error) => {
          state.commit('setError', error.response.data);
        });
    },
    login: (state, payload) => {
      Api
        .post('/login', {
          email: payload.email,
          password: payload.password,
        })
        .then((response) => {
          state.commit('setUserDetails', response.data.data);
          state.commit('resetError');
        })
        .catch((error) => {
          state.commit('setError', error.response.data);
        });
    },
  },
});
