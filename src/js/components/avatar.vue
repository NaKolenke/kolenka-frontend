<template>
  <div class="column col-lg-auto">
    <figure class="avatar avatar-sm">
      <img
        v-if="user.avatar"
        :src="'https://beta.kolenka.net/content/' + user.avatar.id + '/'"
        alt="..."
      >
    </figure>
    {{user.login}}
  </div>
</template>

<script>
module.exports = {
  props: ["user"]
};
</script>
