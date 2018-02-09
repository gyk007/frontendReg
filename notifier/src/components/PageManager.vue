<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
  	<NewsTable></NewsTable>
  </div>
</template>

<script>
import NewsTable from './views/NewsTable.vue'

export default {
  name: 'manager',
  components: {NewsTable}
}
</script>

<style>
</style>
