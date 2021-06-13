<template>
  <section class="modal">
    <div class="modal__wrapper">
      <div class="modal__header">
        <h1 class="modal__title">Finish Game!</h1>
      </div>
      <div class="modal__body">
        Your point : {{ totalDroppedShapesWeight }}
      </div>
      <div class="modal__footer">
        <button class="modal__button" @click="initGame">Start Again</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState([ 'isModalShown', 'droppedShapes' ]),
  },
  methods: {
    ...mapActions([ 'initGame' ]),
  }
};
</script>

<style lang="scss" scoped>
  .modal {
      position: fixed;
      background-color: rgba(0, 0, 0 , .8);
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      &__wrapper {
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        max-width: 500px;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
      }
      &__header {
        border-bottom: 1px solid #ccc;
      }
      &__title {
        font-size: 24px;
      }
      &__body {
        padding: 10px 0;
      }
      &__footer {
        align-items: flex-end;
        margin-top: auto;
        height: 50px;
        border-top: 1px solid #ccc;
        display: flex;
        width: 100%;
        justify-content: flex-end;
      }
      &__button {
        background-color: #009688;
        border: none;
        color: #fff;
        padding: 10px;
        border-radius: 3px;
        font-weight: bold;
        outline: none;
        cursor: pointer;
      }
  }
</style>
