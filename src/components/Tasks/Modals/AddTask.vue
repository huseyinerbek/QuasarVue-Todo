<template>
  <q-card>
    <modalHeader>Add Task</modalHeader>
    <q-form @submit="submitForm">
      <q-card-section>
        <modalTaskName :name.sync="taskToSubmit.name" />
        <modalDueDate :dueDate.sync="taskToSubmit.dueDate" />
        <modalDueTime v-if="taskToSubmit.dueDate" :dueTime.sync="taskToSubmit.dueTime" />
        <modalButtons/>
      </q-card-section>
    </q-form>
  </q-card>
</template>
<script>
import {mapActions} from 'vuex'
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'
export default {
  mixins: [mixinAddEditTask],
  data() {
    return {
      taskToSubmit: {
        name: '',
        dueDate: '',
        dueTime: '',
        completed: false
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['addTask'])
  }
}
</script>
