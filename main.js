import * as THREE from "three";

const colours = [0xffffff, 0xff0000, 0x0000ff, 0x00ff00, 0xffff00];

// Random number generator
const randomNumber = () => Math.floor(Math.random() * colours.length);

let currentColourIndex = 0;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Event listeners
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      cube.scale.addScalar(0.1);
      break;
    case "ArrowDown":
      cube.scale.addScalar(-0.1);
      break;
    case "ArrowLeft":
      cube.rotation.y += 0.1;
      break;
    case "ArrowRight":
      cube.rotation.y -= 0.1;
      break;
    case "c":
      currentColourIndex = randomNumber();
      cube.material.color.setHex(colours[currentColourIndex]);
      break;
    case "v":
      if (cube.material.wireframe === true) {
        cube.material.wireframe = false;
      } else {
        cube.material.wireframe = true;
      }
  }
});

camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};
animate();
