import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

export default Vue.axios.create({
  baseURL: 'http://127.0.0.1:3333',
});
