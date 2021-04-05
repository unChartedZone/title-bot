<template>
  <li
    class="group flex justify-between items-center border border-gray-300 rounded-lg shadow-md px-4 py-3"
  >
    <div class="truncate">
      <a
        class="text-xl text-purple-600 truncate overflow-hidden"
        :href="url"
        target="_blank"
      >
        <p class="truncate">
          {{ url }}
        </p>
      </a>
      <p class="overflow-y-auto">{{ title }}</p>
    </div>
    <span
      @click="deleteRecord"
      class="text-gray-100 group-hover:text-gray-700 cursor-pointer"
    >
      &#10005;
    </span>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteRecord() {
      this.$emit('deleteRecord');
    },
  },
};
</script>
