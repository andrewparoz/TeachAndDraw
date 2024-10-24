//errors
import {ErrorMsgManager} from "./ErrorMessageManager.js"

export class Maffs {
    #pen
    constructor(pen) {
        this.#pen = pen;
    }
    
    /**
     * 
     * @param {number} value 
     * @returns {number}
     */
    adjustDegressSoTopIsZero(value){
        if (Number.isFinite(value)===false) {
            throw new Error(
                ErrorMsgManager.numberCheckFailed(value)
            );
        }
        let remapped = value - 90;

        // Ensure the degrees fit within the 0-360 range
        remapped = remapped % 360;

        if (remapped < 0) {
            remapped += 360;
        }

        return remapped;
    }
    
    /**
     * 
     * @param {number} value 
     * @returns 
     */
    degreeToRadian(value) {
        if (Number.isFinite(value)===false) {
            throw new Error(
                ErrorMsgManager.numberCheckFailed(value)
            );
        }
        return value * (Math.PI / 180);
    }
    /**
     * 
     * @param {number} value 
     * @returns 
     */
    radianToDegree(value) {
        if (Number.isFinite(value)===false) {
            throw new Error(
                ErrorMsgManager.numberCheckFailed(value)
            );
        }
        return value * (180 / Math.PI);
    }
    //set up of sin,cos, tan etc using degrees

    /**
     * Takes degree to do sin on
     * @param {number} value 
     * @returns 
     */
    sin(value) {
        if (Number.isFinite(value)===false) {
            throw new Error(ErrorMsgManager.numberCheckFailed(value));
        }
        const angle = this.degreeToRadian(value);
        return Math.sin(angle);
    }

    /**
     * 
     * @param {number} value 
     * @returns 
     */
    cos(value) {
        if (Number.isFinite(value)===false) {
            throw new Error(
                ErrorMsgManager.numberCheckFailed(value)
            );
        }
        const angle = this.degreeToRadian(value);
        return Math.cos(angle);
    }

    /**
     * 
     * @param {number} value 
     * @returns 
     */
    tan(value) {
        if (Number.isFinite(value)===false) {
            throw new Error(
                ErrorMsgManager.numberCheckFailed(value)
            );
        }
        let angle = this.degreeToRadian(value);
        return Math.tan(angle);
    }
    /**
     * 
     * @param {number} value 
     * @returns 
     */
    atan(value) {
        if (Number.isFinite(value)===false) {
            throw new Error(
                ErrorMsgManager.numberCheckFailed(value)
            );
        }
        let angleRadians = Math.atan(value);
        return this.radianToDegree(angleRadians);
    }
    /**
     * 
     * @param {number} y 
     * @param {number} x 
     * @returns 
     */
    atan2(y,x) {
        if(Number.isFinite(y)===false) {
            throw new Error(ErrorMsgManager.numberCheckFailed(y,"y has to be a number"));
        }
        if (Number.isFinite(x)===false) {
            throw new Error(ErrorMsgManager.numberCheckFailed(x,"x has to be a number!"));
        }
        let angleRadians = Math.atan2(y, x);
        return this.radianToDegree(angleRadians);
    }
    /**
     * 
     * @param {number} x1 
     * @param {number} y1 
     * @param {number} x2 
     * @param {number} y2 
     * @returns 
     */
    dist(xStart,yStart,xEnd,yEnd){
        if (Number.isFinite(xStart)===false) {
            throw new Error(ErrorMsgManager.numberCheckFailed(xStart,"xStart has to be a number!"));
        }
        if (Number.isFinite(xEnd)===false) {
            throw new Error(ErrorMsgManager.numberCheckFailed(xEnd,"xEnd has to be a number!"));
        }
        if (Number.isFinite(yStart)===false) {
            throw new Error(ErrorMsgManager.numberCheckFailed(yStart,"yStart has to be a number!"));
        }
        if (Number.isFinite(yEnd)===false) {
            throw new Error(ErrorMsgManager.numberCheckFailed(yEnd,"yEnd has to be a number!"));
        }
        let distX = xEnd - xStart;
        let distY = yEnd - yStart;
        return Math.sqrt(distX * distX + distY * distY);
    }
    random(minVal, maxVal) {
        
        if (Number.isFinite(minVal)===false) {
            throw new Error(ErrorMsgManager.numberCheckFailed(minVal,"the 1st value has to be a number!"));
        }
    
        if (maxVal === undefined) {
            // If secondVal is not provided, return a random number from 0 to firstVal
            return Math.random() * minVal;
        }
        
        if (Number.isFinite(maxVal)===false) {
            throw new Error(ErrorMsgManager.numberCheckFailed(maxVal,"the 2nd value has to be a number!"));
        }
    
        if (minVal > maxVal) {
            throw Error("firstVal must be less than or equal to secondVal");
        }
       return Math.random() * (maxVal - minVal) + minVal;
    }
    /**
    * Re-maps a number from one range to another.
    *
    * @param {number} num - The number to re-map.
    * @param {number} in_min - The lower bound of the number's current range.
    * @param {number} in_max - The upper bound of the number's current range.
    * @param {number} out_min - The lower bound of the number's target range.
    * @param {number} out_max - The upper bound of the number's target range.
    * @returns {number} The re-mapped number.
    */
    rescaleNumber(num, in_min, in_max, out_min, out_max) {
        if (Number.isFinite(num)===false) {
            throw new Error(ErrorMsgManager.numberCheckFailed(num,"the 1st value has to be a number!"));
        }
        if (Number.isFinite(in_min)===false) {
            throw new Error(ErrorMsgManager.numberCheckFailed(in_min,"the 2nd value has to be a number!"));
        }
        if (Number.isFinite(in_max)===false) {
            throw new Error(ErrorMsgManager.numberCheckFailed(in_max,"the 3rd value has to be a number!"));
        }
        if (Number.isFinite(out_min)===false) {
            throw new Error(ErrorMsgManager.numberCheckFailed(out_min,"the 4th value has to be a number!"));
        }
        if (Number.isFinite(out_max)===false) {
            throw new Error(ErrorMsgManager.numberCheckFailed(out_max,"the 5th value has to be a number!"));
        }

        if (in_max - in_min === 0) {
            throw new Error("Input range cannot be zero.");
        }

        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
}

//locks to make the methods read only
Object.defineProperty(Maffs.prototype, 'adjustDegressSoTopIsZero', {
    value: Maffs.prototype.adjustDegressSoTopIsZero,
    writable: false,
    configurable: false
});

Object.defineProperty(Maffs.prototype, 'degreeToRadian', {
    value: Maffs.prototype.degreeToRadian,
    writable: false,
    configurable: false
});

Object.defineProperty(Maffs.prototype, 'radianToDegree', {
    value: Maffs.prototype.radianToDegree,
    writable: false,
    configurable: false
});

Object.defineProperty(Maffs.prototype, 'sin', {
    value: Maffs.prototype.sin,
    writable: false,
    configurable: false
});

Object.defineProperty(Maffs.prototype, 'cos', {
    value: Maffs.prototype.cos,
    writable: false,
    configurable: false
});

Object.defineProperty(Maffs.prototype, 'tan', {
    value: Maffs.prototype.tan,
    writable: false,
    configurable: false
});

Object.defineProperty(Maffs.prototype, 'atan', {
    value: Maffs.prototype.atan,
    writable: false,
    configurable: false
});

Object.defineProperty(Maffs.prototype, 'atan2', {
    value: Maffs.prototype.atan2,
    writable: false,
    configurable: false
});

Object.defineProperty(Maffs.prototype, 'random', {
    value: Maffs.prototype.random,
    writable: false,
    configurable: false
});

Object.defineProperty(Maffs.prototype, 'rescaleNumber', {
    value: Maffs.prototype.rescaleNumber,
    writable: false,
    configurable: false
});