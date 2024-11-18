document.addEventListener('DOMContentLoaded', async () => {
    // Default selectedAlgorithm is 'maml'
    const selectedAlgorithm = 'maml';

    // Set the value of the dropdown to 'maml' to keep it selected by default
    document.getElementById('algorithmSelect').value = selectedAlgorithm;

    console.log('Default selected algorithm:', selectedAlgorithm);

    try {
        // Fetch data from the Flask backend
        const response = await fetch(`http://127.0.0.1:5000/data/${selectedAlgorithm}`);
        if (!response.ok) throw new Error('Error fetching data');

        const data = await response.json();

        // Update metrics (accuracy, loss, etc.)
        const metrics = data.metrics;
        document.getElementById('accuracy').textContent = `Accuracy: ${metrics.accuracy}`;
        document.getElementById('loss').textContent = `Loss: ${metrics.loss}`;
        document.getElementById('precision').textContent = `Precision: ${metrics.precision}`;
        document.getElementById('recall').textContent = `Recall: ${metrics.recall}`;
        document.getElementById('f1_score').textContent = `F1 Score: ${metrics.f1_score}`;

        // Update images by id
        const images = data.images;

        // Set the images if they exist
        for (const [imageId, imageData] of Object.entries(images)) {
            const imgElement = document.getElementById(imageId);
            if (imgElement) {
                imgElement.src = imageData;  // Set the base64 image data
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Event listener for when the dropdown value changes
document.getElementById('algorithmSelect').addEventListener('change', async (event) => {
    const selectedAlgorithm = event.target.value;
    console.log('Selected algorithm:', selectedAlgorithm);

    // Check if algorithm is selected
    if (!selectedAlgorithm) {
        console.error("No algorithm selected");
        return;
    }

    try {
        // Fetch data from the Flask backend
        const response = await fetch(`http://127.0.0.1:5000/data/${selectedAlgorithm}`);
        if (!response.ok) throw new Error('Error fetching data');

        const data = await response.json();

        // Update metrics (accuracy, loss, etc.)
        const metrics = data.metrics;
        document.getElementById('accuracy').textContent = `Accuracy: ${metrics.accuracy}`;
        document.getElementById('loss').textContent = `Loss: ${metrics.loss}`;
        document.getElementById('precision').textContent = `Precision: ${metrics.precision}`;
        document.getElementById('recall').textContent = `Recall: ${metrics.recall}`;
        document.getElementById('f1_score').textContent = `F1 Score: ${metrics.f1_score}`;

        // Update images by id
        const images = data.images;

        // Set the images if they exist
        for (const [imageId, imageData] of Object.entries(images)) {
            const imgElement = document.getElementById(imageId);
            if (imgElement) {
                imgElement.src = imageData;  // Set the base64 image data
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
