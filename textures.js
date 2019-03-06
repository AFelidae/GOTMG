var maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

var GameTextures = []

for(a=0;a<24;a++){
  GameTextures.push(new THREE.TextureLoader().load('Assets/Tiles/t_'+a+'.png'))
}

for(a=0;a<GameTextures.length;a++){
  GameTextures[a].anisotropy = maxAnisotropy
}

var GameSprites = []

GameSprites.push(new THREE.TextureLoader().load('Assets/Monsters/skeleton0.png'))

GameGeometry = {
  Wall: new THREE.BoxBufferGeometry(scale, scale, scale),
  Surface: new THREE.PlaneGeometry(scale, scale),
  SpriteSmall: new THREE.PlaneGeometry(scale/2,scale/2),
  SpriteNormal: new THREE.PlaneGeometry(scale,scale),
  SpriteLarge: new THREE.PlaneGeometry(scale*2,scale*2)
}
