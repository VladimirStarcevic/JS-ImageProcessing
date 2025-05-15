


const imageUploadInput = document.getElementById("imageUploadInput");
const imageDisplayCanvas = document.getElementById("imageDisplayCanvas");
const statusOutput = document.getElementById("statusOutput");
const turnImageRedButton = document.getElementById("turnChapelRedButton");
const removeRedButton = document.getElementById("removeRedButton");
const reduceRedButton = document.getElementById("reduceRedButton");
const addBlackBarButton = document.getElementById("addBlackBarButton");

let currentImage = null;

function isImageReadyForProcessing() {
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

function loadImage() {
    if (!imageUploadInput || !imageDisplayCanvas) {
        console.error("Required HTML elements (input or canvas) not found!");
        if (statusOutput) statusOutput.textContent = "Error: Page setup incomplete.";
        return;
    }

    if (imageUploadInput.files.length > 0) {
        try {
            currentImage = new SimpleImage(imageUploadInput); // Koristimo input element
            currentImage.drawTo(imageDisplayCanvas);
            if (statusOutput) statusOutput.textContent = "Image loaded successfully.";
            console.log("Image loaded:", currentImage);
        } catch (e) {
            console.error("Error loading image:", e);
            if (statusOutput) statusOutput.textContent = "Error: Could not load or process the selected image. " + e.message;
            currentImage = null; // Resetuj ako je bilo greške
        }
    } else {
        if (statusOutput) statusOutput.textContent = "No file selected.";
        currentImage = null; // Resetuj ako nema fajla
    }
}

function turnImageRed(){
    if (!isImageReadyForProcessing()) {
        return;
    }

    for (let pixel of currentImage.values()) {
        pixel.setRed(255);
    }

    currentImage.drawTo(imageDisplayCanvas);
    if (statusOutput) statusOutput.textContent = "Image processed: Red channel maximized.";

}

function removeRedChannel(){
    if (!isImageReadyForProcessing()) {
        return;
    }

    for (let pixel of currentImage.values()) {
        pixel.setRed(0);
    }

    currentImage.drawTo(imageDisplayCanvas);
    if (statusOutput) {
        statusOutput.textContent = "Image processed: Red channel removed.";
    }
}

function reduceRedIntensity() {
    if (!isImageReadyForProcessing()) {
        return;
    }

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


function addBlackBar() {
    if (!isImageReadyForProcessing()) {
        return;
    }

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


// Dodaj event listener na input polje za fajl
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
