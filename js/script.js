let editor = ace.edit('editor');
editor.session.setMode('ace/mode/glsl');

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

let container = document.getElementById('container');
let renderer = new THREE.WebGLRenderer();
// renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setSize(window.innerHeight / 2, window.innerHeight / 2);
container.prepend(renderer.domElement);

// let geometry = new THREE.BoxGeometry();
let geometry = new THREE.SphereGeometry(1, 32, 32);
// TODO: change to MeshBasicMaterial
let material = new THREE.ShaderMaterial();
material.onBeforeCompile = function(shader) {
    shader.vertexShader = document.getElementById('vertexShader').text;
    shader.fragmentShader = editor.getValue()
}
let cube = new THREE.Mesh(geometry, material);
// let axes = new THREE.AxesHelper(30);
// cube.add(axes);
scene.add(cube);

camera.position.z = +2;


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // cube.rotation.x += .01;
    // cube.rotation.y += .01;
}
animate();

editor.resize();
document.getElementById('run').addEventListener('click', function() {
    material.fragmentShader = editor.getValue();
    material.needsUpdate = true;
});

window.addEventListener('resize', function() {
    renderer.setSize(window.innerHeight / 2, window.innerHeight / 2);
})