const arr = [2, 2, 4, 1, 6, 12];
let arr2 = arr.map((item, index) => {
    const prev = arr[index - 1];
    const next = arr[index + 1];
    return ((prev || !isNaN(prev)) + item + (next || !isNaN(next))) /
        (!isNaN(prev) + 1 + !isNaN(next));
})
console.log(arr2);
