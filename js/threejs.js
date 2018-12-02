
// Implementação de um quatérnio
// Documentação: https://threejs.org/docs/#api/en/math/Quaternion

// criar um quatérnio
var quaternion = new THREE.Quaternion();

// definir rotação do quatérnio por um eixo e ângulo
// o eixo é considerado normalizado, o ângulo é dado em radianos
// o eixo y foi definido para a rotação
quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

// criar um vetor 3D (x,y,z) e aplicar rotação
var vector = new THREE.Vector3(1, 0, 0);
vector.applyQuaternion(quaternion);

document.getElementById("quaternion").innerHTML = JSON.stringify(quaternion, null, "	");
document.getElementById("vector").innerHTML = JSON.stringify(vector, null, "	");