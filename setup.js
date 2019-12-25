//Tracks which keys are pressed
var keysDown = {}

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false)

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false)

//Setups up camera and scene
var camera, scene;

var startPos = {x:GOTMG.ToScale(4),z:GOTMG.ToScale(4)}

camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 400;
scene = new THREE.Scene()

//Class to display 2d sprites in the world
class Sprite{
  constructor(elavation,position,properties){
    this.elevation = elevation
    this.size = properties.size
    if(!this.size) this.size = 1
    this.texture = properties.texture
    if(!this.texture) this.texture = 0

    this.sprite = new THREE.Sprite(new THREE.SpriteMaterial({map:GOTMG.Textures[this.texture],color:0xffffff}))

    this.sprite.position.x = position.x
    this.sprite.position.y = GOTMG.ToScale(this.elevation)
    this.sprite.position.z = position.z

    this.sprite.scale.set(GOTMG.ToScale(this.size) ,GOTMG.ToScale(this.size), 1)

    scene.add(this.sprite)
  }
}

//Class to create projectiles in the world
class Projectile{
  constructor(elavation,position,properties){
    this.elevation = elevation
    this.color = properties.color
    if(!this.color) this.color = 0xFFFFFF
    this.size = properties.size
    if(!this.size) this.size = 0.5

    this.projectile = new THREE.Mesh(
      new THREE.SphereGeometry(GOTMG.ToScale(this.size), GOTMG.Settings.MeshQuality, GOTMG.Settings.MeshQuality),
      new THREE.MeshBasicMaterial({color:this.color})
    )

    this.projectile.position.x = position.x
    this.projectile.position.y = GOTMG.ToScale(elavation)
    this.projectile.position.z = position.z

    scene.add(this.projectile)
  }
}

//Class that loads the world
class Level{
  constructor(layout,elevation){
    this.elevation = elevation
    this.level = []
  	for(var y=0;y<layout.length;y++){
  	  this.level.push([])
  	  for(var x=0;x<layout[y].length;x++){
  	    this.level[y].push({})
  	    //Create a wall if there is one
  	    if(layout[y][x].wall > 0){
  	      this.level[y][x].wall=new THREE.Mesh(
  	          GOTMG.Geometry.Wall,
  	          new THREE.MeshBasicMaterial({map: GOTMG.Textures[layout[y][x].wall], side: THREE.DoubleSide})
  	      )
  	      this.level[y][x].wall.position.x = GOTMG.ToScale(x)
          this.level[y][x].wall.position.z = GOTMG.ToScale(y)

  	      this.level[y][x].wall.position.y = GOTMG.ToScale(this.elevation)

  	      scene.add(this.level[y][x].wall)
  	      }

  	    if(layout[y][x].roof > 0){
  	      this.level[y][x].roof = new THREE.Mesh(
  	        GOTMG.Geometry.Surface,
  	        new THREE.MeshBasicMaterial({map: GOTMG.Textures[layout[y][x].roof], side: THREE.DoubleSide})
  	      )

         this.level[y][x].roof.position.x = GOTMG.ToScale(x)
         this.level[y][x].roof.position.z = GOTMG.ToScale(y)
         this.level[y][x].roof.rotation.x = -Math.PI / 2

         this.level[y][x].roof.position.y = GOTMG.ToScale(this.elevation) - (GOTMG.ToScale(0.5))

         scene.add(this.level[y][x].roof)
  	    }
  	    if(layout[y][x].ground > 0){
  	      this.level[y][x].ground = new THREE.Mesh(
  	          GOTMG.Geometry.Surface,
  	          new THREE.MeshBasicMaterial({map: GOTMG.Textures[layout[y][x].ground], side: THREE.DoubleSide})
          )
          this.level[y][x].ground.position.x = GOTMG.ToScale(x)
          this.level[y][x].ground.position.z = GOTMG.ToScale(y)
          this.level[y][x].ground.rotation.x = Math.PI / 2

          this.level[y][x].ground.position.y = GOTMG.ToScale(this.elevation) + (GOTMG.ToScale(0.5))

          scene.add(this.level[y][x].ground)
  	    }
  	  }
  	}
  }

  collision(oldPos,newPos){
    if(this.level[Math.floor((newPos.z+GOTMG.ToScale(0.5))/GOTMG.ToScale(1))][Math.floor((oldPos.x+GOTMG.ToScale(0.5))/GOTMG.ToScale(1))].wall){
      newPos.z = Math.floor(newPos.z/GOTMG.ToScale(1))*GOTMG.ToScale(1) + GOTMG.ToScale(0.5)
      if(newPos.z > oldPos.z) newPos.z -= 0.001
      else if(newPos.z < oldPos.z) newPos.z += 0.001
    }
    if(this.level[Math.floor((oldPos.z+GOTMG.ToScale(0.5))/GOTMG.ToScale(1))][Math.floor((newPos.x+GOTMG.ToScale(0.5))/GOTMG.ToScale(1))].wall){
      newPos.x = Math.floor(newPos.x/GOTMG.ToScale(1)) * GOTMG.ToScale(1) + GOTMG.ToScale(0.5)
      if(newPos.x > oldPos.x) newPos.x -= 0.001
      else if(newPos.x < oldPos.x) newPos.x += 0.001
    }
    return newPos
  }
}
