export default {
  methods: {
    submitForm() {
      this.addTask(this.taskToSubmit)
      this.$emit('close')
    },
    editForm() {
        this.updateTask({id: this.id, updates: this.taskToSubmit})
        this.$emit('close')
      }
  },
  components: {
    modalHeader: require('components/Tasks/Modals/Shared/ModalHeader').default,
    modalTaskName: require('components/Tasks/Modals/Shared/ModelTaskName').default,
    modalDueDate: require('components/Tasks/Modals/Shared/ModalDueDate').default,
    modalDueTime: require('components/Tasks/Modals/Shared/ModalDueTime').default,
    modalButtons: require('components/Tasks/Modals/Shared/ModalButtons').default
  }
}
