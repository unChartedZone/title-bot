<template>
  <transition name="slide-fade">
    <div 
      v-if="value" 
      class="absolute top-0 right-0 px-4 py-5 m-4 rounded-xl shadow-lg"
      :class="[color]"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  /* eslint-disable */
  watch: {
    value: function(newValue, oldValue) {
      if(newValue) {
        setTimeout(() => {
          this.$emit('input', false);
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.primary {
  @apply bg-purple-800;
  @apply text-white;
}

.warning {
  @apply bg-yellow-300;
  @apply text-yellow-900;
}

.error {
  @apply bg-red-300;
  @apply text-red-900;
}
</style>