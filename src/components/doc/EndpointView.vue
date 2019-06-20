<template>
  <div class="endpoint card" :id="endpoint.method + endpoint.url">
    <div class="card-header">
      <b class="card-title">{{ endpoint.method.join(', ') }} {{ endpoint.url }}</b>
      <div v-if="endpoint.status != 'Available'" class="card-subtitle">
        <span class="label label-warning">{{ endpoint.status }}</span>
      </div>
    </div>

    <div class="card-body">
      {{ endpoint.description }}
      <div v-if="endpoint.body">
        <b>Request</b>
        <br>
        <pre><code>{{JSON.stringify(endpoint.body, null, 2)}}</code></pre>
      </div>

      <div v-if="endpoint.response">
        <b>Response</b>
        <br>
        <pre><code>{{JSON.stringify(endpoint.response, null, 2)}}</code></pre>
      </div>

      <div v-if="endpoint.error_response">
        <b>Error</b>
        <br>
        <pre><code>{{JSON.stringify(endpoint.error_response, null, 2)}}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['endpoint']
}
</script>

<style lang="scss" scoped>
@import './node_modules/spectre.css/src/_variables.scss';

.endpoint {
  margin-bottom: 26px;
  padding: 8px;
}

:target {
   background: $secondary-color;
}
</style>
