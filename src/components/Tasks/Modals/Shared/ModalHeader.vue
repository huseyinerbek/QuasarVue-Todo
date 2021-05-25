<template>
  <q-card-section class="row">
    <div class="text-h6" color="primary"><slot></slot></div>
    <q-space/>
    <q-btn flat round color="primary" v-close-popup dense icon="close"/>
  </q-card-section>
</template>
<script>
export default {}
</script>
