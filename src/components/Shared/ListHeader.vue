<template>
  <q-banner
    dense
    inline-actions
    class="text-white text-center list-header"
    :class="bgColor"
  >
    <span class="text-bold text-subtitle1"><slot></slot></span>
  </q-banner>
</template>

<script>
export default {
  props: ['bgColor']
}
</script>

<style>
.list-header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>