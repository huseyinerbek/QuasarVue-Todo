<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center"> Awesome Todo </q-toolbar-title>
      </q-toolbar>
      <q-btn
        v-if="!loggedIn"
        flat
        icon-right="account_circle"
        label="Login"
        class="absolute-right"
        to="/auth"
      />
      <q-btn
        v-else
        @click="logoutUser"
        flat
        icon-right="account_circle"
        label="Logout"
        class="absolute-right"
      />
    </q-header>
    <q-footer elevated>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :icon="nav.icon"
          :to="nav.to"
          exact
        />
      </q-tabs>
    </q-footer>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary"
      :width="200"
    >
      <q-list dark>
        <q-item-label header class="text-grey-4"> Navigation </q-item-label>
        <q-item
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :active="active"
          class="text-grey-1"
          active-class="bg-teal-1 text-grey-10"
          clickable
          exact
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'MainLayout',
  data() {
    return {
      active: true,
      leftDrawerOpen: false,
      navs: [
        {label: 'Todo', icon: 'list', to: '/'},
        {label: 'Settings', icon: 'settings', to: '/settings'}
      ]
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser'])
  }
}
</script>

<style lang="scss">
@media screen and (min-width: 1007px) {
  .q-footer {
    display: none;
  }
}
</style>
