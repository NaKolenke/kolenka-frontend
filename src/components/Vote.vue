<template>
  <span v-if="isLoading" class="loading"></span>
  <span v-else>
    <img class="vote-img mx-2" :src="imageUp" @click.prevent="voteUp()" />
    <span class="vote-text">{{ rating }}</span>
    <img class="vote-img mx-2" :src="imageDown" @click.prevent="voteDown()" />
  </span>
</template>

<script>
import errors from '@/utils/errors'

export default {
  props: {
    rating: Number,
    votedUp: Boolean,
    votedDown: Boolean,
    id: Number,
    type: String,
  },
  data: function () {
    return {
      isLoading: false
    };
  },
  methods: {
    voteUp () {
      this.isLoading = true

      this.$store.dispatch('votes/vote', { id: this.id, type: this.type, value: this.votedUp ? 0 : 1 })
        .then(_res => {
          this.isLoading = false
          if (this.votedUp) {
            this.votedUp = false
            this.votedDown = false
            this.rating--
          } else if (this.votedDown) {
            this.votedUp = true
            this.votedDown = false
            this.rating = this.rating + 2
          } else {
            this.votedUp = true
            this.votedDown = false
            this.rating++
          }
        })
        .catch(error => {
          this.isLoading = false

          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    voteDown () {
      this.isLoading = true

      this.$store.dispatch('votes/vote', { id: this.id, type: this.type, value: this.votedDown ? 0 : -1 })
        .then(_res => {
          this.isLoading = false
          if (this.votedDown) {
            this.votedUp = false
            this.votedDown = false
            this.rating++
          } else if (this.votedUp) {
            this.votedUp = false
            this.votedDown = true
            this.rating = this.rating - 2
          } else {
            this.votedUp = false
            this.votedDown = true
            this.rating--
          }
        })
        .catch(error => {
          this.isLoading = false

          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
  },
  computed: {
    imageUp () {
      if (this.votedUp) {
        return "/images/vote-up-active.png"
      } else {
        return "/images/vote-up.png"
      }
    },
    imageDown () {
      if (this.votedDown) {
        return "/images/vote-down-active.png"
      } else {
        return "/images/vote-down.png"
      }
    }
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
.vote-img {
  height: 18px;

  &:hover {
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
}

.loading {
  width: 90px;
}

.vote-text {
  font-size: 1.2rem;
}
</style>
