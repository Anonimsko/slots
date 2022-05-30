const slots = require("../slots-machine");
slots.init();
test("checkInit", () =>
{
    const symbolArray = slots.roll();
    expect(symbolArray.length).toEqual(3);
    for(let i = 0; i < symbolArray.length; i++)
    {
        expect(symbolArray[i].length).toEqual(5);
        for(let j = 0; j < symbolArray[i].length; j++)
        {
            expect(symbolArray[i][j]).toBeLessThanOrEqual(7);
        }
    }
})

test.each([
    [0, 5], [1, 4], [3, 7], [4, 5], [6, 5], [7, 5]
])("Check if all paylines are valid for symbol %i and value %i", (i, val) =>
{
    const expected = [
        [ 1, val, 5, i ],  [ 2, val, 5, i ], [ 3, val, 5, i ], [ 4, val, 5, i ], [ 5, val, 5, i ],
        [ 6, val, 5, i ], [ 7, val, 5, i ], [ 8, val, 5, i ], [ 9, val, 5, i ],  [ 10, val, 5, i ],
        [ 11, val, 5, i ], [ 12, val, 5, i ], [ 13, val, 5, i ], [ 14, val, 5, i ], [ 15, val, 5, i ],
        [ 16, val, 5, i ], [ 17, val, 5, i ], [ 18, val, 5, i ], [ 19, val, 5, i ], [ 20, val, 5, i ],
        [ 21, val, 5, i ], [ 22, val, 5, i ]
    ];
    const rollResult = [[], [], []].map(() => [...Array(5)].fill(i));
    const results = slots.checkForPayoutLinesAndGiveTheReward(rollResult);
    expect(results).toEqual(expected);
})
