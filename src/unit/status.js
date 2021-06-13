import store from "../store/index"
import * as utility from "./utility"
import * as actions from "./actions"
import { START_SHAPE_LENGTH } from '../constants/index';


export const startGame = () => {
    // change game status
    store.commit("setGameStatus", "initialized");
    // create block object and array
    let fallingShapesObj = utility.createBatchBlocks(START_SHAPE_LENGTH);
    let fallingShapesArr = Object.values(fallingShapesObj)
    store.commit("setFallingShapes", { fallingShapesObj, fallingShapesArr });
    // start free fall first left side then right side
    actions.startFall(fallingShapesArr[0].id);
    actions.startFall(fallingShapesArr[1].id);
}

export const restartGame = () => {
    store.commit("setGameStatus", "")
    store.state.fallingShapesArr.map(x => clearInterval(store.state.fallingShapesObj[x.id].interval))
    clearInterval(store.state.angleInterval)
    store.commit("storeReset");
    store.commit("setBoardAngle", 0);
}


// const endGame = () => {

// }



// const pauseGame = () => {

// }


// const contineuGame = () => {

// }