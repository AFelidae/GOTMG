var Game = {
  Settings : {
    Scale:100, //Size of 3d objects
    MeshQuality:1,//1-10 scale (1 best)
    Antialias:true //Uses antialias
  },
  Textures : [],
  Sprites : []
}

Game.Geometry = {
  Wall: new THREE.BoxBufferGeometry(Game.Settings.Scale, Game.Settings.Scale, Game.Settings.Scale),
  Surface: new THREE.PlaneGeometry(Game.Settings.Scale, Game.Settings.Scale),
  BulletXS: new THREE.SphereGeometry(Math.ceil(Game.Settings.Scale/Game.Settings.MeshQuality/7),Game.Settings.Scale/7,Game.Settings.Scale/7),
  BulletS: new THREE.SphereGeometry(Math.ceil(Game.Settings.Scale/Game.Settings.MeshQuality/5),Game.Settings.Scale/5,Game.Settings.Scale/5),
  BulletM: new THREE.SphereGeometry(Math.ceil(Game.Settings.Scale/Game.Settings.MeshQuality/3),Game.Settings.Scale/3,Game.Settings.Scale/3),
  BulletL: new THREE.SphereGeometry(Math.ceil(Game.Settings.Scale/Game.Settings.MeshQuality/2),Game.Settings.Scale/2,Game.Settings.Scale/2),
  BulletXL: new THREE.SphereGeometry(Math.ceil(Game.Settings.Scale/Game.Settings.MeshQuality/1.5),Game.Settings.Scale/1.5,Game.Settings.Scale/1.5),
  SpriteXS: new THREE.PlaneGeometry(Game.Settings.Scale/3,Game.Settings.Scale/3),
  SpriteS: new THREE.PlaneGeometry(Game.Settings.Scale/2,Game.Settings.Scale/2),
  SpriteM: new THREE.PlaneGeometry(Game.Settings.Scale,Game.Settings.Scale),
  SpriteL: new THREE.PlaneGeometry(Game.Settings.Scale*1.5,Game.Settings.Scale*1.5),
  SpriteXL: new THREE.PlaneGeometry(Game.Settings.Scale*2,Game.Settings.Scale*2)
}

var renderer;

function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

renderer = new THREE.WebGLRenderer({antialias: Game.Settings.Antialias});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB, 1)

document.body.appendChild(renderer.domElement)
window.addEventListener('resize', onWindowResize, false);

Game.Settings.Antisotropy = renderer.capabilities.getMaxAnisotropy() //Texture Antisotropy

for(a=0;a<24;a++){
  Game.Textures.push(new THREE.TextureLoader().load('Assets/Tiles/t_'+a+'.png'))
}

for(a=0;a<Game.Textures.length;a++){
  Game.Textures[a].anisotropy = Game.Settings.Antisotropy
}

Game.Sprites.push(new THREE.TextureLoader().load('Assets/Monsters/skeleton0.png'))
