import Vue from 'vue'
import Vuex from 'vuex'
import {
    MAX_FALLING_INTERVAL_GAP,
    MIN_FALLING_INTERVAL_GAP
} from '@/constants';

Vue.use(Vuex)


function initialState() {
    return {
        droppedShapesLeft: [],
        droppedShapesRight: [],
        fallingShapesArr: [],
        fallingShapesObj: {},
        selectableShapeId: 0,

        isGamePaused: false,
        isModalShown: false,
        fallingInterval: MAX_FALLING_INTERVAL_GAP,

        refs: null,
        shapeId: 0,
        gameStatus: "",
        boardAngle: 0,
        angleInterval: null,
        score: 0,
    }
}

export default new Vuex.Store({

    state: initialState(),
    mutations: {

        storeReset(state) {
            // acquire initial state
            const tettotState = initialState()
            Object.keys(tettotState).forEach(key => {
                state[key] = tettotState[key]
            })
        },

        setScore(state, score) {
            state.score = score;
        },

        setBoardAngle(state, angle) {
            state.boardAngle = angle;
        },

        setAngleInterval(state, interval) {
            state.angleInterval = interval;
        },

        setRefs(state, refs) {
            state.refs = refs
        },

        setInterval(state, { interval, id }) {
            state.fallingShapesObj[id].interval = interval;
        },

        setGameStatus(state, status) {
            state.gameStatus = status
        },

        removeFromFallingShapes(state, id) {
            state.fallingShapesArr = state.fallingShapesArr.filter(x => x.id !== id)
            delete state.fallingShapesObj[id];
        },

        addToFallingShapes(state, shape) {
            state.fallingShapesArr.push(shape);
            state.fallingShapesObj[shape.id] = shape;
        },

        setSelectableShapeId(state, id) {
            state.selectableShapeId = id;
        },


        setFallingShapes(state, { fallingShapesObj, fallingShapesArr }) {
            state.fallingShapesArr = fallingShapesArr;
            state.fallingShapesObj = fallingShapesObj;
        },

        incrementShapeId(state) {
            state.shapeId += 1;
        },

        updateFallingInterval(state) {
            if (state.fallingInterval > MIN_FALLING_INTERVAL_GAP) {
                state.fallingInterval--;
            }
        },

        addToDroppedShapesLeft(state, id) {
            state.droppedShapesLeft.push(state.fallingShapesObj[id]);
        },

        addToDroppedShapesRight(state, id) {
            state.droppedShapesRight.push(state.fallingShapesObj[id]);
        },


        oneStepFall(state, id) {
            state.fallingShapesObj[id].top = state.fallingShapesObj[id].bottom()
            let shapeDomElement = document.getElementById(`shapes-${id}`);
            shapeDomElement.style.top = `${state.fallingShapesObj[id].top}px`;
        },

        oneStepLeft(state, id) {
            state.fallingShapesObj[id].left = state.fallingShapesObj[id].left - 1
            let shapeDomElement = document.getElementById(`shapes-${id}`);
            shapeDomElement.style.left = `${state.fallingShapesObj[id].left}px`;
        },

        oneStepRight(state, id) {
            state.fallingShapesObj[id].left = state.fallingShapesObj[id].left + 1
            let shapeDomElement = document.getElementById(`shapes-${id}`);
            shapeDomElement.style.left = `${state.fallingShapesObj[id].left}px`;
        },


        toggleModal(state, isShown = false) {
            state.isModalShown = isShown;
        },


    },
    actions: {

    },
})