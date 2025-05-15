// Utils module
// This module provides utility functions for the application

import { imageDisplayCanvas, statusOutput } from './domElements.js';
import { getCurrentImage } from './state.js';

/**
 * Checks if an image is loaded and ready for processing
 * @returns {boolean} True if the image is ready, false otherwise
 */
export function isImageReadyForProcessing() {
    const currentImage = getCurrentImage();
    if (currentImage === null || currentImage === undefined) {
        if (statusOutput) statusOutput.textContent = "Please load an image first.";
        console.warn("Image not loaded yet.");
        return false;
    }
    if (!imageDisplayCanvas) {
        console.error("Display canvas element not found in HTML!");
        if (statusOutput) statusOutput.textContent = "Error: Display canvas is missing. Page setup incomplete.";
        return false;
    }

    return true;
}
