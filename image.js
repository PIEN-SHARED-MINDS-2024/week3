import { GoogleGenerativeAI } from 'https://esm.run/@google/generative-ai';

const replicateProxy = "https://cors-anywhere.herokuapp.com";

export async function sendImageToAI() {
    try {
        let imageUrl = document.getElementById("img").src;
        let proxiedImageUrl = replicateProxy + "/" + imageUrl;

        let image1 = new Image();
        image1.crossOrigin = "Anonymous";
        image1.src = proxiedImageUrl;

        // Wait for the image to load
        await new Promise(resolve => {
            image1.onload = resolve;
        });

        let canvas = document.createElement("canvas");
        canvas.width = image1.width;
        canvas.height = image1.height;
        let context = canvas.getContext("2d");
        context.drawImage(image1, 0, 0, canvas.width, canvas.height);
        let imgBase64 = canvas.toDataURL();

        let data = {
            version: "15a3689ee13b0d2616e98820eca31d4c3abcd36672df6afce5cb6feb1d66087d",
            input: {
                image: imgBase64,
            },
        };

        let feedback = document.getElementById("feedback");
        feedback.innerHTML = "Waiting for reply from API...";
        let url = "https://replicate-api-proxy.glitch.me" + "/create_n_get/";

        let response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          
          let replicateJSON = await response.json();        if (replicateJSON.output.length == 0) {
            feedback.innerHTML = "Something went wrong, try it again";
        } else {
            let imageURL = replicateJSON.output[0];
            let outputImage = document.getElementById("outputImage");
            outputImage.src = imageURL;
        }
    } catch (error) {
        console.error("Error sending image to AI:", error);
    }
}

document.getElementById('stargenerate').addEventListener('click', sendImageToAI);