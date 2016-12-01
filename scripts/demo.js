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

	// Ajout d'une lumi�re
	var light = new BABYLON.PointLight("DirLight", new BABYLON.Vector3(0, 10, 0), scene);
	light.diffuse = new BABYLON.Color3(1, 1, 1);
	light.specular = new BABYLON.Color3(0.6, 0.6, 0.6);
	light.intensity = 1.5;

	// On ajoute une skybox
	createSkybox(scene);

	// Enfin la sc�ne de d�mo
	createDemoScene(scene);

	// Lancement de la boucle principale
	engine.runRenderLoop(function() {
		scene.render();
	});
}

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
	/*---------------------SALLE 1 -------------------------------*/
	var groundSalle1 = BABYLON.Mesh.CreatePlane("groundSalle1", 50, scene);
	groundSalle1.rotation.x = Math.PI / 2;
	groundSalle1.material = new BABYLON.StandardMaterial("gMaterial", scene);
	groundSalle1.material.diffuseTexture = new BABYLON.Texture("images/ground.png", scene);
	groundSalle1.checkCollisions = true;

	var mur1Salle1 = BABYLON.Mesh.CreatePlane("mur1Salle1", 50, scene);
	mur1Salle1.rotation.y = Math.PI / 2;
	mur1Salle1.position.y = 20;
	mur1Salle1.position.x = 25;
	mur1Salle1.visibility = 0;
	mur1Salle1.checkCollisions = true;

	var mur2Salle1 = BABYLON.Mesh.CreatePlane("mur2Salle1", 50, scene);
	mur2Salle1.rotation.y = -(Math.PI / 2);
	mur2Salle1.position.y = 20;
	mur2Salle1.position.x = -25;
	mur2Salle1.visibility = 0;
	mur2Salle1.checkCollisions = true;

	var mur31Salle1 = BABYLON.Mesh.CreatePlane("mur31Salle1", 20, scene);
	mur31Salle1.rotation.z = Math.PI / 2;
	mur31Salle1.position.z = 25;
	mur31Salle1.position.x = -15;
	mur31Salle1.visibility = 0;
	mur31Salle1.checkCollisions = true;

	var mur32Salle1 = BABYLON.Mesh.CreatePlane("mur32Salle1", 20, scene);
	mur32Salle1.rotation.z = Math.PI / 2;
	mur32Salle1.position.z = 25;
	mur32Salle1.position.x = 15;
	mur32Salle1.visibility = 0;
	mur32Salle1.checkCollisions = true;

	var mur4Salle1 = BABYLON.Mesh.CreatePlane("mur4Salle1", 50, scene);
	mur4Salle1.rotation.x = Math.PI;
	mur4Salle1.position.z = -25;
	mur4Salle1.visibility = 0;
	mur4Salle1.checkCollisions = true;

	/*---------------------COULOIR 1 -------------------------------*/
	var groundCouloir1 = BABYLON.Mesh.CreateGround("groundCouloir1", 10, 20, 2, scene);
	groundCouloir1.material = new BABYLON.StandardMaterial("gMaterial", scene);
	groundCouloir1.material.diffuseTexture = new BABYLON.Texture("images/ground.png", scene);
	groundCouloir1.position.z = 35;
	groundCouloir1.checkCollisions = true;

	var mur1Couloir1 = BABYLON.Mesh.CreatePlane("mur1Couloir1", 20, scene);
	mur1Couloir1.rotation.y = Math.PI / 2;
	mur1Couloir1.position.z = 35;
	mur1Couloir1.position.x = 5;
	mur1Couloir1.visibility = 0;
	mur1Couloir1.checkCollisions = true;

	var mur2Couloir1 = BABYLON.Mesh.CreatePlane("mur2Couloir1", 20, scene);
	mur2Couloir1.rotation.y = -(Math.PI / 2);
	mur2Couloir1.position.z = 35;
	mur2Couloir1.position.x = -5;
	mur2Couloir1.visibility = 0;
	mur2Couloir1.checkCollisions = true;

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
