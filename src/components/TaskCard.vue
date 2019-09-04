<template>
  <v-col cols="12" md="3" sm="6">
    <v-card :color="color">
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <p>
          Date created {{ new Date(task.createdAt).toLocaleDateString('br-PT') }}
        </p>
        <span v-show="!newTask" class="pl-1 caption grey--text">
          {{ task.listName }}
        </span>
      </v-card-text>
      <v-card-actions>
        <v-btn v-show="newTask" class="primary" @click="createNewTask"
          >Click to add</v-btn
        >
        <v-row>
          <v-col cols="12" sm="10" class="ml-5">
            <v-overflow-btn
              v-if="newTask"
              v-model="choosedListName"
              :items="listNameOptions"
            />
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    task: Object,
    title: String,
    color: String,
    newTask: Boolean
  },
  data() {
    return {
      choosedListName: '',
      listNameOptions: ['BACKLOG', 'TODO', 'DOING', 'DONE']
    }
  },
  methods: {
    createNewTask() {
      axios
        .post('http://localhost:8080/task', {
          trelloId: '',
          taskName: this.title,
          listName: this.choosedListName,
          createdAt: Date.now
        })
        .then(response => {
          this.$emit('addNewTask', response.data)
        })
    }
  }
}
</script>
