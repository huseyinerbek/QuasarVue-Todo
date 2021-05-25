<template>
  <q-page dense>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="tasksDownloaded">
        <div class="q-mb-lg ">
          <search />
        </div>
        <p
          v-if="
            search &&
            !Object.keys(tasksTodo).length &&
            !Object.keys(tasksCompleted).length
          "
        >
          No Result
        </p>
        <q-scroll-area class="scrollareatasks">
          <notask
            v-if="
              !Object.keys(tasksTodo).length &&
              !search &&
              !settingsGetter.showTaskInOneList
            "
          ></notask>
          <taskstodo
            :tasksTodo="tasksTodo"
            v-if="Object.keys(tasksTodo).length"
          ></taskstodo>
          <taskscompleted
            :tasksCompleted="tasksCompleted"
            v-if="Object.keys(tasksCompleted).length"
            class="q-mb-xl"
          ></taskscompleted>
        </q-scroll-area>
        <div class="absolute-bottom-left q-pa-lg text-center  no-pointer-events ">
          <q-btn
            @click="showAddTask = true"
            class="all-pointer-events"
            round
            color="positive"
            size="18px"
            icon="add"
          />
        </div>
      </template>
      <template v-else>
        <span class="absolute-center">
          <q-spinner-hourglass color="primary" size="6em"/>
        </span>
      </template>
    </div>
    <q-dialog v-model="showAddTask">
      <addtask @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
export default {
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
    ...mapGetters('settingsModule', ['settingsGetter']),
    ...mapState('tasks', ['search', 'tasksDownloaded'])
  },
    mounted() {
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true
    })
  },
  components: {
    addtask: require('components/Tasks/Modals/AddTask').default,
    taskstodo: require('components/Tasks/TasksTodo').default,
    taskscompleted: require('components/Tasks/TasksCompleted').default,
    notask: require('components/Tasks/NoTask').default,
    search: require('components/Tasks/Tools/Search').default
  }
}
</script>

<style>
.scrollareatasks {
    display: grid;
    grid-auto-columns: auto;
    flex-wrap: wrap;
    flex-grow: 1;
}
</style>
