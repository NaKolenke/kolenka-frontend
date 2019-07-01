<template>
  <div>
    <button @click="showToast(1)">Show toast</button><br>
    <button @click="showToast(10)">Show big toast</button><br>
    <button @click="showErrorToast">Show error toast</button><br>
  </div>
</template>

<script>
export default {
  methods: {
    showToast(amount) {
      this.$toast.show("Example toast".repeat(amount))
    },
    showErrorToast() {
      this.$toast.error("Error toast");
    }
  }
}
</script>

