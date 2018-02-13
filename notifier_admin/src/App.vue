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
		<div slot="subtitle">Административная панель</div>
		</q-toolbar-title>
	</q-toolbar>

	<div slot="left">
		<q-list no-border link inset-delimiter>
		<q-list-header>Меню</q-list-header>

		<!-- <router-link to="/" active-class='active'>
		<q-item>
			<q-item-side icon="home" />
			<q-item-main label="Гланая"/>
		</q-item>
		</router-link> -->

		<span @click="openPage('/news')" style="cursor: pointer">
		<q-item>
			<q-item-side icon="library books" />
			<q-item-main label="Новости"/>
		</q-item>
		</span>

		<span @click="openPage('/managers')" style="cursor: pointer">	 
		<q-item>
			<q-item-side icon="account circle" />
			<q-item-main label="Торговые представители"/>
		</q-item>
		</span>

		 

		<!-- <router-link to="/feedback" active-class='active'>
		<q-item>
			<q-item-side icon="feedback" />
			<q-item-main label="Оповещения"/>
		</q-item>
		</router-link> -->

		</q-list>
	</div>

	<router-view></router-view>

	</q-layout>
</template>

<script>
import {
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
 
export default { 
	name: 'index',
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
		openPage(url) {			 
			this.$refs.layout.hideLeft()
			document.location.hash = url
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
