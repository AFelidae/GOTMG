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