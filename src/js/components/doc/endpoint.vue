<template>
  <div class="endpoint bg-gray">
    <div>
      <b>{{endpoint.method}} {{endpoint.url}}</b>
    </div>

    <div v-if="endpoint.status != 'Available'">
      <span class="label label-warning">{{endpoint.status}}</span>
    </div>

    {{endpoint.description}}
    <div v-if="endpoint.body" class="bg-dark text-secondary">Body:
      <br>
      <pre>{{JSON.stringify(endpoint.body, null, 2)}}</pre>
    </div>

    <div v-if="endpoint.response" class="bg-dark text-secondary">Response:
      <br>
      <pre>{{JSON.stringify(endpoint.response, null, 2)}}</pre>
    </div>
  </div>
</template>

<style scoped>
.endpoint {
  margin-bottom: 26px;
  padding: 8px;
}
</style>

<script>
export default {
  props: ["endpoint"]
};
</script>

