<template>
  <div id="header">
    <header class="navbar column col-9 col-mx-auto">
      <section class="navbar-section">
        <router-link to="/" id="brand">
          <img id="logo" src="../assets/logo.png">
        </router-link>
        <router-link to="/" id="brand">
          <span id="header-brand-prefix" class="p-1">НА</span>КОЛЕНКЕ
        </router-link>
        <router-link to="/blogs">Блоги</router-link>
        <router-link to="/users">Люди</router-link>
        <router-link to="/stream">Активность</router-link>
      </section>

      <section class="navbar-section">
        <router-link to="/page/about">О сайте</router-link>
        <template v-if="user">
          <router-link to="/feedback" class="tooltip tooltip-bottom" :data-tooltip="feedbackTooltip">
            <p id="version">Версия {{version}}</p>
          </router-link>
        </template>
        <template v-else>
          <p id="version">Версия {{version}}</p>
        </template>

        <template v-if="user">
          <div class="dropdown">
            <div class="btn-group">
              <router-link :to="{ name: 'profile', params: { user: user.username }}" class="btn btn-link text-secondary">
                <avatar-view :user="user" size="sm" :card="false"></avatar-view>
                {{ user.name || user.username }}
              </router-link>

              <a href="#" class="btn btn-link dropdown-toggle" tabindex="0">
                <i class="icon icon-caret text-secondary"></i>
              </a>

              <ul class="menu">
                <li class="menu-item"><router-link to="/posts/new">Написать пост</router-link></li>
                <!-- <li class="menu-item"><a href="#">Создать блог</a></li> -->
                <li class="divider"></li>
                <li class="menu-item"><router-link to="/logout">Выйти</router-link></li>
              </ul>
            </div>
          </div>          
        </template>
        <template v-else>
          <router-link to="/register">Регистрация</router-link>
          <router-link to="/login">Войти</router-link>
        </template>
      </section>

    </header>
  </div>
</template>

<script>
import AvatarView from '@/components/AvatarView.vue'
import FeedbackService from '@/services/feedback'

export default {
  data: function () {
    return {
      feedbackTooltip: ''
    }
  },
  props: {
    user: Object,
    version: String,
  },
  components: {
    AvatarView
  },
  mounted: function () {
    this.$watch('user', this.refreshFeedbackTooltip)
  },
  methods: {
    refreshFeedbackTooltip: function () {
      if (this.isAdmin) {
        FeedbackService.getList().then(data => {
          let newFeedbackCount = data.filter(f => !f.is_resolved).length
          if (newFeedbackCount > 0) {
            this.feedbackTooltip = 'Есть ' + newFeedbackCount + ' новых отзывов'
          } else {
            this.feedbackTooltip = 'Нет новых отзывов'
          }
        }).catch(err => {
          console.log(err)
          this.feedbackTooltip = 'Не удалось получить список отзывов'
        })
      } else {
        this.feedbackTooltip = 'Тут вы можете оставить комменатрий по работе сайта'
      }
    }
  },
  computed: {
    isAdmin: function () {
      if (!this.$meta.data.user) {
        return false
      }
      return this.$meta.data.user.is_admin
    }
  }
}
</script>

<style scoped>
#header {
  background-color: #323a45;
}

header a {
  color: #ffffff;
  margin: 0 0 0 20px;
}

#header-brand-prefix {
  color: #2e93aa;
}

#brand {
  text-decoration: none;
  margin: 0;
}

#version {
  color: #5a616d;
  margin: 0 20px 0 20px;
  font-size: 0.6rem;
}

#logo {
  height: 48px;
}

.tooltip::after {
  max-width: 500px;
}
</style>
