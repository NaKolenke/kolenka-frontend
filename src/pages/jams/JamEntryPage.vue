<template>
  <div v-if="jam && entry">
    <div class="container">
      <div class="float-left mr-32">
        <jam-entry-logo :entry="entry" />
      </div>
      <div>
        <h3 class="title">
          <router-link
            :to="{
              name: 'jam-entry',
              params: { jamUrl: entry.jam.url, entryUrl: entry.url },
            }"
            >{{ entry.title }}</router-link
          >
        </h3>

        <p>
          <avatar :user="entry.creator" :size="'sm'" popoverSide="bottom" />
          {{ entry.creator.name || entry.creator.username }}

          <span class="text-gray"
            >|| Заявка на джем
            <router-link :to="{ name: 'jam', params: { jamUrl: jam.url } }">{{
              jam.title
            }}</router-link>
          </span>
        </p>
      </div>

      <div class="clearfix"></div>

      <div>
        <post-body v-if="entry.info" :html="entry.info" />
        <p v-else>Описание еще не заполнено</p>

        <div>
          <h3 class="title" v-if="entry.links && entry.links.length > 0">
            Ссылки
          </h3>
          <ul>
            <li v-for="link in entry.links" :key="link.id">
              <a :href="link.href">{{ link.title }}</a>
            </li>
          </ul>
        </div>

        <div class="my-2" v-if="entry.posts && entry.posts.length > 0">
          <h3>К этой заявке прилинкованы посты:</h3>
          <div v-for="post in entry.posts" :key="post.id">
            <router-link
              :to="{
                name: 'post',
                params: { post: post.url, blog: post.blog, user: post.creator },
              }"
            >
              {{ post.title }}
            </router-link>
          </div>
        </div>

        <!--
        <gallery :images="entry.screenshots" />

        <div>
          <p>Посты к этой заявке</p>
          <ul>
            <li v-for="link in entry.links" :key="link">{{link}}</li>
          </ul>
        </div>

        <div>
          <p>Оценка</p>
          <ul>
            <li v-for="link in entry.links" :key="link">{{link}}</li>
          </ul>
        </div>-->

        <jam-entry-feedback-form
          v-if="Object.keys(votes).length > 0"
          :entry="entry"
          :criterias="jam.criterias"
          v-model="votes"
        />
      </div>

      <comments-section
        v-if="jam && entry"
        :jam-url="jam.url"
        :jam-entry-url="entry.url"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import errors from '@/utils/errors'

import Avatar from '@/components/elements/Avatar.vue'
import PostBody from '@/components/PostBody.vue'
import JamEntryLogo from '@/components/elements/JamEntryLogo.vue'
import CommentsSection from '@/components/comments/CommentsSection.vue'
import JamEntryFeedbackForm from '@/components/jams/JamEntryFeedbackForm.vue'


export default {
  metaInfo () {
    return {
      title: 'Заявка на джем'
    }
  },
  data: function () {
    return {
      votes: {}
    }
  },
  created () {
    this.refreshEntry()
  },
  methods: {
    refreshEntry () {
      this.$store.dispatch('jams/resetCurrentEntry')

      this.$store.dispatch('startLoading')

      var jamUrl = this.$route.params.jamUrl
      var entryUrl = null
      var request = null
      if (this.$route.name === 'my-jam-entry') {
        request = this.$store.dispatch('jams/getMyEntry', { jamUrl: jamUrl })
      } else {
        entryUrl = this.$route.params.entryUrl
        request = this.$store.dispatch('jams/getEntry', { jamUrl: jamUrl, entryUrl: entryUrl })
      }
      request
        .then(_ => {
          if (!this.jam) {
            return this.$store.dispatch('jams/getJam', { url: jamUrl })
          }
          return Promise.resolve()
        })
        .then(_ => {
          return this.$store.dispatch('jams/getEntryCriterias', { jamUrl: jamUrl, entryUrl: this.entry.url })
        })
        .then(votes => {
          this.formVotes(votes)
          this.$store.dispatch('stopLoading')
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))

          this.$store.dispatch('stopLoading')
        })
    },
    formVotes: function (votes) {
      this.votes = {}
      for (var criteria of this.jam.criterias) {
        this.votes[criteria.id] = 0
      }

      for (var vote of votes) {
        this.votes[vote.criteria.id] = vote.vote
      }
    }
  },
  watch: {
    votes: function (newVal, _) {
      var jamUrl = this.$route.params.jamUrl
      var entryUrl = this.entry.url
      this.$store.dispatch('jams/addEntryVotes', { jamUrl: jamUrl, entryUrl: entryUrl, criterias: newVal })
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.me,
      entry: state => state.jams.currentEntry,
      jam: state => state.jams.current,
    }),
  },
  components: {
    JamEntryLogo,
    Avatar,
    PostBody,
    CommentsSection,
    JamEntryFeedbackForm
  }
}
</script>
