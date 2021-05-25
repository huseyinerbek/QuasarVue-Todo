import Vue from 'vue'
import {uid,Notify} from 'quasar'
import {firebaseDb, firebaseAuth} from 'boot/firebase'
import {showErrorMessage} from 'src/functions/function-show-error-message'

const state = {
  //? verilerin tutuldugu yer
  tasks: {
    // ID1: {
    //   name: 'Aşkımı gezmeye çıkar sonra döv',
    //   completed: false,
    //   dueDate: '05/18/2021',
    //   dueTime: '18:30'
    // },
    // ID2: {
    //   name: 'Muz al 1 KG',
    //   completed: false,
    //   dueDate: '05/13/2021',
    //   dueTime: '16:00'
    // },
    // ID3: {
    //   name: 'Ödevlerini yap',
    //   completed: false,
    //   dueDate: '11/05/2021',
    //   dueTime: '13:20'
    // },
    // ID4: {
    //   name: 'Tatilee çıkış yap yap',
    //   completed: false,
    //   dueDate: '10/05/2021',
    //   dueTime: '13:20'
    // }
  },
  search: '',
  tasksDownloaded: false
}
const mutations = {
  //? verileri method edildigi yer Async Degil verileri anlık değşitirir veritanı işlermleri burda olmaz misal
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  },
  clearTasks(state) {
    state.tasks = {}
  },
  setSearch(state, value) {
    state.search = value
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value
  }
}
const actions = {
  //? async olur burda Veri server tarafından beklenen işlemleri burda yaparsın
  updateTask({dispatch}, payload) {
    dispatch('fbUpdateTask', payload)
  },
  deleteTask({dispatch}, id) {
    dispatch('fbDeleteTask', id)
  },
  addTask({dispatch}, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }
    dispatch('fbAddTask', payload)
  },
  setSearch({commit}, value) {
    commit('setSearch', value)
  },
  fbReadData({commit}) {
    let userId = firebaseAuth.currentUser.uid
    let userTasks = firebaseDb.ref('tasks/' + userId)

    //* İnitial Check for Data

    userTasks.once('value', snapshop => {
      commit('setTasksDownloaded', true)
    },error=>{
      showErrorMessage(error.message)
      this.$router.replace('/auth')
    })

    //* Child Added
    userTasks.on('child_added', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        task: task
      }
      commit('addTask', payload)
    })
    //* Child changed
    userTasks.on('child_changed', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        updates: task
      }
      commit('updateTask', payload)
    })
    //* Child removed
    userTasks.on('child_removed', snapshot => {
      let taskId = snapshot.key
      commit('deleteTask', taskId)
    })
  },
  fbAddTask({}, payload) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
    taskRef.set(payload.task, error => {
      if (error) {
        showErrorMessage(error.message)
      }else{
        Notify.create({
          message: 'Task Added!',
          color:'green',
          icon:"check"
        })

      }   
    })
  },
  fbUpdateTask({}, payload) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
    taskRef.update(payload.updates,error => {
      if (error) {
        showErrorMessage(error.message)
      }else{
        let keys = Object.keys(payload.updates)
        if(!(keys.includes('completed') && keys.length == 1)){
          Notify.create({
            message: 'Task Updated!',
            icon:"priority_high"
          })
        }
      }
    })
  },
  fbDeleteTask({}, taskId) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + taskId)
    taskRef.remove(error => {
      if (error) {
        showErrorMessage(error.message)
      }else{
        Notify.create({
          message: 'Task Deleted!',
          color:'red',
          icon:"delete"
        })

      }  
    })
  }
}
const getters = {
  // ? Stateden verileri alan yer manupile edebilirsin burada
  tasksFiltered: state => {
    let tasksFiltered = {}
    if (state.search) {
      Object.keys(state.tasks).forEach(function(key) {
        let task = state.tasks[key],
          taskNameLowerCase = task.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase()
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    }
    return state.tasks
  },

  tasksTodo: ({}, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(tasksFiltered).forEach(function(key) {
      let task = tasksFiltered[key]
      if (!task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },

  tasksCompleted: ({}, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(tasksFiltered).forEach(function(key) {
      let task = tasksFiltered[key]
      if (task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
