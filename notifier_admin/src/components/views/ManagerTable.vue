<template>
	<div>

		 <q-data-table
			ref="dtNews"
			:data="managerList"
			:config="config"
			:columns="columns"		 
			@selection="selection"			 
		>
			 
			<template slot="col-source" slot-scope="cell">
				<div v-if="cell.data === 'Audit'" class="my-label text-white bg-primary">
					Audit
					<q-tooltip>Some data</q-tooltip>
				</div>
				<div v-else class="my-label text-white bg-negative">{{cell.data}}</div>
			</template>

			<template slot="selection" slot-scope="props">			 
				<q-btn flat color="primary" @click="showEditWnd">
					<q-icon name="edit" />
				</q-btn>
				<q-btn flat color="primary" @click="deleteRow(props)">
					<q-icon name="delete" />
				</q-btn>
			</template>
		</q-data-table>

	</div>
</template>

<script>
import {
	QDataTable,
	QField,
	QInput,
	QCheckbox,
	QSelect,
	QSlider,
	QBtn,
	QIcon,
	QTooltip,
	QCollapsible,
	Dialog
} from 'quasar'
 
import store from '../../store/store.js'
import $     from 'jquery'

export default {
	name: 'managerTable',
	store: store,
	components: {
		QDataTable,
		QField,
		QInput,
		QCheckbox,
		QSelect,
		QSlider,
		QBtn,
		QIcon,
		QTooltip,
		QCollapsible,		 
	},
	data () {
		return {			 
			config: {
				title: 'Таблица торговых представителей',
				refresh: false,
				noHeader: false,
				columnPicker: true,
				leftStickyColumns: 2,
				rightStickyColumns: 0,
				search: 'Поиск',
				all: 'Все',
				bodyStyle: {
					maxHeight: '500px'
				},
				rowHeight: '50px',
				responsive: true,
				pagination: {
					rowsPerPage: 15,
					options: [5, 10, 15, 30, 50, 500]
				},
				selection: 'single',
				labels: {
					columns: 'Колонки',
					allCols: 'Все',
					rows: 'Коичесвто строк',
					selected: {
						singular: 'Выбран представитель',
						plural: 'Выбран представитель'
					},
					clear: 'Отмена',
					search: 'Поиск',
					all: 'Все'
				}			 
			},
			columns: [
				{
					label: 'Email',
					field: 'email',
					filter: true,
					sort: true,
					type: 'string',
					width: '150px'
				},				 			
				{
					label: 'Имя', 
					field: 'name',
					filter: true,
					sort: true,
					type: 'string',
					width: '150px'
				},
				{
					label: 'Пароль', 
					field: 'password',
					filter: true,
					sort: true,
					type: 'string',
					width: '150px'
				},
				{
					label: 'Телефон',
					field: 'phone',
					filter: true,
					sort: true,
					type: 'string',
					width: '150px'
				},
				{
					label: 'Мобильное приложение',
					field: 'firebase',
					filter: true,
					sort: true,
					type: 'string',
					width: '150px',
					format (value) {
						if (value) {
							return 'Установлено'
						} else {
							return 'Не установлено'
						}
					}
				},

			],
			pagination: true,
			rowHeight: 50,
			bodyHeightProp: 'maxHeight',
			bodyHeight: 500
		}
	},
	computed: {
		managerList() {
			return this.$store.getters.managerList
		},
		manager() {
			return this.$store.getters.manager
		},		 
	},
	methods: {
		showEditWnd () {
			if (this.manager) {
				this.$parent.$data.manager = Object.assign({}, this.manager)				  
				this.$parent.$refs.addManager.open()
			}			 
		},
		deleteRow (props) {
			let $this = this;
			Dialog.create({
				title: 'Удалить пользователя ?',				 
				buttons: [
					'Отмена',
					{
						label: 'Удалить',
						handler () {
							$this.$store.dispatch('deleteManager')
						}
					}
				]
			})			 
		},		 
		selection (number, rows) {
			if (rows.length) {
				this.$store.commit('set', {type: 'manager', items: rows[0].data})
			}			 
		},		 
	},
	mounted: function() {
		this.$store.dispatch('managerList')
	}
}
</script>

<style> 
.selectedRow {
	background-color: #000 !important;
}
</style>
