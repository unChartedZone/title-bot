<template>
  <div id="app">
    <h1>Title Bot</h1>
    <form @submit.prevent="storeRecord">
      <input v-model="urlInput" type="text" placeholder="URL" />
      <button type="submit">Submit</button>
    </form>
    <ul>
      <li v-for="record in records" :key="record._id">
        {{ record.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import http from './axios';

export default {
  name: 'App',
  data() {
    return {
      urlInput: '',
      records: [],
    };
  },
  async mounted() {
    let res = await http.get('/titles');
    this.records = res.data;
    console.log(res);
  },
  methods: {
    async storeRecord() {
      let { data } = await http.post('/titles', {
        url: this.urlInput,
      });

      this.records.push(data);
    },
  },
};
</script>
