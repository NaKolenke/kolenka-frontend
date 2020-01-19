<template>
  <div class="card stickers-list">
    <template v-if="stickers.length > 0">
      <div
        v-for="(sticker, index) in stickers"
        :key="sticker.id"
        class="stickers-list__item"
        :class="{ 'is-selected': stickerIndex === index }"
        @click="selectSticker(sticker)"
      >
        <div class="stickers-list__item__image">
          <sticker :name="sticker.name" />
        </div>
        <div class="stickers-list__item__name">
          {{ sticker.name }}
        </div>
      </div>
    </template>
    <div v-else class="stickers-list__item is-empty">Нет подходящих стикеров</div>
  </div>
</template>

<script>
import Sticker from '@/components/elements/Sticker.vue'

export default {
  props: {
    stickers: Array,
    stickerIndex: Number
  },
  methods: {
    selectSticker(sticker) {
      this.$emit("select-sticker", sticker)
    }
  },
  components: {
    Sticker
  }
}
</script>

<style lang="scss" scoped>
@import "./node_modules/spectre.css/src/_variables.scss";

.stickers-list {
  border-radius: $border-radius * 2;
  z-index: $zindex-1;
  padding-top: $control-padding-x-sm;
  padding-bottom: $control-padding-x-sm;

  &__item {
    display: flex;
    align-items: center;
    padding-left: $control-padding-x-sm;
    padding-right: $control-padding-x-sm;
    cursor: pointer;
    
    &.is-selected,
    &:hover {
      background-color: $highlight-color;
    }

    &__name {
      padding-left: $control-padding-x-sm;
    }
  }
}
</style>