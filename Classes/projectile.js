class Projectile{
  constructor(position,properties){
    this.color = properties.color
    if(!this.color) this.color = 0xFFFFFF
    this.size = properties.size
    if(!this.size) this.size = 0.5

    this.projectile = new THREE.Mesh(
      new THREE.SphereGeometry(GOTMG.ToScale(this.size), GOTMG.Settings.MeshQuality, GOTMG.Settings.MeshQuality),
      new THREE.MeshBasicMaterial({color:this.color})
    )

    this.projectile.position.x = position.x
    this.projectile.position.y = 0
    this.projectile.position.z = position.z

    scene.add(this.projectile)
  }
}
