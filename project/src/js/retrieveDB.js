document.addEventListener('DOMContentLoaded', async () => {
    // Default selectedAlgorithm is 'maml'
    const selectedAlgorithm = 'maml';

    // Set the value of the dropdown to 'maml' to keep it selected by default
    const algorithmSelect = document.getElementById('algorithmSelect');
    algorithmSelect.value = selectedAlgorithm;

    try {
        // Fetch data for the default algorithm
        await fetchAndUpdateImages(selectedAlgorithm);
    } catch (error) {
        console.error('Error on initial load:', error);
    }
});

// Fetch and update images based on the selected algorithm
async function fetchAndUpdateImages(algorithm) {
    try {
        // Fetch data from the Flask backend
        const response = await fetch(`http://127.0.0.1:5000/data/${algorithm}`);
        if (!response.ok) throw new Error('Error fetching data');

        const data = await response.json();
        const images = data.images;

        // Update images if they exist
        for (const [imageId, imageData] of Object.entries(images)) {
            const imgElement = document.getElementById(imageId);
            if (imgElement) {
                imgElement.src = imageData; // Set the base64 image data
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Event listener for the submit button
document.getElementById('submitBtn').addEventListener('click', async () => {
    const selectedAlgorithm = document.getElementById('algorithmSelect').value;

    // Check if an algorithm is selected
    if (!selectedAlgorithm) {
        console.error("No algorithm selected");
        return;
    }

    try {
        // Fetch and update images
        await fetchAndUpdateImages(selectedAlgorithm);
    } catch (error) {
        console.error('Error on button click:', error);
    }
});
