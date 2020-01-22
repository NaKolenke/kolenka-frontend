<template>
  <div class="container">
    <h2>Документация API</h2>

    <div id="postman" class="accordion panel">
      <input type="checkbox" id="accordion-1" name="accordion-checkbox" hidden />
      <label class="accordion-header label panel-header" for="accordion-1">> Коллекция Postman</label>
      <div class="accordion-body panel-body" style="margin-bottom:0">
        <br />
        <p>
          Коллекция Postman:
          <a
            href="https://www.getpostman.com/collections/1f1850fa8a2c685009f6"
          >Ссылка</a>.
        </p>
        <p>Данные окружения:</p>
        <pre><code>{
  "key": "url",
  "value": "https://beta.kolenka.net/api"
},
{
  "key": "login",
  "value": "api-user"
},
{
  "key": "password",
  "value": "qwerty123"
}</code></pre>
      </div>
    </div>

    <br />
    <br />

    <endpoint-view v-for="endpoint in endpoints" :key="endpoint.description" :endpoint="endpoint"></endpoint-view>
  </div>
</template>

<script>
import errors from '@/utils/errors'
import EndpointView from '@/components/doc/EndpointView.vue'

export default {
  metaInfo () {
    return {
      title: 'Документация'
    }
  },
  data () {
    return {
      endpoints: []
    }
  },
  created () {
    this.$store.dispatch('doc/getDoc')
      .then(res => {
        this.endpoints = res.endpoints
      })
      .catch(error => {
        errors.handle(error)
        this.$toast.error(errors.getText(error))
      })
  },
  components: {
    EndpointView
  }
}
</script>
