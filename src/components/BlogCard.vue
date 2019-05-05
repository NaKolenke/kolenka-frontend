<template>
  <div class="container columns">
    <div class="column col-2">
      <avatar-view :user="blog.creator" :size="'lg'"></avatar-view>
    </div>
    <div class="column col-10">
      <h3>{{ blog.title }}</h3>
      <p>{{ blog.description }}</p>

      <div class="columns">
        <div class="column col-6" v-for="item in posts" :key="item.id">
          <div class="card my-1">
            <div class="card-header">
              <div class="card-title h5"><a>Название записи в блоге</a></div>
              <div class="card-subtitle text-gray">Дата / Пользователь</div>
            </div>
            <div class="card-body">
              <p>Краткое содержание?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarView from '@/components/AvatarView.vue'

export default {
  props: [ 'blog' ],
  data() {
    return {
      posts: [{}, {}]
    }
  },
  components: {
    AvatarView
  }
}
</script>
