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
let material = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertexShader').text,
    fragmentShader: editor.getValue(),

    uniforms: {
        uLightDirection: {value: new THREE.Vector3(-1., -1., -3.).normalize()},
        uLightColor: {value: new THREE.Vector3(1., 1., 1.)}
    }
});
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
}
animate();

let gl = renderer.getContext();

editor.resize();
document.getElementById('run').addEventListener('click', function() {
    material.fragmentShader = editor.getValue();
    material.needsUpdate = true;
    renderer.compile(scene, material);
    let program = renderer.info.programs[0];
    let status = gl.getProgramParameter( program.program, gl.LINK_STATUS );
    if (status) {
        document.getElementById('error').textContent = '';
    } else {
        document.getElementById('error').textContent = gl.getShaderInfoLog(program.fragmentShader);
    }
});

window.addEventListener('resize', function() {
    renderer.setSize(window.innerHeight / 2, window.innerHeight / 2);
})