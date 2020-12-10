// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel


const URL = "https://teachablemachine.withgoogle.com/models/uI-Xyioo2/";

let model, webcam, labelContainer, maxPredictions;



const shapeNameElem = document.querySelector(".shapeName");
const shapesElem = document.querySelector(".shapes");

const startBtn = document.querySelector(".start");
// const stopBtn = document.querySelector(".stop");

const shapeListTemplate = Handlebars.compile(document.querySelector(".shapeListTemplate").innerText);

function showShapeList()  {
    axios
        .get("/api/show")
        .then(function(response){
            const shapes = response.data.data;
            shapesElem.innerHTML = shapeListTemplate({
                shapes
            });
        })
}
// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // var total = 0;
    // var shape = ''
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    let highestOutcome = 0;
    let shapeName = "";

    prediction.forEach(function (guess) {
        if (guess.probability > highestOutcome) {
            highestOutcome = guess.probability;
            shapeName = guess.className;
        }
    });

    if (highestOutcome < 0.9) {
        return;
    }
}
