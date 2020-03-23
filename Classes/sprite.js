class Sprite{
  constructor(position,properties){
    this.offsetY = properties.offsetY
    if(!properties.offsetY) this.offsetY = 0
    this.size = properties.size
    if(!this.size) this.size = 1
    this.texture = properties.texture
    if(!this.texture) this.texture = 0

    this.sprite = new THREE.Sprite(new THREE.SpriteMaterial({map:GOTMG.Textures[this.texture],color:0xffffff}))

    this.sprite.position.x = position.x
    this.sprite.position.y = GOTMG.ToScale(offsetY)
    this.sprite.position.z = position.z

    this.sprite.scale.set(GOTMG.ToScale(this.size) ,GOTMG.ToScale(this.size), 1)

    scene.add(this.sprite)
  }
}
