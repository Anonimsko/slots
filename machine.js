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

// todo: Wyświetlenie konfiguracji maszyny.
// todo: tablicę wypłat.
// todo: wizualizacja linii wypłat.

const askForBet = () => {
    rl.question("Wpisz liczbę żetonów, którą chcesz postawić w kolejnym zakładzie? > ", (betChips) => {
        console.log(`Aktualna liczba żetonów to ${chips}.`);
        chips -= betChips;
        const rollResult = slots.roll();
        slots.printRollResults(rollResult);
        // todo: znalezienie wygranych.
        // todo: wyświetlił linie, które wygrały, np. `- wygrywa linia #3 "X" x 3 -> 1`,
        askForBet();
    });
} 

askForBet();
