let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

let container = document.getElementById('container');
let renderer = new THREE.WebGLRenderer();
// renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setSize(window.innerWidth / 3., window.innerWidth / 3);
container.prepend(renderer.domElement);

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


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // cube.rotation.x += .01;
    // cube.rotation.y += .01;
}
animate();

let editor = ace.edit('editor');
editor.session.setMode('ace/mode/glsl');
ace.resize();