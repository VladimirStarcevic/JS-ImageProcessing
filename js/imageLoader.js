// Image Loader module
// This module handles image loading functionality

import { imageUploadInput, imageDisplayCanvas, statusOutput } from './domElements.js';
import { setCurrentImage, getCurrentImage } from './state.js';
import { getSimpleImage } from './simpleImageWrapper.js';

/**
 * Loads an image from the file input and displays it on the canvas
 */
export function loadImage() {
    if (!imageUploadInput || !imageDisplayCanvas) {
        console.error("Required HTML elements (input or canvas) not found!");
        if (statusOutput) statusOutput.textContent = "Error: Page setup incomplete.";
        return;
    }

    if (imageUploadInput.files.length > 0) {
        try {
            const SimpleImage = getSimpleImage();
            const newImage = new SimpleImage(imageUploadInput);
            setCurrentImage(newImage);
            const currentImage = getCurrentImage();
            currentImage.drawTo(imageDisplayCanvas);
            if (statusOutput) statusOutput.textContent = "Image loaded successfully.";
            console.log("Image loaded:", currentImage);
        } catch (e) {
            console.error("Error loading image:", e);
            if (statusOutput) statusOutput.textContent = "Error: Could not load or process the selected image. " + e.message;
            setCurrentImage(null); // Reset if there was an error
        }
    } else {
        if (statusOutput) statusOutput.textContent = "No file selected.";
        setCurrentImage(null); // Reset if no file
    }
}
