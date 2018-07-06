<template>
  <div class="ui stackable grid container">
    <UserSettingsMenu/>

    <div class="eight wide column">
      <div class="ui segment">
        <h2 class="ui dividing header">Change Password</h2>

        <Notification />

        <form class="ui form" @submit.prevent="changePassword">
          <div class="field" :class="{ error: errors.has('password') }">
            <label>Current Password</label>
            <input type="password" name="password" v-model="password" data-vv-as="current password" v-validate="'required'">
            <span v-show="errors.has('password')" class="is-danger">{{ errors.first('password') }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('newPassword') }">
            <label>New Password</label>
            <input type="password" name="newPassword" v-model="newPassword" data-vv-as="new password" v-validate="'required'">
            <span v-show="errors.has('newPassword')" class="is-danger">{{ errors.first('newPassword') }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('confirmPassword') }">
            <label>New Password</label>
            <input type="password" name="confirmPassword" v-model="confirmPassword" data-vv-as="confirm password" v-validate="'required|confirmed:newPassword'">
            <span v-show="errors.has('confirmPassword')" class="is-danger">{{ errors.first('confirmPassword') }}</span>
          </div>

          <button type="submit" class="ui button primary" :disabled="!isFormValid">Change password</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import UserSettingsMenu from '@/components/User/Settings/UserSettingsMenu'

export default {
  name: 'UserProfileEditForm',
  components: {
    Notification,
    UserSettingsMenu
  },
  data () {
    return {
      password: '',
      newPassword: '',
      confirmPassword: '',
    }
  },
  computed: {
    isFormValid () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    },
  },
  methods: {
    changePassword () {
      this.$store.dispatch('changePassword', {
        password: this.password,
        newPassword: this.newPassword,
      })
      .then(() => {
        // clear form inputs
        this.password = this.newPassword = this.confirmPassword = '';
      })
      .catch(() => {
        // clear form inputs
        this.password = this.newPassword = this.confirmPassword = ''

        // clear form error messages
        this.$nextTick(() => {
            this.$validator.reset()
        })
      });
    }
  }
}
</script>