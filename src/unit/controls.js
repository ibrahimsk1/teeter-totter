import { LEFT_ARROW_KEY, RIGHT_ARROW_KEY } from '../constants/index';
import store from "../store/index";


export const moveAction = ({ keyCode }) => {
    const isArrowKeyPressed = [LEFT_ARROW_KEY, RIGHT_ARROW_KEY].includes(keyCode);
    if (store.state.isGamePaused || !isArrowKeyPressed) return;
    const shapeWidth = document.getElementById(`shapes-${store.state.selectableShapeId}`).getBoundingClientRect().width
    const areaWidth = document.querySelector('.shapes').getBoundingClientRect().width;
    move(keyCode, shapeWidth, areaWidth);

}



const move = (keyCode, shapeWidth, areaWidth) => {
    const shape = store.state.fallingShapesObj[store.state.selectableShapeId]
    const width = (shapeWidth / areaWidth) * 100;
    const canMoveLeft = shape.left - 1 >= 0;
    const canMoveRight = shape.left + width + 1 <= 45;

    if ((keyCode === LEFT_ARROW_KEY) && canMoveLeft) {
        store.commit("oneStepLeft", store.state.selectableShapeId);
    } else if ((keyCode === RIGHT_ARROW_KEY) && canMoveRight) {
        store.commit("oneStepRight", store.state.selectableShapeId);
    }
}