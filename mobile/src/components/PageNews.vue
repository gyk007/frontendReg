<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
   	<h2>{{news.title}}</h2>
   	<div>{{news.text}}</div>
  </div>
</template>

<script>
import store from '../store/store.js'

export default {
	store: store,
	computed: {
		news() {
			return this.$store.getters.news
		}		 
	},
}
</script>

<style>
</style>
