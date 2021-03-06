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
      location: null,
      bio: null,
      websiteUrl: null,
      token: null,
    },
    timeline: null,
    errors: {
      error: false,
      msg: null,
      status: null,
    },
  },
  getters: {
    getUser: state => state.user,
    getName: state => state.user.name,
    getUserName: state => state.user.username,
    getEmail: state => state.user.email,
    getToken: state => state.user.token,
    getTimeline: state => state.timeline,
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
    updateUserDetails(state, response) {
      state.user.name = response.name;
      state.user.username = response.username;
      state.user.email = response.email;
      state.user.location = response.location;
      state.user.bio = response.bio;
      state.user.websiteUrl = response.website_url;
    },
    setTimeline(state, response) {
      state.timeline = response.data.reverse();
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
    me: (state) => {
      Api
        .post('/account/me', {
          headers: {
            Authorization: `Bearer ${state.getters.getToken}`,
          },
        })
        .then((response) => {
          state.commit('updateUserDetails', response.data.data);
          state.commit('resetError');
        })
        .catch((error) => {
          state.commit('setError', error.response.data);
        });
    },
    updateProfile: (state, payload) => {
      Api
        .post('/account/update_profile', {
          name: payload.name,
          username: payload.username,
          email: payload.email,
          location: payload.location,
          bio: payload.bio,
          website_url: payload.websiteUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${state.getters.getToken}`,
          },
        })
        .then((response) => {
          state.commit('setError', response.data);
          state.commit('updateUserDetails', {
            name: payload.name,
            username: payload.username,
            email: payload.email,
            location: payload.location,
            bio: payload.bio,
            website_url: payload.websiteUrl,
          });
        })
        .catch((error) => {
          state.commit('setError', error.response.data);
        });
    },
    changePassword: (state, payload) => {
      Api
        .post('/account/change_password', {
          password: payload.password,
          newPassword: payload.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${state.getters.getToken}`,
          },
        })
        .then((response) => {
          state.commit('setError', response.data);
        })
        .catch((error) => {
          state.commit('setError', error.response.data);
        });
    },
    fetchTimeline: (state) => {
      Api
        .get('/users/timeline', {
          headers: {
            Authorization: `Bearer ${state.getters.getToken}`,
          },
        })
        .then((response) => {
          state.commit('setTimeline', response.data);
          state.commit('resetError');
        })
        .catch((error) => {
          state.commit('setError', error.response.data);
        });
    },
    fetchTweetById: (state, payload) => {
      Api
        .get(`/tweets/${payload.tweet_id}`)
        .then(response => response.data.data);
    },
    replyTweetById: (state, payload) => {
      Api
        .post(`/tweets/reply/${payload.tweet_id}`, {
          reply: payload.reply,
        },
        {
          headers: {
            Authorization: `Bearer ${state.getters.getToken}`,
          },
        })
        .then(response => response.data.data);
    },
    postTweet: (state, payload) => {
      Api
        .post('/tweet', {
          tweet: payload.tweet,
        },
        {
          headers: {
            Authorization: `Bearer ${state.getters.getToken}`,
          },
        })
        .then((response) => {
          state.commit('setError', response.data);
          state.dispatch('fetchTimeline');
        })
        .catch((error) => {
          state.commit('setError', error.response.data);
        });
    },
    favouriteTweet: (state, payload) => {
      Api
        .post('/favorites/create', {
          tweet_id: payload.tweet_id,
        },
        {
          headers: {
            Authorization: `Bearer ${state.getters.getToken}`,
          },
        })
        .then(response => response.data.data);
    },
    unFavouriteTweet: (state, payload) => {
      Api
        .delete(`/favorites/destroy/${payload.tweet_id}`, {
          headers: {
            Authorization: `Bearer ${state.getters.getToken}`,
          },
        })
        .then(response => response.data.data);
    },
    deleteTweet: (state, payload) => {
      Api
        .delete(`/tweets/destroy/${payload.tweet_id}`, {
          headers: {
            Authorization: `Bearer ${state.getters.getToken}`,
          },
        })
        .then(response => response.data.data);
    },
  },
});
