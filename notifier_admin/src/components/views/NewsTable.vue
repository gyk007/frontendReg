<template>
	<div>

		 <q-data-table
			ref="dtNews"
			:data="newsList"
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
				<q-btn flat color="primary" @click="sendNotification()">
					<q-icon name="textsms" />
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
	QCollapsible
} from 'quasar'
 
import store from '../../store/store.js'
import $     from 'jquery'

export default {
	name: 'newsTable',
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
		QCollapsible
	},
	data () {
		return {			 
			config: {
				title: 'Таблица новостей',
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
						singular: 'Выбрана новость',
						plural: 'Выбрана новость'
					},
					clear: 'Отмена',
					search: 'Поиск',
					all: 'Все'
				}			 
			},
			columns: [
				{
					label: 'Дата создания',
					field: 'ctime',
					width: '100px',					
					filter: true,
					sort (a, b) {
						return (new Date(a)) - (new Date(b))
					},
					format (value) {
						return new Date(value).toLocaleString()
					}
				},				 
				{
					label: 'Заголовок',
					field: 'title',
					filter: true,
					sort: true,
					type: 'string',
					width: '500px'
				}				 
			],
			pagination: true,
			rowHeight: 50,
			bodyHeightProp: 'maxHeight',
			bodyHeight: 500
		}
	},
	computed: {
		newsList() {
			return this.$store.getters.newsList
		}		 
	},
	methods: {
		sendNotification () {			 	
			this.$store.dispatch('sendNotification')
		},
		deleteRow (props) {
			this.$store.dispatch('deleteNews')
		},		 
		selection (number, rows) {
			if (rows.length) {
				this.$store.commit('set', {type: 'news', items: rows[0].data})
			}
			// console.log(`selected ${number}: ${rows}`)
		},		 
	},
	mounted: function() {
		this.$store.dispatch('newsList')
	}
}
</script>

<style> 
.selectedRow {
	background-color: #000 !important;
}
</style>
