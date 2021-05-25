<template>
  <q-item
    v-ripple
    clickable
    v-touch-hold:1000.mouse="showEditTaskModal"
    @click="updateTask({id: id, updates: {completed: !task.completed}})"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
  >
    <q-item-section side top>
      <q-checkbox class="no-pointer-events" :value="task.completed" />
    </q-item-section>
    <q-item-section>
      <q-item-label 
        :class="{'text-strike': task.completed}" 
        v-html="$options.filters.searchHighlight(task.name,search)">
      </q-item-label>
    </q-item-section>
    <q-item-section side v-if="task.dueDate">
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label caption>{{ task.dueDate | niceDate }}</q-item-label>
          <q-item-label caption class="row justify-end">
            <small>{{ taskDueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditTaskModal"
          dense
          flat
          round
          color="primary"
          icon="edit"
        />
        <q-btn
          @click.stop="promtToDelete(id)"
          dense
          flat
          round
          color="red"
          icon="delete"
        />
      </div>
    </q-item-section>
    <q-dialog v-model="showEditTask">
      <editTask @close="showEditTask = false" :task="task" :id="id" />
    </q-dialog>
  </q-item>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import {date} from 'quasar'
const {addToDate} = date
export default {
  data() {
    return {
      showEditTask: false
    }
  },
  props: ['task', 'id'],
  computed:{
    ...mapState('tasks', ['search']),
    ...mapGetters('settingsModule',['settingsGetter']),
    taskDueTime(){
      if(this.settingsGetter.show12HourTimeFormat){
        return date.formatDate(this.task.dueDate + ' ' + this.task.dueTime , 'h:mmA')
      }
      return this.task.dueTime
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask', 'deleteTask']),
    promtToDelete(id) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Really Delete?',
          ok: {
            push: true
          },
          cancel: {
            push: true,
            color: 'negative'
          },
          persistent: true
        })
        .onOk(() => {
          this.deleteTask(id)
        })
    },
    showEditTaskModal() {
      this.showEditTask = true
    }
  },
  components: {
    'editTask': require('components/Tasks/Modals/EditTask').default
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, 'DD.MM.YYYY')
    },
    searchHighlight(value,search){
      if(search){
        let searchRegExp = new RegExp(search,'ig')
        return value.replace(searchRegExp,(match)=>{
          return '<span class="bg-yellow-6">'+match+'</span>'
        })
      }
      return value
    }
  }
}
</script>
