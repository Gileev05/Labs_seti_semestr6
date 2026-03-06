const arr = [1, 2, 3, 4, 5];

let arr1 = [...arr];

arr1[3] = 100;
arr1.splice(2,1);
arr1.splice(arr1.length - 1, 0,200);

console.log(arr1);
