'use strict';
import 'bootstrap/dist/css/bootstrap.css';
import 'ionicons/dist/css/ionicons.css';


import Vue from 'vue';
import VueResource from 'vue-resource';
import app from './views/app.vue';

Vue.use(VueResource);
Vue.config.debug = true;

console.log(app);

new Vue({
  el:'#detail-app',
  components: { app }
});


console.log('detail -> index.js');
