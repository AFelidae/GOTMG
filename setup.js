var keysDown = {}

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false)

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false)

var camera, scene;

var startPos = {x:4*Game.Settings.Scale,z:4*Game.Settings.Scale}

camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 400;
scene = new THREE.Scene();

function Character(position,properties,elevation){

}

function Projectile(position,properties,elevation){
  this.color = properties.color
  if(!this.color) this.color = 0xFFFFFF
  this.size = this.size
  if(!this.size) this.size = 15

  this.projectile = new THREE.Mesh(

  )
}

function Level(layout,elevation){
  this.elevation = elevation
  this.level = []
	for(y=0;y<layout.length;y++){
	  this.level.push([])
	  for(x=0;x<layout[y].length;x++){
	    this.level[y].push({})
	    //Create a wall if there is one
	    if(layout[y][x].wall > 0){
	      this.level[y][x].wall=new THREE.Mesh(
	          Game.Geometry.Wall,
	          new THREE.MeshBasicMaterial({map: Game.Textures[layout[y][x].wall-1]})
	      )
	      this.level[y][x].wall.position.x = Game.Settings.Scale * x
        this.level[y][x].wall.position.z = Game.Settings.Scale * y

	      this.level[y][x].wall.position.y = this.elevation * Game.Settings.Scale

	      scene.add(this.level[y][x].wall)
	      }

	    if(layout[y][x].roof > 0){
	      this.level[y][x].roof = new THREE.Mesh(
	        Game.Geometry.Surface,
	        new THREE.MeshBasicMaterial({map: Game.Textures[layout[y][x].roof-1]})
	      )

       this.level[y][x].roof.position.x = Game.Settings.Scale * x
       this.level[y][x].roof.position.z = Game.Settings.Scale * y
       this.level[y][x].roof.rotation.x = -Math.PI / 2

       this.level[y][x].roof.position.y = this.elevation * Game.Settings.Scale - (Game.Settings.Scale / 2)

       scene.add(this.level[y][x].roof)
	    }
	    if(layout[y][x].ground > 0){
	      this.level[y][x].ground = new THREE.Mesh(
	          Game.Geometry.Surface,
	          new THREE.MeshBasicMaterial({map: Game.Textures[layout[y][x].ground-1]})
        )
        this.level[y][x].ground.position.x = Game.Settings.Scale * x
        this.level[y][x].ground.position.z = Game.Settings.Scale * y
        this.level[y][x].ground.rotation.x = Math.PI / 2

        this.level[y][x].ground.position.y = this.elevation * Game.Settings.Scale + (Game.Settings.Scale / 2)

        scene.add(this.level[y][x].ground)
	    }
	  }
	}

  this.collision = function(oldPos,newPos){
    if(this.level[Math.floor((newPos.z+Game.Settings.Scale/2)/Game.Settings.Scale)][Math.floor((oldPos.x+Game.Settings.Scale/2)/Game.Settings.Scale)].wall){
      newPos.z = Math.floor(newPos.z/Game.Settings.Scale)*Game.Settings.Scale + Game.Settings.Scale/2
      if(newPos.z > oldPos.z) newPos.z -= 0.001
      else if(newPos.z < oldPos.z) newPos.z += 0.001
    }
    if(this.level[Math.floor((oldPos.z+Game.Settings.Scale/2)/Game.Settings.Scale)][Math.floor((newPos.x+Game.Settings.Scale/2)/Game.Settings.Scale)].wall){
      newPos.x = Math.floor(newPos.x/Game.Settings.Scale) * Game.Settings.Scale + Game.Settings.Scale/2
      if(newPos.x > oldPos.x) newPos.x -= 0.001
      else if(newPos.x < oldPos.x) newPos.x += 0.001
    }
    return newPos
  }
}
