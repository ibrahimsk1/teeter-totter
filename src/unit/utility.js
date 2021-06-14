import { MIN_WEIGHT, MAX_WEIGHT, SCALE_STEP } from '../constants/index';
import Shape from "./shape"

export const createBatchBlocks = (shapeNum) => {
    let fallingShapes = {}
    let shape;
    for (let index = 0; index < shapeNum; index++) {
        // create one left one right shape
        if (index % 2 == 0) {
            shape = createShape("left");
            fallingShapes[shape.id] = shape;
        } else {
            shape = createShape("right");
            fallingShapes[shape.id] = shape;
        }
    }
    return fallingShapes;
}


export const createShape = (side) => {
    return new Shape({ MIN_WEIGHT, MAX_WEIGHT, SCALE_STEP, SIDE: side });
};


export function generateRandomRGBColor() {
    const maxValue = 200;
    const r = generateRandomNumber(0, maxValue);
    const g = generateRandomNumber(0, maxValue);
    const b = generateRandomNumber(0, maxValue);
    return `rgb(${ r }, ${ g }, ${ b })`;
}

export function generateRandomNumber(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}