<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5">{{title}}</div>
    </div>
    <div class="card-body" ref="content">{{node}}</div>
  </div>
</template>

<script>
// there are some props available
// `node` is a Prosemirror Node Object
// `updateAttrs` is a function to update attributes defined in `schema`
// `view` is the ProseMirror view instance
// `options` is an array of your extension options
// `selected`
export default {
  props: ['node', 'updateAttrs', 'view'],
  computed: {
    title: {
      get () {
        return this.node.attrs.title
      },
      set (title) {
        // we cannot update `src` itself because `this.node.attrs` is immutable
        this.updateAttrs({
          title,
        })
      },
    },
  },
}
</script>
