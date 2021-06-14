import store from "../store/index"
import * as utility from "./utility"
import { MIN_BENDING_ANGLE, MAX_BENDING_ANGLE, BOARD_WIDTH, BOARD_HEIGHT } from '../constants/index';
import * as status from "./status"

const shapeDropped = (id) => {
    let shape = store.state.fallingShapesObj[id];
    // change arrays will change ui -- remove falling one and add dropped
    changeArrays(shape);
    // find next shape
    let nextId = findNextShape(shape.side);
    // change fall speed
    store.commit("updateFallingInterval");
    // start fall
    startFall(nextId);
    if (store.state.fallingShapesObj[nextId].side == "left") store.commit("setSelectableShapeId", nextId);
    // create new shape and add
    store.commit("addToFallingShapes", utility.createShape(shape.side));
}

const changeArrays = (shape) => {
    //first add -- if you remove first cant add anymore
    if (shape.side == "left") {
        store.commit("addToDroppedShapesLeft", shape.id);
    } else {
        store.commit("addToDroppedShapesRight", shape.id);
    }
    //then remove 
    store.commit("removeFromFallingShapes", shape.id)
}


const findNextShape = (side) => {
    return store.state.fallingShapesArr.filter(x => x.side == side)[0].id
}

export const intervalFunc = (id) => {
    if (store.state.gameStatus !== "") {
        if (IsTouchingBoard(id)) {
            clearInterval(store.state.fallingShapesObj[id].interval);
            shapeDropped(id)
        } else {
            store.commit("oneStepFall", id)
        }
    }
}


export const startFall = (id) => {
    let interval = setInterval(function() { intervalFunc(id) }, store.state.fallingInterval);
    store.commit("setInterval", { interval, id });
};



const IsTouchingBoard = (id) => {

    if (store.state.gameStatus == "started") {
        if (checkTouch(id)) {
            startBoardMovement();
            return true;
        }
        return false;
    } else if (store.state.gameStatus == "initialized") {
        // game - board movement starts after 2 shapes dropped from left and right
        if (store.state.droppedShapesLeft.length + store.state.droppedShapesRight.length == 2) {
            store.commit("setGameStatus", "started");
            startBoardMovement();
        }

        // check first two shape touch initial board position
        const shapeBounds = document.getElementById(`shapes-${id}`).getBoundingClientRect();
        const tettotBounds = document.querySelector('.tettot').getBoundingClientRect();
        if (shapeBounds.bottom >= tettotBounds.top) {
            return true;
        }

        return false;

    }

};

const checkTouch = (id) => {

    const boardBounds = document.querySelector('.tettot__board').getBoundingClientRect();
    const panelBounds = document.querySelector('.status').getBoundingClientRect();
    const shape = store.state.fallingShapesObj[id];

    const totterCathet = boardBounds.bottom - boardBounds.top - BOARD_HEIGHT;
    const similarCathet = (shape.left * totterCathet) / BOARD_WIDTH;
    const shapeBounds = document.getElementById(`shapes-${id}`).getBoundingClientRect();

    let shapeBottomLimit = store.state.boardAngle >= 0 ?
        boardBounds.top + similarCathet - shapeBounds.height - panelBounds.height :
        boardBounds.bottom - similarCathet - shapeBounds.height - panelBounds.height;

    if (shape.top >= shapeBottomLimit) {
        return true
    }
    return false;
};


export const startBoardMovement = () => {
    const [angleAcc, angleRotation] = calculateBoardMovement();
    const angleInterval = setInterval(function() { startAngleMovement(angleAcc, angleRotation) }, 200);
    if (store.state.angleInterval !== null) {
        clearInterval(store.state.angleInterval)
    }
    store.commit("setAngleInterval", angleInterval);
}

const calculateBoardMovement = () => {
    let rightMomentum = calculateMomentum(store.state.droppedShapesRight, "right")
    let leftMomentum = calculateMomentum(store.state.droppedShapesLeft, "left")

    const difference = Math.abs(leftMomentum - rightMomentum);
    const angleRotation = leftMomentum > rightMomentum ? -1 : 1
    let angleAcc = 0

    if (difference > 20) {
        store.commit("setBoardAngle", 0)
        status.restartGame();
    } else {
        // change angle 10 momentum 1 deggre in 1 second 
        angleAcc = difference / 10
    }
    return [angleAcc, angleRotation];
}


const startAngleMovement = (angleAcc, angleRotation) => {
    const newAngle = store.state.boardAngle + (angleAcc * angleRotation)
    store.commit("setScore", (store.state.score + 1 * (angleAcc + 1)));

    if (newAngle < MIN_BENDING_ANGLE || newAngle > MAX_BENDING_ANGLE) {
        store.commit("setBoardAngle", 0)
        status.restartGame();
        return;
    }
    store.commit("setBoardAngle", newAngle)
}



export const calculateMomentum = (array, side) => {
    let totalMomentum = 0;
    array.map(shape => {
        const left = side == "left" ? (50 - shape.left) : (shape.left - 50);
        totalMomentum += shape.weight * (left / 10);
    });
    return totalMomentum;
}