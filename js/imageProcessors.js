// Image Processors module
// This module contains functions for processing images

import { imageDisplayCanvas, statusOutput } from './domElements.js';
import { isImageReadyForProcessing } from './utils.js';
import { getCurrentImage } from './state.js';

/**
 * Turns the image red by maximizing the red channel for all pixels
 */
export function turnImageRed() {
    if (!isImageReadyForProcessing()) {
        return;
    }

    const currentImage = getCurrentImage();
    for (let pixel of currentImage.values()) {
        pixel.setRed(255);
    }

    currentImage.drawTo(imageDisplayCanvas);
    if (statusOutput) statusOutput.textContent = "Image processed: Red channel maximized.";
}

/**
 * Removes the red channel from the image by setting it to 0 for all pixels
 */
export function removeRedChannel() {
    if (!isImageReadyForProcessing()) {
        return;
    }

    const currentImage = getCurrentImage();
    for (let pixel of currentImage.values()) {
        pixel.setRed(0);
    }

    currentImage.drawTo(imageDisplayCanvas);
    if (statusOutput) {
        statusOutput.textContent = "Image processed: Red channel removed.";
    }
}

/**
 * Reduces the intensity of bright red pixels
 */
export function reduceRedIntensity() {
    if (!isImageReadyForProcessing()) {
        return;
    }

    const currentImage = getCurrentImage();
    for (let pixel of currentImage.values()) {
        let currentRed = pixel.getRed();
        if (currentRed > 70) {
            pixel.setRed(70);
        }
    }

    currentImage.drawTo(imageDisplayCanvas);
    if (statusOutput) {
        statusOutput.textContent = "Image processed: Red intensity reduced for values > 70.";
        console.log("Bright red reduction complete.");
    }
}

/**
 * Adds a black bar at the bottom of the image
 */
export function addBlackBar() {
    if (!isImageReadyForProcessing()) {
        return;
    }

    const currentImage = getCurrentImage();
    let imgHeight = currentImage.getHeight();
    for (let pixel of currentImage.values()) {
        let currentY = pixel.getY();
        if (currentY >= imgHeight - 10) {
            pixel.setRed(0);
            pixel.setGreen(0);
            pixel.setBlue(0);
        }
    }

    currentImage.drawTo(imageDisplayCanvas);
    if (statusOutput) {
        statusOutput.textContent = "Image processed: Black bar added.";
        console.log("Black bar added.");
    }
}

/**
 * Adds a green square in the top-left corner of the image
 */
export function addGreenSquare() {
    if (!isImageReadyForProcessing()) {
        return;
    }

    const currentImage = getCurrentImage();
    for (let pixel of currentImage.values()) {
        let currentX = pixel.getX();
        let currentY = pixel.getY();

        if (currentX < 50 && currentY < 50) {
            pixel.setRed(0);
            pixel.setGreen(255);
            pixel.setBlue(0);
        }
    }

    currentImage.drawTo(imageDisplayCanvas);
    if (statusOutput) {
        statusOutput.textContent = "Image processed: Green square added.";
        console.log("Green square added.");
    }
}

export function getTopRightCorner(cornerWidth, cornerHeight, someImage, red, green, blue) {
    if (!isImageReadyForProcessing()) {
        return;
    }
    const currentImage = getCurrentImage();
    let imageWidth = currentImage.getWidth();

    for (let pixel of currentImage.values()) {
        let currentX = pixel.getX();
        let currentY = pixel.getY();

        if (currentX > imageWidth - cornerWidth && currentY < cornerHeight) {
            pixel.setRed(red);
            pixel.setGreen(green);
            pixel.setBlue(blue);
        }
    }

   return someImage;
}

export function changeRedGradient(width, height) {
    let picture = new SimpleImage(width, height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let pixel = picture.getPixel(x, y);
            pixel.setRed(x);
            pixel.setGreen(0);
            pixel.setBlue(0);
        }
    }
    return picture
}
