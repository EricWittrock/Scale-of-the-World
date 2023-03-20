// DEBUG Stuff

// is dbug mode on
var dbug = false;
// is mouse button down (for dragging things)
var mousedown = false;
// same as mousedown, but for the document instead of just the canvas
let mousedownWindow = false;
// is rope animation playing (only used in dbug mode)
var playRope = true;
// the value that is used for ropeTimer when the animation is paused
let ropeFrame = 0;
// sprite that is selected
let selected_ = null;
// index of point being dragged
let dragPoint = null;
// used when dragging keyframes in the timeline. Index of the element
let selectedKey = null;
// set keysneedupdated to true when dragging a keyframe in the timeline. set it back to false after update in mouseup
let keysneedupdated = false;
// the sprite object that is currently selected in dbug mode
let selectedSprite = null;

let altKey = false;

let draggedPoint = null;
let pathPointsContainer;
let lastSelectedPoint = null;

function addPathPoints() {
  pathPointsContainer = new PIXI.Container();
  container.addChild(pathPointsContainer);

  for(let i in camData){
    let point = new PIXI.Sprite(PIXI.Texture.WHITE);
    point.x = camData[i].x/camData[i].zoom;
    point.y = camData[i].y/camData[i].zoom;
    point.anchor.set(0.5);
    point.alpha = 0.75;
    point.scale.set(5/camData[i].zoom);
    pathPointsContainer.addChild(point);

    point.interactive = true;
    point.on('mousedown',function(){
      draggedPoint = point;
      for(let i = 0; i<pathPointsContainer.children.length; i++){
        pathPointsContainer.children[i].tint = 0xffffff;
      }
      point.tint = 0xffe5c9;
      lastSelectedPoint = point;
    })
  }
}


function savePathPoints() {

  for(let i = 0; i<pathPointsContainer.children.length; i++){
    camData[i].zoom = 5/pathPointsContainer.children[i].scale.x
    camData[i].x = pathPointsContainer.children[i].x * camData[i].zoom
    camData[i].y = pathPointsContainer.children[i].y * camData[i].zoom

  }

  pathPointsContainer.destroy();
  pathPointsContainer = null;
  lastSelectedPoint = null;

  initKeyFrames();
}

document.getElementById("print_camPoints").onclick = function(){
  let str = 'let camData = [\n';
  for(let i = 0; i<camData.length; i++){
    str += (` {"x":${camData[i].x}, "y":${camData[i].y}, "zoom":${camData[i].zoom}},\n`)
  }
  str += ']';

  console.log(str);
}

document.getElementById("insert_camPoint").onclick = function(){
  if(lastSelectedPoint){
      let indx = pathPointsContainer.children.indexOf(lastSelectedPoint);
      if(indx === -1){
        alert("point not found in pathPointsContainer children");
        return;
      }
      if(indx === 0){
        alert("you can't insert before the first camera point");
        return;
      }

    let newCamPoint = {
      "x": (camData[indx-1].x+camData[indx].x)/2,
      "y": (camData[indx-1].y+camData[indx].y)/2,
      "zoom": (camData[indx-1].zoom+camData[indx].zoom)/2
    }
    camData.splice(indx, 0, newCamPoint);

    pathPointsContainer.destroy();
    initKeyFrames();
    addPathPoints();

  }
}


// WRITE TO BOTTOM CONSOLE ==========================================================
const dbugInfo = document.getElementById("dbugInfo");
function write(text){
  dbugInfo.innerHTML+=((text||'undefined (no textInfo assigned)').replace(/\n/g,'<br>')+'<br>');

}
function clear(){
  dbugInfo.innerHTML = '';
}


// SCROLLING ======================================================
document.getElementsByTagName('canvas')[0].addEventListener('mousedown',function(e){
  mousedown = true;
  selectedKey = null;
  updateTimeLineKeys();
})
document.addEventListener('mousedown',function(e){
  mousedownWindow = true;
})
window.addEventListener('mouseup',function(e){
  mousedown = false;
  mousedownWindow = false;
  draggedSprite_dbug = null;
  draggedPoint = null;

  if(keysneedupdated){
    keysneedupdated = false;
    updateTimeLineKeys(true);
  }
})

window.addEventListener('keydown',function(e){
  if(e.keyCode===13){ // switch to dbug mode
    dbug=!dbug
    document.getElementById("ropeDbugEditor").hidden = !dbug;
    console.log("dbug mode is set to "+dbug);

    if(dbug){
      addPathPoints();
    }else{
      savePathPoints();
    }

  }else if(e.keyCode===18){
    altKey = true;
  }
})
window.addEventListener('keyup',function(e){
  if(e.keyCode===18){
    altKey = false;
  }
})

window.addEventListener('mousemove',function(e){
  if (dbug) {
    if (mousedown) {
      if (draggedSprite_dbug && e.ctrlKey) {
        draggedSprite_dbug.parent.parent.x += e.movementX / container.scale.x;
        draggedSprite_dbug.parent.parent.y += e.movementY / container.scale.y;
        draggedSprite_dbug.was_moved = true;
        draggedSprite_dbug.oldPos = {'x':things[draggedSprite_dbug.name].position.x, 'y':things[draggedSprite_dbug.name].position.y};
        return;
      }
      if(draggedPoint){
        if(altKey){
          if(e.movementX>0){
            draggedPoint.scale.x*=(1+(e.movementX/500));
            draggedPoint.scale.y = draggedPoint.scale.x;
          }else{
            draggedPoint.scale.x/=(1+(-e.movementX/500));
            draggedPoint.scale.y = draggedPoint.scale.x;
          }
        }else{
          draggedPoint.x += e.movementX / container.scale.x;
          draggedPoint.y += e.movementY / container.scale.y;
        }
        return;
      }

      container.x += e.movementX;
      container.y += e.movementY;
      //background0.x+=e.movementX*0.1;
      //background0.y+=e.movementY*0.1;


    }
    if (mousedownWindow) {
      if (selectedKey !== null) {
        let tm = document.getElementById('timeline');

        // move the timeline key element with the mouse
        tm.children[selectedKey].style.left = (tm.children[selectedKey].style.left.replace('%', '') / 1) + e.movementX * .1111 + "%";
      }
    }
  }
})
window.addEventListener('mousewheel',function(e){
if(e.wheelDeltaY<0){
  // zoom out
  container.x -= (container.x-(mouseX))*0.1;
  container.y -= (container.y-(mouseY))*0.1;

  container.scale.y/=1.1
  container.scale.x/=1.1
}else{
  // zoom in
  container.x += (container.x-(mouseX))*0.1;
  container.y += (container.y-(mouseY))*0.1;

  container.scale.y*=1.1
  container.scale.x*=1.1
}

customs.background0.scale.set(container.scale.x*0.1+1);
})

// FOR MOVING SPRITES AND GETTING POSITION ======================================

function getkey(){
  return {
    "x":(container.x-offset.x)*-1,
    "y":(container.y-offset.y)*-1,
    "zoom":(container.scale.x),
    "pos":scroll
  }
}

function getPositions_NOT_USED_ANYMORE(){
  for(let i in sprites){
    if(sprites[i].was_moved){
      //sprites[i].parent.parent.position.x = Math.round(sprites[i].parent.parent.position.x);
      //sprites[i].parent.parent.position.y = Math.round(sprites[i].parent.parent.position.y);
      console.log(sprites[i].name);
      console.log("x:"+sprites[i].parent.parent.position.x + ", y:"+sprites[i].parent.parent.position.y);
    }
  }
}
function getPositions(){
  function makeReq(callback){
  var xml = new XMLHttpRequest();
  xml.open('GET','./js/data.js');
  xml.send();

  xml.onload = function(e){
      callback(e.currentTarget.responseText);
  }
  xml.onerror = function(e){
    console.log(e);
  }
  }
  makeReq(function(e){
      d2 = e.split('/*~splitter~*/');
      for(let i in sprites){
        if(sprites[i].was_moved){
          let oldPos = ("x:"+sprites[i].oldPos.x + ",y:"+sprites[i].oldPos.y);
          let newPos = ("x:"+sprites[i].parent.parent.position.x + ",y:"+sprites[i].parent.parent.position.y);

          d2[3] = d2[3].replace(oldPos,newPos);

        }
        console.log(d2[3]);
      }
  })

}

document.getElementById("print_positions").onclick = getPositions;


// SHOWING AND MOVING ROPE POINTS ============================================

function renderPoints(points) {
  for (let i = 0; i < points.length; i++) {
    if(dragPoint!==i){
      movePoint(i,points[i].x,points[i].y)
    }
  }
}

function select(idname){


  dbugInfo.hidden = false;
  clear();

  try{
  write(things[idname].title.bold());
  }catch(err){
    console.log(err);
  }

  let sprite_;
  for(let i =0; i<sprites.length; i++){
    if(sprites[i].name===idname){
      sprite_ = sprites[i];
      write("sprite index: "+i);
    }else if(i===sprites.length){
      write('index not found. no sprites matched the name '+idname)
    }
  }
  write(text["EN"][things[idname].infoText])
  write(JSON.stringify(things[idname].position));

  // end function if sprite is not found. anything below deals with sprite_
  if(!sprite_){
    console.warn("this is concerning. There should be a sprite found");
    return
  }
  //set selectedsprite var so other functions can access it globally
  selectedSprite = sprite_;

  // if is a rope sprite
  if(sprite_.ropeLength){
    showPoints(sprite_);
    // TODO replace 4000 with a variable
    document.getElementById("maxframe").value = ropeFrames[idname].last
    document.getElementById('frameRange').max = document.getElementById('maxframe').value
    addKeyElementsToTimeLine();
  }else{
    hidePoints();
  }



}

function addKeyElementsToTimeLine(){

    let data = ropeFrames[selectedSprite.name];
    let arr = data.timestamps.map(i=>i/data.last);

    let tm = document.getElementById('timeline');
    let count_ = tm.children.length;
    for(let i = 0; i<count_; i++){
        tm.children[0].remove();
    }

    for(let i = 0; i<arr.length; i++){
        // new key elementmouse
        let nk = document.createElement("div");
        nk.id = i;
        Object.assign(nk.style,{
            width:"10px",
            height:"100%",
            backgroundColor:"#fbd372",
            position:"absolute",
            left: arr[i]*100+"%",
            top:"0px",
            transform:"translate(-50%, 0%)",
            filter:"hue-rotate("+i*10+"deg)"
        });
        tm.appendChild(nk);

        nk.addEventListener('mousedown',function(){
          selectedKey = this.id;
          keysneedupdated = true;
        })
    }
}

//called on mouseup when a key has moved
function updateTimeLineKeys(saveMove=false){
  if(!selectedSprite || !selectedSprite.ropeLength){
    return;
  }
  let data = ropeFrames[selectedSprite.name];
  let tm = document.getElementById('timeline');
  let keys_ = [];
  for(let i = 0; i<tm.childElementCount; i++){
      tm.children[i].style.boxShadow = '';
      keys_.push(Math.round(tm.children[i].style.left.replace('%','')/100*data.last));
  }

  if(selectedKey!==null){
    // stylize selected
    tm.children[selectedKey].style.boxShadow="0 0 9px 3px #ffbf4e";

    document.getElementById('smoothness_input').value = ropeFrames[selectedSprite.name].smoothness[selectedKey];
    document.getElementById('smoothness_input').onchange = function(){
      ropeFrames[selectedSprite.name].smoothness[selectedKey] = document.getElementById('smoothness_input').value/1;
    }
  }else{
    document.getElementById('smoothness_input').value = 0;
  }

  // replace old data with new keyframe positions
  if(saveMove){
    let i2 = 0;
    for(let i in data){
      // if the key is a number (also skip if they the position hasn't changed)
      if(i/1 && keys_[i2]!=i){
        data[keys_[i2]] = data[i];
        delete data[i];
      }
      i2++;
    }
  }

  //update some info
  try{
    refreshTrailingData(data);
  }catch(err){}
}

function refreshTrailingData(data){
  //let smoothness_temp_stor = data.smoothness;
  //delete data.smoothness;
  data.timestamps = [];
  for(let i in data){
    if(!isNaN(i/1)){
      data.timestamps.push(i/1);
    }
  }
  data.timestamps.sort((a,b)=>((a>b)?1:-1));
  data.last = data.timestamps[data.timestamps.length-1];

  data.smoothness.length = data.timestamps.length;
  for(let i = 0; i<data.smoothness.length; i++){
    if(data.smoothness[i]===undefined){
      data.smoothness[i] = 1;
    }
  }

}

function showPoints(sprite){

  // hide all points except the necessary ones
  hidePoints();
  for(let i = 0; i<sprite.points.length; i++){
    dompoints[i].hidden=false
  }
  for(let i = 0; i<sprites.length; i++){
    sprites[i].showPoints = false;
  }
  sprite.showPoints = true;

  selected_ = sprite;
}
function hidePoints(){
  for(let i = 0; i<dompoints.length; i++){
    dompoints[i].hidden=true;
  }
}

function movePoint(i,x,y){
  dompoints[i].style.left = x+"px";
  dompoints[i].style.top = y+"px";
}


document.getElementById('play_toggle').onclick = function(){
  playRope = !playRope;
  document.getElementById('play_toggle').innerText = playRope?"(PAUSE)":"(PLAY)";
}

function setRopeFrame(n){
  document.getElementById('frame_text').innerText = n;
  document.getElementById('frameRange').value = n;
  ropeFrame = n/1;
}

// set max frame on slider to input box and then listen for changes
document.getElementById('frameRange').max = document.getElementById('maxframe').value
document.getElementById('maxframe').onchange = function(e){
  document.getElementById('frameRange').max = document.getElementById('maxframe').value
  if(ropeFrames[selectedSprite.name]){

    let newMax = document.getElementById('maxframe').value/1; // int 4007
    let key_ = ropeFrames[selectedSprite.name].timestamps[ropeFrames[selectedSprite.name].timestamps.length-1]; // int 4000
    let temp_ = ropeFrames[selectedSprite.name][key_]; // {}
    delete ropeFrames[selectedSprite.name][key_];
    ropeFrames[selectedSprite.name][newMax] = temp_;
    ropeFrames[selectedSprite.name].timestamps[ropeFrames[selectedSprite.name].timestamps.length-1] = newMax;
    ropeFrames[selectedSprite.name].last = newMax;
    updateTimeLineKeys();
    addKeyElementsToTimeLine();
  }else{
    console.log("this sprite does not have animation data");
    e.preventDefault();
  }


}

function updateFrameSlider(){
  // check for slider change
  ropeFrame = document.getElementById('frameRange').value/1;
  document.getElementById('frame_text').innerText = ropeFrame;
}
document.getElementById('ropeDbugEditor').addEventListener("mouseup",updateFrameSlider);
document.getElementById('ropeDbugEditor').addEventListener("mousemove",updateFrameSlider);

document.getElementById('ropeDbugEditor').addEventListener("keyup",function(){
  // check for max frame change
  document.getElementById('frameRange').max = document.getElementById('maxframe').value
})

document.getElementById("prevFrame").onclick = function(){
  document.getElementById('frameRange').value-=100;
  updateFrameSlider();
}
document.getElementById("nextFrame").onclick = function(){
  document.getElementById('frameRange').value-=(-100);
  updateFrameSlider();
}
document.getElementById("selectNextKey").onclick = function(){
  if(selected_){
    let data = ropeFrames[selected_.name];
    // if the ropeFrame is on a timestep, move it a little forward so it can search for the next
    if(data.timestamps.includes(ropeFrame)){
      ropeFrame+=1;
    }
    for(let i = 0; i<data.timestamps.length-1; i++){
      if(ropeFrame>data.timestamps[i] && ropeFrame<data.timestamps[i+1]){
        setRopeFrame(data.timestamps[i+1]);
        selectedKey = i+1;
        updateTimeLineKeys();
        break;
      }
    }

  }else{
    window.alert("no. there is no sprite selected @dbug.js")
  }
}
document.getElementById("selectPrevKey").onclick = function(){
  if(selected_){
    let data = ropeFrames[selected_.name];
    // if the ropeFrame is on a timestep, move it a little backwards so it can search for the previous
    if(data.timestamps.includes(ropeFrame)){
      ropeFrame-=1;
    }
    for(let i = data.timestamps.length; i>=1; i--){
      if(ropeFrame<data.timestamps[i] && ropeFrame>data.timestamps[i-1]){
        setRopeFrame(data.timestamps[i-1]);
        selectedKey = i-1;
        updateTimeLineKeys();
        break;
      }
    }

  }else{
    window.alert("no. there is no sprite selected @dbug.js")
  }
}

document.getElementById("setSmoothnessAll").onclick = function(){
  let smoothnessAmount = window.prompt("smoothness value that all keyframes will be set to");
  if(smoothnessAmount===""){
    window.alert("the input was blank so the command was cancled");
    return;
  }
  if(smoothnessAmount===null){
    return;
  }
  //convert to int
  smoothnessAmount/=1
  //fill the array
  ropeFrames[selectedSprite.name].smoothness = ropeFrames[selectedSprite.name].smoothness.map(i => smoothnessAmount);
}


window.addEventListener('mousemove',function(e){
  if(dragPoint!==null){
    try{
      const mousesensitivity = 1;

      //let x = dompoints[dragPoint].style.left.replace('px','')/1;
      //let y = dompoints[dragPoint].style.top.replace('px','')/1;
      //dompoints[dragPoint].style.left = x + e.movementX*mousesensitivity + "px";
      //dompoints[dragPoint].style.top = y + e.movementY*mousesensitivity + "px";

      for(let i=0; i<dompoints.length; i++){
        let x = dompoints[i].style.left.replace('px','')/1;
        let y = dompoints[i].style.top.replace('px','')/1;

        let stiff_ = document.getElementById('stiffness_factor').value/1;
        let range_ = document.getElementById('range_factor').value/1;

        let dist = Math.abs(dragPoint-i)/range_;
        let magnitude = Math.pow(Math.E, -Math.pow(dist,2))
        dompoints[i].style.top = y + e.movementY*mousesensitivity*magnitude + "px";

        dist = Math.abs(dragPoint-i)*2
        magnitude = Math.pow(Math.E, -Math.pow(dist,stiff_))
        dompoints[i].style.left = x + e.movementX*mousesensitivity*magnitude + "px";
      }


      // create new keyframe with point data from dom elements
      ropeFrames[selected_.name][ropeFrame] = dompoints.map(function(i){return {x:i.style.left.replace('px','')/1,y:i.style.top.replace('px','')/1} }).splice(0,selected_.points.length)
      // update the timestamps
      //ropeFrames[selected_.name].timestamps = Object.keys(ropeFrames[selected_.name]).map(i=>i/1);
      refreshTrailingData(ropeFrames[selected_.name]);
    }catch(err){

    }
  }

})


document.getElementById("dupLastKey").addEventListener("click",function(){
  let points_ = null;
  let data = ropeFrames[selected_.name];
  // if the ropeFrame is on a timestep, move it a little backwards so it can search for the previous
  /*if(data.timestamps.includes(ropeFrame)){
    ropeFrame-=1;
  }*/
  for(let i = data.timestamps.length; i>=1; i--){
    if(ropeFrame<data.timestamps[i] && ropeFrame>data.timestamps[i-1]){
      points_ = data[data.timestamps[i-1]];
      console.log(i-1);
      console.log(points_);
      break;
    }
  }
  ropeFrames[selected_.name][ropeFrame] = points_.map(i2=>i2);
  // refresh the timestamps
  //ropeFrames[selected_.name].timestamps = Object.keys(ropeFrames[selected_.name]).map(i=>i/1);
  updateTimeLineKeys();
  addKeyElementsToTimeLine();
})

document.getElementById("addDefaultKey").addEventListener("click",function(){

  ropeFrames[selected_.name][ropeFrame] = [];
  for(let i = 0; i<ropeFrames[selected_.name]["0"].length; i++){
    ropeFrames[selected_.name][ropeFrame][i] = {
      "x":ropeFrames[selected_.name]["0"][i].x,
      "y":ropeFrames[selected_.name]["0"][i].y
    }
  }
  // refresh the timestamps
  //ropeFrames[selected_.name].timestamps = Object.keys(ropeFrames[selected_.name]).map(i=>i/1);
  updateTimeLineKeys();
  addKeyElementsToTimeLine();
})

document.getElementById("delKey").addEventListener("click",function(){
  if(ropeFrames[selected_.name][ropeFrame]){
    delete ropeFrames[selected_.name][ropeFrame];
    // refresh the timestamps
    //ropeFrames[selected_.name].timestamps = Object.keys(ropeFrames[selected_.name]).map(i=>i/1);
    updateTimeLineKeys();
    addKeyElementsToTimeLine();
  }else{
    window.alert("there isn't a keyframe here")
  }
})

document.getElementById("print_data").addEventListener("click",printData);
function printData(){
  if(selected_){

    let data = ropeFrames[selected_.name];
    var buffer = {}

    for(let i = 0; i<data.timestamps.length; i++){
      buffer[data.timestamps[i]] = data[data.timestamps[i]].map(function(i){
          // truncate positions
          return {x:Math.round(i.x*10000000)/10000000, y:Math.round(i.y*10000000)/10000000}
      })
    }
    buffer.smoothness = data.smoothness;

    console.log("for "+ selected_.name);
    console.log("\""+selected_.name+"\":"+JSON.stringify(buffer)+",");
  }else{
    window.alert("there is no rope sprite selected");
  }
}

document.getElementById("make_rope").addEventListener("click",function(){
  if(selectedSprite){
    let nodeCount = window.prompt("how many nodes?");
    let ropeLength = selectedSprite.width/(nodeCount-1);
//"argentinosaurus":{"0":[{"x":0,"y":0},{"x":19.28,"y":0},{"x":38.56,"y":0},{"x":57.84,"y":0},{"x":77.12,"y":0},{"x":96.4,"y":0},{"x":115.68,"y":0},{"x":134.96,"y":0},{"x":154.24,"y":0},{"x":173.52,"y":0},{"x":192.8,"y":0},{"x":212.08,"y":0},{"x":231.36,"y":0},{"x":250.64,"y":0},{"x":269.92,"y":0},{"x":289.2,"y":0},{"x":308.48,"y":0},{"x":327.76,"y":0},{"x":347.04,"y":0},{"x":366.32,"y":0},{"x":385.6,"y":0},{"x":404.88,"y":0},{"x":424.16,"y":0},{"x":443.44,"y":0},{"x":462.72,"y":0}],
//"1664":[{"x":9.03477,"y":-10.0133},{"x":27.9342,"y":-9.55158},{"x":46.1489,"y":-8.28275},{"x":64.0268,"y":-6.56379},{"x":81.9781,"y":-4.81223},{"x":10
    let maxFrame = window.prompt("length of animation (ms)?")

    let buffer = {}
    buffer["0"] = [];
    buffer[maxFrame] = [];
    for(let frame in buffer){
      for(let i = 0; i<nodeCount; i++){
        buffer[frame].push({x:i*ropeLength, y:0});
      }
    }
    buffer.smoothness = [1,1];
    ropeFrames[selectedSprite.name] = buffer;
    prepairRopeFrames();


    selected_ = selectedSprite;
    printData();
    window.alert("now paste in the data from the console in a new ropeFrames object named '"+selected_.name+"' and refresh");


  }else{
    window.alert("there is no sprite selected");
  }
});



let circles = [];

function log(){
    let pos =  {
        x:-container.x+offset.x,
        y:-container.y+offset.y,
        zoom:container.scale.x,
    }
    circles.push({x:pos.x, y:pos.y, z:1/cam.zoom*50});
    drawCircles();
}


function drawCircles(){
  camDbug.clear();
  for(let i = 0; i<circles.length; i++){
    camDbug.beginFill(0xffffff);
    camDbug.drawCircle(circles[i].x, circles[i].y, circles[i].z);
    camDbug.endFill();
  }
}

let camDbug = new PIXI.Graphics();

setTimeout(function(){
  container.addChild(camDbug);
},2000);
