<template>
  <div class="container">
    <div class="columns">
      <div id="login" class="column col-6 col-mx-auto">
        <h1>Выходим</h1>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/user'

export default {
  mounted: function () {
    UserService.logout()
    this.$parent.refreshUser()
    this.$router.replace({ path: '/' })
  }
}
</script>
