<template>
  <section class="play-ground">
    <Shapes/>
    <TeetterTotter :boardAngle="boardAngle" />
  </section>
</template>

<script>
import TeetterTotter from '@/components/TeeterTotter/TeeterTotter.vue';
import { mapState} from 'vuex';
import Shapes from '@/components/Shapes.vue';
import * as status from '../unit/status'
import * as controls from '../unit/controls'


export default {
  components: {
    TeetterTotter,
    Shapes,
  },
  computed: {
    ...mapState(["boardAngle"]),
  },
  mounted(){
    window.addEventListener('keydown', controls.moveAction);
    window.onerror = function () {
        status.restartGame();
    }
  },
  destroyed(){
    window.removeEventListener('keydown', controls.moveAction);

  }

}
</script>

<style lang="scss" scoped>
  .play-ground {
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    width: 80%;
    margin: 0 auto;
    min-width: 600px;
    padding-bottom: 10rem;
  }
</style>
