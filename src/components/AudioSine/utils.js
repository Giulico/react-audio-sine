/**
 * Take a value and return it if it's between a min and a max value, else, return the limit value
 */
export const range = (value: number, min: number, max: number): number => {
    // console.log(value, min, max);
    return Math.min(Math.max(value, min), max);
};