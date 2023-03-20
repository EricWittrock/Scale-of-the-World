// let sea;
// let sky;
// let background0;

let customs = {}
let customs_function;

function initCustom(){

  // sky
  customs.sky = new PIXI.Sprite.from('./img/sky.png');
  customs.sky.width = width;
  customs.sky.height = height;
  backgroundLayer.addChild(customs.sky);

  // background0
  customs.background0 = new PIXI.Sprite.from('./img/background0.png');
  customs.background0.anchor.set(0.5,1);
  backgroundLayer.addChild(customs.background0);

  // background1
  customs.background1 = new PIXI.Sprite.from('./img/background0.png');
  customs.background1.anchor.set(0.5,1);
  customs.background1.alpha = 0.5
  customs.background1.scale.x = -1.3
  backgroundLayer.addChild(customs.background1);


  let ground = new PIXI.Sprite(PIXI.Texture.WHITE); // TEMP
  window.ground = ground;
  ground.width = 2000+30000;
  ground.height=1000;
  ground.y = 0;
  ground.x = -1500-30000;
  ground.tint=4500807;
  container.addChild(ground);

  // sea
  customs.sea = new PIXI.Sprite(PIXI.Texture.WHITE);
  customs.sea.width = 1500;
  customs.sea.height=1000;
  customs.sea.alpha = 0.5;
  customs.sea.x = 550;
  customs.sea.tint=2522787;
  container.addChild(customs.sea);

  // sea
  customs.fullsea = new PIXI.Sprite(PIXI.Texture.WHITE);
  customs.fullsea.width = app.renderer.width;
  customs.fullsea.height= app.renderer.height;
  customs.fullsea.alpha = 0.5;
  customs.fullsea.tint=2522787;
  spriteOverlay.addChild(customs.fullsea);

  customs.fullgrass = new PIXI.Sprite(PIXI.Texture.WHITE);
  customs.fullgrass.width = app.renderer.width;
  customs.fullgrass.height = 150;
  customs.fullgrass.anchor.set(0,1);
  customs.fullgrass.y = app.renderer.height;
  customs.fullgrass.x = 0;
  customs.fullgrass.tint=4500807;
  //spriteOverlay.addChild(customs.fullgrass);


  customs_function = function(){

    //set position for background0
    customs.background0.x = (container.x-offset.x)*0.13+offset.x;
    customs.background0.y = height
    customs.background0.scale.set(container.scale.x*0.13+1);

    //set position for background 1
    customs.background1.x = (container.x-offset.x)*0.08+offset.x;
    customs.background1.y = height
    customs.background1.scale.set(container.scale.x*-0.08-1.3);
    customs.background1.scale.y = Math.abs(customs.background1.scale.y);

    //set sky tint
    if(container.y<200){
      customs.sky.alpha = 1-(200-container.y)/2000;
    }

    //set mountains opacity
    if(container.y<300){
      customs.background0.alpha = 1-(300-container.y)/300;
      customs.background1.alpha = 1-(300-container.y)/300-0.5;
    }


    if(cam.y<-800){
      customs.sea.visible = false;
      customs.fullsea.visible= true;
    }else{
      customs.sea.visible = true;
      customs.fullsea.visible= false;
      // move sea level
      customs.sea.y = Math.sin(time()/1000)*10+120
    }


    let gr = customs.fullgrass;
    if(cam.x<-250){

    }else{

    }

  }



}
