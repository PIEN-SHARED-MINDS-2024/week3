import { sendImageToAI } from './image.js'; // Ensure this line is correct

const apiKey = 'p3KhD7AVYdAfswxxAy1u9R4Zr4lzB67IZvXrSktB';  

document.getElementById('lookup').addEventListener('click', getAPOD);

document.getElementById('stargenerate').addEventListener('click', sendImageToAI);

async function getAPOD() {
    const date = document.getElementById('date-input').value;
    if (!date) {
        alert('Please enter a valid date!');
        return;
    }
    
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Update HTML content with APOD data
        document.getElementById('title').textContent = data.title;
        document.getElementById('img').src = data.url;
        document.getElementById('description').textContent = data.explanation;
    } catch (error) {
        console.error('Error fetching the APOD:', error);
        alert('Failed to fetch the APOD for the entered date.');
    }
}
