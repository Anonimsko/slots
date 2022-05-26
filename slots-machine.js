const Slots =
{
    numberOfSymbols: 8,
    symbols: ["X", "O", "W", "^", "+", "H", "C", "?"],
    probabilityOfSelecting: [0.15, 0.2, 0.1, 0.15, 0.15, 0.05, 0.1, 0.1],
    wild: 2,
    multipliers: [
        [3, 2],
        [4, 3]
    ],
    reels: [],
    reelPositions: [],
    numberOfReels: 5,
    numberOfSymbolsOnReel: [2315, 500, 772, 1402, 946],
    minRoll: [943, 111, 230, 518, 394],
    maxRoll: [1964, 350, 625, 1149, 763],
    numberOfRows: 3,

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



};

module.exports = Slots;