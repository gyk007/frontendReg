<template>
	<q-layout
		ref="layout"
		view="lHh Lpr fff"
		:left-class="{'bg-grey-2': true}"
	>
	    <q-toolbar slot="header" class="glossy">
		<q-btn
				flat
				@click="$refs.layout.toggleLeft()"
			>
				<q-icon name="menu" />
			</q-btn>  

			<q-toolbar-title>
				Вымпел
				<div slot="subtitle"></div>
			</q-toolbar-title>
		</q-toolbar>

		<div slot="left">  
			<!--
				Use <q-side-link> component
				instead of <q-item> for
				internal vue-router navigation
			-->

			<q-list no-border link inset-delimiter>
				<q-list-header>Новости</q-list-header>
				<q-item @click="sortNews('week')">
					<q-item-side icon="sort" />
					<q-item-main label="За неделю" />
				</q-item>
				<q-item @click="sortNews('month')">
					<q-item-side icon="sort" />
					<q-item-main label="За месяц" />
				</q-item>
				<q-item @click="sortNews('year')">
					<q-item-side icon="sort" />
					<q-item-main label="За год" />
				</q-item>
				<q-item @click="sortNews('favorite')">
					<q-item-side icon="star" />
					<q-item-main label="Избранное"/>
				</q-item>				 
			</q-list>
		</div> 

		<div>  
			<router-view />  
		</div>
		 
	</q-layout>
</template>

<script>
import {
	dom,
	event,
	openURL,
	QLayout,
	QToolbar,
	QToolbarTitle,
	QBtn,
	QIcon, 
	QList,
	QListHeader,
	QItem,
	QItemSide,
	QItemMain
} from 'quasar'
import store from './store/store.js' 

export default {
	name: 'index',
	store: store,
	components: {
		QLayout,
		QToolbar,
		QToolbarTitle,
		QBtn,
		QIcon,
		QList,
		QListHeader,
		QItem,
		QItemSide,
		QItemMain
	},
	methods: {
		sortNews (sortType) {
			this.$store.dispatch('newsList', sortType)
			this.$refs.layout.hideLeft()
		},
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
