<template>
  <div class="ui stackable grid vertically padded container">
    <div class="four wide column">
      <UserSidebar :user="user"/>
    </div>
    <div class="eight wide column">
      <div class="ui segment">
        <h2 class="ui medium dividing header">Timeline</h2>
        <Tweets :tweets.sync="tweets" :auth-user="user" />
      </div>
    </div>
    <div class="four wide column"></div>
  </div>
</template>

<script>
import UserSidebar from '@/components/User/UserSidebar'
import Tweets from '@/components/Tweet/Tweets'

export default {
  name: 'Home',
  components: {
    UserSidebar,
    Tweets
  },
  data () {
    return {
      user: this.$computed.user,
      tweets: this.$computed.tweets,
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      tweets: 'getTimeline',
    })
  },
  created () {
    this.fetchAuthenticatedUser()
    this.fetchUserTimeline()
  },
  methods: {
    fetchAuthenticatedUser () {
      this.$store.dispatch('me');
    },
    fetchUserTimeline () {
      this.$store.dispatch('fetchTimeline');
    }
  }
}
</script>