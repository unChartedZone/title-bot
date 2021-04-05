<template>
  <main id="app">
    <div class="container mx-auto">
      <h1 class="text-5xl text-center text-purple-600 my-8 header">
        Title Bot
      </h1>
      <form
        class="sm:w-2/5 space-y-4 mx-4 sm:mx-auto my-12"
        @submit.prevent="storeRecord"
      >
        <TextField
          name="url"
          type="text"
          v-model="urlInput"
          placeholder="URL"
        />
        <Button type="submit" :loading="loading">Fetch</Button>
      </form>
      <transition-group
        name="list-complete"
        tag="ul"
        class="sm:w-2/5 space-y-8 my-8 mx-4 sm:mx-auto"
      >
        <ListItem
          v-for="(record, index) in records"
          :key="record._id"
          :id="record._id"
          :title="record.title"
          :url="record.url"
          @deleteRecord="deleteRecord(record._id, index)"
        />
      </transition-group>
    </div>
  </main>
</template>

<script>
import http from './axios';

import Button from './components/Button';
import ListItem from './components/ListItem';
import TextField from './components/TextField';

export default {
  name: 'App',
  components: {
    Button,
    ListItem,
    TextField,
  },
  data() {
    return {
      urlInput: '',
      records: [],
      loading: false,
    };
  },
  async mounted() {
    await this.loadRecords();
  },
  methods: {
    async loadRecords() {
      let res = await http.get('/titles');
      this.records = res.data;
    },
    async storeRecord() {
      if (this.urlInput === '') return;

      this.loading = true;

      try {
        let { data } = await http.post('/titles', {
          url: this.urlInput,
        });

        console.log('Data: ', data);

        this.records.push(data);

        this.urlInput = '';
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    async deleteRecord(id, index) {
      try {
        let result = await http.delete(`/titles/${id}`);
        this.records.splice(index, 1);
        console.log('Deleted: ', result);
      } catch (e) {
        console.log('Error deleting record: ', e);
      }
    },
  },
};
</script>

<style lang="scss">
.header {
  font-family: 'Pacifico', sans-serif;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
