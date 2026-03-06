const add = (a, b) => a + b;
const mult  = (a, b) => a * b;

const groupArr = (operat, ...nums) => {
    return nums.reduce((acc, cur) => operat(acc, cur), nums[0]);
}