<template>
  <div ref="container">
    <div :style="{ 'margin-top': marginTop + 'px' }">
      <slot></slot>
      <div v-if="isLoading">Загружаем</div>
      <div v-else class="side-block bg-gray">
        <h4>ТЕГИ</h4>

        <router-link
          v-for="tag in tags"
          :key="tag.id"
          :to="{ name: 'tag', params: { title: tag.title }}"
        >{{tag.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import errors from '@/utils/errors'

export default {
  data () {
    return {
      isLoading: true,
      marginTop: 0,
      onScroll: null
    }
  },
  created () {
    this.isLoading = true

    this.$store.dispatch('tags/getAll')
      .then(_data => {
        this.isLoading = false
      }).catch(error => {
        this.isLoading = false
        errors.handle(error)
        this.$toast.error(errors.getText(error))
      })
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$route.matched[0].props.sidebar &&
        this.$route.matched[0].props.sidebar.sticky === true) {
        this.runSticky()
      }
    })
  },
  beforeDestroy () {
    if (this.onScroll) {
      window.removeEventListener('scroll', this.onScroll)
    }
  },
  methods: {
    runSticky () {
      let container = this.$refs.container
      let offset = container.offsetTop

      this.onScroll = _e => {
        let scroll = window.pageYOffset || document.documentElement.scrollTop
        let height = container.offsetHeight

        if (scroll <= offset) {
          this.marginTop = 0
          return
        }

        if (scroll + window.innerHeight >= document.documentElement.scrollHeight) { // TODO: doesn't really work
          return
        }

        if (scroll + window.innerHeight > height + offset) {
          if (height > window.innerHeight) {
            this.marginTop = scroll - offset - (height - window.innerHeight)
          } else {
            this.marginTop = scroll - offset
          }
        }
      }

      // window.addEventListener('scroll', this.onScroll)
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tags.tags
    }),
  },
}
</script>

<style scoped>
h4 {
  text-align: right;
}

a {
  text-decoration: none;
  margin-left: 0px;
  margin-right: 6px;
  float: left;
}

.side-block {
  padding: 20px;
  border-radius: 3px;
  background: #7db9e8;
  margin-bottom: 24px;
  overflow: hidden;
}
</style>

