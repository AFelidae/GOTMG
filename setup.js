var keysDown = {}

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false)

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false)

var camera, scene, renderer;
var mesh;

var scale = 100

function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0x87CEEB, 1)

document.body.appendChild(renderer.domElement)
window.addEventListener('resize', onWindowResize, false);

camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 400;
scene = new THREE.Scene();

function Level(){
  this.level = []

	this.create = function(layout,elevation){
	  for(y=0;y<layout.length;y++){
	    this.level.push([])
	    for(x=0;x<layout[y].length;x++){
	      this.level[y].push({})
	      //Create a wall if there is one
	      if(layout[y][x].wall > 0){
	        this.level[y][x].wall=new THREE.Mesh(
	            GameGeometry.Wall,
	            new THREE.MeshBasicMaterial({map: GameTextures[layout[y][x].wall-1]})
	        )
	        this.level[y][x].wall.position.x = scale * x
	        this.level[y][x].wall.position.z = scale * y

	        this.level[y][x].wall.position.y = elevation * scale

	        scene.add(this.level[y][x].wall)
	      }

	      if(layout[y][x].roof > 0){
	        this.level[y][x].roof = new THREE.Mesh(
	          GameGeometry.Surface,
	          new THREE.MeshBasicMaterial({map: GameTextures[layout[y][x].roof-1]})
	        )

	        this.level[y][x].roof.position.x = scale * x
	        this.level[y][x].roof.position.z = scale * y
	        this.level[y][x].roof.rotation.x = -Math.PI / 2

	        this.level[y][x].roof.position.y = elevation * scale - (scale / 2)

	        scene.add(this.level[y][x].roof)
	      }
	      if(layout[y][x].ground > 0){
	        this.level[y][x].ground = new THREE.Mesh(
	          GameGeometry.Surface,
	          new THREE.MeshBasicMaterial({map: GameTextures[layout[y][x].ground-1]})
	        )
	        this.level[y][x].ground.position.x = scale * x
	        this.level[y][x].ground.position.z = scale * y
	        this.level[y][x].ground.rotation.x = Math.PI / 2

	        this.level[y][x].ground.position.y = elevation * scale + (scale / 2)

	        scene.add(this.level[y][x].ground)
	      }
	    }
	  }
	}
  /*Todo:Fix this
	this.clear = function(){
		for(y=0;y<this.level.length;y++){
			for(x=0;x<this.level[y].length;x++){
				scene.remove(this.level[y][x])
			}
		}
		this.level = []
	}*/
}
