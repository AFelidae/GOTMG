var keysDown = {}

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false)

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false)

var camera, scene;

var startPos = {x:4*GOTMG.Settings.Scale,z:4*GOTMG.Settings.Scale}

camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 400;
scene = new THREE.Scene();


function Sprite(elevation,position,properties){
  this.elevation = elevation
  this.size = properties.size
  if(!this.size) this.size = 1
  this.texture = properties.texture
  if(!this.texture) this.texture = 0

  this.sprite = new THREE.Sprite(new THREE.SpriteMaterial({map:GOTMG.Textures[this.texture],color:0xffffff}))

  this.sprite.position.x = position.x
  this.sprite.position.y = this.elevation * GOTMG.Settings.Scale
  this.sprite.position.z = position.z

  this.sprite.scale.set(GOTMG.Settings.Scale * this.size ,GOTMG.Settings.Scale * this.size, 1)

  scene.add(this.sprite)
}

function Projectile(elevation,position,properties){
  this.elevation = elevation
  this.color = properties.color
  if(!this.color) this.color = 0xFFFFFF
  this.size = properties.size
  if(!this.size) this.size = 0.5

  this.projectile = new THREE.Mesh(
    new THREE.SphereGeometry(this.size * GOTMG.Settings.Scale, GOTMG.Settings.MeshQuality, GOTMG.Settings.MeshQuality),
    new THREE.MeshBasicMaterial({color:this.color})
  )

  this.projectile.position.x = position.x
  this.projectile.position.y = elevation * GOTMG.Settings.Scale
  this.projectile.position.z = position.z

  scene.add(this.projectile)
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
	          GOTMG.Geometry.Wall,
	          new THREE.MeshBasicMaterial({map: GOTMG.Textures[layout[y][x].wall-1], side: THREE.DoubleSide})
	      )
	      this.level[y][x].wall.position.x = GOTMG.Settings.Scale * x
        this.level[y][x].wall.position.z = GOTMG.Settings.Scale * y

	      this.level[y][x].wall.position.y = this.elevation * GOTMG.Settings.Scale

	      scene.add(this.level[y][x].wall)
	      }

	    if(layout[y][x].roof > 0){
	      this.level[y][x].roof = new THREE.Mesh(
	        GOTMG.Geometry.Surface,
	        new THREE.MeshBasicMaterial({map: GOTMG.Textures[layout[y][x].roof-1], side: THREE.DoubleSide})
	      )

       this.level[y][x].roof.position.x = GOTMG.Settings.Scale * x
       this.level[y][x].roof.position.z = GOTMG.Settings.Scale * y
       this.level[y][x].roof.rotation.x = -Math.PI / 2

       this.level[y][x].roof.position.y = this.elevation * GOTMG.Settings.Scale - (GOTMG.Settings.Scale / 2)

       scene.add(this.level[y][x].roof)
	    }
	    if(layout[y][x].ground > 0){
	      this.level[y][x].ground = new THREE.Mesh(
	          GOTMG.Geometry.Surface,
	          new THREE.MeshBasicMaterial({map: GOTMG.Textures[layout[y][x].ground-1], side: THREE.DoubleSide})
        )
        this.level[y][x].ground.position.x = GOTMG.Settings.Scale * x
        this.level[y][x].ground.position.z = GOTMG.Settings.Scale * y
        this.level[y][x].ground.rotation.x = Math.PI / 2

        this.level[y][x].ground.position.y = this.elevation * GOTMG.Settings.Scale + (GOTMG.Settings.Scale / 2)

        scene.add(this.level[y][x].ground)
	    }
	  }
	}

  this.collision = function(oldPos,newPos){
    if(this.level[Math.floor((newPos.z+GOTMG.Settings.Scale/2)/GOTMG.Settings.Scale)][Math.floor((oldPos.x+GOTMG.Settings.Scale/2)/GOTMG.Settings.Scale)].wall){
      newPos.z = Math.floor(newPos.z/GOTMG.Settings.Scale)*GOTMG.Settings.Scale + GOTMG.Settings.Scale/2
      if(newPos.z > oldPos.z) newPos.z -= 0.001
      else if(newPos.z < oldPos.z) newPos.z += 0.001
    }
    if(this.level[Math.floor((oldPos.z+GOTMG.Settings.Scale/2)/GOTMG.Settings.Scale)][Math.floor((newPos.x+GOTMG.Settings.Scale/2)/GOTMG.Settings.Scale)].wall){
      newPos.x = Math.floor(newPos.x/GOTMG.Settings.Scale) * GOTMG.Settings.Scale + GOTMG.Settings.Scale/2
      if(newPos.x > oldPos.x) newPos.x -= 0.001
      else if(newPos.x < oldPos.x) newPos.x += 0.001
    }
    return newPos
  }
}
