import { getRecordedData } from "./testFetchMLInputs.js";
import { GoogleGenerativeAI } from 'https://esm.run/@google/generative-ai'

const replicateProxy = "https://cors-anywhere.herokuapp.com";
// const replicateProxy = "https://replicate-api-proxy.glitch.me";

document.getElementById('titlegenerate').addEventListener('click', sendTitleToAI);


async function myFetch(url, data) {
    document.body.style.cursor = "progress";
    console.log("Making a Fetch Request", data);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    };
    const raw_response = await fetch(url, options);
    //turn it into json
    const json_response = await raw_response.json();
    document.body.style.cursor = "auto";
    return json_response;
}
// setupTextInput();

// function setupTextInput() {
//     const textInput = document.createElement("title");
//     inputDiv.appendChild(document.createElement("h2")).textContent = "Text Input";
// }

async sendTitleToAI() {
    const data = {
        //mistral "cf18decbf51c27fed6bbdc3492312c1c903222a56e3fe9ca02d6cbe5198afc10",
        //llama  "2d19859030ff705a87c746f7e96eea03aefb71f166725aee39692f1476566d48"
        "version": "2d19859030ff705a87c746f7e96eea03aefb71f166725aee39692f1476566d48",

        input: {
            prompt: document.getElementById("title").value,
            max_tokens: 10,
            max_length: 10,
        },
    };
    feedback.innerHTML = "Waiting for reply from API...";
    let url = replicateProxy + "/create_n_get/";
    let replicateJSON = await myFetch(url, data);
    if (replicateJSON.output.length == 0) {
        feedback.innerHTML = "Something went wrong, try it again";
    } else {
        feedback.innerHTML = "";
        console.log("proxy_said", replicateJSON.output.join(""));
        let title = replicateJSON.output.join("");
        document.getElementById("title").value = title2;
    }
}
