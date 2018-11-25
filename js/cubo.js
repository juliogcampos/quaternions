
// criar uma cena
var scene = new THREE.Scene();

// criar uma nova câmera a partir dos seguintes parâmetros
// 1º parâmetro: campo de visão, extensão da cena em degraus
// 2° parâmetro: resolução da câmera
// 3° parâmetro: plano de recorte próximo
// 4° parâmetro: plano de recorte distante
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// criar um renderizador WebGL
var renderer = new THREE.WebGLRenderer();

// configurar resolução do renderizador (largura e altura são as dimensões da janela do navegador)
renderer.setSize(window.innerWidth, window.innerHeight);

// adicionar o renderizador ao elemento da página HTML que possui id="container"
// o renderizador usa um elemento <canvas> para exibir a cena
container.appendChild(renderer.domElement);

// criar uma forma geométrica com pontos (vértices) e preenchimento (faces)
var geometry = new THREE.BoxGeometry(1, 1, 1);

// criar um material para colorir o objeto
var material = new THREE.MeshBasicMaterial({
    color: 0x00ff80,
});

// criar um cubo com forma geométrica e material
var cube = new THREE.Mesh(geometry, material);

// adicionar o cubo a cena
scene.add(cube);

// posicionar a câmera
camera.position.z = 5;

// criar função para rotacionar o cubo continuamente (loop)
// o objeto é rotacionado 60 vezes por segundo após a renderização da cena
var animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
};

// animar a cena
animate();
