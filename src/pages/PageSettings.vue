<template>
  <q-page padding>
    <q-list bordered padding class="bg-yellow-1 q-mb-md">
      <q-item-label header>Settings</q-item-label>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 hour time format</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="show12HourTimeFormat"/>
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show tasks in one list</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="showTaskInOneList"/>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list bordered padding class="bg-yellow-1">
      <q-item-label header>More</q-item-label>
      <q-item tag="label" v-ripple to="/settings/help">
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right"/>
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple @click="visitOurWebSite">
        <q-item-section>
          <q-item-label>Visit Our Web Site</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right"/>
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple @click="emailUs">
        <q-item-section>
          <q-item-label>Email Us</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right"/>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {openURL} from 'quasar'
export default {
  computed: {
    //? İlki Seetings Store modulu, [] içinde ki getterin içinde ki settings propertisi
    ...mapGetters('settingsModule', ['settingsGetter']),
    show12HourTimeFormat: {
      get() {
        return this.settingsGetter.show12HourTimeFormat
      },
      set(value) {
        this.setAction12HourTimeFormat(value)
      }
    },
    showTaskInOneList: {
      get() {
        return this.settingsGetter.showTaskInOneList
      },
      set(value) {
        this.setActionShowTaskInOneList(value)
      }
    }
  },
  methods: {
    ...mapActions('settingsModule', [
      'setAction12HourTimeFormat',
      'setActionShowTaskInOneList'
    ]),
    visitOurWebSite() {
      openURL('http://xherbek.com')
    },
    emailUs(){
      window.location.href="mailto:erbekhuseyin@gmail.com?subject=Awesome To Do FeedBack"
    }
  }
}
</script>