'use strict';
import 'ionicons/css/ionicons.css';


import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './views/app.vue';

Vue.use(VueResource);
Vue.config.debug = true;

console.log(App);

new Vue({
  el:'#detail-app',
  template: '<App/>',
  components: { App }
});


console.log('detail -> index.js');
