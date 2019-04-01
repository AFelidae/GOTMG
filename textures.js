var GOTMG = {
  Settings : {
    Scale:100, //Size of 3d objects
    MeshQuality:20,//1-n scale (1 worst)
    Antialias:true //Uses antialias
  },
  Textures : [],
  Sprites : []
}

GOTMG.Geometry = {
  Wall: new THREE.BoxBufferGeometry(GOTMG.Settings.Scale, GOTMG.Settings.Scale, GOTMG.Settings.Scale),
  Surface: new THREE.PlaneGeometry(GOTMG.Settings.Scale, GOTMG.Settings.Scale),
}

var renderer;

function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

renderer = new THREE.WebGLRenderer({antialias: GOTMG.Settings.Antialias});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB, 1)

document.body.appendChild(renderer.domElement)
window.addEventListener('resize', onWindowResize, false);

for(a=0;a<2;a++){
  GOTMG.Textures.push(new THREE.TextureLoader().load('Assets/Tiles/t_'+a+'.png'))
  GOTMG.Textures[a].minFilter = THREE.NearestFilter
  GOTMG.Textures[a].magFilter = THREE.NearestFilter
}
