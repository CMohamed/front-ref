const sum = (arr:number[]) => arr.reduce((sum, curr)=> sum+curr)

test('should sum arrays values', ()=>{
    const s = sum([1, 2, 3]);
    expect(s).toBe(6);
})