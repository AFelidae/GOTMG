class Projectile{
  constructor(position,properties){
    this.color = properties.color
    if(!this.color) this.color = 0xFFFFFF

    this.size = properties.size
    if(!this.size) this.size = 0.5

    this.direction = properties.direction
    if(!this.direction) this.direction = 0

    this.range = properties.range
    if(!this.range) this.range = GOTMG.toScale(5);
    this.traveled = 0

    this.speed = properties.speed
    if(!this.speed) this.speed = GOTMG.toScale(1);

    this.damage = properties.damage
    if(!this.damage) this.damage = 0

    this.projectile = new THREE.Mesh(
      new THREE.SphereGeometry(GOTMG.ToScale(this.size), GOTMG.Settings.MeshQuality, GOTMG.Settings.MeshQuality),
      new THREE.MeshBasicMaterial({color:this.color})
    )

    this.projectile.position.x = position.x
    this.projectile.position.y = 0
    this.projectile.position.z = position.z

    scene.add(this.projectile)
  }

  this.move = function(frameDelta){
    camera.position.z -= Math.cos(camera.rotation.y) * frameDelta * speed
    camera.position.x -= Math.sin(camera.rotation.y) * frameDelta * speed
    traveled += speed
  }
}
