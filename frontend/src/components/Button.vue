<template>
  <button
    class="text-white bg-purple-600 active:bg-purple-900 px-3 py-2 rounded-lg block w-full shadow-md outline-none focus:outline-none"
    :type="type"
  >
    <div class="spinner" v-if="loading" />
    <slot v-else />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner {
  border: 2px solid white;
  border-radius: 50%;
  border-color: white transparent white transparent;
  height: 25px;
  width: 25px;
  margin: 0 auto;
  animation: spin 0.5s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
