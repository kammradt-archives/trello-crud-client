<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <v-card class="ma-1 mb-4">
              <v-card-text>
                <v-text-field label="Type todo's name . . ." v-model="search.searchField" />
              </v-card-text>
              <v-card-actions>
                <v-btn @click="searchByName" block class="primary">Search</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <template v-if="search.searchResult">
            <TaskCard
              :task="search.searchResult"
              :key="search.searchResult.id"
              :title="search.searchResult.taskName"
              :color="'teal lighten-5'"
            />
          </template>
          <template v-else-if="search.notFound">
            <TaskCard
              :task="search.possibleNewTask"
              :key="2314"
              :title="search.possibleNewTask.taskName"
              :color="'yellow lighten-5'"
              :newTask="true"
            />
          </template>
        </v-row>

        <v-row>
          <template v-for="task in tasks">
            <TaskCard :task="task" :key="task.id" :title="task.taskName" />
          </template>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import TaskCard from '@/components/TaskCard'

export default {
  name: 'App',
  components: {
    TaskCard
  },
  data() {
    return {
      tasks: [],
      search: {
        searchField: '',
        searchResult: null,
        notFound: false,
        possibleNewTask: {
          taskName: '',
          listName: 'TODO',
          createdAt: new Date()
        }
      }
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      axios.get('http://localhost:8080/task').then(response => {
        this.tasks = response.data
      })
    },
    searchByName() {
      axios
        .get('http://localhost:8080/task/search', {
          params: {
            taskName: this.search.searchField
          }
        })
        .then(response => {
          if (response.data) {
            this.search.searchResult = response.data
            this.search.searchField = ''
          } else {
            this.search.searchResult = null
            this.search.notFound = true
            this.search.possibleNewTask.taskName = this.search.searchField
            this.search.searchField = 'Wrong name! Want to add?'
          }
        })
    }
  }
}
</script>
