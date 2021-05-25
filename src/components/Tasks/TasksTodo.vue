<template>
  <transition
    appear
    enter-active-class="animated bounceIn"
    leave-active-class="animated bounceOut absolute-top"
  >
    <div>
      <listheader bgColor="bg-orange-4" v-if="!settingsGetter.showTaskInOneList"
        >To Do</listheader
      >
      <q-list bordered separator :class="{listtop: !settingsGetter.showTaskInOneList}">
        <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key"></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props: ['tasksTodo'],
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
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
}
:root {
  --animate-duration: 0.9s;
  --animate-delay: 0.9s;
}
</style>