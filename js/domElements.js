// DOM Elements module
// This module exports references to all DOM elements used in the application

// Get references to DOM elements
const imageUploadInput = document.getElementById("imageUploadInput");
const foregroundFileInput = document.getElementById("foregroundFileInput");
const backgroundFileInput = document.getElementById("backgroundFileInput");
const imageDisplayCanvas = document.getElementById("imageDisplayCanvas");
const foregroundCanvasPreview = document.getElementById("foregroundCanvasPreview");
const backgroundCanvasPreview = document.getElementById("backgroundCanvasPreview");
const statusOutput = document.getElementById("statusOutput");
const turnImageRedButton = document.getElementById("turnChapelRedButton");
const removeRedButton = document.getElementById("removeRedButton");
const reduceRedButton = document.getElementById("reduceRedButton");
const addBlackBarButton = document.getElementById("addBlackBarButton");
const addGreenSquareButton = document.getElementById("addGreenSquare");
const topRightCornerButton = document.getElementById("topRightCornerButton");
const changeRedGradientButton = document.getElementById("changeRedGradientButton");
const threeStripesButton = document.getElementById("threeStripesButton");
const swapRedGreenButton = document.getElementById("swapRedGreenButton");
const devilToYellowButton = document.getElementById("devilToYellowButton");
const addBorderButton =  document.getElementById("addBorderButton");
const greenScreenButton = document.getElementById("greenScreenButton");

// Export DOM elements
export {
    imageUploadInput,
    foregroundFileInput,
    backgroundFileInput,
    imageDisplayCanvas,
    foregroundCanvasPreview,
    backgroundCanvasPreview,
    statusOutput,
    turnImageRedButton,
    removeRedButton,
    reduceRedButton,
    addBlackBarButton,
    addGreenSquareButton,
    topRightCornerButton,
    changeRedGradientButton,
    threeStripesButton,
    swapRedGreenButton,
    devilToYellowButton,
    addBorderButton,
    greenScreenButton
};
