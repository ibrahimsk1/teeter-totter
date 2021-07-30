<template>
    <div class="tettot">
        <div class="tettot__board" :style="boardStyles">
          <Shape v-for="shape in droppedShapesLeft" :key="shape.id" :shape="shape" on-board />
          <Shape v-for="shape in droppedShapesRight" :key="shape.id" :shape="shape" on-board />
        </div>
        <div class="tettot__base" :style="baseStyles"></div>
    </div>
</template>

<script>
import {  mapState, mapMutations } from 'vuex';
import { BOARD_HEIGHT , BASE_HEIGHT} from '@/constants';

import Shape from '@/components/Shape.vue';

export default {
  props: {
    boardAngle: [String, Number],
  },
  components: { 
    Shape,
  },
  computed: {
    ...mapState([ 'droppedShapesRight', 'droppedShapesLeft' ]),
    boardStyles() {
      return { 
        transform: `rotate(${ this.boardAngle }deg)`, 
        height: `${ BOARD_HEIGHT }px`
      };
    },
    baseStyles() {
      return { 
        height: `${ BASE_HEIGHT }rem`,
        width: `${ BASE_HEIGHT }rem`
      };
    },

  },

  methods: {
      ...mapMutations([ 'generateShape' ])
  }
};
</script>

<style lang="scss" scoped>
@import './index.less';
</style>
