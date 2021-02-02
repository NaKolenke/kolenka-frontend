<template>
  <div id="header">
    <header class="navbar column col-9 col-mx-auto col-md-12 col-xl-12">
      <section class="navbar-section">
        <router-link to="/" id="brand">
          <img id="logo" src="../assets/logo.png" />
        </router-link>
        <router-link to="/" id="brand">
          <span id="header-brand-prefix" class="p-1">НА</span>КОЛЕНКЕ
        </router-link>
        <router-link to="/blogs">Блоги</router-link>
        <router-link to="/users">Люди</router-link>
        <router-link v-if="false" to="/jams">Джемы</router-link>
        <router-link v-if="false" to="/stream">Активность</router-link>
        <router-link to="/search">Поиск</router-link>
      </section>

      <section class="navbar-section py-2">
        <router-link to="/posts/rubriki">Рубрики</router-link>
        <router-link to="/posts/o-saite">О сайте</router-link>

        <template v-if="user">
          <div class="dropdown dropdown-right">
            <div class="btn-group">
              <router-link
                :to="{ name: 'user', params: { user: user.username } }"
                class="btn btn-link text-secondary"
              >
                <avatar
                  :user="user"
                  size="sm"
                  :card="false"
                  :badge="notifications.length"
                  :header="true"
                />
                {{ user.name || user.username }}
              </router-link>

              <a class="btn btn-link dropdown-toggle" tabindex="0">
                <i class="icon icon-caret text-secondary"></i>
              </a>

              <ul class="menu">
                <li class="menu-item">
                  <router-link
                    :to="{ name: 'user', params: { user: user.username } }"
                  >
                    <i class="icon icon-people"></i> Профиль
                  </router-link>
                </li>
                <li class="menu-item">
                  <router-link :to="{ name: 'notifications' }">
                    <i class="icon icon-flag"></i>
                    <span :class="{ badge: notifications.length > 0 }"
                      >Уведомления</span
                    >
                  </router-link>
                </li>
                <li class="divider"></li>
                <li class="menu-item">
                  <router-link to="/new/post">
                    <i class="icon icon-edit"></i> Написать пост
                  </router-link>
                </li>
                <li class="menu-item">
                  <router-link
                    :to="{ name: 'userPosts', params: { user: user.username } }"
                  >
                    <i class="icon icon-copy"></i> Посты
                  </router-link>
                </li>
                <li class="menu-item">
                  <router-link to="/drafts">
                    <i class="icon icon-time"></i> Черновики
                  </router-link>
                </li>
                <li class="divider"></li>
                <li class="menu-item">
                  <router-link to="/new/blog">
                    <i class="icon icon-plus"></i> Создать блог
                  </router-link>
                </li>
                <li v-if="isLocal" class="divider"></li>
                <li v-if="isAdmin" class="menu-item">
                  <router-link :to="{ name: 'admin-activity' }">
                    <i class="icon icon-apps"></i> Управление
                  </router-link>
                </li>
                <li v-if="isLocal" class="menu-item">
                  <router-link to="/doc">Документация</router-link>
                </li>
                <li v-if="isLocal" class="menu-item">
                  <router-link to="/testing">Тестирование</router-link>
                </li>
                <li class="divider"></li>
                <li class="menu-item">
                  <a href="/logout" @click.prevent="logout">Выйти</a>
                </li>
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
import { mapState, mapGetters } from 'vuex'
import Avatar from '@/components/elements/Avatar.vue'

export default {
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')

      if (this.$router.currentRoute.name == 'home') {
        // this line causes full page refresh
        this.$router.go()
      } else {
        // this is soft refresh
        this.$router.push({ name: 'home' })
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.me
    }),
    ...mapGetters({
      notifications: 'notifications/unread'
    }),
    isAdmin: function () {
      if (!this.user) {
        return false
      }
      return this.user.is_admin
    },
    isLocal () {
      return window.location.hostname === 'localhost'
    }
  },
  components: {
    Avatar
  }
}
</script>

<style scoped>
#header {
  background-color: #3b4351;
}

header a {
  color: #ffffff;
  margin: 0 0 0 18px;
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

.dropdown .menu {
  min-width: 240px;
  max-height: max-content;
}
</style>
