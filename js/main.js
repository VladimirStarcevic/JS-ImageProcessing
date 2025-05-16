// Main module
// This is the entry point for the application

import {
    imageUploadInput,
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
    imageDisplayCanvas,
    statusOutput
} from './domElements.js';

import { loadImage } from './imageLoader.js';
import {
    turnImageRed,
    removeRedChannel,
    reduceRedIntensity,
    addBlackBar,
    addGreenSquare,
    getTopRightCorner,
    changeRedGradient, applyThreeStripes, processImageWithSwapRedGreen, devilToYellow,
} from './imageProcessors.js';
import {isImageReadyForProcessing} from "./utils.js";
import {getCurrentImage} from "./state.js";

// Set up event listeners
if (imageUploadInput) {
    imageUploadInput.addEventListener('change', loadImage);
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

console.log('Image processing application initialized');