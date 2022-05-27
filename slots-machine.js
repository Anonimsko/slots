const Slots =
{
    numberOfSymbols: 8,
    symbols: ["X", "O", "W", "^", "+", "H", "C", "?"],
    probabilityOfSelecting: [0.15, 0.2, 0.1, 0.15, 0.15, 0.05, 0.1, 0.1],
    wild: 2,
    multipliers: [
<<<<<<< HEAD
        /*[3, 2],
        [4, 3]*/
=======
        [3, 2],
        [4, 3]
>>>>>>> e8d489c3f393a49795112901787afc9cc280c744
    ],
    reels: [],
    reelPositions: [],
    numberOfReels: 5,
    numberOfSymbolsOnReel: [2315, 500, 772, 1402, 946],
    minRoll: [943, 111, 230, 518, 394],
    maxRoll: [1964, 350, 625, 1149, 763],
    numberOfRows: 3,
<<<<<<< HEAD
    payoutLines: [
    [0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [2, 2, 2, 2, 2], [0, 1, 2, 1, 0],
    [2, 1, 0, 1, 2], [0, 0, 1, 0, 0], [2, 2, 1, 2, 2], [1, 2, 2, 2, 1],
    [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 2, 1, 2, 1], [0, 1, 0, 1, 0],
    [2, 1, 2, 1, 2], [1, 1, 0, 1, 1], [1, 1, 2, 1, 1], [0, 1, 1, 1, 0],
    [2, 1, 1, 1, 2], [0, 1, 2, 2, 2], [2, 1, 0, 0, 0], [0, 0, 1, 2, 2],
    [2, 2, 1, 0, 0], [1, 2, 1, 0, 1], [1, 0, 1, 2, 1]],
    symbolPayoutValues: [
    [0, [3, 1], [4, 3], [5, 5]], [1, [2, 1], [3, 2], [4, 3], [5, 4]],
    [2, [3, 3], [4, 6], [5, 9]], [3, [3, 3], [4, 5], [5, 7]],
    [4, [3, 1], [4, 3], [5, 5]], [5, [3, 1], [4, 3], [5, 5]],
    [6, [3, 1], [4, 3], [5, 5]], [7, [3, 1], [4, 3], [5, 5]]],
=======
>>>>>>> e8d489c3f393a49795112901787afc9cc280c744

    /* #region Init */
    init()
    {
        for (let i = 0; i < this.numberOfReels; ++i) {
            this.reels[i] = [];
            this.reelPositions[i] = 0;
            for (let j = 0; j < this.numberOfSymbolsOnReel[i]; ++j) {
                const randVal = Math.random(); // [0,1)
                let sumOfProbabilities = 0;
                for (let k = 0; k < this.numberOfSymbols; ++k) {
                    sumOfProbabilities += this.probabilityOfSelecting[k];
                    if (sumOfProbabilities > randVal) {
                        this.reels[i][j] = k;
                        break;
                    }
                }
            }
        }
    },
    /* #endregion */

    /* #region Roll */
    /**
     * @returns array The results of the spin/roll.
     */
    roll()
    {
        for (let i = 0; i < this.numberOfReels; ++i) {
            const rollOffset = Math.floor(Math.random() * (this.maxRoll[i] - this.minRoll[i] + 1)) + this.minRoll[i];
            this.reelPositions[i] = (this.reelPositions[i] + rollOffset) % this.numberOfSymbolsOnReel[i];
        }
        let rollResults = [];
        for (let i = 0; i < this.numberOfRows; ++i) {
            rollResults[i] = [];
            for (let j = 0; j < this.numberOfReels; ++j) {
                rollResults[i][j] = this.reels[j][(this.reelPositions[j] + i) % this.numberOfSymbolsOnReel[i]];
            }
        }
        return rollResults;
    },
    /* #endregion */

    /* #region Print the roll results */
    printRollResults(rollResults)
    {
        console.log('+' + ('-'.repeat(this.numberOfReels * 4 - 1)) + '+');
        for (let i = 0; i < this.numberOfRows; ++i) {
            let row = '';
            for (let j = 0; j < this.numberOfReels; ++j) {
                row += '| ' + this.symbols[rollResults[i][j]] + ' ';
            }
            row += '|';
            console.log(row);
        }
        console.log('+' + ('-'.repeat(this.numberOfReels * 4 - 1)) + '+');
    },
    /* #endregion */

<<<<<<< HEAD
    checkForPayoutLinesAndGiveTheReward(rollResults)
    {
        let linesWhichWon = [];
        for(let i = 0; i < this.payoutLines.length; i++)
        {
            let numberOfOccurences = 1;
            let symbol = 0;
            for(let j = 0; j < this.numberOfReels - 1; j++)
            {
                if(rollResults[this.payoutLines[i][j]][j] == rollResults[this.payoutLines[i][j + 1]][j + 1] || rollResults[this.payoutLines[i][j]][j] == this.wild || rollResults[this.payoutLines[i][j + 1]][j + 1] == this.wild)
                {
                    if(rollResults[this.payoutLines[i][j]][j] != this.wild)
                    {
                        symbol = rollResults[this.payoutLines[i][j]][j];
                        numberOfOccurences++;
                    }
                }
                else
                    break;
            }
            if(numberOfOccurences > 1)
                linesWhichWon.push([symbol, numberOfOccurences, i])
        }

        if(linesWhichWon.length == 0)
            return 0;

        let valuesOfWinningLines = [];
        for(let i = 0; i < linesWhichWon.length; i++)
        {
            for(let j = 1; j < this.symbolPayoutValues[linesWhichWon[i][0]].length; j++)
            {
                if(this.symbolPayoutValues[linesWhichWon[i][0]][j][0] == linesWhichWon[i][1])
                {
                    let value = this.symbolPayoutValues[linesWhichWon[i][0]][j][1];
                    for(let k = 0; k < this.multipliers.length; k++)
                    {
                        if(linesWhichWon[i][0] == this.multipliers[k][0])
                            value *= this.multipliers[k][1];
                    }
                    valuesOfWinningLines.push([linesWhichWon[i][2], value, linesWhichWon[i][1], linesWhichWon[i][0]]);
                }
            }
        }

        let result = [];
        for(let i = 0; i < valuesOfWinningLines.length; i++)
        {
            for(let j = 0; j < valuesOfWinningLines.length; j++)
            {
                if(i != j)
                {
                    if(valuesOfWinningLines[i][0] == valuesOfWinningLines[j][0])
                    {
                        if(valuesOfWinningLines[i][1] >= valuesOfWinningLines[j][1])
                        {
                            result.push([valuesOfWinningLines[i][0], valuesOfWinningLines[i][1], valuesOfWinningLines[i][2], valuesOfWinningLines[i][3]]);
                            result.splice(i, 1);
                        }
                        else if(valuesOfWinningLines[i][1] < valuesOfWinningLines[j][1])
                        {
                            result.push([valuesOfWinningLines[j][0], valuesOfWinningLines[j][1], valuesOfWinningLines[j][2], valuesOfWinningLines[j][3]]);
                            result.splice(j, 1);
                        } 
                    }
                    else
                    {
                        result.push([valuesOfWinningLines[i][0], valuesOfWinningLines[i][1], valuesOfWinningLines[i][2], valuesOfWinningLines[i][3]]);
                        result.splice(i, 1);
                    }
                }
            }
            
        }
        return result;
    },

    printFinalResult(finalResult)
    {
        let chips = 0;
        for(let i = 0; i < finalResult.length; i++)
        {
            chips += finalResult[i][1];
        }
        if(chips > 0)
            console.log(`Wygrales ${chips} zetonow.`);
        else
            console.log('Nic nie wygrales.');

        for(let i = 0; i < finalResult.length; i++)
        {
            let temp = 0;
            for(let j = 1; j < this.symbolPayoutValues[finalResult[i][3]].length; j++)
            {
                if(this.symbolPayoutValues[finalResult[i][3]][j][0] == finalResult[i][2])
                    temp = this.symbolPayoutValues[finalResult[i][3]][j][1]
            }
                
            console.log(`- wygrywa linia #${finalResult[i][0]} "${this.symbols[finalResult[i][3]]}" x ${finalResult[i][2]} -> ${temp}`);
        }
    },

    printPayoutLines()
    {
        console.log('Linie wygranych.');
        for (let i = 0; i < this.payoutLines.length; i++) 
        {
            let result = [];
            console.log('+' + ('-'.repeat(this.numberOfReels * 4 - 1)) + '+');
            for(let j = 0; j < this.numberOfReels; j++)
            {
                result[j] = [];
                for(let k = 0; k < this.numberOfRows; k++)
                {
                    result[j][k] = ' ';
                    result[j][this.payoutLines[i][j]] = 'X';
                }
            }
            let row = '';
            for(let j = 0; j < this.numberOfRows; j++)
            {
                for(let k = 0; k < this.numberOfReels; k++)
                {
                    row += '| ' + result[k][j] + ' ';
                }
                if(j != this.numberOfRows - 1)
                    row += '|\n';
                else
                    row += '|';
            }
            console.log(row);
            console.log('+' + ('-'.repeat(this.numberOfReels * 4 - 1)) + '+');
        }
    },

    printPayoutValues()
    {
        console.log('Tablica wyplat.');
        for(let i = 0; i < this.symbolPayoutValues.length; i++)
        { 
            console.log('+--------------------------------+');
            console.log(`| Symbol: ${this.symbols[this.symbolPayoutValues[i][0]]}                      |`);
            for(let j = 1; j < this.symbolPayoutValues[i].length; j++)
            {
                console.log(`| Trafione znaki: ${this.symbolPayoutValues[i][j][0]}. Zetony: ${this.symbolPayoutValues[i][j][1]}   |`)
            }
            console.log('+--------------------------------+');
        }
    },
=======

>>>>>>> e8d489c3f393a49795112901787afc9cc280c744

};

module.exports = Slots;