import { Entity } from "./Entity.js";
import { Debug } from "./Debug.js";

export class Camera {
    xCenter;
    yCenter;
    xOffset;
    yOffset;
    #isActive;
    #pen;
    constructor(pen) {
        this.#pen = pen;
        this.#isActive = true;
        this.xCenter = pen.w / 2;
        this.yCenter = pen.h / 2;
        this.xOffset = 0;
        this.yOffset = 0;
    }
    /**
     * sets the camera internal center to a new position, called every cycle of draw to sync center as center of canvas
     * @param {number} x
     * @param {number} y
     */
    setCameraCenter(x, y) {
        if (x !== this.xCenter || y !== this.yCenter) {
            this.xCenter = x;
            this.yCenter = y;
        }
    }
    set isActive(value) {
        if (typeof value === "boolean") {
            ErrorMsgManager.booleanCheckFailed(
                value,
                "you can only set the camera to active with a boolean value"
            );
        }
        this.#isActive = value;
        return this.#isActive;
    }
    get isActive() {
        return this.#isActive;
    }
    moveTo(x,y) {
        //calculate where x is on the screen
        if (Number.isFinite(x) === false) {
            throw new Error(
                ErrorMsgManager.numberCheckFailed(
                    value,
                    "camera.moveTo(x,_) has to be a number!"
                )
            );
        }
        if (Number.isFinite(y) === false) {
            throw new Error(
                ErrorMsgManager.numberCheckFailed(
                    value,
                    "camera.moveTo(_,y) has to be a number!"
                )
            );
        };
        this.xOffset = (this.xCenter+this.xOffset)-x;
        this.yOffset = (this.yCenter+this.yOffset)-y;
        //work out the newX
        //work out where it is currently
        //work out where the user has set x on the actual canvas in relation to this
        //calculate what the new total offset would be
        //calculate what the offset needs to be 

    }
    /**
     * sets the cameras x offset
     * returns the cameras 'x' by adding its offset to its center
     * @param {number} value
     */
    set x(value) {
        if (Number.isFinite(value) === false) {
            throw new Error(
                ErrorMsgManager.numberCheckFailed(
                    value,
                    "cameras x has to be a number!"
                )
            );
        }

        //add a warning check for if you are adding 100+ or -100+ to it as that may be an indicator of a misunderstanding

        const totalDifference = value - this.x;
        this.xOffset -= totalDifference;
    }
    /**
     * returns the cameras 'x' by adding its offset to its center
     * @param {number} value
     */
    get x() {
        return this.xCenter + this.xOffset;
    }
    /**
     * sets the cameras y offset
     * returns the cameras 'y' by adding its offset to its center
     * @param {number} value
     */
    set y(value) {
        if (Number.isFinite(value) === false) {
            throw new Error(
                ErrorMsgManager.numberCheckFailed(
                    value,
                    "cameras y has to be a number"
                )
            );
        }

        //add a warning check for if you are adding 100+ or -100+ to it as that may be an indicator of a misunderstanding

        const totalDifference = value - this.y;
        this.yOffset -= totalDifference;
    }

    /**
     * returns the cameras 'x' by adding its offset to its center
     * @param {number} value
     */
    get y() {
        return this.yCenter + this.yOffset;
    }
    draw() {
        if (this.#pen.debug) {
            Debug.drawCamera(
                this.#pen,
                { x: this.xCenter, y: this.yCenter },
                { x: this.xOffset, y: this.yOffset }
            );
        }
    }
}
