<template lang="html">
  <section class="auth">
    Auth views app start!
    <br>
    Test by fei auto load!!!
    <br>
    Test again!!!--afei!!!xxx
    <br>
    Very cool ==fei!
    <list></list>
    <!-- <spinner size="20px" width="2px" /> -->

    <button type="button" name="button" v-on:click="_click()">Click ME Indicator</button>
  </section>
</template>

<script>
import List from 'components/list.vue';
// import Spinner from 'vue-spinner';
// import Indicator from 'vue-indicator';
// Vue.use(Indicator);


export default {
  data() {
    return {
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {
    _click(){
      // Indicator.open({
      //   text:"加载中...",
      //   spinOptions:{
      //     size:'40px',
      //     width:'2px'
      //   }
      // });
      // setTimeout(function() {
      //   Indicator.close();
      // },1000)
    }
  },
  components: {
    List
  }
};
</script>

<style lang="less">
@import "app.less";
</style>
