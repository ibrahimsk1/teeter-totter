<template>
  <div class="shapes">
    <Shape v-for="shape in fallingShapesArr" :key="shape.id" :shape="shape" :ref="`shapes-${ shape.id }`" :id="`shapes-${ shape.id }`" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Shape from '@/components/Shape.vue';
export default {
  props: {
    boardBendingAngle: [String, Number],
  },
  components: {
    Shape,
  },
  data() {
    return {
      interValid: null,
      shapeBottomLimit: null,
    }
  },
  computed: {
    ...mapState([ 'fallingShapesArr']),
  },

}
</script>

<style lang="scss" scoped>
  .shapes {
    position: relative;
    flex: 1 1 50%;
  }
</style>
