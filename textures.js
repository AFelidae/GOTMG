var GOTMG = {
  Textures : [],
  Sprites : [],
  Settings : {
    Scale:100, //Size of 3d objects
    MeshQuality:20,//1 to n (1 = worst detail, best performance)
    Antialias:true //Uses antialiasing
  },

  ToScale: function(lengthInBlocks){
    return lengthInBlocks * GOTMG.Settings.Scale
  },

  Controls:{//Stores what button does what
    MoveForward:87,//Default W
    MoveBackward:83,//Default S
    MoveLeft:65,//Default A
    MoveRight:68,//Default D
    LookLeft:74,//Default J
    LookRight:76,//Default L
  },
  Geometry:{} //Different meshes used in the game
}

GOTMG.Geometry.Wall = new THREE.BoxBufferGeometry(GOTMG.ToScale(1), GOTMG.ToScale(1), GOTMG.ToScale(1)),
GOTMG.Geometry.Surface = new THREE.PlaneGeometry(GOTMG.ToScale(1), GOTMG.ToScale(1))

var renderer;

//Ensures window resizing resizes camera too
function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

//Initialize renderer
renderer = new THREE.WebGLRenderer({antialias: GOTMG.Settings.Antialias});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB, 1)//Sky color

document.body.appendChild(renderer.domElement)
window.addEventListener('resize', onWindowResize, false);

//Loads the textures
for(a=0;a<=2;a++){
  GOTMG.Textures.push(new THREE.TextureLoader().load('Assets/Tiles/t_'+a+'.png'))
  GOTMG.Textures[a].minFilter = THREE.NearestFilter
  GOTMG.Textures[a].magFilter = THREE.NearestFilter
}
