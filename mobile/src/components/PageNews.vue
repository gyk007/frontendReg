<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
	  <div class='news_content'>
		<div class='img_block' v-if='news.img'>
			<img :src="conf.url.img + news.img">
		</div>
		<div class="tags_block">
			<span class='news_tag' v-for='(tag, index) in news.tags'> #{{tag.name}} </span> 
		</div>
		<h2>{{news.title}}</h2>
		<div class='newsDate'>{{news.ctime.format('L')}}</div>
		<div class='text'>{{news.text}}</div>
	  </div>
  </div>
</template>

<script>
import store from '../store/store.js'
import conf  from '../../config/url.js'

export default {
	store: store,
	data() {
		return {
			conf: conf,
		}
	},
	computed: {
		news() {
			console.log(this.$store.getters.news)
			return this.$store.getters.news
		}
	},
}
</script>

<style>
	h2 {
		font-size: 250%;
		text-align: center;
	}
	.text {
		font-size: 100%;
		text-align: justify;
	}
	.news_content {
		padding: 10px;
	}
	.tags_block {
		margin-top: 15px;
		margin-bottom: 15px; 
	}
	.news_tag {
		font-size: 100%;
		background: #027be3;
		color: #FFF;
		padding: 5px;
		margin: 10px;
	}
	img {
		display: block;
		width: 320px;
		margin: 0 auto;
		border: solid 1px #009688;
	}
	.newsDate {
		text-align: right;
		margin-bottom: 10px;
		font-size: 120%;
	}
</style>
