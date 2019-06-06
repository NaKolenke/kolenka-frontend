<template>
  <div class="container">
    <h2>Документация API</h2>
    <div id="postman" class="accordion panel">
      <input type="checkbox" id="accordion-1" name="accordion-checkbox" hidden>
      <label class="accordion-header label panel-header" for="accordion-1">> Коллекция Postman</label>
      <div class="accordion-body panel-body">
        <br>
        <p>
          Коллекция Postman:
          <a href="https://www.getpostman.com/collections/1f1850fa8a2c685009f6">Ссылка</a>.
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
    <br><br>
    <endpoint-view
      v-for="endpoint in endpoints"
      v-bind:key="endpoint.description"
      v-bind:endpoint="endpoint"
    ></endpoint-view>
  </div>
</template>

<script>
import EndpointView from '@/components/doc/EndpointView.vue'
import DocService from '@/services/doc'

export default {
  data () {
    return {
      endpoints: []
    }
  },
  created () {
    this.$docs
    .getEndpoints()
    .then(data => {
      this.endpoints = data
    })
  },
  components: {
    EndpointView
  }
}
</script>
