import Vue from 'vue';
import App from './app.vue';
import 'assets/styles/index.scss';
import {ReduxBoot} from 'next-vue-redux';

// new Vue({
//   el: '#app',
//   render: h => h(App)
// });

ReduxBoot.run(App, {
  el: '#app'
});