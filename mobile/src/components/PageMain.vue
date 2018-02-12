<template>
	<div class="layout-padding card-examples row items-start">
		<!-- <q-card inline @click="openNews(1)">
			<q-card-media>
				<q-video src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"/>
			</q-card-media>
			<q-card-title>
				Title
				<span slot="subtitle">Subtitle</span>
			</q-card-title>
			<q-card-main>
				{{lorem}}
			</q-card-main>
		</q-card> -->
		<div v-for='news in newsList'>
		<q-card inline @click="openNews(news)">
			<q-card-media>
				<img src="~assets/mountains.jpg">
			</q-card-media>
			<q-card-title>
				{{news.title}}
				 <span slot="subtitle" v-if='news.ctime'>{{ news.ctime.format('L') }}</span>				 
			</q-card-title>
			<q-card-main>
				{{news.description}}
			</q-card-main>
		</q-card>
		</div>
	</div>
</template>

<script>
import {
	QCard,
	QCardTitle,
	QCardMedia,
	QCardActions,
	QCardSeparator,
	QCardMain,
	QList,
	QItem,
	QItemMain,
	QItemSide,
	QItemTile,
	QCollapsible,
	QRating,
	QBtn,
	QParallax,
	QIcon,
	QPopover,
	QVideo 
} from 'quasar'
 
import store   from '../store/store.js'

export default {
	store: store,
	components: {
		QCard,
		QCardTitle,
		QCardMedia,
		QCardActions,
		QCardSeparator,
		QCardMain,
		QList,
		QItem,
		QItemMain,
		QItemSide,
		QItemTile,
		QCollapsible,
		QRating,
		QBtn,
		QParallax,
		QIcon, 
		QPopover,
		QVideo
	},
	computed: {
		newsList() {
			return this.$store.getters.newsList
		}		 
	},
	methods: {
		openNews (news) {
			this.$store.commit('set', {type: 'news', items: news})
			document.location.hash = '/news/' + news.id
		},
	},
	mounted: function() {
		this.$store.dispatch('newsList')
	}

}
</script>

<style lang="stylus">
@import '~variables'
.card-examples
	.q-card
		width 300px
	.bigger
		width 450px
	@media (max-width $breakpoint-xs-max)
		.q-card
			width 100%
</style>