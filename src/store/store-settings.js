import { LocalStorage } from 'quasar'
const state = {
  //? verilerin tutuldugu yer
  settingsState: {
    show12HourTimeFormat:false,
    showTaskInOneList:false
  }
}
const mutations = {
  //? verileri method edildigi yer Async Degil verileri anlık değşitirir veritanı işlermleri burda olmaz misal
  setMutation12HourTimeFormat(state,value){
    state.settingsState.show12HourTimeFormat = value
  },
  setMutationShowTaskInOneList(state,value){
    state.settingsState.showTaskInOneList = value
  },
  setMutationSettings(state,settings){
    Object.assign(state.settingsState, settings)
  }
}
const actions = {
  //? async olur burda Veri server tarafından beklenen işlemleri burda yaparsın ( **Seetterın başlangıcı Asılıda)
  setAction12HourTimeFormat({commit,dispatch},value){
    commit('setMutation12HourTimeFormat',value)
    dispatch('saveSettings')
  },
  setActionShowTaskInOneList({commit,dispatch},value){
    commit('setMutationShowTaskInOneList',value)
    dispatch('saveSettings')
  },
  saveSettings({stateSettings}){
    LocalStorage.set('stateSettings', state.settingsState)
  },
  getSettings({commit}){
    let settings = LocalStorage.getItem('stateSettings')
    if(settings){
      commit('setMutationSettings',settings)
    }
  }
}
const getters = {
  // ? Stateden verileri alan yer manupile edebilirsin burada
  settingsGetter: state => {
    return state.settingsState
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
