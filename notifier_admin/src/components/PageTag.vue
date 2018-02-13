<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
  	<q-btn icon="add box" color="primary" small class='btn_add_edit' @click="$refs.addTag.open()">
		Добавить
	</q-btn>

  	<ManagerTable></ManagerTable>

	<q-modal ref="addTag">
		<div class='modal_body'>
			<h5>Тег</h5>

			<q-input stack-label="Название" v-model="tag.name"        class='modal_input' />
			<q-input stack-label="Описание" v-model="tag.description"  color="purple" :min-rows="3"   type="textarea" class='modal_input' />

			<div class="btn_block">
				<q-btn color="secondary"   icon="add box" @click="add()">Сохранить</q-btn>
				<q-btn color="deep-orange" icon="clear"   @click="$refs.addTag.close()">Закрыть</q-btn>
			</div>
			<div class="clear"></div>
		</div>
	</q-modal>

  </div>
</template>

<script>
import ManagerTable from './views/TagTable.vue'
import store        from '../store/store.js'

import {QModal, QBtn, QIcon, QInput, QField} from 'quasar'

export default {
  name: 'tag',
  store: store,
  components: {ManagerTable, QModal, QBtn, QIcon, QInput, QField},
  data() {
		return {
			tag: {
				name        : undefined,
				description : undefined,
			}
		}
	},
	methods: {
		add() {
			this.$refs.addTag.close()
			this.$store.commit('set', {type: 'tag', items: this.tag})
			this.$store.dispatch('addTag')
			this.tag = {
				name        : undefined,
				description : undefined,
			}
		}
	}
}
</script>

<style>

.btn_add_edit {
	margin:  15px;
	margin-left: 0px;
}
.modal_body {
	padding: 15px;
	min-width: 400px;
}
.modal_input {
	margin-bottom: 15px;
}

.btn_block {
	margin: 15px;
	margin-right: 0px;
	float: right;
}
.clear {
	clear: both;
}

</style>
