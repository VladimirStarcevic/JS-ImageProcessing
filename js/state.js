// State module
// This module manages the application state

// Application state
let state = {
    currentImage: null,
    foregroundImage: null,
    backgroundImage: null
};

/**
 * Gets the current image
 * @returns {SimpleImage|null} The current image or null if no image is loaded
 */
export function getCurrentImage() {
    // First check our state, then fall back to window.currentImage
    return state.currentImage || window.currentImage;
}

/**
 * Sets the current image
 * @param {SimpleImage|null} image - The image to set as current
 */
export function setCurrentImage(image) {
    state.currentImage = image;
    // Also set it on window for backward compatibility with existing code
    window.currentImage = image;
}

export function getForegroundImage() {
    return state.foregroundImage;
}

export function setForegroundImage(image) {
    state.foregroundImage = image;
}

export function getBackgroundImage() {
    return state.backgroundImage;
}

export function setBackgroundImage(image) {
    state.backgroundImage = image;
}
