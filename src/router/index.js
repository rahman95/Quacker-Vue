import Vue from 'vue';
import Router from 'vue-router';
// import SignUpForm from '@/components/Auth/SignUpForm';
// import LogInForm from '@/components/Auth/LogInForm';
// import UserProfileSettings from '@/components/User/Settings/UserProfileSettings';
import UserPasswordSettings from '@/components/User/Settings/UserPasswordSettings';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: UserPasswordSettings,
    },
  ],
});
