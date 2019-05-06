<template>
  <div class="card my-1">
    <div class="card-header">
      <div class="card-title h5"><a :href="'/blogs/' + blog.url">{{ blog.title }}</a></div>
    </div>
    <div class="card-body">
      <div v-html="blog.description"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blog: Object
  }
}
</script>
