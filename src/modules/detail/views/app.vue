<template lang="html">
  <section class="detail-view">
    Detail views abcby fei!!!

    <span class="big-icon">
      <i class="ion ion-ios-alarm"></i>
      <i icon="ion-ionic" style="font-size:40px;"></i>
    </span>
  </section>
</template>

<script>
// import Icon from 'vue-ionicons';
export default {
  data() {
    return {
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {},
  components: {
    // Icon
  }
};
</script>

<style lang="scss">

$detail-color:'#00f';
.detail-view{
  color:$detail-color;
  font-size:30px;
  font-weight: bold;
}
.big-icon{
  font-size:100px;
}
</style>
