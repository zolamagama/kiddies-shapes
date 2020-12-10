// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel


const URL = "https://teachablemachine.withgoogle.com/models/uI-Xyioo2/";

let model, webcam, labelContainer, maxPredictions;

const shapeNameElem = document.querySelector(".shapeName");
const shapesElem = document.querySelector(".shapes");
const questionElem = document.querySelector(".question");


const debugElem = document.querySelector(".debugMessage");
const restartButton = document.querySelector(".restart");

const startBtn = document.querySelector(".start");

const shapeListTemplate = Handlebars.compile(document.querySelector(".shapeListTemplate").innerText);


startBtn.addEventListener('click', function(){
    lookingForTheFirst = -1
    showShapeQuestion()

})


function showShapeList() {
    axios
        .get("/api/show")
        .then(function (response) {
            const shapes = response.data.data;
            shapesElem.innerHTML = shapeListTemplate({
                shapes
            });
        })
}


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


function shapeGame() {

    const showMeTheseShapes = ["Circle", "Heart", "Triangle"]
    let lookingForTheFirst = 0;

    function getQuestion() {
        return "Please show me a " + showMeTheseShapes[lookingForTheFirst];
    }



}

const showMeTheseShapes = ["Circle", "Heart", "Triangle"]
let lookingForTheFirst = 0
questionElem.innerHTML = "Please show me a " + showMeTheseShapes[lookingForTheFirst];

function currentlyLookingFor() {
    if (lookingForTheFirst < showMeTheseShapes.length) {
        return showMeTheseShapes[lookingForTheFirst]
    }
    return "";
}


function showShapeQuestion() {

    lookingForTheFirst++;
    if (lookingForTheFirst < showMeTheseShapes.length) {
        questionElem.innerHTML = "Please show me a " + currentlyLookingFor();
    } else {
        questionElem.innerHTML = "You know your shapes!";

    }
}

// run the webcam image through the image model
async function predict() {
    // var total = 0;
    // var shape = ''
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    // let highestOutcome = 0;
    // const shapeName = ""
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        // if (prediction[i].probability > total) {
        //     total = prediction[i].probability
        //     shape = prediction[i].className
        // }
        // console.log(shape);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
//     prediction.forEach(function (guess) {
//         if (guess.probability > highestOutcome) {
//             highestOutcome = guess.probability;
//             shapeName = guess.className;
//         }
//     });

//     if (highestOutcome > 0.95) {
//         return;
//     }
}
    
// }

function checkForShape(shapeName) {

    if (shapeName !== "Start") {
        const lookingFor = currentlyLookingFor();


        if (lookingFor !== "" && shapeName === lookingFor) {
            shapeNameElem.innerHTML = `That's right you showed me a ${lookingFor}!`;
        }
    }
}
