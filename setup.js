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

var startPos = {x:4*scale,z:4*scale}

function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB, 1)

document.body.appendChild(renderer.domElement)
window.addEventListener('resize', onWindowResize, false);

camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 400;
scene = new THREE.Scene();

function Character(){

}

function Projectile(properties){
  this.projectile = new THREE.Mesh(

  )
}

function Level(layout,elevation){
  this.level = []
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

  this.collision = function(oldPos,newPos){
    if(this.level[Math.floor((newPos.z+scale/2)/scale)][Math.floor((oldPos.x+scale/2)/scale)].wall){
      newPos.z = Math.floor(newPos.z/scale)*scale + scale/2
      if(newPos.z > oldPos.z) newPos.z -= 0.001
      else if(newPos.z < oldPos.z) newPos.z += 0.001
    }
    if(this.level[Math.floor((oldPos.z+scale/2)/scale)][Math.floor((newPos.x+scale/2)/scale)].wall){
      newPos.x = Math.floor(newPos.x/scale) * scale + scale/2
      if(newPos.x > oldPos.x) newPos.x -= 0.001
      else if(newPos.x < oldPos.x) newPos.x += 0.001
    }
    return newPos
  }
}
