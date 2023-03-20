//these lines are after graphics.js

// for centering things on screen
let offset = {x:width/2, y:height-20}
// the position of camera before applying offset (for getting only, not setting)
let cam = {x:0,y:0,zoom:1}

let startTime = Date.now();
function time(){
  return Date.now()-startTime;
}



function scrollTo(x,y,zoom){

  cam.x = -x;
  cam.y = -y;
  cam.zoom = zoom;

  container.x = cam.x+offset.x;
  container.y = cam.y+offset.y;
  container.scale.set(zoom);

}








function animateRopeKeyFrame(target,name){

  // time in ms that resets to 0 after maxTime

  let maxTime = ropeFrames[name].last;
  target.ropeTimer = time()%maxTime;
  if(dbug){
    if(playRope){
      // leave the ropeTimer as is
      // just update the UI
      if(selected_){
        setRopeFrame(selected_.ropeTimer);
      }
    }else{
      target.ropeTimer = ropeFrame;
    }
  }


  // TODO maybe optimize searching for the keyframe if there gets to be a lot of them
  for(let i = 0; i<ropeFrames[name].timestamps.length-1; i++){
    if(target.ropeTimer>ropeFrames[name].timestamps[i] && target.ropeTimer<=ropeFrames[name].timestamps[i+1]){
      target.lastFrame = i;
      break;
    }
  }

  let mix = (target.ropeTimer-ropeFrames[name].timestamps[target.lastFrame])/(ropeFrames[name].timestamps[target.lastFrame+1]-ropeFrames[name].timestamps[target.lastFrame])


  for(let i = 0; i<target.points.length; i++){

    let x = ropeFrames[name][ropeFrames[name].timestamps[target.lastFrame]][i].x*(1-mix) + ropeFrames[name][ropeFrames[name].timestamps[target.lastFrame+1]][i].x*mix;
    let y = ropeFrames[name][ropeFrames[name].timestamps[target.lastFrame]][i].y*(1-mix) + ropeFrames[name][ropeFrames[name].timestamps[target.lastFrame+1]][i].y*mix;

    let smoothness = ropeFrames[name].smoothness[target.lastFrame]*(1-mix) + ropeFrames[name].smoothness[target.lastFrame+1]*mix;

    target.points[i].x = (x+target.points[i].x*smoothness)/(smoothness+1);
    target.points[i].y = (y+target.points[i].y*smoothness)/(smoothness+1);



  }
}
