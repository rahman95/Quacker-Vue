<template>
  <div class="ui stackable grid container">
    <UserSettingsMenu/>

    <div class="eight wide column">
      <div class="ui segment">
        <h2 class="ui dividing header">Edit Profile</h2>

        <Notification/>

        <form class="ui form" @submit.prevent="updateProfile">
          <div class="field" :class="{ error: errors.has('name') }">
            <label>Full Name</label>
            <input type="text" name="name" v-model="name" v-validate="'required'">
            <span v-show="errors.has('name')" class="is-danger">{{ errors.first('name') }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('name') }">
            <label>Username</label>
            <input type="text" name="username" v-model="username" v-validate="'required'">
            <span v-show="errors.has('username')" class="is-danger">{{ errors.first('username') }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('email') }">
            <label>Email</label>
            <input type="email" name="email" v-model="email" v-validate="'required|email'" placeholder="Email">
            <span v-show="errors.has('email')" class="is-danger">{{ errors.first('email') }}</span>
          </div>

          <div class="field">
            <label>Bio</label>
            <textarea v-model="bio" rows="5" placeholder="A breif bio of you"></textarea>
          </div>

          <div class="field">
            <label>Location</label>
            <input type="text" v-model="location" placeholder="Your location">
          </div>

          <div class="field">
            <label>Website URL</label>
            <input type="url" v-model="websiteUrl" placeholder="Website URL">
          </div>

          <button class="ui button primary">Update profile</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from '@/components/Notification';
import UserSettingsMenu from '@/components/User/Settings/UserSettingsMenu';
import { mapGetters } from 'vuex';

export default {
  name: 'UserProfileSettings',
  components: {
    Notification,
    UserSettingsMenu,
  },
  data() {
    return {
      name: this.user.name,
      username: this.user.username,
      email: this.user.email,
      bio: this.user.bio,
      location: this.user.location,
      websiteUrl: this.user.websiteUrl,
    };
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  created() {
    this.fetchAuthenticatedUser();
  },
  methods: {
    fetchAuthenticatedUser() {
      this.$store.dispatch('me');
    },
    updateProfile() {
      this.$store.dispatch('updateProfile', {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
