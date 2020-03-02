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


//Simple level made with gotmg level editor
myLevel = JSON.parse('[[{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2}],[{"wall":2},{},{},{},{},{},{"wall":2},{"ground":2},{"ground":2},{"ground":2,"roof":2},{"ground":2,"roof":2},{"ground":2,"roof":2},{"roof":2},{"roof":2},{"wall":2}],[{"wall":2},{},{},{},{},{},{"wall":2},{"ground":2},{"ground":2},{"ground":2,"roof":2},{"ground":2,"roof":2},{"ground":2,"roof":2},{"roof":2},{"roof":2},{"wall":2}],[{"wall":2},{},{},{},{},{},{"wall":2},{"ground":2},{"ground":2},{"ground":2,"roof":2},{"ground":2,"roof":2},{"ground":2,"roof":2},{"roof":2},{"roof":2},{"wall":2}],[{"wall":2},{},{},{},{},{},{"wall":2},{"ground":2},{"ground":2},{"ground":2,"roof":2},{"ground":2,"roof":2},{"ground":2,"roof":2},{"roof":2},{"roof":2},{"wall":2}],[{"wall":2},{},{},{},{},{},{"wall":2},{"ground":2},{"ground":2},{"ground":2,"roof":2},{"ground":2,"roof":2},{"ground":2,"roof":2},{"roof":2},{"roof":2},{"wall":2}],[{"wall":2},{"wall":2},{"wall":2},{},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2}],[{"wall":2},{},{},{},{},{},{"wall":2},{},{},{},{},{},{},{},{"wall":2}],[{"wall":2},{},{"wall":2},{},{"wall":2},{},{"wall":2},{},{},{},{},{},{},{},{"wall":2}],[{"wall":2},{},{},{},{},{},{"wall":2},{},{},{},{},{},{},{},{"wall":2}],[{"wall":2},{},{"wall":2},{},{"wall":2},{},{"wall":2},{},{},{},{},{},{},{},{"wall":2}],[{"wall":2},{},{},{},{},{},{},{},{},{},{},{},{},{"wall":2},{}],[{"wall":2},{},{"wall":2},{},{"wall":2},{},{"wall":2},{},{},{},{},{},{"wall":2},{},{}],[{"wall":2},{},{},{},{},{},{"wall":2},{},{},{},{},{"wall":2},{},{},{}],[{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{"wall":2},{},{},{},{}]]')

//Loads level
var TestingRange = new Level(myLevel,0)

camera.position.x = startPos.x
camera.position.z = startPos.z

var lastFrame, thisFrame, deltaFrame;

function animate(){
	requestAnimationFrame(animate);

	//Ensures that regardless of framerate player speed will be the same
	thisFrame = new Date()
	if(lastFrame)
		frameDelta = (thisFrame - lastFrame)/10
	else frameDelta = 0

	let current = {x:camera.position.x, z:camera.position.z}
  //Handle player controls
  if(GOTMG.Controls.MoveForward in keysDown){//Move Forward
    camera.position.z -= Math.cos(camera.rotation.y) * 5 * frameDelta
    camera.position.x -= Math.sin(camera.rotation.y) * 5 * frameDelta
  }
  if(GOTMG.Controls.MoveBackward in keysDown){//Move Backward
    camera.position.z += Math.cos(camera.rotation.y) * 3 * frameDelta
    camera.position.x += Math.sin(camera.rotation.y) * 3 * frameDelta
  }

  if(GOTMG.Controls.MoveLeft in keysDown){//Move Left
    camera.position.z += Math.cos(camera.rotation.y - (Math.PI / 2)) * 3 * frameDelta
    camera.position.x += Math.sin(camera.rotation.y - (Math.PI / 2)) * 3 * frameDelta
  }
  if(GOTMG.Controls.MoveRight in keysDown){//Move Right
    camera.position.z -= Math.cos(camera.rotation.y - (Math.PI / 2)) * 3 * frameDelta
    camera.position.x -= Math.sin(camera.rotation.y - (Math.PI / 2)) * 3 * frameDelta
  }

  if(GOTMG.Controls.LookLeft in keysDown){//Turn Left
    camera.rotation.y += Math.PI/100 * frameDelta
  }
  if(GOTMG.Controls.LookRight in keysDown){//Turn Right
    camera.rotation.y -= Math.PI/100 * frameDelta
  }
	let next = {x:camera.position.x, z:camera.position.z}

	//Prevents player from passing through walls
	let update = TestingRange.collision(current,next)
	camera.position.x = update.x
	camera.position.z = update.z

	lastFrame = thisFrame
	renderer.render(scene, camera)
}

animate()
