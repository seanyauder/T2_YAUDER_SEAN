'use strict';

// Inputs and button DOM
const firstInput = document.querySelector("#first-input");
const secondInput = document.querySelector("#second-input");
const combineButton = document.querySelector("#combine-button");

// Display DOM
const stringResult = document.querySelector("#string-result");
const numberResult = document.querySelector("#number-result");

function combine() {

    const first = firstInput.value;
    const second = secondInput.value;

    const string = first + second;
    const number = Number(first) + Number(second);

    stringResult.textContent = string;
    numberResult.textContent = number;
}

combineButton.addEventListener("click", function() {
    combine();
});