<template>
    <Main/>
</template>

<script>
  import Main from './main';

  export default {
    initialState(inStore) {
      console.log('init state');
      return {
        memory: {
          test: 123
        },
        session: {
          login: 'token-1234'
        }
      }
    },
    components: {
      Main
    }
  }
</script>
