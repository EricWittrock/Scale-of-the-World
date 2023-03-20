//canvas width
let width = 960//800;
//canvas height
let height = 540//600;
//list of sprites (things)
let sprites = [];
// so the center of the slider doesn't jump to the mouse
let grabOffset = 0;
// mouse positions relative to canvas
let mouseX = 0;
let mouseY = 0;
// for smooth scrolling
let scrollerX = 0;
// current % of scroll
let scroll = 0;
// particle emitter
let fx;

let lastUpdated = Date.now();
// time between frames in ms
let deltaT = 0;
// sprite that is currently being dragged
let draggedSprite_dbug = null;

const SCROLL_START = 0.5;

const CAM_SMOOTHNESS = 10;

let LANGUAGE = "EN";

const app = new PIXI.Application({
    width: width, height: height, backgroundColor: 0x000, resolution: window.devicePixelRatio || 1,
});
document.getElementById("canvas_container").appendChild(app.view);



const backgroundLayer = new PIXI.Container
const container = new PIXI.Container();
const spriteOverlay = new PIXI.Container();
const ui = new PIXI.Container();

app.stage.addChild(backgroundLayer)
app.stage.addChild(container);
app.stage.addChild(spriteOverlay);
app.stage.addChild(ui);

container.type = "container_MAIN"







window.addEventListener("load",function(){
  // main.js will be loaded here so it is safe to attach animations
  if(USE_SPRITESHEET){
    PIXI.Loader.shared
      .add("./img/spritesheet.json")
      .add('fx_settings', './img/default-bundle.json')
      .add('fx_spritesheet', './img/revoltfx-spritesheet.json').load(setup);
  }else{
    PIXI.Loader.shared
      .add('fx_settings', './img/default-bundle.json')
      .add('fx_spritesheet', './img/revoltfx-spritesheet.json').load(setup);
  }
})


function setup(loader, resources) {


  fx = new revolt.FX();
  fx.initBundle(resources.fx_settings.data);
  // temporary emitter test
  //const emitter = fx.getParticleEmitter('plasma-corona');
  //emitter.init(container);

  let sheet;

  if(USE_SPRITESHEET){
    sheet = PIXI.Loader.shared.resources["./img/spritesheet.json"].spritesheet;
  }else{
    sheet = {"textures":[]}
    for(let i in things){
        sheet.textures[things[i].src] = PIXI.Texture.from('./imgstorage/'+things[i].src);
    }
  }


  // containers = {things_name: PIXIContainer}
  let containers = {};
  for(let i in things){
    let sprite_container = new PIXI.Container;
    let sprite_container2 = new PIXI.Container;

    // give the containers a name for debuggin purposes
    sprite_container.type="sprite_container";
    sprite_container2.type="sprite_container2"

    sprite_container.addChild(sprite_container2);

    //sprite_container.children = things[i].children;
    sprite_container.parent_ = things[i].parent;

    containers[i] = sprite_container;
  }

  /*for(let i in containers){
    if(!containers[i].parent_){
      // add sprite_container to container
      container.addChild(containers[i]);
    }else{
      // add child's sprite_container to parent's sprite_container2
      containers[containers[i].parent_].children[0].addChild(containers[i]);
    }
  }*/


  let things_buffer = {};

  for(let i in things){



    let tex_ = sheet.textures[things[i].src];
    let w_ = tex_.width;
    let h_ = tex_.height;

    let sprite;
    console.log(i);
    if(!things[i].strip){
        // if is a sprite
        sprite = new PIXI.Sprite(tex_);
        // set anchor
        sprite.anchor.x = things[i].anchor.x;
        sprite.anchor.y = things[i].anchor.y;
    }else{
      // if is a rope
      let points = [];
      let pointCount = strips[things[i].strip].points;
      let ropelength = w_ / pointCount;
      for(let i = 0; i < pointCount; i++) {
          points.push(new PIXI.Point(i*ropelength, 0));
      }
      sprite = new PIXI.SimpleRope(tex_, points);
      sprite.points = points;
      sprite.ropeLength = ropelength;
      sprite.showPoints = false;
    }

    let sprite_container = containers[i];
    let sprite_container2 = containers[i].children[0];

    //                       position            animation        image
    //stage > container > sprite_container > sprite_container2 > sprite
    //                                                         > sprite_container > sprite_container2 > child

    //set position
    //set container position instead so sprite can move in animation
    sprite_container.x = things[i].position.x;
    sprite_container.y = things[i].position.y;
    sprite_container.rotation = things[i].rotation;

    // for dragging in dbug mode and click to get info
    sprite.interactive = true;
    sprite.on('mousedown',function(){
      if(dbug){
        select(sprite.name);
        draggedSprite_dbug = sprite;

      }else if(sprite.scrollOnClick){
        updateScrollerTo(sprite.scrollOnClick);
        showInfo(sprite.name);
      }

    })



    sprite_container.scale.set(things[i].scale);

    sprite.name = i;
    sprite.parentName = things[i].parent;
    sprite.scrollOnClick = things[i].scrollOnClick;

    // add sprite to list of sprites
    sprites.push(sprite);




    //create animate function as a property of the sprite. This is called every frame
    //animateTime is used for the animations reset after a certain time (ms)
    if(things[i].animation){
      sprite.animationTime = 0;
      let animation_ = animations[things[i].animation];
      sprite.reset_time = animation_.reset_time;

      sprite.animationFunction = function(delta){

        sprite.animationTime += delta;
        //reset the time if it is past the reset
        if(sprite.animationTime>=sprite.reset_time){
          sprite.animationTime = 0;
        }



        for(let p = 0; p<animation_.properties.length; p++){
          let prop = animation_.properties[p];

          if(prop.function){

            //move, rotate, or do whatever to sprite_container2
            if(!prop.smoothness){
              let animationValue = prop.function(sprite.animationTime*prop.speed+prop.time_offset)*prop.magnitude;
              if(prop.type=="scaleX"){
                sprite.parent.scale.x = animationValue;
              }else if(prop.type === "scaleY"){
                sprite.parent.scale.y = animationValue;
              }else{
                sprite.parent[prop.type] = animationValue;
              }

            }else{
              //NOT USED (I think)
              if(sprite.parent[prop.type+"_last"]===undefined){
                sprite.parent[prop.type+"_last"] = sprite.parent[prop.type];
              }
              sprite.parent[prop.type] = (prop.function(sprite.animationTime*prop.speed+prop.time_offset)*prop.magnitude + sprite.parent[prop.type+"_last"]*prop.smoothness)/(prop.smoothness+1)
            }



          }
          if(prop.alter_function){
            prop.alter_function(sprite);
          }

        }

      }
    }
    // if is rope
    if(sprite.points){
      sprite.ropeAnimate = strips[things[i].strip].animate
    }

    things_buffer[i] = sprite;

  }

  for(let i in things){

    for(let i2 = 0; i2<things[i].childrenBelow.length; i2++){
      containers[i].children[0].addChild( containers[ things[i].childrenBelow[i2] ] );
    }

    containers[i].children[0].addChild( things_buffer[i] );

    for(let i2 = 0; i2<things[i].childrenAbove.length; i2++){
      containers[i].children[0].addChild( containers[ things[i].childrenAbove[i2] ] );
    }

  }


  for(let i in things){
    if(!things[i].parent){
      container.addChild(containers[i]);
    }
  }


  let lineGraphics = new PIXI.Graphics();
  container.addChild(lineGraphics);

//{"direction":"left","position":{x:-80,y:-300}, "width":5, "color":0},

  for(let i = 0; i<text_things.length; i++){
    let data = text_things[i];
    if(data.direction){ // line item

      let x_ = Math.cos(data.direction)*data.length+data.position.x;
      let y_ = Math.sin(data.direction)*data.length+data.position.y;

      console.log({x_,y_});

      lineGraphics.position.set(0,0);
      lineGraphics.lineStyle(data.width, data.color || 0xbff7ff)
      lineGraphics.moveTo(data.position.x, data.position.y);
      lineGraphics.lineTo(x_, y_);

    }else{ // text item
      text_ = new PIXI.Text(data.text, {fontFamily : 'Arial', fontSize: data.size, fill : data.color || 0xbff7ff, align : 'center'});
      text_.x = data.position.x;
      text_.y = data.position.y;
      text_.anchor.set(0,0.5)
      container.addChild(text_);
    }
  }


  initCustom();

  // animation updates



  app.ticker.add((delta) => {

    deltaT = Date.now()-lastUpdated;
    lastUpdated = Date.now();

    // update particle systems
    fx.update()

    // animate things
    for(let i = 0; i<sprites.length; i++){
      if(sprites[i].animationFunction){
        sprites[i].animationFunction(deltaT);
      }
      if(sprites[i].ropeAnimate){
        sprites[i].ropeAnimate();
        if(sprites[i].showPoints){
          renderPoints(sprites[i].points)
        }
      }
    }
    updateScroller();
    customs_function();
    animateTextContainer();
  });

  // init at home view
  updateScrollerTo(SCROLL_START);

}


const textContainer = new PIXI.Container();
ui.addChild(textContainer);
textContainer.extendedPosX = 650;
textContainer.x = textContainer.extendedPosX;
//textContainer.renderable = false

// add the info box
const infoBox = new PIXI.Sprite(PIXI.Texture.WHITE);
infoBox.width = 500;
infoBox.height=height;
infoBox.alpha = 0.95;
infoBox.tint=0x478bff;
textContainer.addChild(infoBox);

const title = new PIXI.Text('This is the title',{fontFamily : 'Arial', fontSize: 24, fill : 0xedf7ff});
title.anchor.x = 0.5;
title.x = (width-textContainer.x)/2;
title.y = 40;
textContainer.addChild(title);
const infoText = new PIXI.Text('here is a short description',{fontFamily : 'Arial', fontSize: 14, fill : 0xedf7ff});
infoText.x = 20;
infoText.y = 105;
textContainer.addChild(infoText);

textContainer.x = width;



// add the scroller
const scrollerbar = new PIXI.Sprite(PIXI.Texture.WHITE)
scrollerbar.width = width-20;
scrollerbar.height = 26;
scrollerbar.x = width/2;
scrollerbar.y = 26/2+3
scrollerbar.anchor.set(0.5);
scrollerbar.alpha = 0.5;
ui.addChild(scrollerbar);

const scroller = new PIXI.Sprite.from('./img/slider.png'); // TODO change this to an image isntead of a blank texture
scroller.x = width/2;
scroller.y = 26/2+3;
scroller.anchor.set(0.5);
ui.addChild(scroller);
scroller.interactive = true;

scroller.on('mousedown', function(){
  grabOffset = this.x-mouseX*(scrollerbar.width+20)/app.renderer.width
  this.mousedown = true;
})
window.addEventListener('mouseup', function(){
  scroller.mousedown = false;
  grabOffset = 0;
})
app.view.addEventListener("mousemove",function(e){
  mouseX = e.offsetX;
  mouseY = e.offsetY;
})
function updateScroller(bypassmouse=false){
  // bypassmouse will be true when updating scoll view without moving the scroller with the mouse

  // smooth move the scroller to the mouse.
  // higher values make slower smoothness
  const smoothness = 20;

  if(scroller.mousedown || bypassmouse){

    if(showTextContainer){
      hideInfo();
    }

    if(!bypassmouse){

      //set to mousePointer
      let newScroll = (mouseX)*(scrollerbar.width+20)/app.renderer.width;//+grabOffset;
      // add bounds from scroller Bar Rectangle
      newScroll = Math.max(Math.min(width-scroller.width/2-10, newScroll), scroller.width/2+10);



      // let dist_ = Math.abs(newScroll - scrollerX)+10;
      // console.log(dist_);
      // let maxspeed = 0.001;
      // if(dist_>10){
      //   maxspeed = 0.1;
      // }
      // if(dist_>100){
      //   maxspeed = 0.5
      // }
      //
      //
      // if(scrollerX-newScroll < -maxspeed){
      //   scrollerX += maxspeed;
      // }else if(scrollerX-newScroll > maxspeed){
      //   scrollerX -= maxspeed;
      // }else{
      //   scrollerX = newScroll;
      // }

      scrollerX = (scrollerX*50+newScroll)/(50+1);


    }

    // scroll % = scrollX / maxscrollX
    scroll=(scrollerX-scroller.width/2-10)/(width-scroller.width-20)
    // set sprite position
    scroller.x = scrollerX

    // find upper and lower keyframe
    for(let i = 0; i<keyframes.length-1; i++){
      if(keyframes[i].pos<=scroll && keyframes[i+1].pos>=scroll){
        // lower = i, upper = i+1

        let mix = (scroll-keyframes[i].pos)/(keyframes[i+1].pos-keyframes[i].pos)

        setScroll(
          keyframes[i].x*(1-mix)+keyframes[i+1].x*(mix),
          keyframes[i].y*(1-mix)+keyframes[i+1].y*(mix),
          1/(1/keyframes[i].zoom*(1-mix)+1/keyframes[i+1].zoom*(mix))
        )

        /*scrollTo(
          (keyframes[i].x*(1-mix)+keyframes[i+1].x*(mix) + last_cam.x*100)/101,
          (keyframes[i].y*(1-mix)+keyframes[i+1].y*(mix) + last_cam.y*100)/101,
          (1/(1/keyframes[i].zoom*(1-mix)+1/keyframes[i+1].zoom*(mix)) + last_cam.zoom*100)/101
        );*/

      }
    }

  }
  if(!dbug){
    smoothUpdateScroll();
  }
}

// instandly scroll to a certain percent
function updateScrollerTo(percent){
  scrollerX = percent*(width-20-scroller.width)+10+scroller.width/2
  updateScroller(true);
}

// set the values that the screen will smoothly scroll towards
let set_cam = {x:0,y:0,zoom:1}
function setScroll(x,y,zoom){
  set_cam.x = x;
  set_cam.y = y;
  set_cam.zoom = zoom;
}

// move current scroll to set scroll (called every frame)
function smoothUpdateScroll(){
  scrollTo(
    (set_cam.x + -cam.x*CAM_SMOOTHNESS)/(CAM_SMOOTHNESS+1),
    (set_cam.y + -cam.y*CAM_SMOOTHNESS)/(CAM_SMOOTHNESS+1),
    (set_cam.zoom + cam.zoom*CAM_SMOOTHNESS)/(CAM_SMOOTHNESS+1)
  );
}


let showTextContainer = false;
let textContainerExpanding = 0; // 0 is still, 1 is outward, -1 is inward;
let textContainerToggleTime = 0;
function showInfo(name){
  showTextContainer = true;
  title.text = things[name].title;
  infoText.text = text[LANGUAGE][things[name].infoText];
  textContainer.x = width;
  textContainerExpanding = 1;
  textContainerToggleTime = Date.now();
  textContainer.renderable=true;
}
function hideInfo(){
  showTextContainer = false;
  textContainerExpanding = -1;
  textContainerToggleTime = Date.now();
  textContainer.x = textContainer.extendedPosX;
}

var ta = function(x){
  return (1/0.017)*Math.sin(x*0.017)/(1+Math.pow(0.002*x,6))/x;
}

function animateTextContainer(){
  //Date.now()-textContainerToggleTime
  if(textContainerExpanding===1){
    let x = Date.now()-textContainerToggleTime;
    let mix = ta(x);
    if(x>554.4){
      textContainerExpanding = 0;
    }
    textContainer.x = width*mix + textContainer.extendedPosX*(1-mix);

  }else if(textContainerExpanding===-1){

    let x = 554.4-(Date.now()-textContainerToggleTime);
    let mix = ta(x);
    if(x<0){
      mix = 1;
      textContainerExpanding = 0;
      textContainer.renderable=false
    }
    textContainer.x = width*mix + textContainer.extendedPosX*(1-mix);
  }

}
