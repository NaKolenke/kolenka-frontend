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
        <template v-if="auth.user">
          <router-link to="/feedback" class="tooltip tooltip-bottom" :data-tooltip="feedbackTooltip">
            <p id="version">Версия {{version}}</p>
          </router-link>
        </template>
        <template v-else>
          <p id="version">Версия {{version}}</p>
        </template>

        <template v-if="auth.user">
          <div class="dropdown">
            <div class="btn-group">
              <router-link :to="{ name: 'profile', params: { user: auth.user.username }}" class="btn btn-link text-secondary">
                <avatar :user="auth.user" size="sm" :card="false" />
                {{ auth.user.name || auth.user.username }}
              </router-link>

              <a class="btn btn-link dropdown-toggle" tabindex="0">
                <i class="icon icon-caret text-secondary"></i>
              </a>

              <ul class="menu">
                <li class="menu-item"><router-link :to="{ name: 'profile', params: { user: auth.user.username }}"><i class="icon icon-people"></i> Профиль</router-link></li>
                <li class="divider"></li>
                <li class="menu-item"><router-link to="/new/post"><i class="icon icon-edit"></i> Написать пост</router-link></li>
                <li class="menu-item"><router-link :to="{ name: 'userPosts', params: { user: auth.user.username } }"><i class="icon icon-copy"></i> Посты</router-link></li>
                <li class="menu-item"><router-link to="/drafts"><i class="icon icon-time"></i> Черновики</router-link></li>
                <li class="divider"></li>
                <li class="menu-item"><router-link to="/new/blog"><i class="icon icon-plus"></i> Создать блог</router-link></li>
                <li class="divider"></li>
                <li class="menu-item"><a href="/logout" @click.prevent="$auth.logout(); $router.go()">Выйти</a></li>
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
import Avatar from '@/components/elements/Avatar.vue'
import FeedbackService from '@/services/feedback'

export default {
  data: function () {
    return {
      ...this.mapData({
        auth: 'auth/data'
      }),
      feedbackTooltip: ''
    }
  },
  props: {
    version: String,
  },
  mounted: function () {
    //this.$watch('user', this.refreshFeedbackTooltip)
    console.log(this.user)
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
      if (!this.user) {
        return false
      }
      return this.user.is_admin
    }
  },
  components: {
    Avatar
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

.icon {
  margin-right: 4px;
}
</style>
