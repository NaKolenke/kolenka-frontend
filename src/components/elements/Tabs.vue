<template>
  <div class="tabs">
    <ul class="tab tab-block">
      <li
        v-for="item in tabs"
        :key="item.index"
        :class="['tab-item', {'active': active === item.index}]"
      >
        <a href="#" @click.prevent="active = item.index">{{ item.title }}</a>
      </li>
    </ul>
    <div ref="container">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      tabs: [],
      observer: null,
      defaultActivated: false
    }
  },
  mounted () {
    this.recalculateTabs()

    this.observer = new MutationObserver(_mutations => {
      this.recalculateTabs()
    })

    this.observer.observe(this.$refs.container, {
      childList: true
    })
  },
  beforeDestroy () {
    this.observer.disconnect()
  },
  methods: {
    recalculateTabs () {
      this.tabs = this.$slots.default
        .map((x, i) => {
          if (!x.componentInstance) return x

          if (!this.defaultActivated && x.componentInstance.$props.active) {
            this.active = i
            this.defaultActivated = true
          }

          return x
        })
        .map((x, i) => {
          if (!x.componentInstance) return null

          x.componentInstance.$data.isActive = (i === this.active)

          return {
            title: x.componentInstance.$props.title,
            index: i
          }
        })
        .filter(x => x != null)
    }
  },
  watch: {
    'active' (_v) {
      this.recalculateTabs()
    }
  }
}
</script>

<style scoped>
.tabs {
  position: relative;
}
</style>
