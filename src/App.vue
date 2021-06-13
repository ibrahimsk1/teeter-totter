<template>
  <div id="app">
    <Status />
    <PlayGround />
    <Modal v-if="isModalShown" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Status: () => import('@/components/Status.vue'),
    PlayGround: () => import('@/components/PlayGround.vue'),
    Modal: () => import('@/components/Modal.vue'),
  },
  computed: {
    ...mapState(['isModalShown']),
  },
}
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}

html {
  overflow-y: auto !important;
}

#app {
  display: flex;
  flex-direction: column;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 10px;
  box-sizing: border-box;
}
</style>
