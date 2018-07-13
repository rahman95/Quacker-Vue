<template>
  <div v-show="error.error" class="ui message" :class="error.status">
    {{ error.msg }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Notification',
  computed: {
    ...mapGetters({
      error: 'getError',
    }),
  },
};
</script>
