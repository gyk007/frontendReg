<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
			<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>
				<div class="modal-container">

					<div class="modal-header">
						<slot name="header">
							default header
						</slot>
					</div>

					<div class="modal-body">
						<slot name="body">
							default body
						</slot>
					</div>

					<div class="modal-footer">
						<slot name="footer">
							default footer
							<button class="modal-default-button" @click="close">
								OK
							</button>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>


<script>
	import store from '../../store/catalog.js'
	import $      from 'jquery'

	export default {	
	store: store, 
	methods: {
		close() {
			this.$store.commit('set', {type: 'showModal', items: false})
		},
	},
}
</script>