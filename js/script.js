let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// let geometry = new THREE.BoxGeometry();
let geometry = new THREE.SphereGeometry();
let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
material.onBeforeCompile = function(shader) {
    shader.vertexShader = document.getElementById('vertexShader').text;
    shader.fragmentShader = document.getElementById('fragmentShader').text;
}
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.x += .01;
    cube.rotation.y += .01;
}
animate();