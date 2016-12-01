'use strict';

function runDemo(canvasId) {
	var canvas = document.getElementById(canvasId);
	var engine = new BABYLON.Engine(canvas, true);

	// Cr�ation de la sc�ne
	var scene = new BABYLON.Scene(engine);
		var loader = new BABYLON.AssetsManager(scene);//Obj loader
		BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
	scene.collisionsEnabled = true;

	// Ajout d'une cam�ra et de son contr�leur
    var camera = new BABYLON.FreeCamera("MainCamera", new BABYLON.Vector3(0, 2.5, 5), scene);
    camera.applyGravity = true;
    camera.checkCollisions = true;

	camera.speed = 1;
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

	var light3 = new BABYLON.PointLight("DirLight", new BABYLON.Vector3(0, 10, 160), scene);
	light3.diffuse = new BABYLON.Color3(1, 1, 1);
	light3.specular = new BABYLON.Color3(0.6, 0.6, 0.6);
	light3.intensity = 1.5;

	// On ajoute une skybox
	createSkybox(scene);

	// Enfin la sc�ne de d�mo
	createDemoScene(scene);

	// Creer l obj
	createObj(loader,scene);

	loader.onFinish = function() {
				engine.runRenderLoop(function () {
						scene.render();
				});
		};

	loader.load();
	return scene;
}

function createObj(loader,scene){
	var batman = loader.addMeshTask("bunny", "", "assets/", "bunny.obj");
	batman.onSuccess = function(t){
		t.loadedMeshes.forEach(function(m) {
            m.position.x = 10;
						m.scale = 100;
        });
	};
}

function createSkybox(scene) {
	// Cr�ation d'une material
	var sMaterial = new BABYLON.StandardMaterial("skyboxMaterial", scene);
	sMaterial.backFaceCulling = false;
	sMaterial.reflectionTexture = new BABYLON.CubeTexture("images/skybox/skybox", scene);
	sMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

	// Cr�ation d'un cube avec la material adapt�e
	var skybox = BABYLON.Mesh.CreateBox("skybox", 400, scene);
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

	/*--------------COULOIR 2--------------------*/

	var groundCouloir2 = BABYLON.Mesh.CreateGround("groundCouloir2", 10, 20, 2, scene);
	groundCouloir2.material = new BABYLON.StandardMaterial("gMaterial", scene);
	groundCouloir2.material.diffuseTexture = new BABYLON.Texture("images/ground.png", scene);
	groundCouloir2.position.z = 105;
	groundCouloir2.checkCollisions = true;

	var mur1Couloir2 = BABYLON.Mesh.CreatePlane("mur1Couloir2", 20, scene);
	mur1Couloir2.rotation.y = Math.PI / 2;
	mur1Couloir2.position.z = 105;
	mur1Couloir2.position.x = 5;
	mur1Couloir2.visibility = 0;
	mur1Couloir2.checkCollisions = true;

	var mur2Couloir2 = BABYLON.Mesh.CreatePlane("mur2Couloir2", 20, scene);
	mur2Couloir2.rotation.y = -(Math.PI / 2);
	mur2Couloir2.position.z = 105;
	mur2Couloir2.position.x = -5;
	mur2Couloir2.visibility = 0;
	mur2Couloir2.checkCollisions = true;

	/*----------------SALLE 3-------------------------*/

	var groundSalle3 = BABYLON.Mesh.CreatePlane("groundSalle3", 50, scene);
	groundSalle3.rotation.x = Math.PI / 2;
	groundSalle3.position.z = 140;
	groundSalle3.material = new BABYLON.StandardMaterial("gMaterial", scene);
	groundSalle3.material.diffuseTexture = new BABYLON.Texture("images/ground.png", scene);
	groundSalle3.checkCollisions = true;

	var mur11Salle3 = BABYLON.Mesh.CreatePlane("mur11Salle3", 20, scene);
	mur11Salle3.rotation.x = Math.PI;
	mur11Salle3.position.z = 115;
	mur11Salle3.position.x = 15;
	mur11Salle3.visibility = 0;
	mur11Salle3.checkCollisions = true;

	var mur12Salle3 = BABYLON.Mesh.CreatePlane("mur12Salle3", 20, scene);
	mur12Salle3.rotation.x = Math.PI;
	mur12Salle3.position.z = 115;
	mur12Salle3.position.x = -15;
	mur12Salle3.visibility = 0;
	mur12Salle3.checkCollisions = true;

	var mur2Salle3 = BABYLON.Mesh.CreatePlane("mur2Salle3", 50, scene);
	mur2Salle3.rotation.y = -(Math.PI / 2);
	mur2Salle3.position.y = 20;
	mur2Salle3.position.x = -25;
	mur2Salle3.position.z = 140;
	mur2Salle3.visibility = 0;
	mur2Salle3.checkCollisions = true;

	var mur31Salle3 = BABYLON.Mesh.CreatePlane("mur31Salle3", 50, scene);
	mur31Salle3.rotation.z = Math.PI / 2;
	mur31Salle3.position.z = 165;
	mur31Salle3.position.y = 20;
	mur31Salle3.visibility = 0;
	mur31Salle3.checkCollisions = true;

	var mur4Salle3 = BABYLON.Mesh.CreatePlane("mur4Salle3", 50, scene);
	mur4Salle3.rotation.y = Math.PI / 2;
	mur4Salle3.position.y = 20;
	mur4Salle3.position.x = 25;
	mur4Salle3.position.z = 140;
	mur4Salle3.visibility = 0;
	mur4Salle3.checkCollisions = true;

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
