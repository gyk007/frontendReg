var Vue = require('vue')

import VueRouter from 'vue-router'

var Main      = require('./views/Main.vue')
var Catalog   = require('./views/Catalog.vue')
var Orders    = require('./views/Orders.vue')
var Promotion = require('./views/Promotion.vue')
var Contacts  = require('./views/Contacts.vue')
var Card      = require('./views/Card.vue')
var $         = require('jquery')
require('malihu-custom-scrollbar-plugin')
require("jquery-mousewheel")

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    { path: '/main',      component: Main },
    { path: '/catalog',   component: Catalog },
    { path: '/orders',    component: Orders },
    { path: '/promotion', component: Promotion },
    { path: '/contacts',  component: Contacts },
    { path: '/card',      component: Card }
  ]
})

new Vue({
  	el: '#app',
 	router: router,
 	created: function() {
 		let minHeight = $(window).outerHeight() - $('.js-footer').outerHeight()
		$('.wrapper').css('min-height', minHeight + 'px')
	}
})