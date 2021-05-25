<template>
  <q-card>
    <modalHeader>Edit Task</modalHeader>
    <q-form @submit="editForm">
      <q-card-section>
        <modalTaskName :name.sync="taskToSubmit.name"/>
        <modalDueDate :dueDate.sync="taskToSubmit.dueDate"/>
        <modalDueTime v-if="taskToSubmit.dueDate" :dueTime.sync="taskToSubmit.dueTime"/>
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
  props: ['task', 'id'],
  data() {
    return {
      taskToSubmit: {}
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask']),
  },
  created() {
    this.taskToSubmit = Object.assign({}, this.task)
  }
}
</script>