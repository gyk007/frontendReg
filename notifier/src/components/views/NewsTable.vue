<template>
	<div>

		 <q-data-table
			:data="table"
			:config="config"
			:columns="columns"
			@refresh="refresh"
			@selection="selection"
			@rowclick="rowClick"
		>
			<template slot="col-message" slot-scope="cell">
				<span class="light-paragraph">{{cell.data}}</span>
			</template>
			<template slot="col-source" slot-scope="cell">
				<div v-if="cell.data === 'Audit'" class="my-label text-white bg-primary">
					Audit
					<q-tooltip>Some data</q-tooltip>
				</div>
				<div v-else class="my-label text-white bg-negative">{{cell.data}}</div>
			</template>

			<template slot="selection" slot-scope="props">
				<q-btn flat color="primary" @click="changeMessage(props)">
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
	QCollapsible
} from 'quasar'

import table from '../../statics/table.json'

export default {
	name: 'newsTable',
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
			table,
			config: {
				title: 'Data Table',
				refresh: false,
				noHeader: false,
				columnPicker: true,
				leftStickyColumns: 0,
				rightStickyColumns: 2,
				bodyStyle: {
					maxHeight: '500px'
				},
				rowHeight: '50px',
				responsive: true,
				pagination: {
					rowsPerPage: 15,
					options: [5, 10, 15, 30, 50, 500]
				},
				selection: 'multiple'
			},
			columns: [
				{
					label: 'Date',
					field: 'isodate',
					width: '140px',
					classes: 'bg-orange-2',
					filter: true,
					sort (a, b) {
						return (new Date(a)) - (new Date(b))
					},
					format (value) {
						return new Date(value).toLocaleString()
					}
				},
				{
					label: 'Service',
					field: 'serviceable',
					format (value) {
						if (value === 'Informational') {
							return '<i class="material-icons text-positive" style="font-size: 22px">info</i>'
						}
						return value
					},
					width: '70px'
				},
				{
					label: 'Time Range',
					field: 'timerange',
					width: '80px',
					sort: true,
					type: 'number'
				},
				{
					label: 'Message',
					field: 'message',
					filter: true,
					sort: true,
					type: 'string',
					width: '500px'
				},
				{
					label: 'Source',
					field: 'source',
					filter: true,
					sort: true,
					type: 'string',
					width: '120px'
				},
				{
					label: 'Log Number',
					field: 'log_number',
					sort: true,
					type: 'string',
					width: '100px'
				}
			],
			pagination: true,
			rowHeight: 50,
			bodyHeightProp: 'maxHeight',
			bodyHeight: 500
		}
	},
	methods: {
		changeMessage (props) {
			props.rows.forEach(row => {
			row.data.message = 'Gogu'
			})
		},
		deleteRow (props) {
			props.rows.forEach(row => {
			this.table.splice(row.index, 1)
			})
		},
		refresh (done) {
			this.timeout = setTimeout(() => {
			done()
			}, 5000)
		},
		selection (number, rows) {
			console.log(`selected ${number}: ${rows}`)
		},
		rowClick (row) {
			console.log('clicked on a row', row)
		}
	}
}
</script>

<style lang="stylus">
.logo-container
	width 255px
	height 242px
	perspective 800px
	position absolute
	top 50%
	left 50%
	transform translateX(-50%) translateY(-50%)
.logo
	position absolute
	transform-style preserve-3d
</style>
