<template>
	<div class='Search'>
		<input type="text" name="search" class='Search_input' v-model='query'>
		<button class='Search_button'>Найти</button>
	</div>
</template>

<script>

export default {
	data() {
		return {
			query: ''
		}
	}
}

</script>