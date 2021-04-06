<template>
<div>
  <label class="text-lg font-bold ml-1" :for="name">{{label}}</label>
  <div
    class="border border-gray-300 rounded-lg px-3 py-2 focus-within:border-purple-500"
  >
    <input
      class="w-full outline-none"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
      :type="type"
      :placeholder="placeholder"
      :name="name"
      :pattern="pattern"
    />
  </div>
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
