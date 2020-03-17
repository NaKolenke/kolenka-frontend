<template>
  <div class="container">
    <div class="columns">
      <div class="column col-8">
        <h4>Награды</h4>

        <div v-for="a in achievements" :key="a.id" class="card my-2">
          <div class="card-body">
            <achievement :achievement="a" />
          </div>
          <div class="card-footer">
            <button class="btn btn-primary" @click="showAssignDialog(a)">Назначить</button>
            <button class="btn btn-error mx-2" @click="showUnassignDialog(a)">Убрать</button>
            <i>Назначено {{a.users.length}} пользователям</i>
          </div>
        </div>
      </div>

      <div class="column col-4">
        <h4>Добавить нараду</h4>
        <div class="card">
          <div class="card-body">
            <add-achievement @achievement-added="refreshAchievements()" />
          </div>
        </div>
      </div>
    </div>

    <div class="modal" :class="{active: isAssignDialogShowed}">
      <a class="modal-overlay" aria-label="Close" @click="hideAssignDialog()"></a>
      <div class="modal-container">
        <div class="modal-header">
          <button class="btn btn-clear float-right" aria-label="Close" @click="hideAssignDialog()"></button>

          <div class="modal-title h5">
            <template v-if="assignFunction==='assign'">Назначить</template>
            <template v-else>Убрать</template>
            награду "{{ assignAchievement.title }}"
          </div>
        </div>

        <div class="modal-body">
          <div class="content">
            <template v-if="assignFunction==='assign'">
              <label class="form-label" for="users-search">Начните вводить имя пользователя</label>
              <input
                class="form-input"
                type="text"
                id="users-search"
                placeholder="Username или имя"
                v-model="searchQuery"
                @input="refreshUsers()"
              />

              <div class="chip" v-for="user in foundUsers" :key="user.id">
                <avatar :user="user" size="sm" :card="false" />
                {{user.username}}
                <a class="c-hand" @click="addAssignUser(user)">
                  <i class="icon icon-plus text-success"></i>
                </a>
              </div>

              <h5 class="mt-2" v-if="assignUsers.length > 0">Пользователи, которые получат награду</h5>
              <div class="chip" v-for="user in assignUsers" :key="user.id">
                <avatar :user="user" size="sm" :card="false" />
                {{user.username}}
                <a class="c-hand" @click="removeAssignUser(user)">
                  <i class="icon icon-minus text-warning"></i>
                </a>
              </div>

              <label class="form-label" for="comment">Комментарий</label>
              <input
                class="form-input"
                type="text"
                id="comment"
                placeholder="Комментарий"
                v-model="assignComment"
              />
            </template>

            <template v-else>
              <div class="chip" v-for="user in assignAchievement.users" :key="user.id">
                <avatar :user="user" size="sm" :card="false" />
                {{user.username}}
                <a class="c-hand" @click="addAssignUser(user)">
                  <i class="icon icon-minus text-warning"></i>
                </a>
              </div>

              <h5
                class="mt-2"
                v-if="assignUsers.length > 0"
              >Пользователи, у которых будет убрана награда</h5>
              <div class="chip" v-for="user in assignUsers" :key="user.id">
                <avatar :user="user" size="sm" :card="false" />
                {{user.username}}
                <a class="c-hand" @click="removeAssignUser(user)">
                  <i class="icon icon-minus text-warning"></i>
                </a>
              </div>
            </template>
          </div>
        </div>

        <div class="modal-footer">
          <button
            v-if="assignFunction==='assign'"
            class="btn btn-primary"
            @click="assign()"
          >Назначить</button>

          <button v-else class="btn btn-error mx-2" @click="unassign()">Убрать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Achievement from '@/components/Achievement.vue'
import Avatar from '@/components/elements/Avatar.vue'
import AddAchievement from '@/components/AddAchievementView.vue'
import Pagination from '@/models/pagination'
import errors from '@/utils/errors'


export default {
  data: function () {
    return {
      isAssignDialogShowed: false,
      assignFunction: 'assign',
      assignAchievement: {},
      assignUsers: [],
      assignComment: '',
      searchQuery: '',
      foundUsers: [],
    };
  },
  created () {
    if (!this.isAdmin) {
      this.$router.push({ path: '/404' })
      return
    }

    this.refreshAchievements()
  },
  methods: {
    refreshAchievements: function () {
      this.$store.dispatch('achievements/getAll')
    },
    showAssignDialog: function (achievement) {
      this.isAssignDialogShowed = true
      this.assignAchievement = achievement
      this.assignFunction = 'assign'
    },
    showUnassignDialog: function (achievement) {
      this.isAssignDialogShowed = true
      this.assignAchievement = achievement
      this.assignFunction = 'unassign'
    },
    hideAssignDialog: function () {
      this.isAssignDialogShowed = false
    },
    addAssignUser: function (user) {
      this.assignUsers.push(user)
      this.searchQuery = ''
      this.foundUsers = []
    },
    removeAssignUser: function (user) {
      this.assignUsers = this.assignUsers.filter(u => u.id != user.id)
    },
    assign: function () {
      var usersIds = this.assignUsers.map(u => u.id)
      var achievementId = this.assignAchievement.id

      this.$store.dispatch('achievements/assign', { users: usersIds, achievement: achievementId, comment: this.assignComment })
        .then(_ => {
          this.hideAssignDialog()

          this.searchQuery = ''
          this.foundUsers = []
          this.assignUsers = []
          this.assignComment = ''

          this.refreshAchievements()
        }).catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    unassign: function () {
      var usersIds = this.assignUsers.map(u => u.id)
      var achievementId = this.assignAchievement.id

      this.$store.dispatch('achievements/unassign', { users: usersIds, achievement: achievementId })
        .then(_ => {
          this.hideAssignDialog()

          this.searchQuery = ''
          this.foundUsers = []
          this.assignUsers = []
          this.assignComment = ''

          this.refreshAchievements()
        }).catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    refreshUsers: function () {
      this.$store.dispatch('search/findUsers', { username: this.searchQuery, pagination: new Pagination(1) })
        .then(res => {
          this.foundUsers = res.result
        }).catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    }
  },
  computed: {
    isAdmin: function () {
      if (!this.user) {
        return false
      }
      return this.user.is_admin
    },
    ...mapState({
      user: state => state.users.me,
      achievements: state => state.achievements.available
    }),
  },
  components: {
    Achievement,
    Avatar,
    AddAchievement,
  }
}
</script>

<style lang="scss" scoped>
</style>

