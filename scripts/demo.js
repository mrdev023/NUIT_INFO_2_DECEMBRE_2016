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
	var stone = new BABYLON.StandardMaterial("stone", scene);
	stone.diffuseTexture = new BABYLON.Texture("images/tileable9.png", scene);

	var wood = new BABYLON.StandardMaterial("wood", scene);
	wood.diffuseTexture = new BABYLON.Texture("images/wood.jpg", scene);

	var house = loader.addMeshTask("house1", "", "assets/", "house.obj");
	house.onSuccess = function(t){
		t.loadedMeshes.forEach(function(m) {//m = model
            m.position.x = -10;
						m.position.y = -5;
						m.position.z = -10;
						m.material = stone;
						m.scaling = new BABYLON.Vector3(3, 3, 3);
						m.checkCollisions = true;
        });
	};
	var house2 = loader.addMeshTask("house2", "", "assets/", "house.obj");
	house2.onSuccess = function(t){
		t.loadedMeshes.forEach(function(m) {//m = model
            m.position.x = 10;
						m.position.y = -5;
						m.material = stone;
						m.position.z = 10;
						m.scaling = new BABYLON.Vector3(3, 3, 3);
						m.checkCollisions = true;
        });
	};
	var f = BABYLON.Mesh.CreateBox("f1", 0.01, scene);
	f.position = new BABYLON.Vector3(5, 0.0, 15);
		createParticle(f,scene);
		var f2 = BABYLON.Mesh.CreateBox("f2", 0.01, scene);
		f2.position = new BABYLON.Vector3(-10, 0.0, -5);
			createParticle(f2,scene);

	var house3 = loader.addMeshTask("house2", "", "assets/", "house.obj");
	house3.onSuccess = function(t){
		t.loadedMeshes.forEach(function(m) {//m = model
            m.position.x = 10;
						m.position.y = -5;
						m.material = stone;
						m.position.z = 130;
						m.position.x = 10;
						m.scaling = new BABYLON.Vector3(3, 3, 3);
						m.checkCollisions = true;
        });
	};

	var house3 = loader.addMeshTask("house2", "", "assets/", "house.obj");
	house3.onSuccess = function(t){
		t.loadedMeshes.forEach(function(m) {//m = model
            m.position.x = 10;
						m.position.y = -5;
						m.material = stone;
						m.position.z = 150;
						m.position.x = -10;
						m.scaling = new BABYLON.Vector3(3, 3, 3);
						m.checkCollisions = true;
        });
	};

	var boat1 = loader.addMeshTask("boat1", "", "assets/", "Cannoe.obj");
	boat1.onSuccess = function(t){
		t.loadedMeshes.forEach(function(m) {//m = model
            m.position.x = 0;
						m.position.y = -11;
						m.material = wood;
						m.position.z = 60;
						m.rotation.z = Math.PI/16;
						m.scaling = new BABYLON.Vector3(3, 3, 3);
						m.checkCollisions = true;
        });
	};

	var boat2 = loader.addMeshTask("boat1", "", "assets/", "Cannoe.obj");
	boat2.onSuccess = function(t){
		t.loadedMeshes.forEach(function(m) {//m = model
            m.position.x = 0;
						m.position.y = -11;
						m.position.x = -10;
						m.material = wood;
						m.position.z = 80;
						m.rotation.z = Math.PI/16;
						m.rotation.y = Math.PI / 2;
						m.scaling = new BABYLON.Vector3(3, 3, 3);
						m.checkCollisions = true;
        });
	};
	// BABYLON.SceneLoader.ImportMesh("test", "assets/", "house.babylon", scene, function (newMeshes){
	// 	modele = newMeshes;
	// 	modele.rotation.x = 10;
	// });
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

function createParticle(object,scene){
	//Smoke
	var smokeSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
	smokeSystem.particleTexture = new BABYLON.Texture("images/flare.png", scene);
	smokeSystem.emitter = object; // the starting object, the emitter
    smokeSystem.minEmitBox = new BABYLON.Vector3(-1, 1, -1); // Starting all from
    smokeSystem.maxEmitBox = new BABYLON.Vector3(1, 1, 1); // To...

	smokeSystem.color1 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
    smokeSystem.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
    smokeSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

	smokeSystem.minSize = 0.5;
    smokeSystem.maxSize = 2;

    smokeSystem.minLifeTime = 0.3;
    smokeSystem.maxLifeTime = 1.5;

    smokeSystem.emitRate = 500;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    smokeSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    smokeSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    smokeSystem.direction1 = new BABYLON.Vector3(0, 8, 0);
    smokeSystem.direction2 = new BABYLON.Vector3(0, 8, 0);

    smokeSystem.minAngularSpeed = 0;
	   smokeSystem.maxAngularSpeed = Math.PI;

    smokeSystem.minEmitPower = 1;
    smokeSystem.maxEmitPower = 2;
    smokeSystem.updateSpeed = 0.005;

    smokeSystem.start();



    // Create a particle system
    var fireSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

    //Texture of each particle
    fireSystem.particleTexture = new BABYLON.Texture("images/flare.png", scene);

    // Where the particles come from
    fireSystem.emitter = object; // the starting object, the emitter
    fireSystem.minEmitBox = new BABYLON.Vector3(-0.5, 1, -0.5); // Starting all from
    fireSystem.maxEmitBox = new BABYLON.Vector3(0.5, 1, 0.5); // To...

    // Colors of all particles
    fireSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
    fireSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
    fireSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

    // Size of each particle (random between...
    fireSystem.minSize = 0.5;
    fireSystem.maxSize = 1;

    // Life time of each particle (random between...
    fireSystem.minLifeTime = 0.2;
    fireSystem.maxLifeTime = 0.4;

    // Emission rate
    fireSystem.emitRate = 500;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    fireSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    fireSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    // Direction of each particle after it has been emitted
    fireSystem.direction1 = new BABYLON.Vector3(0, 8, 0);
    fireSystem.direction2 = new BABYLON.Vector3(0, 8, 0);

    // Angular speed, in radians
    fireSystem.minAngularSpeed = 0;
    fireSystem.maxAngularSpeed = Math.PI;

    // Speed
    fireSystem.minEmitPower = 1;
    fireSystem.maxEmitPower = 3;
    fireSystem.updateSpeed = 0.005;

    // Start the particle system
    fireSystem.start();
}

function createDemoScene(scene) {

	// Cr�ation d'un sol

	var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
	groundMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

	var groundMaterial1 = new BABYLON.StandardMaterial("groundMaterial1", scene);
	groundMaterial1.diffuseTexture = new BABYLON.Texture("images/groundSable.png", scene);
	groundMaterial1.diffuseTexture.uScale = 6;
	groundMaterial1.diffuseTexture.vScale = 6;
	groundMaterial1.specularColor = new BABYLON.Color3(0, 0, 0);

	var wall = new BABYLON.StandardMaterial("wall", scene);
	wall.diffuseTexture = new BABYLON.Texture("images/skybox/skybox_nx.jpg", scene);
	wall.diffuseTexture.uScale = 1;
	wall.diffuseTexture.vScale = 1;
	wall.specularColor = new BABYLON.Color3(0, 0, 0);

	var ground = BABYLON.Mesh.CreatePlane("ground", 50, scene);
	ground.rotation.x = Math.PI / 2;
	ground.material = new BABYLON.StandardMaterial("gMaterial", scene);
	ground.material = groundMaterial1;
	ground.checkCollisions = true;

	var mur1 = BABYLON.Mesh.CreatePlane("mur1", 50, scene);
	mur1.rotation.y = Math.PI / 2;
	mur1.position.y = -15;
	mur1.position.x = 25;
	mur1.visibility = 1;
	mur1.material = wall;
	mur1.checkCollisions = true;

	var mur2 = BABYLON.Mesh.CreatePlane("mur2", 50, scene);
	mur2.rotation.y = -(Math.PI / 2);
	mur2.position.y = -15;
	mur2.position.x = -25;
	mur2.visibility = 1;
	mur2.material = wall;
	mur2.checkCollisions = true;

	var mur31Salle1 = BABYLON.Mesh.CreatePlane("mur31Salle1", 20, scene);
	mur31Salle1.rotation.z = Math.PI / 2;
	mur31Salle1.position.z = 25;
	mur31Salle1.position.x = -15;
	mur31Salle1.visibility = 1;
	mur31Salle1.material = wall;
	mur31Salle1.checkCollisions = true;

	var mur32Salle1 = BABYLON.Mesh.CreatePlane("mur32Salle1", 20, scene);
	mur32Salle1.rotation.z = Math.PI / 2;
	mur32Salle1.position.z = 25;
	mur32Salle1.position.x = 15;
	mur32Salle1.visibility = 1;
	mur32Salle1.material = wall;
	mur32Salle1.checkCollisions = true;

	var mur4 = BABYLON.Mesh.CreatePlane("mur4", 50, scene);
	mur4.rotation.x = Math.PI;
	mur4.position.z = -25;
	mur4.position.y = -15;
	mur4.visibility = 1;
	mur4.material = wall;
	mur4.checkCollisions = true;

	/*--------------COULOIR 1--------------------*/

	var textCouloir1 = new BABYLON.StandardMaterial("texture3", scene);
    textCouloir1.diffuseTexture = new BABYLON.Texture("images/textCouloir1.png", scene);
	textCouloir1.specularColor = new BABYLON.Color3(0, 0, 0);

	var textCouloir11 = new BABYLON.StandardMaterial("texture4", scene);
	textCouloir11.diffuseTexture = new BABYLON.Texture("images/noir.png", scene);
	textCouloir11.specularColor = new BABYLON.Color3(0, 0, 0);

	var groundCouloir1 = BABYLON.Mesh.CreateGround("groundCouloir1", 10, 20, 2, scene);
	groundCouloir1.material = new BABYLON.StandardMaterial("gMaterial", scene);
	groundCouloir1.material = groundMaterial;
	groundCouloir1.position.z = 35;
	groundCouloir1.checkCollisions = true;

	var mur1Couloir1 = BABYLON.Mesh.CreatePlane("mur1Couloir1", 20, scene);
	mur1Couloir1.material = textCouloir1;
	mur1Couloir1.rotation.y = Math.PI / 2;
	mur1Couloir1.position.z = 35;
	mur1Couloir1.position.x = 5;
	mur1Couloir1.visibility = 1;
	mur1Couloir1.checkCollisions = true;

	var mur2Couloir1 = BABYLON.Mesh.CreatePlane("mur2Couloir1", 20, scene);
	mur2Couloir1.material = textCouloir11;
	mur2Couloir1.rotation.y = -(Math.PI / 2);
	mur2Couloir1.position.z = 35;
	mur2Couloir1.position.x = -5;
	mur2Couloir1.visibility = 1;
	mur2Couloir1.checkCollisions = true;

	/*-----------------SALLE 2----------------------------------*/

	var groundMaterial2 = new BABYLON.StandardMaterial("groundMaterial2", scene);
	groundMaterial2.diffuseTexture = new BABYLON.Texture("images/groundEau.jpg", scene);
	groundMaterial2.diffuseTexture.uScale = 6;
	groundMaterial2.diffuseTexture.vScale = 6;
	groundMaterial2.specularColor = new BABYLON.Color3(0, 0, 0);

	var groundSalle2 = BABYLON.Mesh.CreatePlane("groundSalle2", 50, scene);
	groundSalle2.rotation.x = Math.PI / 2;
	groundSalle2.position.z = 70;
	groundSalle2.material = new BABYLON.StandardMaterial("gMaterial", scene);
	groundSalle2.material = groundMaterial2;
	groundSalle2.checkCollisions = true;

	var mur11Salle2 = BABYLON.Mesh.CreatePlane("mur11Salle2", 20, scene);
	mur11Salle2.rotation.x = Math.PI;
	mur11Salle2.position.z = 45;
	mur11Salle2.position.x = 15;
	mur11Salle2.visibility = 1;
	mur11Salle2.material = wall;
	mur11Salle2.checkCollisions = true;

	var mur12Salle2 = BABYLON.Mesh.CreatePlane("mur12Salle2", 20, scene);
	mur12Salle2.rotation.x = Math.PI;
	mur12Salle2.position.z = 45;
	mur12Salle2.position.x = -15;
	mur12Salle2.visibility = 1;
	mur12Salle2.material = wall;
	mur12Salle2.checkCollisions = true;

	var mur2Salle2 = BABYLON.Mesh.CreatePlane("mur2Salle2", 50, scene);
	mur2Salle2.rotation.y = -(Math.PI / 2);
	mur2Salle2.position.y = -15;
	mur2Salle2.position.x = -25;
	mur2Salle2.position.z = 70;
	mur2Salle2.visibility = 1;
	mur2Salle2.material = wall;
	mur2Salle2.checkCollisions = true;

	var mur31Salle1 = BABYLON.Mesh.CreatePlane("mur31Salle1", 20, scene);
	mur31Salle1.rotation.z = Math.PI / 2;
	mur31Salle1.position.z = 95;
	mur31Salle1.position.x = -15;
	mur31Salle1.visibility = 1;
	mur31Salle1.material = wall;
	mur31Salle1.checkCollisions = true;

	var mur32Salle1 = BABYLON.Mesh.CreatePlane("mur32Salle1", 20, scene);
	mur32Salle1.rotation.z = Math.PI / 2;
	mur32Salle1.position.z = 95;
	mur32Salle1.position.x = 15;
	mur32Salle1.visibility = 1;
	mur32Salle1.material = wall;
	mur32Salle1.checkCollisions = true;

	var mur4Salle2 = BABYLON.Mesh.CreatePlane("mur4Salle2", 50, scene);
	mur4Salle2.rotation.y = Math.PI / 2;
	mur4Salle2.position.y = -15;
	mur4Salle2.position.x = 25;
	mur4Salle2.position.z = 70;
	mur4Salle2.visibility = 1;
	mur4Salle2.material = wall;
	mur4Salle2.checkCollisions = true;

	/*--------------COULOIR 2--------------------*/

	var textCouloir2 = new BABYLON.StandardMaterial("texture5", scene);
    textCouloir2.diffuseTexture = new BABYLON.Texture("images/textCouloir2.png", scene);
	textCouloir2.specularColor = new BABYLON.Color3(0, 0, 0);

	var groundCouloir2 = BABYLON.Mesh.CreateGround("groundCouloir2", 10, 20, 2, scene);
	groundCouloir2.material = new BABYLON.StandardMaterial("gMaterial", scene);
	groundCouloir2.material = groundMaterial;
	groundCouloir2.position.z = 105;
	groundCouloir2.checkCollisions = true;

	var mur1Couloir2 = BABYLON.Mesh.CreatePlane("mur1Couloir2", 20, scene);
	mur1Couloir2.rotation.y = Math.PI / 2;
	mur1Couloir2.position.z = 105;
	mur1Couloir2.position.x = 5;
	mur1Couloir2.visibility = 1;
	mur1Couloir2.material = textCouloir2;
	mur1Couloir2.checkCollisions = true;

	var mur2Couloir2 = BABYLON.Mesh.CreatePlane("mur2Couloir2", 20, scene);
	mur2Couloir2.rotation.y = -(Math.PI / 2);
	mur2Couloir2.position.z = 105;
	mur2Couloir2.position.x = -5;
	mur2Couloir2.visibility = 1;
	mur2Couloir2.material = textCouloir11;
	mur2Couloir2.checkCollisions = true;

	/*----------------SALLE 3-------------------------*/

	var groundMaterial3 = new BABYLON.StandardMaterial("groundMaterial3", scene);
	groundMaterial3.diffuseTexture = new BABYLON.Texture("images/groundTerre.png", scene);
	groundMaterial3.diffuseTexture.uScale = 6;
	groundMaterial3.diffuseTexture.vScale = 6;
	groundMaterial3.specularColor = new BABYLON.Color3(0, 0, 0);

	var groundSalle3 = BABYLON.Mesh.CreatePlane("groundSalle3", 50, scene);
	groundSalle3.rotation.x = Math.PI / 2;
	groundSalle3.position.z = 140;
	groundSalle3.material = new BABYLON.StandardMaterial("gMaterial", scene);
	groundSalle3.material = groundMaterial3;
	groundSalle3.checkCollisions = true;

	var mur11Salle3 = BABYLON.Mesh.CreatePlane("mur11Salle3", 20, scene);
	mur11Salle3.rotation.x = Math.PI;
	mur11Salle3.position.z = 115;
	mur11Salle3.position.x = 15;
	mur11Salle3.visibility = 1;
	mur11Salle3.material = wall;
	mur11Salle3.checkCollisions = true;

	var mur12Salle3 = BABYLON.Mesh.CreatePlane("mur12Salle3", 20, scene);
	mur12Salle3.rotation.x = Math.PI;
	mur12Salle3.position.z = 115;
	mur12Salle3.position.x = -15;
	mur12Salle3.visibility = 1;
	mur12Salle3.material = wall;
	mur12Salle3.checkCollisions = true;

	var mur2Salle3 = BABYLON.Mesh.CreatePlane("mur2Salle3", 50, scene);
	mur2Salle3.rotation.y = -(Math.PI / 2);
	mur2Salle3.position.y = -15;
	mur2Salle3.position.x = -25;
	mur2Salle3.position.z = 140;
	mur2Salle3.visibility = 1;
	mur2Salle3.material = wall;
	mur2Salle3.checkCollisions = true;

	var mur31Salle3 = BABYLON.Mesh.CreatePlane("mur31Salle3", 50, scene);
	mur31Salle3.rotation.z = Math.PI / 2;
	mur31Salle3.position.z = 165;
	mur31Salle3.position.y = -15;
	mur31Salle3.visibility = 1;
	mur31Salle3.material = wall;
	mur31Salle3.checkCollisions = true;

	var mur4Salle3 = BABYLON.Mesh.CreatePlane("mur4Salle3", 50, scene);
	mur4Salle3.rotation.y = Math.PI / 2;
	mur4Salle3.position.y = -15;
	mur4Salle3.position.x = 25;
	mur4Salle3.position.z = 140;
	mur4Salle3.visibility = 1;
	mur4Salle3.material = wall;
	mur4Salle3.checkCollisions = true;

	
	var box = new BABYLON.Mesh.CreateBox("crate", 2, scene);
    box.material = new BABYLON.StandardMaterial("Mat", scene);
    box.material.diffuseTexture = new BABYLON.Texture("images/box.png", scene);
    box.position = new BABYLON.Vector3(20, 1, 140);

	var box2 = new BABYLON.Mesh.CreateBox("crate", 2, scene);
    box2.material = new BABYLON.StandardMaterial("Mat", scene);
    box2.material.diffuseTexture = new BABYLON.Texture("images/box.png", scene);
    box2.material.diffuseTexture.hasAlpha = true;
    box2.position = new BABYLON.Vector3(10, 1, 140);

	var box3 = new BABYLON.Mesh.CreateBox("crate", 2, scene);
    box3.material = new BABYLON.StandardMaterial("Mat", scene);
    box3.material.diffuseTexture = new BABYLON.Texture("images/box.png", scene);
    box3.material.diffuseTexture.hasAlpha = true;
    box3.position = new BABYLON.Vector3(20, 1, 130);

	var box4 = new BABYLON.Mesh.CreateBox("crate", 2, scene);
    box4.material = new BABYLON.StandardMaterial("Mat", scene);
    box4.material.diffuseTexture = new BABYLON.Texture("images/box.png", scene);
    box4.material.diffuseTexture.hasAlpha = true;
    box4.position = new BABYLON.Vector3(-20, 1, 130);

	var box5 = new BABYLON.Mesh.CreateBox("crate", 2, scene);
    box5.material = new BABYLON.StandardMaterial("Mat", scene);
    box5.material.diffuseTexture = new BABYLON.Texture("images/box.png", scene);
    box5.material.diffuseTexture.hasAlpha = true;
    box5.position = new BABYLON.Vector3(-30, 1, 150);

	var box6 = new BABYLON.Mesh.CreateBox("crate", 2, scene);
    box6.material = new BABYLON.StandardMaterial("Mat", scene);
    box6.material.diffuseTexture = new BABYLON.Texture("images/box.png", scene);
    box6.position = new BABYLON.Vector3(0, 1, 120);
}
