const readline = require("readline");
const slots = require("./slots-machine.js");
const rl = readline.createInterface(process.stdin, process.stdout);

/**
 * Liczba żetonów.
 */
let chips = 50000;

/**
 * Inicjacja maszyny.
 */
slots.init();

<<<<<<< HEAD
slots.printPayoutLines();
slots.printPayoutValues();

=======
>>>>>>> e8d489c3f393a49795112901787afc9cc280c744
// todo: Wyświetlenie konfiguracji maszyny.
// todo: tablicę wypłat.
// todo: wizualizacja linii wypłat.

<<<<<<< HEAD
const askForBet = () => {   
=======
const askForBet = () => {
>>>>>>> e8d489c3f393a49795112901787afc9cc280c744
    rl.question("Wpisz liczbę żetonów, którą chcesz postawić w kolejnym zakładzie? > ", (betChips) => {
        console.log(`Aktualna liczba żetonów to ${chips}.`);
        chips -= betChips;
        const rollResult = slots.roll();
        slots.printRollResults(rollResult);
<<<<<<< HEAD
        const finalResult = slots.checkForPayoutLinesAndGiveTheReward(rollResult);
        slots.printFinalResult(finalResult);
=======
>>>>>>> e8d489c3f393a49795112901787afc9cc280c744
        // todo: znalezienie wygranych.
        // todo: wyświetlił linie, które wygrały, np. `- wygrywa linia #3 "X" x 3 -> 1`,
        askForBet();
    });
} 

<<<<<<< HEAD
askForBet();
=======
askForBet();
>>>>>>> e8d489c3f393a49795112901787afc9cc280c744
