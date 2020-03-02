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
      if(newPos.z > oldPos.z) newPos.z -= 0.001 //Not sure these even help with camera clipping
      else if(newPos.z < oldPos.z) newPos.z += 0.001
    }
    if(this.level[Math.floor((oldPos.z+GOTMG.ToScale(0.5))/GOTMG.ToScale(1))][Math.floor((newPos.x+GOTMG.ToScale(0.5))/GOTMG.ToScale(1))].wall){
      newPos.x = Math.floor(newPos.x/GOTMG.ToScale(1)) * GOTMG.ToScale(1) + GOTMG.ToScale(0.5)
      if(newPos.x > oldPos.x) newPos.x -= 0.001 //Not sure if these even help with camera clipping
      else if(newPos.x < oldPos.x) newPos.x += 0.001
    }
    return newPos
  }
}