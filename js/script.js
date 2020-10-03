let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// let geometry = new THREE.BoxGeometry();
let geometry = new THREE.SphereGeometry(1, 32, 32);
let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
material.onBeforeCompile = function(shader) {
    shader.vertexShader = document.getElementById('vertexShader').text;
    shader.fragmentShader = document.getElementById('fragmentShader').text;
}
let cube = new THREE.Mesh(geometry, material);
let axes = new THREE.AxesHelper(30);
cube.add(axes);
scene.add(cube);

camera.position.z = +5;
// camera.rotation.y = 3.14;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // cube.rotation.x += .01;
    // cube.rotation.y += .01;
}
animate();