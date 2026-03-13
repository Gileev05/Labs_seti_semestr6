const arr = [2, 2, 4, 1, 6, 12];
let x = arr.reduce((acc, cur) => {
    return acc < cur ? acc : cur;
}, arr[0])

console.log(x);