<template>
  <transition
    appear
    enter-active-class="animated bounceIn"
    leave-active-class="animated bounceOut"
  >
    <div :class="{'q-mt-lg': !settingsGetter.showTaskInOneList}">
      <listheader bgColor="bg-green-4" v-if="!settingsGetter.showTaskInOneList"
        >Completed</listheader
      >
      <q-list bordered separator :class="{listtop: !settingsGetter.showTaskInOneList}">
        <task
          v-for="(task, key) in tasksCompleted"
          :key="key"
          :task="task"
          :id="key"
        ></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props: ['tasksCompleted'],
  computed: {
    ...mapGetters('settingsModule', ['settingsGetter'])
  },
  components: {
    task: require('components/Tasks/Task').default,
    listheader: require('components/Shared/ListHeader').default
  }
}
</script>

<style>
.listtop {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  overflow: hidden;
}
</style>