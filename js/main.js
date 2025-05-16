// Main module
// This is the entry point for the application

import {
    imageUploadInput,
    foregroundFileInput,
    backgroundFileInput,
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
    greenScreenButton,
    imageDisplayCanvas,
    foregroundCanvasPreview,
    backgroundCanvasPreview,
    statusOutput
} from './domElements.js';

import { loadImage, loadForegroundImage, loadBackgroundImage } from './imageLoader.js';
import {
    turnImageRed,
    removeRedChannel,
    reduceRedIntensity,
    addBlackBar,
    addGreenSquare,
    getTopRightCorner,
    changeRedGradient, applyThreeStripes, processImageWithSwapRedGreen, devilToYellow, addBlackBorder, greenScreenEffect
} from './imageProcessors.js';
import {isImageReadyForProcessing} from "./utils.js";
import {getCurrentImage, getBackgroundImage, setForegroundImage} from "./state.js";

// Set up event listeners
if (imageUploadInput) {
    imageUploadInput.addEventListener('change', loadImage);
}

// Set up event listeners for foreground and background images
if (foregroundFileInput) {
    foregroundFileInput.addEventListener('change', loadForegroundImage);
}

if (backgroundFileInput) {
    backgroundFileInput.addEventListener('change', loadBackgroundImage);
}

if (turnImageRedButton) {
    turnImageRedButton.addEventListener('click', turnImageRed);
}

if (removeRedButton) {
    removeRedButton.addEventListener('click', removeRedChannel);
}

if (reduceRedButton) {
    reduceRedButton.addEventListener('click', reduceRedIntensity);
}

if (addBlackBarButton) {
    addBlackBarButton.addEventListener('click', addBlackBar);
}

if (addGreenSquareButton) {
    addGreenSquareButton.addEventListener('click', addGreenSquare);
}
if (topRightCornerButton) {
    topRightCornerButton.addEventListener('click', () => {
        if (isImageReadyForProcessing()) {
            const currentImage = getCurrentImage();
            const rectWidth = 60;
            const rectHeight = 30;
            const rColor = 255;
            const gColor = 255;
            const bColor = 0;

            getTopRightCorner(rectWidth, rectHeight, rColor, gColor, bColor);
            if (imageDisplayCanvas) {
                currentImage.drawTo(imageDisplayCanvas);
            }

            if (statusOutput) {
                statusOutput.textContent = `Image processed: Rectangle (${rectWidth}x${rectHeight}, color ${rColor},${gColor},${bColor}) added to top-right.`;
            }
            console.log("Top-right rectangle processing complete.");

        }
    });
}

if (changeRedGradientButton) {
    changeRedGradientButton.addEventListener('click', () => {
        const gradientImage = changeRedGradient(256, 200);

        if (imageDisplayCanvas && gradientImage) {
            gradientImage.drawTo(imageDisplayCanvas);
            console.log("Red gradient image drawn.");
            if (statusOutput) {
                statusOutput.textContent = "Red gradient image (256x200) generated.";
            }
        } else {
            if (!imageDisplayCanvas) console.error("Display canvas not found for gradient image!");
            if (!gradientImage) console.error("Gradient image creation failed!");
            if (statusOutput) statusOutput.textContent = "Error: Could not display gradient image.";
        }
    });
}

if (threeStripesButton) {
    threeStripesButton.addEventListener('click', applyThreeStripes);
    console.log("Three stripes button added.");
}

if (swapRedGreenButton) {
    swapRedGreenButton.addEventListener('click', processImageWithSwapRedGreen);
    console.log("Swap red and green button added.");
}

if (devilToYellowButton) {
    devilToYellowButton.addEventListener('click', devilToYellow);
}

if (addBorderButton) {
    addBorderButton.addEventListener('click', () => {
        if (isImageReadyForProcessing()) {
            const currentImage = getCurrentImage();
            const borderThickness = 10;
            addBlackBorder(currentImage, borderThickness);
            currentImage.drawTo(imageDisplayCanvas);
            if (statusOutput) {
                statusOutput.textContent = `Image processed: Black border added with thickness ${borderThickness}.`;
            }
            console.log("Black border added.");
        }
    });
}

if (greenScreenButton) {
    greenScreenButton.addEventListener('click', () => {
        greenScreenEffect();
        console.log("Green screen button clicked.");
    });
}

console.log('Image processing application initialized');
