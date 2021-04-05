<template>
  <div
    class="border border-gray-300 rounded-lg px-3 py-2 focus-within:border-purple-500"
  >
    <label>{{ label }}</label>
    <input
      class="w-full outline-none"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
      :type="type"
      :placeholder="placeholder"
      :name="name"
      :pattern="pattern"
      v-validate="email"
    />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    name: {
      type: String,
    },
    pattern: {
      type: String,
    },
  },
};
</script>
