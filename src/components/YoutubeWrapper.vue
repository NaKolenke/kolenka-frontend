<template>
  <div class="youtube-video">
    <i v-if="!show" class="icon-youtube" @click="click"></i>
    <img v-if="!show" :src="imgUrl" alt="cover" @click="click" />
    <div v-if="loading" class="loading loading-lg"></div>
    <iframe v-if="show" :src="url" width="100%" height="100%" :style="{ 'visibility': visibility }" @load="loaded" frameborder="0" allowfullscreen></iframe>
  </div>
</template>

<script>
export default {
  props: [ 'url' ],
  data() {
    return {
      show: false,
      visibility: 'hidden',
      loading: false
    }
  },
  methods: {
    click() {
      this.show = true
      this.loading = true
    },
    loaded() {
      this.visibility = 'visible'
      this.loading = false
    }
  },
  computed: {
    imgUrl() {
      let id = this.url.match(/embed\/([a-zA-Z0-9_]+)/)[1]
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    }
  }
}
</script>

<style lang="scss">
.youtube-video {
  position: relative;
  width: 480px;
  height: 360px;

  img {
    width: 100%;
    cursor: pointer;
  }
}

.youtube-video i {
  position: absolute;
  left: 50%;
  top: 50%;
  color: #fff;
  transform: translate(-50%, -50%);
  font-size: 64px;
  text-shadow: 0 10px 50px #000;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}

.youtube-video:hover i {
  color: #FF0000;
  text-shadow: -1px -1px 0 #000,
               1px -1px 0 #000,
               -1px 1px 0 #000,
               1px 1px 0 #000;
  transition: all 0.2s ease-in-out;
}

.youtube-video .title {
  display: inline;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.7);
  color: #f5f5ff;
  z-index: 99;
  padding: 4px;
}

.youtube-video .loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
