// script.js

// Function to show the boat scene after UI sequence
function showBoatScene() {
    document.getElementById('ui-sequence').style.display = 'none'; // Hide UI sequence
    document.getElementById('boat-scene').style.display = 'block'; // Show boat scene

    // Set the genre here after transitioning to the boat scene
    changeGenre('country'); // Manually set the genre to 'pop' or any other genre
}

// Function to handle UI sequence transitions
function runUISequence() {
    const pages = document.querySelectorAll('.page'); // Get all the page elements
    let currentPage = 0;

    // Function to display the next page
    function showNextPage() {
        if (currentPage > 0) {
            pages[currentPage - 1].style.opacity = 0; // Hide the previous page
        }

        if (currentPage < pages.length) {
            pages[currentPage].style.opacity = 1; // Show the current page
            currentPage++;

            // Show the next page after 2 seconds
            setTimeout(showNextPage, 800);
        } else {
            // Once all pages are shown, display the boat scene
            showBoatScene();
        }
    }

    // Start the UI sequence
    showNextPage();
}

// Function to change assets based on the genre
function changeGenre(genre) {
    // Construct paths to assets based on the genre folder names
    const boatImage = `./assets/boat/${genre}_boat.png`;
    const backgroundImage = `./assets/background/${genre}_back.png`;
    const floorImage = `./assets/floor/${genre}_floor.png`;
    const billboardImage = `./assets/billboard/${genre}_bill.png`;

    // Select the elements in the DOM and set their backgrounds dynamically
    document.querySelector('.night').style.backgroundImage = `url(${backgroundImage})`;
    document.querySelector('.surface').style.backgroundImage = `url(${floorImage})`;
    document.querySelector('.billboard').style.backgroundImage = `url(${billboardImage})`;
    document.querySelector('.boat').style.backgroundImage = `url(${boatImage})`;
}

// Run the UI sequence when the page loads
window.onload = runUISequence;
