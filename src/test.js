const subarraysDivByK = (A, K) => {
    let rsum = [...A]
    for(let i = 1; i<rsum.length; i++) {
        rsum[i] = rsum[i] + rsum[i-1]; 
    }
    let count = 0;
    for(let i = 1; i<rsum.length; i++) {
        for(let j = i; j<rsum.length; j++) {
            if ((rsum[j]-rsum[i])%K === 0) {
                count++;
            }
        }
    }
    return count;
};

//subarraysDivByK([1, 2, 3, 1], 5);

let l = [2, 11, 12, 22, 21]

console.log(l)
l.sort((a, b) => a-b)
console.log(l);

