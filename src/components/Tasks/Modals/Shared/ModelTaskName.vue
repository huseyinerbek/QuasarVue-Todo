<template>
  <div class="row q-mb-sm">
    <q-input
      autofocus
      outlined
      :value="name"
      @input="$emit('update:name', $event)""
      label="Task Name"
      class="col"
      v-select-all
      :rules="[val => !!val || 'Field is required']"
      clearable
    ></q-input>
  </div>
</template>
<script>
import { selectAll } from 'src/directives/directive-select-all'
export default {
  props: ['name'],
  directives: {
    selectAll
  }
}
</script>