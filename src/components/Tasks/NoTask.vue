<template>
  <transition
    appear
    enter-active-class="animated rubberBand"
  >
  <q-banner class="bg-grey-3 no-task">
    <template v-slot:avatar>
      <q-icon name="check" color="primary"/>
    </template>
    No Task Todo Today !
    <template v-slot:action>
      <q-btn
        @click="$root.$emit('showAddTask')"
        icon-right="add"
        color="primary"
        label="Add Task"
      />
    </template>
  </q-banner>
  </transition>
</template>

<script>
export default {}
</script>

<style>
.no-task{
  border-radius: 10px;
}
</style>