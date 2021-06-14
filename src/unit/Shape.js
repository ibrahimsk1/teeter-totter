import store from "../store/index"
import * as utility from "./utility"
import { SCALE_STEP } from "../constants/index"


class Shape {
    constructor(options) {
        this.side = options.SIDE;
        this.interval = null;
        this.top = 0;
        this.weight = utility.generateRandomNumber(options.MIN_WEIGHT, options.MAX_WEIGHT - 1);
        this.type = utility.generateRandomNumber(1, 2);
        if (options.SIDE == "left") {
            this.left = utility.generateRandomNumber(0, 40);
        } else {
            this.left = utility.generateRandomNumber(50, 90);
        }
        this.color = utility.generateRandomRGBColor();
        this.scale = 1 + SCALE_STEP * (this.weight - 1);
        this.id = store.state.shapeId;
        store.commit("incrementShapeId");
    }

    left() {
        return this.left - 1
    }

    right() {
        return this.left + 1
    }

    bottom() {
        return this.top + 1
    }
}


export default Shape