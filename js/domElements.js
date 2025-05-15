// DOM Elements module
// This module exports references to all DOM elements used in the application

// Get references to DOM elements
const imageUploadInput = document.getElementById("imageUploadInput");
const imageDisplayCanvas = document.getElementById("imageDisplayCanvas");
const statusOutput = document.getElementById("statusOutput");
const turnImageRedButton = document.getElementById("turnChapelRedButton");
const removeRedButton = document.getElementById("removeRedButton");
const reduceRedButton = document.getElementById("reduceRedButton");
const addBlackBarButton = document.getElementById("addBlackBarButton");
const addGreenSquareButton = document.getElementById("addGreenSquare");
const topRightCornerButton = document.getElementById("topRightCornerButton");
const changeRedGradientButton = document.getElementById("changeRedGradientButton");

// Export DOM elements
export {
    imageUploadInput,
    imageDisplayCanvas,
    statusOutput,
    turnImageRedButton,
    removeRedButton,
    reduceRedButton,
    addBlackBarButton,
    addGreenSquareButton,
    topRightCornerButton,
    changeRedGradientButton
};
