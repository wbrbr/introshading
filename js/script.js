let editor = ace.edit('editor');
editor.session.setMode('ace/mode/glsl');

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

let container = document.getElementById('container');
let renderer = new THREE.WebGLRenderer();
// renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setSize(window.innerHeight / 2, window.innerHeight / 2);
container.prepend(renderer.domElement);

let box = new THREE.BoxGeometry();
let sphere = new THREE.SphereGeometry(1, 32, 32);
let plane = new THREE.PlaneGeometry();
let woodTexture = new THREE.TextureLoader().load("res/wood.jpg");
let material = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertexShader').text,
    fragmentShader: editor.getValue(),

    uniforms: {
        LightDirection: {value: new THREE.Vector3(-1., -1., -3.).normalize()},
        LightColor: {value: new THREE.Vector3(1., 1., 1.)},
        WoodTexture: {value: woodTexture}
    }
});
material.onBeforeCompile = function(shader) {
    shader.vertexShader = document.getElementById('vertexShader').text;
    shader.fragmentShader = editor.getValue()
}
let mesh = new THREE.Mesh(sphere, material);
scene.add(mesh);

camera.position.z = +2;

let controls = new OrbitControls(camera, renderer.domElement);


function animate() {
    requestAnimationFrame(animate);
    controls.update();
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

document.getElementById('sphere').addEventListener('click', function() {
    mesh.geometry = sphere;
});

document.getElementById('box').addEventListener('click', function() {
    mesh.geometry = box;
});

document.getElementById('plane').addEventListener('click', function() {
    mesh.geometry = plane;
});

for (let el of document.getElementsByClassName('spoiler')) {
    el.addEventListener('click', function() {
        el.nextElementSibling.style.display = 'block';
    });
}


window.addEventListener('resize', function() {
    renderer.setSize(window.innerHeight / 2, window.innerHeight / 2);
})