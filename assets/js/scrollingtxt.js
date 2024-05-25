const container = document.querySelector(".flex-container");
const textContainers = container.querySelectorAll(".text-container");

let currentElement = 0;

function fadeIn(element) {
    element.style.opacity = 1;
    element.style.transition = "opacity 0.5s ease-in-out";
}

function fadeOut(element) {
    element.style.opacity = 0;
    element.style.transition = "opacity 0.5s ease-in-out";
}

function switchText() {
    fadeOut(textContainers[currentElement]);
    currentElement = (currentElement + 1) % textContainers.length;
    setTimeout(() => {
        fadeIn(textContainers[currentElement]);
    }, 2000); // Wait 2 seconds before showing the next element
}

// Start the animation loop
switchText();
setInterval(switchText, 4000); // Repeat every 4 seconds
