// SimpleImage Wrapper module
// This module provides access to the SimpleImage class loaded via script tag

/**
 * Gets the SimpleImage class from the global scope
 * @returns {Function} The SimpleImage constructor
 */
export function getSimpleImage() {
    // Return the SimpleImage constructor from the global scope
    return window.SimpleImage;
}