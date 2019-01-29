var maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

var GameTextures = []

for(a=0;a<24;a++){
  GameTextures.push(new THREE.TextureLoader().load('Assets/Tiles/t_'+a+'.png'))
}

for(a=0;a<GameTextures.length;a++){
  GameTextures[a].anisotropy = maxAnisotropy
}

var GameSprites = []



GameGeometry = {
  Wall: new THREE.BoxBufferGeometry(scale, scale, scale),
  Surface: new THREE.PlaneGeometry(scale, scale)
}
