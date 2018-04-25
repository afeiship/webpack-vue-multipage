<template>
  <div id="home-view">
    <div class="dd">
      Home
    </div>
    <img v-bind:src="logoImg" class="wp-2 auto logo">
    <h1 class="blank-10"></h1>
    <button @click.native="startHacking">Let's do it</button>
  </div>
</template>

<script>
import logo from 'assets/images/logo.png'
export default {
  data () {
    return {
      msg: 'Use Vue 2.0 Today!',
      logoImg: logo
    }
  },

  methods: {
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    }
  }
}
</script>

<style lang="postcss">
  body {
    background-color: #f5f5f5;
  }
  :root h1 {
   --color: red;
   display: flex;
   color: var(--color);
  }
</style>
