<template>
  <span v-if="isLoading" class="loading"></span>
  <span v-else>
    <img class="vote-img mx-2" :src="imageUp" @click.prevent="voteUp()" />
    <span class="vote-text">{{ model.rating }}</span>
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
      isLoading: false,
      model: {
        rating: Number,
        votedUp: Boolean,
        votedDown: Boolean,
      }
    };
  },
  mounted: function () {
    this.model.rating = this.rating
    this.model.votedUp = this.votedUp
    this.model.votedDown = this.votedDown
  },

  methods: {
    voteUp () {
      this.isLoading = true

      this.$store.dispatch('votes/vote', { id: this.id, type: this.type, value: this.model.votedUp ? 0 : 1 })
        .then(_res => {
          this.isLoading = false
          if (this.model.votedUp) {
            this.model.votedUp = false
            this.model.votedDown = false
            this.model.rating--
          } else if (this.model.votedDown) {
            this.model.votedUp = true
            this.model.votedDown = false
            this.model.rating = this.model.rating + 2
          } else {
            this.model.votedUp = true
            this.model.votedDown = false
            this.model.rating++
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

      this.$store.dispatch('votes/vote', { id: this.id, type: this.type, value: this.model.votedDown ? 0 : -1 })
        .then(_res => {
          this.isLoading = false
          if (this.model.votedDown) {
            this.model.votedUp = false
            this.model.votedDown = false
            this.model.rating++
          } else if (this.model.votedUp) {
            this.model.votedUp = false
            this.model.votedDown = true
            this.model.rating = this.model.rating - 2
          } else {
            this.model.votedUp = false
            this.model.votedDown = true
            this.model.rating--
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
      if (this.model.votedUp) {
        return "/images/vote-up-active.png"
      } else {
        return "/images/vote-up.png"
      }
    },
    imageDown () {
      if (this.model.votedDown) {
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
