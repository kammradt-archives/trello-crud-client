<template>
  <v-col cols="12" md="3" sm="6">
    <v-card :color="color">
      <v-card-title>
        {{ title }}
        <span class="pl-1 caption grey--text">{{ task.listName }}</span>
      </v-card-title>
      <v-card-text>Date created {{ (new Date(task.createdAt)).toLocaleDateString("br-PT") }}</v-card-text>
      <v-card-actions>
        <v-btn v-if="!newTask" class="error">
          Delete
        </v-btn>
        <v-btn @click="createNewTask" v-else class="primary">
          Click to add
        </v-btn>
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
  methods: {
    createNewTask() {
      // axios.post()
      // Post para parte da api que chama a api do trello
    }
  }
}
</script>