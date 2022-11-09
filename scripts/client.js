// Art 109 Three.js Picture + Text Demo

// This is the basic script before modification

// Extract globals from external script
import * as THREE from "../build/three.module.js";

// Import pointer lock controls
import {
  PointerLockControls
} from "../src/PointerLockControls.js";

import {
  FontLoader
} from "../src/FontLoader.js"

// Establish variables
let camera, scene, renderer, controls, material;

const objects = [];
let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

// Establish the camera
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.y = 10;

// Define basic scene parameters
scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.Fog(0xffffff, 0, 750);

// Define scene lighting
const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
light.position.set(0.5, 1, 0.75);
scene.add(light);

// Define controls
controls = new PointerLockControls(camera, document.body);

// Identify the html divs for the overlays
const blocker = document.getElementById("blocker");
const instructions = document.getElementById("instructions");

// Listen for clicks and respond by removing overlays and starting mouse look controls
// Listen
instructions.addEventListener("click", function() {
  controls.lock();
});
// Remove overlays and begin controls on click
controls.addEventListener("lock", function() {
  instructions.style.display = "none";
  blocker.style.display = "none";
});
// Restore overlays and stop controls on esc
controls.addEventListener("unlock", function() {
  blocker.style.display = "block";
  instructions.style.display = "";
});
// Add controls to scene
scene.add(controls.getObject());

// Define key controls for WASD controls
const onKeyDown = function(event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      moveForward = true;
      break;

    case "ArrowLeft":
    case "KeyA":
      moveLeft = true;
      break;

    case "ArrowDown":
    case "KeyS":
      moveBackward = true;
      break;

    case "ArrowRight":
    case "KeyD":
      moveRight = true;
      break;

    case "Space":
      if (canJump === true) velocity.y += 350;
      canJump = false;
      break;
  }
};

const onKeyUp = function(event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      moveForward = false;
      break;

    case "ArrowLeft":
    case "KeyA":
      moveLeft = false;
      break;

    case "ArrowDown":
    case "KeyS":
      moveBackward = false;
      break;

    case "ArrowRight":
    case "KeyD":
      moveRight = false;
      break;
  }
};

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

// Add raycasting for mouse controls
raycaster = new THREE.Raycaster(
  new THREE.Vector3(),
  new THREE.Vector3(0, -1, 0),
  0,
  10
);

// Generate the ground
// let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
// const floorMaterial = new THREE.MeshBasicMaterial({
//   color: 0xE63946
// });
//
// const floor = new THREE.Mesh(floorGeometry, floorMaterial);

// Insert completed floor into the scene
//scene.add(floor);

//--------------------------------------------------
// Add a polygon to the scene
const geometry = new THREE.IcosahedronGeometry(2, 1);
const matLineBasic = new THREE.LineBasicMaterial( {
  color: 0x1D3557,
  linewidth: 4
 } );
const wireframe = new THREE.WireframeGeometry(geometry);
const line = new THREE.LineSegments(wireframe, matLineBasic);
line.position.set(0 ,10 ,0 );
scene.add(line);

// First Image (red and purple glitch map)
// Load image as texture
//Image 1
// const texture2 = new THREE.TextureLoader().load( '../assets/t2.png' );
// // Immediately use the texture for material creation
// const material2 = new THREE.MeshBasicMaterial( { map: texture2, side: THREE.DoubleSide } );
// // Create plane geometry
// const geometry2 = new THREE.PlaneGeometry( 12, 8 );
// // Apply image texture to plane geometry
// const plane = new THREE.Mesh( geometry2, material2 );
// // Position plane geometry
// plane.position.set(3 , 10 , 1);
// plane.rotation.set(60 , 90 , 0);
// // Place plane geometry
// scene.add( plane );

//Image2
const texture3 = new THREE.TextureLoader().load( '../assets/t3.png' );
// Immediately use the texture for material creation
const material3 = new THREE.MeshBasicMaterial( { map: texture3, side: THREE.DoubleSide } );
// Create plane geometry
const geometry3 = new THREE.PlaneGeometry( 12, 8 );
// Apply image texture to plane geometry
const plane3 = new THREE.Mesh( geometry3, material3 );
// Position plane geometry
plane3.position.set(0 , 10 , -10);
plane3.rotation.set(60 , 0 , 0);
// Place plane geometry
scene.add( plane3 );


// Add Text under models
const loader3 = new FontLoader();
       loader3.load( '../assets/helvetiker_regular.typeface.json', function ( font ) {
         // Define font color
         const color = 0xffffff;
         // Define font material
         const matDark = new THREE.LineBasicMaterial( {
           color: color,
           side: THREE.DoubleSide
         } );
         // Generate and place left side text
         const message = "Hello 3D World";
         const shapes = font.generateShapes( message, .5 );
         const geometry = new THREE.ShapeGeometry( shapes );
         geometry.computeBoundingBox();
         const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
         geometry.translate( xMid, 0, 0 );
         const text = new THREE.Mesh( geometry, matDark );
         text.position.set(0.5, 13 , 1);
         scene.add( text );

         // Generate and place right side text
         // const message2 = "Preanimated Model";
         // const shapes2 = font.generateShapes( message2, .5 );
         // const geometry2 = new THREE.ShapeGeometry( shapes2 );
         // geometry2.computeBoundingBox();
         // const xMid2 = - 0.5 * ( geometry2.boundingBox.max.x - geometry2.boundingBox.min.x );
         // geometry2.translate( xMid2, 0, 0 );
         // const text2 = new THREE.Mesh( geometry2, matDark );
         // text2.position.set(4, 10 , 0);
         // scene.add( text2 );
       });

// Define Rendered and html document placement
renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Listen for window resizing
window.addEventListener("resize", onWindowResize);

// Position our camera so we can see the shape
camera.position.z = 10;

// Add a directional light to the scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
scene.add(directionalLight);

// Add an ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
scene.add(ambientLight);

// Define and then call the render loop
// Define
function render() {
  requestAnimationFrame(render);

  // Rotate our shape
  line.rotation.x += 0.005;
  line.rotation.y += 0.005;
  renderer.render(scene, camera);
}
// Call
render();
animate();


// Window resizing function
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Generate the ground
let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
floorGeometry.rotateX(-Math.PI / 2);

// Vertex displacement pattern for ground
let position = floorGeometry.attributes.position;

for (let i = 0, l = position.count; i < l; i++) {
  vertex.fromBufferAttribute(position, i);

  vertex.x += Math.random() * 20 - 10;
  vertex.y += Math.random() * 2;
  vertex.z += Math.random() * 20 - 10;

  position.setXYZ(i, vertex.x, vertex.y, vertex.z);
}

floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

position = floorGeometry.attributes.position;
const colorsFloor = [];

for (let i = 0, l = position.count; i < l; i++) {
  color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
  colorsFloor.push(color.r, color.g, color.b);
}

floorGeometry.setAttribute(
  "color",
  new THREE.Float32BufferAttribute(colorsFloor, 3)
);

const floorMaterial = new THREE.MeshBasicMaterial({
  vertexColors: true
});

const floor = new THREE.Mesh(floorGeometry, floorMaterial);

// Insert completed floor into the scene
scene.add(floor);

// Animation function
function animate() {
  requestAnimationFrame(animate);

  const time = performance.now();

  // Check for controls being activated (locked) and animate scene according to controls
  if (controls.isLocked === true) {
    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y -= 10;

    const intersections = raycaster.intersectObjects(objects, false);

    const onObject = intersections.length > 0;

    const delta = (time - prevTime) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // this ensures consistent movements in all directions

    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

    if (onObject === true) {
      velocity.y = Math.max(0, velocity.y);
      canJump = true;
    }

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);

    controls.getObject().position.y += velocity.y * delta; // new behavior

    if (controls.getObject().position.y < 10) {
      velocity.y = 0;
      controls.getObject().position.y = 5;

      canJump = true;
    }
  }

  prevTime = time;

  renderer.render(scene, camera);
}
