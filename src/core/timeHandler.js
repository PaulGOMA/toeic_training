/**
 * Timing class to handle countdown timer functionality.    
 * @module core/timeHandler
 * @author Paul G.
 *  @version 1.0.0
 *  @license MIT
 *  @description This module provides a Timing class to manage countdown timers with tick and finish callbacks.
 * @example
 * import Timing from './core/timeHandler';
 *  const timer = new Timing(60,
 *      (formattedTime) => { console.log(`Time left: ${formattedTime}`); }, 
 *     () => { console.log('Time is up!'); });
 *  timer.start();  
 *  // Starts a 60-second countdown timer   
 *  timer.stop();
 *  // Stops the timer
 */


class Timing {
    constructor(seconds, onTick = () => {}, onFinish = () => {}) {
        this.seconds = seconds;
        this.intervalId = null;
        this.onTick = onTick;
        this.onFinish = onFinish;
    }

    /**
     *  Formats the remaining time as MM : SS       
     * @returns {string} Formatted time string
     * @example
     * const timer = new Timing(90);
     * console.log(timer.formatTime()); // "01 : 30"
     */
    formatTime() {
        const mins = Math.floor(this.seconds / 60);
        const secs = this.seconds % 60;
        return `${String(mins).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
    }

    /**
     * Starts the countdown timer
     * @example
     * const timer = new Timing(10,
     *     (formattedTime) => { console.log(`Time left: ${formattedTime}`); },
     *     () => { console.log('Time is up!'); });
     * timer.start();
     * // Starts a 10-second countdown timer
     * timer.stop();
     * // Stops the timer
     */
    start() {
        this.onTick(this.formatTime()); // tick initial
        this.intervalId = setInterval(() => {
            if (this.seconds > 0) {
                this.seconds--;
                this.onTick(this.formatTime());
            } else {
                clearInterval(this.intervalId);
                this.onFinish(); // temps écoulé
            }
        }, 1000);
    }

    /**
     * Stops the countdown timer
     * @example
     * const timer = new Timing(30);
     *  
     * timer.start();
     * // Starts a 30-second countdown timer
     * timer.stop();
     *  // Stops the timer
     */
    stop() {
        clearInterval(this.intervalId);
    }
}

export default Timing;