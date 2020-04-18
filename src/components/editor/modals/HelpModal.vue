<template>
  <modal
    :open="isShowed"
    :closed="close"
    title="Помощь по редактору текста"
    size="lg"
    :hideButtons="true"
  >
    <h4>Общее</h4>
    <p>
      Для добавления переноса на новую строку используйте
      <kbd>Ctrl/Shift+Return</kbd>
    </p>
    <p>Редактор поддерживает некоторые правила Markdown</p>
    <p>
      Для пропорционального масштабирования изображения зажмите
      <kbd>Shift</kbd>
    </p>
    <h4>Embed</h4>
    <p>Поддерживаемые сервисы: YouTube, Vimeo, Soundcloud, Twitch, Twitter</p>
    <h4>Кат</h4>
    <p>Чтобы добавить разрыв поста, на новой строке введите -- опциональное название для кнопки ката --. Можно использовать конструкцию ----, тогда будет подставлено название по умолчанию "Читать далее"</p>
    <h4>Спойлер</h4>
    <p>Чтобы добавить спойлер, введите || опциональное название ||</p>
  </modal>
</template>

<script>
import Modal from '@/components/elements/Modal.vue'

export default {
  props: {
    isShowed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close: function () {
      this.$emit("update:isShowed", false)
    }
  },
  components: {
    Modal
  }
}
</script>
