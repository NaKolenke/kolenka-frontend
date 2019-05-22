<template>
  <div class="article">
    <span class="subtitle">
      <span v-if="post.blog"><router-link :to="{ name: 'blog',  params: { name: post.blog.url }}">{{post.blog.title}}</router-link>, </span>
      {{post.created_date | moment}}
    </span>
    <h2>
      <router-link :to="{ name: 'post',  params: { post: post.url }}">{{post.title}} <span v-if="post.is_draft" class="label label-primary">черновик</span></router-link>
    </h2>

    <div v-if="cut" v-html="post.cut_text"></div>
    <div v-else v-html="post.text" ></div>

    <router-link
      v-if="cut && post.has_cut"
      :to="{ name: 'post',  params: { post: post.url }}"
      class="btn btn-sm"
    >
      {{ post.cut_name || 'Читать дальше' }}
    </router-link>

    <div class="columns article-footer">
      <div class="column col-lg-auto">
        <avatar-view :user="post.creator" :size="'sm'"></avatar-view>
        <span class="chip">
          {{ post.creator.name || post.creator.username }}
        </span>
        <router-link :to="{ name: 'post',  params: { post: post.url }, hash: '#comments'}" title="Комментарии">
          <span class="chip">
            <span class="icon-bubble2"></span>
            <span style="padding-left:4px">{{ post.comments }}</span>
          </span>
        </router-link>
        <span v-for="tag in post.tags" :key="tag.title" class="chip">
          <router-link :to="{ name: 'tag',  params: { tag: tag.url }}">#{{tag.title}}</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarView from '@/components/AvatarView'
import hljs from 'highlight.js/lib/highlight'
import '@/highlight'
import createElement from '@/utils/createelement'

export default {
  props: ['post', 'cut'],
  components: {
    AvatarView
  },
  mounted() {
    if (this.$el.querySelectorAll) {
      this.wrapCode()
      this.wrapYoutube()      
    }
  },
  methods: {
    wrapCode() {
      let codeTargets = this.$el.querySelectorAll('code')
      codeTargets.forEach(target => {
        hljs.highlightBlock(target)
      })
    },
    wrapYoutube() {
      let youtubeTargets = this.$el.querySelectorAll('iframe')
      youtubeTargets.forEach(target => {
        let id = target.src.match(/embed\/[a-zA-Z0-9_]+/)[0].substr(6)
        let image = `http://img.youtube.com/vi/${id}/hqdefault.jpg`
        
        let wrapper = createElement('div', {
          classList: [ 'youtube-video' ]
        })
        target.parentNode.insertBefore(wrapper, target)
        wrapper.appendChild(target)
        wrapper.removeChild(target)

        let img = createElement('img', {
          src: image,
          width: target.width,
          height: target.height
        })
        wrapper.appendChild(img)
        
        let span = createElement('span', {
          classList: [ 'icon-youtube' ]
        })
        wrapper.appendChild(span)

        let click = e => {
          wrapper.appendChild(target)
          img.style.display = 'none'
          span.style.display = 'none'
        }

        img.addEventListener('click', click)
        span.addEventListener('click', click)
      })
    }
  }
}
</script>

<style scoped>
.article {
  margin-bottom: 26px;
  background: #ffffff;
  padding: 12px;
}

.subtitle {
  font-size: 0.8em;
}

.article-footer {
  margin-top: 12px;
}
</style>

<style lang="scss">
.youtube-video {
  position: relative;
}

.youtube-video img {
  position: relative;
  cursor: pointer;
}

.youtube-video span {
  position: absolute;
  left: 50%;
  top: 50%;
  color: #fff;
  transform: translate(-50%, -50%);
  font-size: 64px;
  text-shadow: 0 10px 50px #000;
  cursor: pointer;
}
</style>

