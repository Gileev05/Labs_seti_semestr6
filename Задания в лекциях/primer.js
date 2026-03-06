const proizv = (...args) => {
    let res = args.join(' ').split(' ').filter(x => x.length == 1 && Number(x)).map(x => Number(x));
    let nums_set = [...(new Set(res))].reduce((a, b) => a * b);
    return nums_set;
};

let st = ['asd 1 d', 'erer 23 5', 'ee 3 4 2 2 12'];
let res = proizv(...st);
console.log(res);