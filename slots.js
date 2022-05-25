const readline = require("readline");

var rl = readline.createInterface(process.stdin, process.stdout);

const Slots = 
{
    symbols: ["X", "O", "W", "^", "+", "H", "C", "?"],
    probablityOfSelecting: [0.15, 0.2, 0.1, 0.15, 0.15, 0.05, 0.1, 0.1],
    wild: 2,
    multipliers: [1, 3],

    numberOfSymbolsInReel: [2315, 500, 772, 1402, 946],
    minRoll: [943, 111, 230, 518, 394],
    maxRoll: [1964, 350, 625, 1149, 763],

    symbolPayoutValues: [[0, [3, 1], [4, 3], [5, 5]], [1, [2, 1], [3, 2], [4, 3], [5, 4]], [2, [3, 3], [4, 6], [5, 9]], [3, [3, 3], [4, 5], [5, 7]], [4, [3, 1], [4, 3], [5, 5]], [5, [3, 1], [4, 3], [5, 5]], [6, [3, 1], [4, 3], [5, 5]], [7, [3, 1], [4, 3], [5, 5]]],

    payoutLines: [[0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [2, 2, 2, 2, 2], [0, 1, 2, 1, 0], [2, 1, 0, 1, 2], [0, 0, 1, 0, 0], [2, 2, 1, 2, 2], [1, 2, 2, 2, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 2, 1, 2, 1], [0, 1, 0, 1, 0], [2, 1, 2, 1, 2], [1, 1, 0, 1, 1], [1, 1, 2, 1, 1], [0, 1, 1, 1, 0], [2, 1, 1, 1, 2], [0, 1, 2, 2, 2], [2, 1, 0, 0, 0], [0, 0, 1, 2, 2], [2, 2, 1, 0, 0], [1, 2, 1, 0, 1], [1, 0, 1, 2, 1]]
}

let chips = 50000;

function placeABet(chips)
{
    let bet = 0;
    rl.question("Postaw swój zakład ", (value) => {
        bet = value;
    });
    return chips - bet;
}

function setSymbolsOnSlots()
{
    let result = [[], [], [], [], []];
    let probablilties = [];

    for(let i = 0; i < Slots.probablityOfSelecting.length; i++)
    {  
        let value = probablilties[i - 1] + Slots.probablityOfSelecting[i];
        if(i == 0)
            value = Slots.probablityOfSelecting[i];
        probablilties.push(value);
    }

    for(let i = 0; i < Slots.numberOfSymbolsInReel.length; i++)
    {
        for(let j = 0; j < Slots.numberOfSymbolsInReel[i]; j++)
        {
            let random = Math.random();
            for(let k = 0; k < probablilties.length; k++)
            {
                if(k == 0)
                {
                    if(random <= probablilties[k])
                        result[i].push(Slots.symbols[k]);
                }
                else
                {
                    if(random <= probablilties[k] && random > probablilties[k - 1])
                        result[i].push(Slots.symbols[k]);
                }
            }
        }
    }
    return result;
}

function rollTheSlot()
{
    let symbolArray = setSymbolsOnSlots();
    let result = [[], [], []];
    for(let i = 0; i < 5; i++)
    {
        let random = Math.floor(Math.random() * (Slots.maxRoll[i] - Slots.minRoll[i] + 1)) + Slots.minRoll[i];
        result[0].push(symbolArray[i][(Slots.numberOfSymbolsInReel[i] % random)]);
        result[1].push(symbolArray[i][(Slots.numberOfSymbolsInReel[i] % random) + 1]);
        result[2].push(symbolArray[i][(Slots.numberOfSymbolsInReel[i] % random) + 2]);
    }
    console.log("+-------------------+");
    for(let i = 0; i < 3; i++)
    {
        console.log("| " + result[i][0] + " | " + result[i][1] + " | " + result[i][2] + " | " + result[i][3] + " | " + result[i][4] + " |");
    }
    console.log("+-------------------+");
    return result;
}

function checkForPayoutLines()
{
    let symbolArray = rollTheSlot();
    let result = [];
    for(let i = 0; i < Slots.payoutLines.length; i++)
    {
        let numberOfOccurences = 1;
        for(let j = 0; j < 4; j++)
        {
            if(symbolArray[Slots.payoutLines[i][j]][j] == symbolArray[Slots.payoutLines[i][j + 1]][j + 1] || symbolArray[Slots.payoutLines[i][j]][j] == Slots.symbols[Slots.wild] || symbolArray[Slots.payoutLines[i][j + 1]][j + 1] == Slots.symbols[Slots.wild])
            {
                numberOfOccurences++;
            }
            else
                break;
        }
        if(numberOfOccurences > 1)
            result.push([symbolArray[Slots.payoutLines[i][0]][0], numberOfOccurences])
    }
    return result;
}

function checkTheReward()
{
    let linesWhichWon = checkForPayoutLines();
    let value = 0;

    if(linesWhichWon.length == 0)
        return 0;

    for(let i = 0; i < linesWhichWon.length; i++)
    {
        let symbol = linesWhichWon[i][0];
        symbol = Slots.symbols.indexOf(symbol);
        for(let j = 1; j < Slots.symbolPayoutValues[symbol].length; j++)
        {
            if(Slots.symbolPayoutValues[symbol][j][0] == linesWhichWon[i][1])
            {
                value += Slots.symbolPayoutValues[symbol][j][1];
                for(let k = 0; k < Slots.multipliers.length; k++)
                {
                    if(linesWhichWon[i][0] == Slots.multipliers[k])
                        value += Slots.symbolPayoutValues[symbol][j][1];
                }
            }
        }
    }
    return value;
}

function giveTheReward()
{
    let _chips = placeABet(chips);
    let reward = checkTheReward();
    let result = _chips + reward;

    console.log("Wygrales: " + reward + " zetonow.\nTwoj aktualny stan konta to: " + result + ".");
    return result;
}

giveTheReward();
