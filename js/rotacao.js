// declaração de variáveis
var camera, scene, renderer, labelRenderer, earth, moon;

// criar objeto para acompanhar tempo
var clock = new THREE.Clock();

// criar objeto para carregar textura
var textureLoader = new THREE.TextureLoader();

// executar funções
init();
animate();

// função que define configurações de cena, câmera e objetos rotacionados
function init() {

    // definir raios da terra e da lua
    var EARTH_RADIUS = 1;
    var MOON_RADIUS = 0.27;

    // configurar parâmetros da câmera e sua posição
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(10, 5, 20);

    // criar controles de órbita que permitem a câmera orbitar em torno de um alvo
    var controls = new THREE.OrbitControls(camera);

    // criar uma cena
    scene = new THREE.Scene();

    // criar luz direcional, definir cor e intensidade
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.5);

    // definir posição da luz direcional e adicionar a cena
    dirLight.position.set(0, 0, 1);
    scene.add(dirLight);

    // criar objeto de eixo para visualizar três eixos e adicionar a cena
    // o eixo X é vermelho, o eixo Y é verde e o eixo Z é azul
    var axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // criar um objeto esférico (terra) com número de segumentos horizontais e verticais
    var earthGeometry = new THREE.SphereBufferGeometry(EARTH_RADIUS, 16, 16);

    // criar material para superfícies brilhantes e definir parâmetros
    var earthMaterial = new THREE.MeshPhongMaterial({
        specular: 0x777777, // cor do material
        shininess: 10, // intensidade do brilho. o padrão é 30
        map: textureLoader.load('img/earth_atmos_2048.jpg'), // mapa de cores
        specularMap: textureLoader.load('img/earth_specular_2048.jpg'), // textura do mapa especular
        normalMap: textureLoader.load('img/earth_normal_2048.jpg'), // textura para criar um mapa normal
        normalScale: new THREE.Vector2(0, 1) //  quanto o mapa normal afeta o material. intervaloss típicos: 0,1
    });

    // criar objeto baseado em malha de polígono triangular e adicionar a cena
    // definir como parâmetros do contrutor da classe uma geometria e um material
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // criar um objeto esférico (lua) com número de segumentos horizontais e verticais
    var moonGeometry = new THREE.SphereBufferGeometry(MOON_RADIUS, 16, 16);

    // criar material para superfícies brilhantes e definir parâmetros
    var moonMaterial = new THREE.MeshPhongMaterial({
        shininess: 30, // intensidade do brilho. o padrão é 30
        map: textureLoader.load('img/moon_1024.jpg') // mapa de cores
    });

    // criar objeto baseado em malha de polígono triangular e adicionar a cena
    // definir como parâmetros do contrutor da classe uma geometria e um material
    moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);

    // criar uma legenda de texto em HTML para a terra 
    // definir estilos dinamicamente com CSS
    var earthDiv = document.createElement('div');
    earthDiv.className = 'label';
    earthDiv.textContent = 'Terra';
    earthDiv.style.marginTop = '1em';
    earthDiv.style.background = 'black';

    // criar renderizador CSS2D para a div terra
    // definir posição e adicionar ao objeto terra
    var earthLabel = new THREE.CSS2DObject(earthDiv);
    earthLabel.position.set(0, EARTH_RADIUS, 0);
    earth.add(earthLabel);

    // criar uma legenda de texto em HTML para a lua
    // definir estilos dinamicamente com CSS
    var moonDiv = document.createElement('div');
    moonDiv.className = 'label';
    moonDiv.textContent = 'Lua';
    moonDiv.style.marginTop = '1em';

    // criar renderizador CSS2D para a div lua
    // definir posição e adicionar ao objeto lua
    var moonLabel = new THREE.CSS2DObject(moonDiv);
    moonLabel.position.set(0, MOON_RADIUS, 0);
    moon.add(moonLabel);

    // criar um rederizadr WebGL (Web Graphics Library)
    renderer = new THREE.WebGLRenderer();

    // definir proporção de pixels
    renderer.setPixelRatio(window.devicePixelRatio);

    // definir tamanho da tela de saída
    renderer.setSize(window.innerWidth, window.innerHeight);

    // adicionar renderizador a div container no HTML
    container.appendChild(renderer.domElement);

    // criar renderizador CSS 2D
    labelRenderer = new THREE.CSS2DRenderer();

    // definir tamanho da tela de saída
    labelRenderer.setSize(window.innerWidth, window.innerHeight);

    // definir posição do objeto como absoluta na página
    labelRenderer.domElement.style.position = 'absolute';

    // posicionar no topo o renderizador
    labelRenderer.domElement.style.top = 0;

    // setar no css o z-index da nav para 100 para sobrepor a div container
    labelRenderer.domElement.style.zIndex = 0; 

    // adicionar renderizador a div container no HTML
    container.appendChild(labelRenderer.domElement);
}

// função que posiciona a lua e renderiza a cena
function animate() {
    requestAnimationFrame(animate);
    var elapsed = clock.getElapsedTime();
    moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5);
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}