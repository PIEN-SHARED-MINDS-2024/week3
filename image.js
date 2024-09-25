import { GoogleGenerativeAI } from 'https://esm.run/@google/generative-ai';

const replicateProxy = "https://replicate-api-proxy.glitch.me";

// This function processes the image and sends it to the AI model
export async function sendImageToAI() {
    // Get the image from the #img element
    let image = document.getElementById("img");
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    let imgBase64 = canvas.toDataURL();

    let data = {
        version: "15a3689ee13b0d2616e98820eca31d4c3abcd36672df6afce5cb6feb1d66087d",
        input: {
            // Use only the image for generation
            image: imgBase64,
        },
    };

    let feedback = document.getElementById("feedback");
    feedback.innerHTML = "Waiting for reply from API...";
    let url = replicateProxy + "/create_n_get/";
    
    // Assuming myFetch is defined somewhere to handle fetch requests
    let replicateJSON = await myFetch(url, data);
    if (replicateJSON.output.length == 0) {
        feedback.innerHTML = "Something went wrong, try it again";
    } else {
        let imageURL = replicateJSON.output[0];

        let outputImage = document.getElementById("outputImage");
        outputImage.onload = function () {
            console.log("Image loaded");
        }
        outputImage.src = imageURL;
    }
}


// Add event listener to the #stargenerate button
document.getElementById('stargenerate').addEventListener('click', sendImageToAI);
