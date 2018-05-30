<template>
    <div id="home-view" class="auto tc wp-7">
        <div class="dd" style="color:#333;">
            Home - show
        </div>
        <img v-bind:src="logoImg" class="wp-2 auto logo">
        <header>
            <p style=" background: #fff; color:#333; padding: 20px; border:1px dashed #ccc;">Import by views/*.scss</p>
            <h1>H1 title (I am styled by views/test1.scss)</h1>
            <h2>H2 title (I am styled by views/test2.scss)</h2>
        </header>
        <button @click="click1">Test Click</button>
        <button @click.native="startHacking">Let's do it</button>
    </div>
</template>

<script>
  import logo from 'assets/images/logo.png';
  import {$api} from 'components';
  import AppBase from './app.vue';

  export default {
    data() {
      return {
        msg: 'Use Vue 2.0 Today!',
        logoImg: logo
      }
    },

    methods: {
      startHacking() {
        this.$notify({
          title: 'It Works',
          message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
          duration: 6000
        })
      },
      click1() {
        // $api.login({
        //   username: 'admin',
        //   password: '123123'
        // }).then(resp => {
        //   console.log(AppBase.$.memory);
        //   AppBase.$.session ={
        //     test:123
        //   };
        //   console.log('resp');
        // });

        AppBase.$.session ={
          test:123
        };
      }
    }
  }
</script>

<style lang="postcss">
    body {
        background-color: #f4f4f4;
        padding: 20px;
    }

    :root h1 {
        display: flex;
        color: var(--color);
    }

    button {
        border: none;
        outline: none;
        display: block;
        width: 100%;
        padding: 10px;
        color: #fff;
        margin-bottom: 10px;
        background: #4cd964;
    }
</style>
