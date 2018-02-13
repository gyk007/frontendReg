<template>
	<!-- if you want automatic padding use "layout-padding" class -->
	<div class="layout-padding">
			<q-btn icon="add box" color="primary" small class='btn_add_edit' @click="$refs.addEditNews.open()">
				Добавить
			</q-btn>

			<NewsTable></NewsTable>

			<q-modal ref="addEditNews">
				<div class='modal_body'>
					<h5>Новость</h5>

					<q-input stack-label="Заголовок"        v-model="news.title"        class='modal_input' />
					<q-input stack-label="Краткое описание" v-model="news.description"  color="purple" :min-rows="3"   type="textarea" class='modal_input' />
					<q-input stack-label="Текст"            v-model="news.text"         color="purple" :min-rows="5"   type="textarea" class='modal_input'/>

					<label class="file-select">
							<div class="select-button">
								<span v-if="file">Selected Image: {{file.name}}</span>
								<span v-else><q-icon name="insert photo" style='font-size: 40px; padding-rght: 20px'/>Select Image</span>
							</div>
							<input type="file" @change="handleFileChange"  accept="image/x-png,image/gif,image/jpeg"/>
					</label>

					<div class="btn_block">
						<q-btn color="secondary"   icon="add box" @click="add()">Сохранить</q-btn>
						<q-btn color="deep-orange" icon="clear"   @click="$refs.addEditNews.close()">Закрыть</q-btn>
					</div>
					<div class="clear"></div>
				</div>
			</q-modal>
	</div>
</template>

<script>
import NewsTable   from './views/NewsTable.vue'
import store       from '../store/store.js'

import {QModal, QBtn, QIcon, QInput, QField} from 'quasar'

export default {
	name: 'news',
	store: store,
	components: {NewsTable, QModal, QBtn, QIcon, QInput, QField},
	data() {
		return {
			news: {
				title      : undefined,
				text       : undefined,
				description: undefined,
			},
			file : undefined
		}
	},
	methods: {
		add() {
			console.log(this.news)
			this.$refs.addEditNews.close()
			this.$store.commit('set', {type: 'news', items: this.news})
			console.log(this.file)

			this.$store.dispatch('addNews', this.file)
			this.file = undefined
			this.news = {
				title      : undefined,
				text       : undefined,
				description: undefined,
				file       : undefined
			}
		},
		handleFileChange(e) {
			this.$data.file = e.target.files[0]
		}
	},
	mounted: function() {
		console.log(this.news)
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

.file-select > .select-button {
	padding: 1rem;

	color: white;
	background-color: #2EA169;

	border-radius: .3rem;

	text-align: center;
	font-weight: bold;
}
.file-select {
	cursor: pointer;
}
.file-select > input[type="file"] {
	display: none;
}


</style>
