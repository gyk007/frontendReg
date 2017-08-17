import Vue       from 'vue'
import $         from 'jquery'
import Layout    from './views/Layout.vue'
import 'malihu-custom-scrollbar-plugin'
import 'jquery-mousewheel'

let application = Layout
application.el = '#app'

new Vue(application)




