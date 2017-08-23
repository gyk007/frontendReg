<template>
	<section class="popup popup__category" id="popup__contact">


	<div class="popup__hdr">Обратная связь</div>

	<div class="popup__category-form">
		<div class="popup__product-form--holder">
		<label>
			<span style="font-size: 15px">Заголовок</span>
			<input class="input"/>
		</label>
		</div>
		<div class="popup__product-form--holder">
		<label>
			<span style="font-size: 15px">Ваш вопрос</span>
			<textarea></textarea>
		</label>
		</div>

		<button class="btn" v-on:click="sent">Отправить</button>

	</div>
</section>
</template>


<script>
  import store from '../../store/catalog.js'
  import $      from 'jquery'

  export default {
	methods: {
		sent() {
			$.fancybox.close()
		},
	},
  }
</script>

