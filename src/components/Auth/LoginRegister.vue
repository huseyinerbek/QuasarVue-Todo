<template>
  <q-form @submit="submitForm" class="q-gutter-md">
    <div>
      <q-banner class="bg-grey-3">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab | titleCase }} to Acces your To Do anywhere
      </q-banner>
    </div>
    <div>
      <q-input
        outlined
        v-model="formData.email"
        label="Email"
        lazy-rules
        :rules="[val => isValidEmailAddress(val) || 'Please enter a valid email adress.']"
      />
      <q-input
        outlined
        :type="isPwd ? 'password' : 'text'"
        v-model="formData.password"
        label="Password"
        hint="Min. 6 character"
        lazy-rules
        :rules="[val => val.length >= 6 || 'Please enter at least 6 characters.']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </div>
    <div>
      <q-toggle v-model="accept" label="I accept the license and terms" />
    </div>

    <div class="row">
      <q-space />
      <q-btn :label="tab" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: ['tab'],
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      isPwd: true,
      accept: true
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser']),
    submitForm() {
      if (this.tab == 'login') {
        this.loginUser(this.formData)
      } else {
        this.registerUser(this.formData)
      }
    },
    isValidEmailAddress(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style>
</style>