<template>
	<div class="layout-padding card-examples row items-start">

		<div class='catd_block' v-for='(news, index) in newsList'>

		<q-card inline>
			<q-card-media @click="openNews(news)" v-if='news.img'>
				<img :src="conf.url.img + news.img">
			</q-card-media>
			<q-card-title>
				<span @click="openNews(news)">{{news.title}}</span>
				<span class='btn-favorite' @click="toFavorite(news, index)">
					<q-btn v-if ='news.in_favorite'  flat ref='BtnFavorite' color='red' round small><q-icon name="star"/></q-btn>
					<q-btn v-if ='!news.in_favorite' flat ref='BtnFavorite' round small><q-icon name="star"/></q-btn>
				</span>
				<span slot="subtitle" v-if='news.ctime'>
				 	{{ news.ctime.format('L') }}
				</span>
			</q-card-title>
			<div class='clear'></div>
			<q-card-main @click="openNews(news)">
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

import conf    from '../../config/url.js'
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
	data() {
		return {
			conf: conf,
		}
	},
	computed: {
		newsList() {
			console.log(this.$store.getters.newsList)
			return this.$store.getters.newsList
		}
	},
	methods: {
		openNews (news) {
			this.$store.commit('set', {type: 'news', items: news})
			document.location.hash = '/news/' + news.id
		},
		toFavorite(news, index) {
			if (this.$refs.BtnFavorite[index].color == 'red') {
				this.$refs.BtnFavorite[index].color = undefined
			} else {
				this.$refs.BtnFavorite[index].color = 'red'
			}

			this.$store.dispatch('addDeleteFavorte', news)
		}
	},
	mounted: function() {
		this.$store.dispatch('newsList')
		this.$store.commit('set', {type: 'news', items: undefined})
	}

}
</script>

<style lang="stylus">
@import '~variables'
.q-card
	width 300px !important
.btn-favorite
	float right
.catd_block
	margin 0 auto
	margin-bottom 15px
.card-examples
	.q-card
		width 300px
	.bigger
		width 450px
	@media (max-width $breakpoint-xs-max)
		.q-card
			width 100%
			margin 0px
</style>