<template>
  <div
    class="side-nav side-nav--left"
    :class="{'side-nav--left--hidden': !isOpen }">
    <a
      class="side-nav__button"
      @click="$router.push({path: 'new'})">New record</a>
    <div class="side-nav__bottom">
      <a
        class="logout-link"
        @click="logout">
        Logout
        <i class="fa fa-sign-out" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: { type: Boolean, required: true }
  },
  methods: {
    logout() {
      localStorage.removeItem("user_id")
      localStorage.removeItem("user_username")
      localStorage.removeItem("user_token")

      this.$apolloProvider.defaultClient.resetStore()
      this.$router.push("/login")
    }
  }
};
</script>
