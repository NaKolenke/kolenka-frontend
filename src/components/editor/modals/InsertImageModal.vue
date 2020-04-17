<template>
  <modal :open="isShowed" :closed="close" title="Вставить изображение" @ok="chooseImage()">
    <tabs>
      <tab title="По ссылке">
        <div :class="['form-group', {'has-error': imageError}, 'mt-2']">
          <input
            class="form-input"
            type="url"
            placeholder="Ссылка на изображение"
            v-model="imageUrl"
            autofocus
          />
          <p v-if="imageError" class="form-input-hint">Введите ссылку на изображение</p>
        </div>
      </tab>
      <tab title="Загрузить">
        <image-upload @complete="imageUploaded($event)" :multiple="true" class="mt-2" />
      </tab>
      <tab title="История загрузок">
        <div class="columns mt-2">
          <div
            v-for="item in myFiles.slice((imageContentPage - 1) * 20, 20 * imageContentPage)"
            :key="item.id"
            class="column col-3"
          >
            <a href="#" @click.prevent="chooseImageFromAlreadyUploaded(item.id)">
              <img :src="getUrlById(item.id)" width="100%" height="auto" />
            </a>
          </div>
        </div>
        <pagination-view
          :page="imageContentPage"
          :page-count="imageContentPageCount"
          @paginate-relative="paginateRelative"
          @paginate-to="paginateTo"
        ></pagination-view>
      </tab>
    </tabs>
  </modal>
</template>

<script>
import Modal from '@/components/elements/Modal.vue'
import Tabs from '@/components/elements/Tabs.vue'
import Tab from '@/components/elements/Tab.vue'
import PaginationView from '@/components/PaginationView.vue'
import ImageUpload from '@/components/editor/ImageUploadView.vue'

import { mapState } from 'vuex'
import errors from '@/utils/errors'
import Pagination from '@/models/pagination'

export default {
  props: {
    isShowed: {
      type: Boolean,
      default: false
    },
    command: Function
  },
  data: function () {
    return {
      imageUrl: null,
      imageError: null,
      imageContentPage: 1,
      imageContentPageCount: 1,
    }
  },
  mounted: function () {
    this.refreshMyFiles(1)
  },
  methods: {
    close: function () {
      this.$emit("update:isShowed", false)
    },
    chooseImage () {
      if (this.imageUrl.length > 0) {
        this.command({ src: this.imageUrl })
        this.imageUrl = ''
        this.close()
      } else {
        this.imageError = true
      }
    },
    chooseImageFromAlreadyUploaded (id) {
      this.command({ src: this.getUrlById(id) })
      this.close()
    },
    imageUploaded (images) {
      images.forEach(i => {
        this.command({ src: this.getUrlById(i.id) })
      })

      this.close()
    },
    paginateRelative (offset) {
      this.imageContentPage += offset

      this.refreshMyFiles(this.imageContentPage)
    },
    paginateTo (offset) {
      this.imageContentPage = offset

      this.refreshMyFiles(this.imageContentPage)
    },
    refreshMyFiles (page) {
      this.$store.dispatch('content/getOwned', { pagination: new Pagination(page) })
        .then(res => {
          this.imageContentPageCount = res.meta.page_count
        }).catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    getUrlById (id) {
      return `${process.env.VUE_APP_CONTENT_URL}/${id}/`
    },
  },
  computed: {
    ...mapState({
      myFiles: state => state.content.my
    }),
  },
  components: {
    Modal,
    Tabs,
    Tab,
    PaginationView,
    ImageUpload,
  }
}
</script>
