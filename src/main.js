var Vue = require('vue')

import VueRouter from 'vue-router'

var Main     = require('./views/Main.vue')
var Catalog  = require('./views/Catalog.vue')
var Orders   = require('./views/Orders.vue')
var Stock    = require('./views/Stock.vue')
var Contacts = require('./views/Contacts.vue')


Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    { path: '/main',     component: Main },
    { path: '/catalog',  component: Catalog },
    { path: '/orders',   component: Orders },
    { path: '/stock',    component: Stock },
    { path: '/contacts', component: Contacts }
  ]
})

new Vue({
  el: '#app',
  router: router
})
