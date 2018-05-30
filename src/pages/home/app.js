import Vue from 'vue';
import App from './app.vue';
import 'assets/styles/index.scss';
import vuex from 'vuex';

Vue.use(vuex);

const store = new vuex.Store({//store对象
  state: {
    show: false
  }
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
