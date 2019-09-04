<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12" md="8" sm="12">
            <v-card class="ma-1 mb-4">
              <v-card-title>Search for a specific task</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="search.searchField"
                  label="Type task's name . . ."
                />
              </v-card-text>
              <v-card-actions>
                <v-btn block class="primary" @click="searchByName">Search</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-card class="ma-1 mb-4">
              <v-card-title>Choose your filters</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-radio-group v-model="choosedFilter" row>
                      <v-radio label="All" value="ALL" @click="getAll" />
                      <v-radio
                        label="Backlog"
                        value="BACKLOG"
                        @click="getFilteredBy('BACKLOG')"
                      />
                      <v-radio
                        label="Todo"
                        value="TODO"
                        @click="getFilteredBy('TODO')"
                      />
                      <v-radio
                        label="Doing"
                        value="DOING"
                        @click="getFilteredBy('DOING')"
                      />
                      <v-radio
                        label="Done"
                        value="DONE"
                        @click="getFilteredBy('DONE')"
                      />
                    </v-radio-group>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>

          <template v-if="search.searchResult">
            <TaskCard
              :key="search.searchResult.id"
              :task="search.searchResult"
              :title="search.searchResult.taskName"
              :color="'teal lighten-5'"
            />
          </template>
          <template v-else-if="search.notFound">
            <TaskCard
              :key="2314"
              :task="search.possibleNewTask"
              :title="search.possibleNewTask.taskName"
              :color="'yellow lighten-4'"
              :new-task="true"
              @addNewTask="pushNewTask"
            />
          </template>
        </v-row>

        <v-row>
          <template v-for="task in tasks">
            <TaskCard :key="task.id" :task="task" :title="task.taskName" />
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
      choosedFilter: 'ALL',
      search: {
        searchField: '',
        searchResult: false,
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
    getFilteredBy(listName) {
      axios
        .get('http://localhost:8080/task/list', { params: { listName } })
        .then(response => {
          this.choosedFilter = listName
          this.tasks = response.data
        })
    },
    pushNewTask(newTask) {
      this.tasks.push(newTask)
      this.search.searchField = ''
      this.search.searchResult = false
      this.search.notFound = false
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
            this.search.searchResult = false
            this.search.notFound = true
            this.search.possibleNewTask.taskName = this.search.searchField
            this.search.searchField = 'Wrong name! Want to add?'
          }
        })
    }
  }
}
</script>
