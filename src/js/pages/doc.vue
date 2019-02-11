<template>
  <div class="container">
    <div class="columns">
      <div id="doc" class="column col-6 col-mx-auto">
        <div id="postman" class="accordion">
          <input type="checkbox" id="accordion-1" name="accordion-checkbox" hidden>
          <label class="accordion-header label" for="accordion-1">> Коллекция Postman</label>
          <div class="accordion-body bg-gray">
            <p>
              Коллекция Postman:
              <a
                href="https://www.getpostman.com/collections/1f1850fa8a2c685009f6"
              >Ссылка</a>.
            </p>
            <p>Данные окружения:</p>
            <pre>
{
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
}
</pre>
          </div>
        </div>
        <EndpointView
          v-for="endpoint in endpoints"
          v-bind:key="endpoint.description"
          v-bind:endpoint="endpoint"
        ></EndpointView>
      </div>
    </div>
  </div>
</template>

<style scoped>
#postman .accordion-body {
  margin-bottom: 26px;
  font-size: 10pt;
}
</style>

<script>
const EndpointView = require("./../components/doc/endpoint.vue");
const config = require("./../config.json")

export default {
  data: function() {
    this.endpoints = [];
    
    return {
      endpoints: this.endpoints
    };
  },
  created: function() {    
    fetch(config.apiUrl + "/doc/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.endpoints = data.endpoints;
      });
  },
  components: {
    EndpointView
  }
};
</script>

