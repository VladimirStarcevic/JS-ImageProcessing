// Image Processors module
// This module contains functions for processing images

import {foregroundCanvasPreview, backgroundCanvasPreview, imageDisplayCanvas, statusOutput} from './domElements.js';
import { isImageReadyForProcessing } from './utils.js';
import { getCurrentImage, getBackgroundImage, getForegroundImage } from './state.js';
import { getSimpleImage } from './simpleImageWrapper.js';

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

export function getTopRightCorner(cornerWidth, cornerHeight, red, green, blue) {
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

   return currentImage;
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

export function applyThreeStripes() {
    if (!isImageReadyForProcessing()) {
        return;
    }
    const currentImage = getCurrentImage();
    let imageWidth = currentImage.getWidth();
    let oneThirdWidth = imageWidth / 3;
    let twoThirdsWidth = 2 * imageWidth / 3;

    for (let pixel of currentImage.values()) {
        let x = pixel.getX();
        if (x < oneThirdWidth) {
            pixel.setRed(255);
        } else if (x < twoThirdsWidth) {
            pixel.setGreen(255);
        } else {
            pixel.setBlue(255);
        }
    }

    currentImage.drawTo(imageDisplayCanvas);
    if (statusOutput) {
        statusOutput.textContent = "Image processed: Three stripes added.";
        console.log("Three stripes added.");
    }
}
const swapRedGreen = (pixel) => {
    let originalRed = pixel.getRed();
    let originalGreen = pixel.getGreen();
    pixel.setRed(originalGreen);
    pixel.setGreen(originalRed);
}

export function processImageWithSwapRedGreen() {
    if (!isImageReadyForProcessing()) {
        return;
    }
    const currentImage = getCurrentImage();
    for (let pixel of currentImage.values()) {
        swapRedGreen(pixel);
    }
    currentImage.drawTo(imageDisplayCanvas);
    if (statusOutput) {
        statusOutput.textContent = "Image processed: Red and green channels swapped.";
        console.log("Red and green channels swapped.");
    }
}

export function devilToYellow() {
    if (!isImageReadyForProcessing()) {
        return;
    }
    const currentImage = getCurrentImage();
    for (let pixel of currentImage.values()) {
       if (pixel.getRed() < 100 && pixel.getBlue() > 200 && pixel.getGreen() < 100) {
           pixel.setRed(255);
           pixel.setGreen(255);
           pixel.setBlue(0);
       }
    }
    currentImage.drawTo(imageDisplayCanvas);
    if (statusOutput) {
        statusOutput.textContent = "Image Duke Devil to Yellow processed."
        console.log("Duke Devil to Yellow processed.")
    }
}

const setBlack = (pixel) => {
    pixel.setRed(0);
    pixel.setBlue(0);
    pixel.setGreen(0);
}

export function addBlackBorder(image, borderThickness) {
    if (!isImageReadyForProcessing()) {
        return;
    }

    let imageWidth = image.getWidth();
    let imageHeight = image.getHeight();
    for (let pixel of image.values()) {
        let x = pixel.getX();
        let y = pixel.getY();
        if (x < borderThickness || x >= imageWidth - borderThickness || y < borderThickness || y >= imageHeight - borderThickness) {
            setBlack(pixel);
        }
    }

    return image
}

export function greenScreenEffect() {
    let foregroundImage = getForegroundImage();
    let backgroundImage = getBackgroundImage();

    if (foregroundImage === null || backgroundImage === null) {
        statusOutput.textContent = "Please load foreground and background images first.";
        return;
    }
    if (foregroundImage.getWidth() !== backgroundImage.getWidth() ||
        foregroundImage.getHeight() !== backgroundImage.getHeight()) {

        console.log("Resizing background image to match foreground dimensions:",
            foregroundImage.getWidth() + "x" + foregroundImage.getHeight());
        if (statusOutput) statusOutput.textContent = "Resizing background image...";

        backgroundImage.setSize(foregroundImage.getWidth(), foregroundImage.getHeight());


        if (backgroundCanvasPreview) {
            backgroundImage.drawTo(backgroundCanvasPreview);
        }
        console.log("Background image resized.");
    }


    foregroundImage.drawTo(foregroundCanvasPreview);
    backgroundImage.drawTo(backgroundCanvasPreview);

    if (foregroundCanvasPreview) {
        foregroundCanvasPreview.style.display = 'block';
    }
    if (backgroundCanvasPreview) {
        backgroundCanvasPreview.style.display = 'block';
    }


    const SimpleImage = getSimpleImage();


    let outputImage = new SimpleImage(foregroundImage.getWidth(), foregroundImage.getHeight());


    for (let pixel of foregroundImage.values()) {
        let x = pixel.getX();
        let y = pixel.getY();

        // Uzmi piksel iz IZLAZNE slike na koju ćemo pisati
        let outPixel = outputImage.getPixel(x, y);

        // Uslov za detekciju zelene boje na prednjoj slici
        if (pixel.getGreen() > (pixel.getRed() + pixel.getBlue())) {
            // Piksel je "zelen", treba uzeti piksel sa pozadinske slike

            // ---- KLJUČNA PROVERA GRANICA ZA POZADINSKU SLIKU KORISTEĆI x I y ----
            if (x < backgroundImage.getWidth() && y < backgroundImage.getHeight()) {
                let bgImagePixel = backgroundImage.getPixel(x, y); // Koristimo x i y
                outPixel.setAllFrom(bgImagePixel); // Postavi boju iz pozadinskog piksela
            } else {
                // Piksel (x,y) je van granica pozadinske slike.
                // Odluka: šta uraditi ovde? Postaviti crni piksel.
                outPixel.setRed(0);
                outPixel.setGreen(0);
                outPixel.setBlue(0);
            }
        } else {
            // Piksel nije "zelen", zadrži originalni piksel sa prednje slike
            outPixel.setAllFrom(pixel);
        }
    }

    // Draw the output image to the foreground canvas
    outputImage.drawTo(foregroundCanvasPreview);

    // Hide the background canvas
    if (backgroundCanvasPreview) {
        backgroundCanvasPreview.style.display = 'none';
    }

    if (statusOutput) {
        statusOutput.textContent = "Green screen effect applied.";
        console.log("Green screen effect applied.");
    }
}
