<template>
  <div id="home-view" style="auto wp-7">
    <div class="dd">
      Home
    </div>
    <img v-bind:src="logoImg" class="wp-2 auto logo">
    <header>
      <p style="color:#000; padding: 20px; border:1px dashed #ccc;">Import by views/*.scss</p>
      <h1>H1 title (I am styled by views/test1.scss)</h1>
      <h2>H2 title (I am styled by views/test2.scss)</h2>
    </header>
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
   display: flex;
   color: var(--color);
  }
</style>
