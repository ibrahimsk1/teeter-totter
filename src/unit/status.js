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
    store.state.fallingShapesArr.map(x => {
        let interval = store.state.fallingShapesObj[x.id].interval
        if (interval) clearInterval(interval)
    });
    clearInterval(store.state.angleInterval)
    store.commit("storeReset");
}


export const pauseGame = () => {
    store.state.fallingShapesArr.map(x => {
        let interval = store.state.fallingShapesObj[x.id].interval
        if (interval) clearInterval(interval)
    });
    if (store.state.angleInterval) clearInterval(store.state.angleInterval)
    store.commit("setGamePause", true);
}


export const contineuGame = () => {
    store.state.fallingShapesArr.map(x => {
        let interval = store.state.fallingShapesObj[x.id].interval
        if (interval) actions.startFall(x.id)
    });
    if (store.state.angleInterval) actions.startBoardMovement();
    store.commit("setGamePause", false);

}



// const endGame = () => {

// }