<template>
  <section class="status">
 <div class="status__score">
      <p><strong> Score : </strong>{{ scoreFloor }}</p>
    </div>
    <div class="status__buttons">
      <button class="btn btn--play" @click="start">{{ gameStatus ?  'restart' : 'play'  }}</button>
    </div>
    <div class="status__score">
      <p><strong> Score : </strong>{{ scoreFloor }}</p>
    </div>
  </section>
</template>

<script>
import * as status from "../unit/status"
import { mapActions, mapMutations, mapState } from 'vuex';
import { SPACE_KEY } from '@/constants';
export default {
  computed: {
    ...mapState([ 
        "score",
        "gameStatus",
    ]),
    scoreFloor(){
      return Math.floor(this.score);
    }
    
  },
  created() {
    window.addEventListener('keydown', this.handleSpaceClick);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleSpaceClick);
  },
  methods: {
    ...mapActions([ 'initGame' ]),
    ...mapMutations([ 'toggleSimulation' ]),

    start(){
      if(this.gameStatus == ""){
        status.startGame()
      }else{
        status.restartGame();
      }
    },

    handleSpaceClick(event) {
        event.preventDefault();
        if (event.keyCode === SPACE_KEY && !this.isModalShown) {
            this.toggleSimulation();
        }
    }
  }
}
</script>

<style lang="scss" scoped>
  .status {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btn {
    padding: 15px 10px;
    font-size: 16px;
    background-color: transparent;
    color: #000;
    border: none;
    cursor: pointer;
    & + & {
      margin-left: 10px;
    }
    &--play {
      background-color: #00BCD4;
      &:hover {
        background-color: darken(#00BCD4, 10%);
      }
    }
  }
</style>
