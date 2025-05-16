// Image Loader module
// This module handles image loading functionality

import { imageUploadInput, foregroundFileInput, backgroundFileInput, imageDisplayCanvas, foregroundCanvasPreview, backgroundCanvasPreview, statusOutput } from './domElements.js';
import { setCurrentImage, getCurrentImage, setForegroundImage, setBackgroundImage } from './state.js';
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

/**
 * Loads a foreground image from the file input and displays it on the canvas
 */
export function loadForegroundImage() {
    if (!foregroundFileInput || !foregroundCanvasPreview) {
        console.error("Required HTML elements (foreground input or canvas) not found!");
        if (statusOutput) statusOutput.textContent = "Error: Page setup incomplete for foreground image.";
        return;
    }

    if (foregroundFileInput.files.length > 0) {
        try {
            const SimpleImage = getSimpleImage();
            const newImage = new SimpleImage(foregroundFileInput);
            setForegroundImage(newImage);
            newImage.drawTo(foregroundCanvasPreview);
            if (statusOutput) statusOutput.textContent = "Foreground image loaded successfully.";
            console.log("Foreground image loaded");
        } catch (e) {
            console.error("Error loading foreground image:", e);
            if (statusOutput) statusOutput.textContent = "Error: Could not load or process the selected foreground image. " + e.message;
            setForegroundImage(null); // Reset if there was an error
        }
    } else {
        if (statusOutput) statusOutput.textContent = "No foreground file selected.";
        setForegroundImage(null); // Reset if no file
    }
}

/**
 * Loads a background image from the file input and displays it on the canvas
 */
export function loadBackgroundImage() {
    if (!backgroundFileInput || !backgroundCanvasPreview) {
        console.error("Required HTML elements (background input or canvas) not found!");
        if (statusOutput) statusOutput.textContent = "Error: Page setup incomplete for background image.";
        return;
    }

    if (backgroundFileInput.files.length > 0) {
        try {
            const SimpleImage = getSimpleImage();
            const newImage = new SimpleImage(backgroundFileInput);
            setBackgroundImage(newImage);
            newImage.drawTo(backgroundCanvasPreview);
            if (statusOutput) statusOutput.textContent = "Background image loaded successfully.";
            console.log("Background image loaded");
        } catch (e) {
            console.error("Error loading background image:", e);
            if (statusOutput) statusOutput.textContent = "Error: Could not load or process the selected background image. " + e.message;
            setBackgroundImage(null); // Reset if there was an error
        }
    } else {
        if (statusOutput) statusOutput.textContent = "No background file selected.";
        setBackgroundImage(null); // Reset if no file
    }
}
