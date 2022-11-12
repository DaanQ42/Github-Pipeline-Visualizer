//import * as PIXI from "./pixi/pixi";

const skyColor = 0x38b8eb;
const groundColor = 0x35b53d;

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

//Create a Pixi Application
const app = new PIXI.Application({
  autoDensity: true,
  antialias: true, // default: false
  transparent: false, // default: false
  resolution: 1, // default: 1
  resizeTo: window,
  backgroundColor: skyColor,
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

PIXI.Loader.shared.onProgress.add(loadProgressHandler);
PIXI.Loader.shared.add([]).load(setup);

function setup() {
  console.log("All files loaded");
}

function loadProgressHandler(loader, resource) {
  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url);

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%");

  //If you gave your files names as the first argument
  //of the `add` method, you can access them like this
  //console.log("loading: " + resource.name);
}
