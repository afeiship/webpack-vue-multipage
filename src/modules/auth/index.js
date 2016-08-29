'use strict';
import Vue from 'vue';
import VueResource from 'vue-resource';
import app from './views/app.vue';
Vue.use(VueResource);
Vue.config.debug = true;

console.log(app);
console.log('Auth page vue app initial!');

new Vue({
  el:'#auth-app',
  components: { app }
});
