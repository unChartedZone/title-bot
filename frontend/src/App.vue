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
          label="URL"
          placeholder="http://example.com"
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
    <Snackbar v-model="snackBar.show" :message="snackBar.message" :color="snackBar.color" />
  </main>
</template>

<script>
import http from './axios';

import Button from './components/Button';
import ListItem from './components/ListItem';
import Snackbar from './components/Snackbar'
import TextField from './components/TextField';

export default {
  name: 'App',
  components: {
    Button,
    ListItem,
    Snackbar,
    TextField,
  },
  data() {
    return {
      urlInput: '',
      records: [],
      loading: false,
      snackBar: {
        show: false,
        message: '',
        color: '',
      },
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
      if (this.urlInput === '') {
        this.setSnackbar('Please enter a URL', 'warning');
        return;
      }

      this.loading = true;

      try {
        let { data } = await http.post('/titles', {
          url: this.urlInput,
        });

        if(data.message) {
          this.setSnackbar(data.message, data.status)
          return
        }

        this.records.push(data);

        this.urlInput = '';
      } catch (e) {
        console.log(e);

        const {message, status} = e.response.data;
        this.setSnackbar(message, status);
      } finally {
        this.urlInput = ''
        this.loading = false;
      }
    },
    async deleteRecord(id, index) {
      try {
        await http.delete(`/titles/${id}`);
        this.records.splice(index, 1);
      } catch (e) {
        console.log('Error deleting record: ', e);
      }
    },
    setSnackbar(message, color) {
      this.snackBar.message = message;
      this.snackBar.color = color;
      this.snackBar.show = true;
    }
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
