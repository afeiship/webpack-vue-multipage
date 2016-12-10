<template>
  <button class="mint-button" :type="type" name="button">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'mt-button',
    props:{
      type:{
        type:String,
        default:'button'
      }
    }
  };
</script>

<style lang="css">
  .mint-button{
    border:none;
    background: #f00;
    color:#FFF;
  }
</style>
