'use strict';

function runDemo(canvasId) {
	var canvas = document.getElementById(canvasId);
	var engine = new BABYLON.Engine(canvas, true);

	// Cr�ation de la sc�ne
	var scene = new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
	scene.collisionsEnabled = true;

	// Ajout d'une cam�ra et de son contr�leur
    var camera = new BABYLON.FreeCamera("MainCamera", new BABYLON.Vector3(0, 2.5, 5), scene);
    camera.applyGravity = true;
    camera.checkCollisions = true;

	camera.speed = 0.5;
	camera.angularSensibility = 1000;

	camera.keysUp = [90]; // Touche Z
	camera.keysDown = [83]; // Touche S
	camera.keysLeft = [81]; // Touche Q
	camera.keysRight = [68]; // Touche D;
	scene.activeCamera.attachControl(canvas);

	if(camera.position.x>2){
		camera.position.x=2;
	}else if(camera.position.x<-2){
		camera.position.x=-2;
	}

	// Ajout d'une lumi�re
	var light = new BABYLON.PointLight("DirLight", new BABYLON.Vector3(0, 10, 0), scene);
	light.diffuse = new BABYLON.Color3(1, 1, 1);
	light.specular = new BABYLON.Color3(0.6, 0.6, 0.6);
	light.intensity = 1.5;

	var light2 = new BABYLON.PointLight("DirLight", new BABYLON.Vector3(0, 10, 80), scene);
	light2.diffuse = new BABYLON.Color3(1, 1, 1);
	light2.specular = new BABYLON.Color3(0.6, 0.6, 0.6);
	light2.intensity = 1.5;

	// On ajoute une skybox
	createSkybox(scene);

	// Enfin la sc�ne de d�mo
	createDemoScene(scene);

	// Creer l obj
	//createObj(scene);

	// Lancement de la boucle principale
	engine.runRenderLoop(function() {
		scene.render();
	});
}

// function createObj(scene){
// 	var loader = new BABYLON.AssetsManager(scene);
// 	var batman = loader.addMeshTask("bunny", "", "assets/", "bunny.obj");
// 	batman.position.x = 10;
// 	batman.position.z = 10;
//
// 	loader.onFinish = function() {
//         engine.runRenderLoop(function () {
//             scene.render();
//         });
//     };
//
//     loader.load();
// }

function createSkybox(scene) {
	// Cr�ation d'une material
	var sMaterial = new BABYLON.StandardMaterial("skyboxMaterial", scene);
	sMaterial.backFaceCulling = false;
	sMaterial.reflectionTexture = new BABYLON.CubeTexture("images/skybox/skybox", scene);
	sMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

	// Cr�ation d'un cube avec la material adapt�e
	var skybox = BABYLON.Mesh.CreateBox("skybox", 250, scene);
	skybox.material = sMaterial;
}



function createDemoScene(scene) {
	// Cr�ation d'un sol
	var ground = BABYLON.Mesh.CreatePlane("ground", 50, scene);
	ground.rotation.x = Math.PI / 2;
	ground.material = new BABYLON.StandardMaterial("gMaterial", scene);
	ground.material.diffuseTexture = new BABYLON.Texture("images/ground.png", scene);
	ground.checkCollisions = true;

	var mur1 = BABYLON.Mesh.CreatePlane("mur1", 50, scene);
	mur1.rotation.y = Math.PI / 2;
	mur1.position.y = 20;
	mur1.position.x = 25;
	mur1.visibility = 0;
	mur1.checkCollisions = true;

	var mur2 = BABYLON.Mesh.CreatePlane("mur2", 50, scene);
	mur2.rotation.y = -(Math.PI / 2);
	mur2.position.y = 20;
	mur2.position.x = -25;
	mur2.visibility = 0;
	mur2.checkCollisions = true;

	var mur3 = BABYLON.Mesh.CreatePlane("mur3", 50, scene);
	mur3.rotation.z = Math.PI / 2;
	mur3.position.z = 25;
	mur3.visibility = 0;
	mur3.checkCollisions = true;

	var mur4 = BABYLON.Mesh.CreatePlane("mur4", 50, scene);
	mur4.rotation.x = Math.PI;
	mur4.position.z = -25;
	mur4.visibility = 0;
	mur4.checkCollisions = true;

	/*-----------------SALLE 2----------------------------------*/

	var groundSalle2 = BABYLON.Mesh.CreatePlane("groundSalle2", 50, scene);
	groundSalle2.rotation.x = Math.PI / 2;
	groundSalle2.position.z = 70;
	groundSalle2.material = new BABYLON.StandardMaterial("gMaterial", scene);
	groundSalle2.material.diffuseTexture = new BABYLON.Texture("images/ground.png", scene);
	groundSalle2.checkCollisions = true;

	var mur11Salle2 = BABYLON.Mesh.CreatePlane("mur11Salle2", 20, scene);
	mur11Salle2.rotation.x = Math.PI;
	mur11Salle2.position.z = 45;
	mur11Salle2.position.x = 15;
	mur11Salle2.visibility = 0;
	mur11Salle2.checkCollisions = true;

	var mur12Salle2 = BABYLON.Mesh.CreatePlane("mur12Salle2", 20, scene);
	mur12Salle2.rotation.x = Math.PI;
	mur12Salle2.position.z = 45;
	mur12Salle2.position.x = -15;
	mur12Salle2.visibility = 0;
	mur12Salle2.checkCollisions = true;

	var mur2Salle2 = BABYLON.Mesh.CreatePlane("mur2Salle2", 50, scene);
	mur2Salle2.rotation.y = -(Math.PI / 2);
	mur2Salle2.position.y = 20;
	mur2Salle2.position.x = -25;
	mur2Salle2.position.z = 70;
	mur2Salle2.visibility = 0;
	mur2Salle2.checkCollisions = true;

	var mur31Salle1 = BABYLON.Mesh.CreatePlane("mur31Salle1", 20, scene);
	mur31Salle1.rotation.z = Math.PI / 2;
	mur31Salle1.position.z = 95;
	mur31Salle1.position.x = -15;
	mur31Salle1.visibility = 0;
	mur31Salle1.checkCollisions = true;

	var mur32Salle1 = BABYLON.Mesh.CreatePlane("mur32Salle1", 20, scene);
	mur32Salle1.rotation.z = Math.PI / 2;
	mur32Salle1.position.z = 95;
	mur32Salle1.position.x = 15;
	mur32Salle1.visibility = 0;
	mur32Salle1.checkCollisions = true;

	var mur4Salle2 = BABYLON.Mesh.CreatePlane("mur4Salle2", 50, scene);
	mur4Salle2.rotation.y = Math.PI / 2;
	mur4Salle2.position.y = 20;
	mur4Salle2.position.x = 25;
	mur4Salle2.position.z = 70;
	mur4Salle2.visibility = 0;
	mur4Salle2.checkCollisions = true;

	// Et quelques cubes...
	var boxMaterial = new BABYLON.StandardMaterial("bMaterial", scene);
	boxMaterial.diffuseTexture = new BABYLON.Texture("images/box.png", scene);

	var positions = [
		{ x: -15, z: 15 },
		{ x: -15, z: -15 },
		{ x: 15, z: 15 },
		{ x: 15, z: -15 }
	];

	var cubeSize = 2.5;

	for (var i = 0; i < 4; i++) {
		var box = BABYLON.Mesh.CreateBox("box1", cubeSize, scene);
		box.position = new BABYLON.Vector3(positions[i].x, cubeSize / 2, positions[i].z);
		box.material = boxMaterial;
		box.checkCollisions = true;
	}
}
