const original = {};

const animation_functions = {
  "sin":Math.sin,
  "eartwitch":function(t){return Math.sin(4*(t+Math.PI/4))/Math.pow(t+Math.PI/4,3)},
  "eartwitch2":function(t){return (2*Math.sin(0.1*t)+0.5*Math.sin(0.5*t)+Math.sin(2*t)*0.25+Math.sin(3*t+1)*0.2)/t},
  "seaheight":function(){return customs.sea.y-120},
  "paralax0":function(sprite_){sprite_.x=cam.x*0.1+offset.x; sprite_.y=cam.x*0.1+offset.x},
  "flicker":function(t){return Math.pow(Math.sin(t),2)},
  "sinwithcam": function(spr){
    //5.7379 is inverse scale of sprite

      //spr.y = (spr.y + (-cam.y*5.73791348600509))/2// + Math.sin(time())*50;
      spr.y = (spr.y*16-Math.min(cam.y,-400)*5.73791348600509/cam.zoom)/17 + Math.sin(time()*0.0006)*10;
  }

}




/*
reset_on_enter: start the animation every time the sprite enters the frame
reset_time: time (ms) untill animation resets
properties:
  type: the property of the sprite that will be altered by the return value of the animation function
  function: a function that returns a value given the sprites animationTime
  speed: the speed multiple of the function
  magnitude: the multiple of the function's output
  time_offset: added to sprite.animationTime
  alter_function: a function that returns void and modified the sprite instead. The parameter is the sprite
  smoothness: slowness of transition from one position to the next (higher is a slower transition)
*/
const animations = {
  "nothing":{"reset_on_enter":false, "reset_time":Infinity, "properties":[]},
  "sailboat":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"type":"rotation", "function":animation_functions.sin, "speed":0.0006, "magnitude":0.05, "time_offset":0}, {"type":"x","function":animation_functions.sin, "speed":0.0003, "magnitude":50, "time_offset":0}, {"type":"y","function":animation_functions.seaheight, "speed":0, "magnitude":1.5, "time_offset":0}]},
  "bob":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"type":"y","function":animation_functions.sin, "speed":0.0003, "magnitude":10, "time_offset":0}]},
  "paralax0":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"paralax0":animation_functions.paralax0}]},
  "rotatesin":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"type":"rotation", "function":animation_functions.sin, "speed":0.003, "magnitude":0.05, "time_offset":0}]},
  "eartwitch":{"reset_on_enter":false, "reset_time":4000, "properties":[{"type":"rotation", "smoothness":0.5, "function":animation_functions.eartwitch, "speed":0.005, "magnitude":-2, "time_offset":1}]},

  "palmwave0":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"type":"rotation", "function":animation_functions.sin, "speed":0.003, "magnitude":0.05, "time_offset":1.6}]},
  "palmwave1":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"type":"rotation", "function":animation_functions.sin, "speed":0.003, "magnitude":0.06, "time_offset":0}]},
  "palmwave2":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"type":"rotation", "function":animation_functions.sin, "speed":0.003, "magnitude":0.1, "time_offset":0.5}]},
  "palmwave3":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"type":"rotation", "function":animation_functions.sin, "speed":0.003, "magnitude":0.025, "time_offset":1}]},
  "palmwave4":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"type":"rotation", "function":animation_functions.sin, "speed":0.003, "magnitude":0.01, "time_offset":0.75}]},
  "palmwave5":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"type":"rotation", "function":animation_functions.sin, "speed":0.003, "magnitude":0.07, "time_offset":3}]},

  "heleprop0":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"type":"scaleX", "function":animation_functions.sin, "speed":0.03, "magnitude":1, "time_offset":0}]},
  "heleprop1":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"type":"scaleX", "function":animation_functions.sin, "speed":0.03, "magnitude":1, "time_offset":3}]},
  "ch47":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"type":"rotation", "function":animation_functions.sin, "speed":0.0006, "magnitude":0.04, "time_offset":0}, {"type":"y","function":animation_functions.sin, "speed":0.0009, "magnitude":20, "time_offset":0}, {"type":"x","function":animation_functions.sin, "speed":0.0006, "magnitude":10, "time_offset":2}]},

  "flicker1":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"type":"alpha","function":animation_functions.flicker, "speed":0.007, "magnitude":1, "time_offset":0}]},
  "flicker2":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"type":"alpha","function":animation_functions.flicker, "speed":0.007, "magnitude":1, "time_offset":Math.PI/2}]},

  //"deepsub":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"type":"y","function":animation_functions.sinwithcam, "speed":0.0006, "magnitude":1, "time_offset":0}]},
  "deepsub":{"reset_on_enter":false, "reset_time":Infinity, "properties":[{"alter_function":animation_functions.sinwithcam}]},



}


const strips = {}

const ropeFrames =
/*~splitter~*/
{
  "argentinosaurus":{"0":[{"x":0,"y":0},{"x":19.28,"y":0},{"x":38.56,"y":0},{"x":57.84,"y":0},{"x":77.12,"y":0},{"x":96.4,"y":0},{"x":115.68,"y":0},{"x":134.96,"y":0},{"x":154.24,"y":0},{"x":173.52,"y":0},{"x":192.8,"y":0},{"x":212.08,"y":0},{"x":231.36,"y":0},{"x":250.64,"y":0},{"x":269.92,"y":0},{"x":289.2,"y":0},{"x":308.48,"y":0},{"x":327.76,"y":0},{"x":347.04,"y":0},{"x":366.32,"y":0},{"x":385.6,"y":0},{"x":404.88,"y":0},{"x":424.16,"y":0},{"x":443.44,"y":0},{"x":462.72,"y":0}],"1664":[{"x":9.03477,"y":-10.0133},{"x":27.9342,"y":-9.55158},{"x":46.1489,"y":-8.28275},{"x":64.0268,"y":-6.56379},{"x":81.9781,"y":-4.81223},{"x":100.311,"y":-3.34851},{"x":119.133,"y":-2.30478},{"x":138.316,"y":-1.62541},{"x":157.583,"y":-1.14034},{"x":176.616,"y":-0.673272},{"x":195.173,"y":-0.14685},{"x":213.226,"y":0.349325},{"x":230.916,"y":0.55592},{"x":248.557,"y":0.120829},{"x":266.447,"y":-1.26125},{"x":284.718,"y":-3.69492},{"x":303.37,"y":-6.99218},{"x":322.264,"y":-10.6988},{"x":341.225,"y":-14.2458},{"x":360.119,"y":-17.1486},{"x":378.882,"y":-19.1434},{"x":397.571,"y":-20.1877},{"x":416.319,"y":-20.3348},{"x":435.339,"y":-19.6215},{"x":454.818,"y":-18.051}],"1912":[{"x":0.672587,"y":-4.57795},{"x":20.3105,"y":-5.74074},{"x":39.9195,"y":-6.42571},{"x":59.4742,"y":-6.46804},{"x":78.9995,"y":-5.90365},{"x":98.5467,"y":-4.93983},{"x":118.146,"y":-3.84171},{"x":137.737,"y":-2.80766},{"x":157.186,"y":-1.90755},{"x":176.303,"y":-1.113},{"x":194.942,"y":-0.392104},{"x":213.113,"y":0.193507},{"x":230.968,"y":0.448491},{"x":248.784,"y":0.0902692},{"x":266.818,"y":-1.13322},{"x":285.194,"y":-3.30443},{"x":303.912,"y":-6.25035},{"x":322.847,"y":-9.56307},{"x":341.842,"y":-12.7334},{"x":360.777,"y":-15.328},{"x":379.595,"y":-17.1111},{"x":398.347,"y":-18.0445},{"x":417.151,"y":-18.176},{"x":436.199,"y":-17.5384},{"x":455.657,"y":-16.1346}],"2088":[{"x":0,"y":0},{"x":19.28,"y":0},{"x":38.56,"y":0},{"x":57.84,"y":0},{"x":77.12,"y":0},{"x":96.4,"y":0},{"x":115.68,"y":0},{"x":134.96,"y":0},{"x":154.24,"y":0},{"x":173.52,"y":0},{"x":192.8,"y":0},{"x":212.08,"y":0},{"x":231.36,"y":0},{"x":250.64,"y":0},{"x":269.92,"y":0},{"x":289.2,"y":0},{"x":308.48,"y":0},{"x":327.76,"y":0},{"x":347.04,"y":0},{"x":366.32,"y":0},{"x":385.6,"y":0},{"x":404.88,"y":0},{"x":424.16,"y":0},{"x":443.44,"y":0},{"x":462.72,"y":0}],"2388":[{"x":0.946141,"y":12.2997},{"x":20.28,"y":13},{"x":39.5061,"y":12.2997},{"x":58.6414,"y":10.4176},{"x":77.7276,"y":7.89854},{"x":96.8124,"y":5.36094},{"x":115.931,"y":3.25717},{"x":135.096,"y":1.77162},{"x":154.306,"y":0.86264},{"x":173.549,"y":0.376322},{"x":192.804,"y":0.148274},{"x":212.056,"y":0.0572225},{"x":231.284,"y":0.0360203},{"x":250.445,"y":0.063914},{"x":269.48,"y":0.158719},{"x":288.311,"y":0.374791},{"x":306.9,"y":0.801443},{"x":325.309,"y":1.55176},{"x":343.717,"y":2.73247},{"x":362.516,"y":4.39156},{"x":382.054,"y":6.45254},{"x":402.554,"y":8.66},{"x":423.836,"y":10.5836},{"x":445.366,"y":11.7238},{"x":466.464,"y":11.7094}],"2726":[{"x":0,"y":0},{"x":19.28,"y":0},{"x":38.56,"y":0},{"x":57.84,"y":0},{"x":77.12,"y":0},{"x":96.4,"y":0},{"x":115.68,"y":0},{"x":134.96,"y":0},{"x":154.24,"y":0},{"x":173.52,"y":0},{"x":192.8,"y":0},{"x":212.08,"y":0},{"x":231.36,"y":0},{"x":250.64,"y":0},{"x":269.92,"y":0},{"x":289.2,"y":0},{"x":308.48,"y":0},{"x":327.76,"y":0},{"x":347.04,"y":0},{"x":366.32,"y":0},{"x":385.6,"y":0},{"x":404.88,"y":0},{"x":424.16,"y":0},{"x":443.44,"y":0},{"x":462.72,"y":0}],"3228":[{"x":0.29096,"y":-0.87288},{"x":19.7338,"y":-1.36137},{"x":39.2012,"y":-1.92354},{"x":58.6608,"y":-2.46226},{"x":78.0718,"y":-2.85545},{"x":97.3999,"y":-3},{"x":116.632,"y":-2.85545},{"x":135.78,"y":-2.46226},{"x":154.878,"y":-1.92353},{"x":173.967,"y":-1.36135},{"x":193.073,"y":-0.872818},{"x":212.207,"y":-0.506801},{"x":231.358,"y":-0.266015},{"x":250.507,"y":-0.124674},{"x":269.633,"y":-0.0477795},{"x":288.717,"y":-0.0031849},{"x":307.758,"y":0.0347834},{"x":326.762,"y":0.0864894},{"x":345.75,"y":0.168297},{"x":364.738,"y":0.29077},{"x":383.74,"y":0.453742},{"x":402.777,"y":0.64117},{"x":421.877,"y":0.820765},{"x":441.082,"y":0.951813},{"x":460.429,"y":1}],"3815":[{"x":0,"y":0},{"x":19.28,"y":0},{"x":38.56,"y":0},{"x":57.84,"y":0},{"x":77.12,"y":0},{"x":96.4,"y":0},{"x":115.68,"y":0},{"x":134.96,"y":0},{"x":154.24,"y":0},{"x":173.52,"y":0},{"x":192.8,"y":0},{"x":212.08,"y":0},{"x":231.36,"y":0},{"x":250.64,"y":0},{"x":269.92,"y":0},{"x":289.2,"y":0},{"x":308.48,"y":0},{"x":327.76,"y":0},{"x":347.04,"y":0},{"x":366.32,"y":0},{"x":385.6,"y":0},{"x":404.88,"y":0},{"x":424.16,"y":0},{"x":443.44,"y":0},{"x":462.72,"y":0}],"4000":[{"x":0,"y":0},{"x":19.28,"y":0},{"x":38.56,"y":0},{"x":57.84,"y":0},{"x":77.12,"y":0},{"x":96.4,"y":0},{"x":115.68,"y":0},{"x":134.96,"y":0},{"x":154.24,"y":0},{"x":173.52,"y":0},{"x":192.8,"y":0},{"x":212.08,"y":0},{"x":231.36,"y":0},{"x":250.64,"y":0},{"x":269.92,"y":0},{"x":289.2,"y":0},{"x":308.48,"y":0},{"x":327.76,"y":0},{"x":347.04,"y":0},{"x":366.32,"y":0},{"x":385.6,"y":0},{"x":404.88,"y":0},{"x":424.16,"y":0},{"x":443.44,"y":0},{"x":462.72,"y":0}],"smoothness":[10,1,1,1,6,7,10,10,10]},

"trex":{"0":[{"x":0,"y":0},{"x":26.5,"y":0},{"x":53,"y":0},{"x":79.5,"y":0},{"x":106,"y":0},{"x":132.5,"y":0},{"x":159,"y":0},{"x":185.5,"y":0},{"x":212,"y":0},{"x":238.5,"y":0},{"x":265,"y":0},{"x":291.5,"y":0},{"x":318,"y":0},{"x":344.5,"y":0},{"x":371,"y":0},{"x":397.5,"y":0},{"x":424,"y":0},{"x":450.5,"y":0},{"x":477,"y":0},{"x":503.5,"y":0},{"x":530,"y":0},{"x":556.5,"y":0},{"x":583,"y":0}],"1126":[{"x":0,"y":-11},{"x":26.5,"y":-9.04527},{"x":53,"y":-6.48122},{"x":79.5,"y":-3.71863},{"x":106,"y":-1.70843},{"x":132.5,"y":-0.628498},{"x":159,"y":-0.185128},{"x":185.5,"y":-0.0434938},{"x":212,"y":-0.006789},{"x":238.5,"y":0.008401},{"x":265,"y":0.0509319},{"x":291.5,"y":0.216555},{"x":318,"y":0.735191},{"x":344.5,"y":1.99843},{"x":371,"y":4.34988},{"x":397.5,"y":7.58145},{"x":424,"y":10.5808},{"x":450.5,"y":13},{"x":477,"y":10.5808},{"x":503.5,"y":7.58145},{"x":530,"y":4.34988},{"x":556.5,"y":1.99843},{"x":583,"y":0.735192}],"1632":[{"x":1,"y":-16},{"x":26.5,"y":-13.3926},{"x":53,"y":-9.59632},{"x":79.5,"y":-5.50593},{"x":106,"y":-2.52954},{"x":132.5,"y":-0.930578},{"x":159,"y":-0.274124},{"x":185.5,"y":-0.0646006},{"x":212,"y":-0.0117253},{"x":238.5,"y":0.0013764},{"x":265,"y":0.0168479},{"x":291.5,"y":0.0723973},{"x":318,"y":0.246155},{"x":344.5,"y":0.670961},{"x":371,"y":1.46965},{"x":397.5,"y":2.59937},{"x":424,"y":3.7598},{"x":450.5,"y":3.63798},{"x":477,"y":5.04379},{"x":503.491,"y":5.50565},{"x":529,"y":7.66055},{"x":556.456,"y":7.09911},{"x":581,"y":8.64627}],"2463":[{"x":-1.00001,"y":4.57474},{"x":26.5,"y":4.58364},{"x":54,"y":4.96944},{"x":79.5,"y":3.63513},{"x":106,"y":2.35159},{"x":132.5,"y":1.18728},{"x":159,"y":0.472425},{"x":185.5,"y":0.149156},{"x":212,"y":0.0379809},{"x":238.5,"y":0.0107451},{"x":265,"y":0.0181002},{"x":291.5,"y":0.0710268},{"x":318,"y":0.23589},{"x":344.5,"y":0.616255},{"x":371,"y":1.23569},{"x":397.5,"y":1.79523},{"x":424,"y":1.5309},{"x":450.5,"y":-1.35996},{"x":477,"y":-4.06506},{"x":503.5,"y":-8.07309},{"x":532,"y":-10.5472},{"x":556.5,"y":-9.93786},{"x":583,"y":-7.35344}],"3190":[{"x":0.99999,"y":12.5747},{"x":26.5274,"y":10.664},{"x":54,"y":9.32621},{"x":79.5,"y":6.13485},{"x":106,"y":3.49994},{"x":132.5,"y":1.60914},{"x":159,"y":0.592446},{"x":185.5,"y":0.155037},{"x":212,"y":-0.0559917},{"x":238.5,"y":-0.326233},{"x":265,"y":-0.899886},{"x":291.5,"y":-1.926},{"x":318,"y":-3.23636},{"x":344.5,"y":-4.18811},{"x":371,"y":-4.5299},{"x":397.5,"y":-2.28524},{"x":424,"y":0.198443},{"x":450.5,"y":1.54162},{"x":477,"y":4.27895},{"x":503.5,"y":6.89658},{"x":531.909,"y":9.9211},{"x":551.424,"y":11.4341},{"x":577.909,"y":12.8371}],"4000":[{"x":0,"y":0},{"x":26.5,"y":0},{"x":53,"y":0},{"x":79.5,"y":0},{"x":106,"y":0},{"x":132.5,"y":0},{"x":159,"y":0},{"x":185.5,"y":0},{"x":212,"y":0},{"x":238.5,"y":0},{"x":265,"y":0},{"x":291.5,"y":0},{"x":318,"y":0},{"x":344.5,"y":0},{"x":371,"y":0},{"x":397.5,"y":0},{"x":424,"y":0},{"x":450.5,"y":0},{"x":477,"y":0},{"x":503.5,"y":0},{"x":530,"y":0},{"x":556.5,"y":0},{"x":583,"y":0}],"smoothness":[20,20,20,20,20,20]},

"mosasaurus":{"0":[{"x":0,"y":0},{"x":24,"y":0},{"x":48,"y":0},{"x":72,"y":0},{"x":96,"y":0},{"x":120,"y":0},{"x":144,"y":0},{"x":168,"y":0},{"x":192,"y":0},{"x":216,"y":0},{"x":240,"y":0},{"x":264,"y":0},{"x":288,"y":0},{"x":312,"y":0},{"x":336,"y":0},{"x":360,"y":0},{"x":384,"y":0},{"x":408,"y":0},{"x":432,"y":0},{"x":456,"y":0},{"x":480,"y":0},{"x":504,"y":0},{"x":528,"y":0},{"x":552,"y":0},{"x":576,"y":0}],"2511":[{"x":0.758053,"y":6.41898},{"x":25.5718,"y":4.87348},{"x":48.151,"y":2.74728},{"x":71.8251,"y":3.2459},{"x":95.3757,"y":4.35616},{"x":118.884,"y":6.22311},{"x":142.498,"y":10.3614},{"x":166.361,"y":12.0517},{"x":190.39,"y":15.8317},{"x":214.891,"y":21.5298},{"x":239.304,"y":21.7327},{"x":263.659,"y":23.8213},{"x":287.861,"y":23.175},{"x":311.962,"y":18.1251},{"x":335.995,"y":15.7796},{"x":360.001,"y":9.14335},{"x":383.993,"y":5.29352},{"x":407.972,"y":2.52281},{"x":431.888,"y":0.652758},{"x":455.634,"y":-1.04768},{"x":479.018,"y":-3.67389},{"x":501.882,"y":-8.13476},{"x":524.325,"y":-14.1887},{"x":546.881,"y":-19.7096},{"x":568.902,"y":-28.4102}],"5203":[{"x":-3.80644,"y":-10.5297},{"x":21.1029,"y":-8.08723},{"x":45.3637,"y":-4.14029},{"x":69.7364,"y":-3.18023},{"x":94.1043,"y":-1.94969},{"x":118.438,"y":-0.724299},{"x":142.837,"y":1.6679},{"x":167.452,"y":0.291853},{"x":192.236,"y":-0.31819},{"x":218.443,"y":-3.72618},{"x":242.354,"y":-7.41207},{"x":267.548,"y":-8.00134},{"x":290.316,"y":-9.02089},{"x":313.882,"y":-7.26699},{"x":337.1,"y":-9.00106},{"x":360.468,"y":-7.69616},{"x":383.983,"y":-7.91113},{"x":407.543,"y":-7.80247},{"x":430.942,"y":-7.17798},{"x":453.938,"y":-5.5959},{"x":476.193,"y":-2.40581},{"x":497.459,"y":2.33754},{"x":517.991,"y":6.88089},{"x":539.057,"y":18.7183},{"x":559.857,"y":26.0517}],"6000":[{"x":0,"y":0},{"x":24,"y":0},{"x":48,"y":0},{"x":72,"y":0},{"x":96,"y":0},{"x":120,"y":0},{"x":144,"y":0},{"x":168,"y":0},{"x":192,"y":0},{"x":216,"y":0},{"x":240,"y":0},{"x":264,"y":0},{"x":288,"y":0},{"x":312,"y":0},{"x":336,"y":0},{"x":360,"y":0},{"x":384,"y":0},{"x":408,"y":0},{"x":432,"y":0},{"x":456,"y":0},{"x":480,"y":0},{"x":504,"y":0},{"x":528,"y":0},{"x":552,"y":0},{"x":576,"y":0}],"smoothness":[50,50,50,50]},

"spermwhale":{"0":[{"x":0,"y":0},{"x":31.7368421,"y":0},{"x":63.4736842,"y":0},{"x":95.2105263,"y":0},{"x":126.9473684,"y":0},{"x":158.6842105,"y":0},{"x":190.4210526,"y":0},{"x":222.1578947,"y":0},{"x":253.8947368,"y":0},{"x":285.6315789,"y":0},{"x":317.3684211,"y":0},{"x":349.1052632,"y":0},{"x":380.8421053,"y":0},{"x":412.5789474,"y":0},{"x":444.3157895,"y":0},{"x":476.0526316,"y":0},{"x":507.7894737,"y":0},{"x":539.5263158,"y":0},{"x":571.2631579,"y":0},{"x":603,"y":0}],"1589":[{"x":0,"y":5.84383},{"x":31.7368,"y":5.06279},{"x":63.4737,"y":3.91048},{"x":95.2105,"y":2.36511},{"x":126.947,"y":0.827706},{"x":158.684,"y":-0.295649},{"x":190.421,"y":-0.808279},{"x":222.14,"y":-0.878746},{"x":251.891,"y":-3.46939},{"x":285.614,"y":-1.09535},{"x":317.368,"y":-1.25901},{"x":349.105,"y":-0.931353},{"x":380.842,"y":0.285138},{"x":412.579,"y":2.61637},{"x":444.316,"y":6.17701},{"x":476.053,"y":10.9248},{"x":507.789,"y":16.452},{"x":539.526,"y":21.8431},{"x":571.263,"y":25.8405},{"x":598,"y":35.9932}],"5487":[{"x":10,"y":21.0256},{"x":33.7368,"y":17.3546},{"x":63.4737,"y":15.2199},{"x":95.2105,"y":13.3996},{"x":126.947,"y":12.4582},{"x":165.684,"y":12.3758},{"x":203.421,"y":15.5493},{"x":231.14,"y":19.5164},{"x":259.891,"y":23.0321},{"x":292.614,"y":21.8368},{"x":328.368,"y":19.998},{"x":352.105,"y":15.6396},{"x":386.842,"y":11.941},{"x":412.579,"y":8.36693},{"x":444.316,"y":5.4426},{"x":476.053,"y":3.23726},{"x":507.789,"y":1.72413},{"x":539.526,"y":0.780791},{"x":571.263,"y":0.250555},{"x":602,"y":-0.81575}],"10000":[{"x":0,"y":0},{"x":31.7368421,"y":0},{"x":63.4736842,"y":0},{"x":95.2105263,"y":0},{"x":126.9473684,"y":0},{"x":158.6842105,"y":0},{"x":190.4210526,"y":0},{"x":222.1578947,"y":0},{"x":253.8947368,"y":0},{"x":285.6315789,"y":0},{"x":317.3684211,"y":0},{"x":349.1052632,"y":0},{"x":380.8421053,"y":0},{"x":412.5789474,"y":0},{"x":444.3157895,"y":0},{"x":476.0526316,"y":0},{"x":507.7894737,"y":0},{"x":539.5263158,"y":0},{"x":571.2631579,"y":0},{"x":603,"y":0}],"smoothness":[50,50,50,50]},

"africanelephant_trunk":{"0":[{"x":0,"y":0},{"x":11.6363636,"y":0},{"x":23.2727273,"y":0},{"x":34.9090909,"y":0},{"x":46.5454545,"y":0},{"x":58.1818182,"y":0},{"x":69.8181818,"y":0},{"x":81.4545455,"y":0},{"x":93.0909091,"y":0},{"x":104.7272727,"y":0},{"x":116.3636364,"y":0},{"x":128,"y":0}],"947":[{"x":5.4318,"y":-29.5873},{"x":13.7846,"y":-23.4132},{"x":25.2845,"y":-19.663},{"x":35.7749,"y":-15.3962},{"x":47.5436,"y":-12.0965},{"x":57.1853,"y":-9.2196},{"x":69.8149,"y":-6.11058},{"x":81.4545,"y":-4.00367},{"x":93.0909,"y":-2.32676},{"x":104.727,"y":-1.15685},{"x":116.364,"y":-0.482751},{"x":128,"y":-0.167643}],"1333":[{"x":3.41235,"y":-19.8412},{"x":12.7656,"y":-15.9176},{"x":25.2841,"y":-14.0164},{"x":35.7749,"y":-11.8791},{"x":47.5436,"y":-10.2834},{"x":57.1853,"y":-8.44636},{"x":69.8149,"y":-5.83764},{"x":81.4545,"y":-3.92394},{"x":93.0909,"y":-2.30747},{"x":104.727,"y":-1.15299},{"x":116.364,"y":-0.482113},{"x":128,"y":-0.167555}],"1943":[{"x":7.05709,"y":13.2244},{"x":15.4603,"y":10.0828},{"x":25.2766,"y":7.43446},{"x":34.9129,"y":4.52588},{"x":46.5455,"y":2.26189},{"x":58.1818,"y":0.927918},{"x":69.8182,"y":0.311658},{"x":81.4545,"y":0.0853674},{"x":93.0909,"y":0.0189584},{"x":104.727,"y":0.0033808},{"x":116.364,"y":0.0004759},{"x":128,"y":0.000051}],"2389":[{"x":6.00765,"y":18.2163},{"x":15.5849,"y":12.3723},{"x":25.245,"y":7.05294},{"x":34.9144,"y":5.88285},{"x":46.5455,"y":2.74143},{"x":58.1818,"y":0.998202},{"x":69.8182,"y":0.268425},{"x":81.4545,"y":0.0441277},{"x":93.0909,"y":-0.0009883},{"x":104.727,"y":-0.0034941},{"x":116.364,"y":-0.0013536},{"x":128,"y":-0.0003369}],"3345":[{"x":0,"y":0},{"x":11.6363636,"y":0},{"x":23.2727273,"y":0},{"x":34.9090909,"y":0},{"x":46.5454545,"y":0},{"x":58.1818182,"y":0},{"x":69.8181818,"y":0},{"x":81.4545455,"y":0},{"x":93.0909091,"y":0},{"x":104.7272727,"y":0},{"x":116.3636364,"y":0},{"x":128,"y":0}],"5000":[{"x":0,"y":0},{"x":11.6363636,"y":0},{"x":23.2727273,"y":0},{"x":34.9090909,"y":0},{"x":46.5454545,"y":0},{"x":58.1818182,"y":0},{"x":69.8181818,"y":0},{"x":81.4545455,"y":0},{"x":93.0909091,"y":0},{"x":104.7272727,"y":0},{"x":116.3636364,"y":0},{"x":128,"y":0}],"smoothness":[20,20,20,20,20,20,20]},

"bluewhale":{"0":[{"x":0,"y":0},{"x":39.4166667,"y":0},{"x":78.8333333,"y":0},{"x":118.25,"y":0},{"x":157.6666667,"y":0},{"x":197.0833333,"y":0},{"x":236.5,"y":0},{"x":275.9166667,"y":0},{"x":315.3333333,"y":0},{"x":354.75,"y":0},{"x":394.1666667,"y":0},{"x":433.5833333,"y":0},{"x":473,"y":0},{"x":512.4166667,"y":0},{"x":551.8333333,"y":0},{"x":591.25,"y":0},{"x":630.6666667,"y":0},{"x":670.0833333,"y":0},{"x":709.5,"y":0},{"x":748.9166667,"y":0},{"x":788.3333333,"y":0},{"x":827.75,"y":0},{"x":867.1666667,"y":0},{"x":906.5833333,"y":0},{"x":946,"y":0}],"3289":[{"x":9.97348,"y":37.4469},{"x":44.5314,"y":28.1814},{"x":82.6733,"y":23.653},{"x":119.066,"y":13.3928},{"x":158.63,"y":9.6917},{"x":197.05,"y":1.64092},{"x":236.5,"y":0.45643},{"x":275.917,"y":0.0436406},{"x":315.333,"y":-0.0036123},{"x":354.75,"y":0.137936},{"x":394.167,"y":0.588608},{"x":433.583,"y":1.77117},{"x":473,"y":4.32431},{"x":512.417,"y":8.77793},{"x":551.824,"y":15.0885},{"x":590.282,"y":23.5054},{"x":632.685,"y":33.622},{"x":672.115,"y":38.1671},{"x":709.475,"y":45.0199},{"x":745.838,"y":51.6631},{"x":783.254,"y":57.2302},{"x":825.67,"y":66.221},{"x":867.173,"y":75.4803},{"x":908.583,"y":82.8765},{"x":940.033,"y":90.94}],"6439":[{"x":9.0326,"y":-16.7335},{"x":45.355,"y":-13.2062},{"x":80.8608,"y":-10.3996},{"x":118.253,"y":-4.55523},{"x":157.667,"y":-2.72613},{"x":197.083,"y":-1.34289},{"x":236.5,"y":-0.543218},{"x":275.917,"y":-0.180399},{"x":315.333,"y":-0.0522403},{"x":354.75,"y":-0.0308389},{"x":394.167,"y":-0.0931793},{"x":433.583,"y":-0.338967},{"x":473,"y":-1.03786},{"x":512.417,"y":-2.65388},{"x":551.833,"y":-5.73887},{"x":591.25,"y":-10.6563},{"x":630.667,"y":-18.5307},{"x":670.083,"y":-26.4362},{"x":709.518,"y":-35.9944},{"x":750.944,"y":-44.3207},{"x":790.269,"y":-55.7299},{"x":821.658,"y":-67.1213},{"x":856.966,"y":-74.7965},{"x":896.273,"y":-92.0054},{"x":928.882,"y":-115.876}],"10000":[{"x":0,"y":0},{"x":39.4166667,"y":0},{"x":78.8333333,"y":0},{"x":118.25,"y":0},{"x":157.6666667,"y":0},{"x":197.0833333,"y":0},{"x":236.5,"y":0},{"x":275.9166667,"y":0},{"x":315.3333333,"y":0},{"x":354.75,"y":0},{"x":394.1666667,"y":0},{"x":433.5833333,"y":0},{"x":473,"y":0},{"x":512.4166667,"y":0},{"x":551.8333333,"y":0},{"x":591.25,"y":0},{"x":630.6666667,"y":0},{"x":670.0833333,"y":0},{"x":709.5,"y":0},{"x":748.9166667,"y":0},{"x":788.3333333,"y":0},{"x":827.75,"y":0},{"x":867.1666667,"y":0},{"x":906.5833333,"y":0},{"x":946,"y":0}],"smoothness":[15,15,25,15]},

}
/*~splitter~*/

// add all keyframe times to the timestamps array (in ropeFrames)
// e.g. ropeFrames["argentinosaurus"].timestamps = [0,150,2000,4000]

function prepairRopeFrames(){
  for(let i in ropeFrames){
    let smoothness_temp_stor = ropeFrames[i].smoothness;
    delete ropeFrames[i].smoothness;
    delete ropeFrames[i].last;
    delete ropeFrames[i].timestamps;

    ropeFrames[i].timestamps = Object.keys(ropeFrames[i]).map(i=>i/1).sort((a,b)=>((a>b)?1:-1));
    ropeFrames[i].last = ropeFrames[i].timestamps[ropeFrames[i].timestamps.length-1];
    ropeFrames[i].smoothness = smoothness_temp_stor;

    strips[i] = {
      "points":ropeFrames[i][0].length,
      "animate":function(){
        animateRopeKeyFrame(this,i);
      }
    }

  }
}
prepairRopeFrames()

// get scale given pixles and feet
function scale(feet, px){
  let everything_scale = 6000;
  return feet/1000 * everything_scale/px
}

const things =
/*~splitter~*/
{
    "house":{"title":"A Humble House", "infoText":"house", "src":"house.png", "animation":"nothing", "scrollOnClick":0.46, "position":{x:-82.04911663160767,y:6.833394047422397}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(20,149)},
      "car":{"title":"Typical Car", "infoText":"car", "src":"car.png", "animation":"nothing", "scrollOnClick":"auto", "position":{x:150.5272989734389,y:0.6242425330863268}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(14,376)},
      "cactus":{"title":"Saguaro Cactus", "infoText":"cactus", "src":"saguaro.png", "animation":"nothing", "scrollOnClick":"auto", "position":{x:-542.3164384075249,y:11.334788636518091}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(40,198)},


      "willistower":{"title":"Willis Tower", "infoText":"willistower", "src":"willistower.png", "animation":"nothing", "scrollOnClick":"auto", "position":{x:-20648.471610581426,y:-81.31599516643564}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(1729,749)},
      "burjkhalifa":{"title":"Burj Khalifa", "infoText":"burjkhalifa", "src":"burjkhalifa.png", "animation":"nothing","scrollOnClick":"auto", "position":{x:-23264.791315871,y:-23.431339934262454}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(2722,763)},
      "pyramid":{"title":"Great Pyramid of Giza", "infoText":"pyramid", "src":"pyramid.png", "animation":"nothing", "scrollOnClick":"auto", "position":{x:-7538.185366065363,y:117.61809321953274}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(455,303)},
      "taipei101":{"title":"Taipei 101", "infoText":"taipei101", "src":"taipei101.png", "animation":"nothing", "scrollOnClick":"auto", "position":{x:-18026.402436260152,y:90.68460101647355}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(1667,686)},
      "empirestate":{"title":"Empire State Building", "infoText":"empirestate", "src":"empirestate.png", "animation":"nothing", "scrollOnClick":"auto", "position":{x:-14688.839775108021,y:-39.41626210137926}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(1454,548)},
      "tajmahal":{"title":"Taj Mahal", "infoText":"tajmahal", "src":"tajmahal.png", "animation":"nothing", "scrollOnClick":"auto", "position":{x:-4601.791400332801,y:23.8841466822449}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(240,264)},

      // "dropoffsea":{"src":"dropoffsea.png", "animation":"nothing", "position":{x:1102,y:30}, "anchor":{x:0.5,y:0}, "rotation":0, "scale":0.5},
      // "droptoshore":{"src":"droptoshore.png", "animation":"nothing", "position":{x:720,y:-25}, "anchor":{x:0.5,y:0}, "rotation":0, "scale":0.5},

      "landtosea":{"src":"landtosea.png", "animation":"nothing", "position":{x:499.61699580087236,y:-0.9585963409001681}, "anchor":{'x':0,'y':0}, "rotation":0, "scale":1},

      "sailboat":{"title":"Average Sailboat", "infoText":"sailboat", "src":"sailboat.png", "animation":"sailboat", "scrollOnClick":"auto", "position":{x:1240,y:115}, "anchor":{'x':0.5,'y':0.8}, "rotation":0, "scale":scale(30,226)},
      //"oceanbackground0":{"src":"oceanbackground0.png", "animation":"paralax0", "position":{x:1183.5349236039808,y:369.6954554498366}, "anchor":{'x':0,'y':0}, "rotation":0, "scale":0.5},

      "trex":{"title":"Tyrannosaurus", "infoText":"trex", "src":"trex.png", "animation":"nothing", "scrollOnClick":"auto", "position":{x:-465.6873234861683,y:-45.121383943056586}, "anchor":{'x':0,'y':1}, "rotation":0, "scale":scale(40,583)},
      "argentinosaurus":{"title":"Argentinosaurus", "infoText":"argentinosaurus", "src":"argentinosaurus.png", "animation":"nothing", "scrollOnClick":"auto", "position":{x:-1182.6473821702164,y:-128.10349007033025}, "rotation":0, "scale":scale(100,500)},


      "lion_tail":{"src":"lion_tail.png", "animation":"rotatesin", "parent":"lion", "position":{x:-130,y:-135}, "anchor":{'x':1,'y':0}, "rotation":0, "scale":1},
      "lion":{"title":"African Lion", "infoText":"lion", "src":"lion_body.png", "animation":"nothing", "scrollOnClick":"auto", "position":{x:285.3607093450424,y:1.2121214234685431}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(4.13,243)},
      "lion_ear":{"src":"lion_ear.png", "animation":"eartwitch", "parent":"lion", "position":{x:80.15493957374449,y:-201.19151543760916}, "anchor":{'x':0.5,'y':0.5}, "rotation":0, "scale":1},

      "palmtree":{"title":"Queen Palm", "infoText":"palmtree", "src":"palmtree.png", "animation":"nothing", "scrollOnClick":"auto", "position":{x:985.8329033494338,y:87.8426275042847}, "anchor":{'x':0,'y':1}, "rotation":0, "scale":scale(40,220)},
      "palm5":{"title":"Queen Palm", "src":"palm5.png", "infoText":"palmtree", "animation":"palmwave5", "scrollOnClick":"parent", "parent":"palmtree", "position":{x:68,y:-167}, "anchor":{'x':1,'y':0.5}, "rotation":0, "scale":1},
      "palm4":{"title":"Queen Palm", "src":"palm4.png", "infoText":"palmtree", "animation":"palmwave4", "scrollOnClick":"parent", "parent":"palmtree", "position":{x:72,y:-163}, "anchor":{'x':1,'y':0}, "rotation":0, "scale":1},
      "palm3":{"title":"Queen Palm", "src":"palm3.png", "infoText":"palmtree", "animation":"palmwave3", "scrollOnClick":"parent", "parent":"palmtree", "position":{x:71,y:-161}, "anchor":{'x':0,'y':1}, "rotation":0, "scale":1},
      "palm2":{"title":"Queen Palm", "src":"palm2.png", "infoText":"palmtree", "animation":"palmwave2", "scrollOnClick":"parent", "parent":"palmtree", "position":{x:67,y:-167}, "anchor":{'x':1,'y':1}, "rotation":0, "scale":1},
      "palm1":{"title":"Queen Palm", "src":"palm1.png", "infoText":"palmtree", "animation":"palmwave1", "scrollOnClick":"parent", "parent":"palmtree", "position":{x:70,y:-163}, "anchor":{'x':0.05,'y':0.05}, "rotation":0, "scale":1},
      "palm0":{"title":"Queen Palm", "src":"palm0.png", "infoText":"palmtree", "animation":"palmwave0", "scrollOnClick":"parent", "parent":"palmtree", "position":{x:71,y:-164}, "anchor":{'x':0.33,'y':1}, "rotation":0, "scale":1},

      "arch":{"title":"Gateway Arch", "infoText":"arch", "src":"arch.png", "animation":"nothing", "scrollOnClick":"auto", "position":{x:-18952.717952807325,y:-39.362579096417086}, "anchor":{'x':0.33,'y':1}, "rotation":0, "scale":scale(630,374)},
      "rubberbandball":{"title":"World's Largest \nRubber Band Ball", "infoText":"rubberbandball", "src":"rubberbandball.png", "scrollOnClick":0.4587144064737381, "animation":"nothing", "position":{x:-145.61215880658156,y:0.7878789252544789}, "anchor":{'x':0.33,'y':1}, "rotation":0, "scale":scale(6.583,135)},
      "seawisegiant":{"title":"Seawise Giant", "infoText":"seawisegiant", "src":"seawisegiant.png", "scrollOnClick":"auto", "animation":"nothing", "position":{x:-31527.507191215474,y:-4571.453162230071}, "anchor":{'x':0.33,'y':1}, "rotation":0, "scale":scale(1504,385)},

      "eiffeltower":{"title":"Eiffel Tower", "infoText":"TODO", "src":"eiffeltower.png", "scrollOnClick":"auto", "animation":"nothing", "position":{x:-11476.192717966223,y:-24.570768122572463}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(1063,372)},
      "spaceshuttle":{"title":"Space Shuttle", "infoText":"TODO", "src":"spaceshuttle.png", "scrollOnClick":"auto", "animation":"nothing", "position":{x:-2041.721880802462,y:4.5804277998156415}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(184,334)},
      "spermwhale":{"title":"Sperm Whale", "infoText":"TODO", "src":"spermwhale.png", "scrollOnClick":0.8425762914997863, "animation":"nothing", "position":{x:1450.098055928614,y:475.9790900358992}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(52,603)},
      "devilstower":{"title":"Devils Tower", "infoText":"TODO", "src":"develstower.png", "scrollOnClick":"auto", "animation":"nothing", "position":{x:-54583.24078449686,y:-124.07114220344917}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(5112,187)},
      "everest":{"title":"Mt. Everest", "infoText":"TODO", "src":"everest.png", "scrollOnClick":"auto", "animation":"nothing", "position":{x:-220738.41576366543,y:-306.45359331129646}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(29032,541)},

      "africanelephant_trunk":{"src":"africanelephant_trunk.png", "name":"nope", "parent":"africanelephant", "animation":"nothing", "position":{x:-125.91134247914238,y:-22.67189706408298}, "anchor":{'x':1,'y':0.5}, "rotation":-Math.PI/2, "scale":1},
      "africanelephant":{"title":"African Elephant", "infoText":"TODO", "src":"africanelephant.png", "scrollOnClick":"auto", "animation":"nothing", "position":{x:347.1550609757443,y:0.6558961813822992}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(10,215)},

      "mosasaurus":{"title":"Mosasaurus", "infoText":"TODO", "src":"mosasaurus.png", "scrollOnClick":"auto", "animation":"nothing", "position":{x:1291.424365855575,y:188.28793962779258}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(59,576)},

      "statueofliberty":{"title":"Statue of Liberty", "infoText":"TODO", "src":"statueofliberty.png", "scrollOnClick":"auto", "animation":"nothing", "position":{x:-2846.428078564042,y:9.88099377676806}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(305,300)},

      "ch47":{"title":"CH-47 Chinook", "infoText":"sailboat", "src":"ch47.png", "scrollOnClick":"auto", "animation":"ch47", "position":{x:-738.5930716869357,y:-389.11646994848746}, "anchor":{'x':0.5,'y':0.5}, "rotation":0, "scale":scale(51,365)},
      "ch47_prop1":{"src":"heleprops.png", "animation":"heleprop0", "parent":"ch47", "position":{x:-138.36454722997047,y:-34.479793967886145}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":1},
      "ch47_prop2":{"src":"heleprops.png", "animation":"heleprop1", "parent":"ch47", "position":{x:134.914418459899,y:-70.25540126200121}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":1},

      "stardestroyer":{"title":"Star Destroyer", "infoText":"TODO", "src":"stardestroyer.png", "scrollOnClick":"auto", "animation":"nothing", "position":{x:-42570.47875245962,y:-13705.289341040183}, "anchor":{'x':0.5,'y':0.5}, "rotation":0, "scale":scale(5249,636)},

      "yasen":{"title":"Yasen-Class Submarine", "infoText":"TODO", "src":"yasenclass.png", "scrollOnClick":"auto", "animation":"nothing", "position":{x:1259.0247993995642,y:1824.509738229605}, "anchor":{'x':0.5,'y':0.5}, "rotation":0, "scale":scale(456,647)},

      "billboard":{"title":"Billboard", "infoText":"TODO", "src":"billboard.png", "scrollOnClick":"auto", "animation":"nothing", "position":{x:285.3607093450424,y:1.2121214234685431}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":scale(45,590)},
      "billboardlights1":{"src":"lights1.png", "animation":"flicker1", "parent":"billboard", "position":{x:-307.015437655222,y:-611.934021386856}, "anchor":{'x':0,'y':0}, "rotation":0, "scale":1},
      "billboardlights2":{"src":"lights2.png", "animation":"flicker2", "parent":"billboard", "position":{x:-308.58476117546354,y:-613.0517253427669}, "anchor":{'x':0,'y':0}, "rotation":0, "scale":1},

      "bluewhale":{"title":"Blue Whale", "infoText":"TODO", "src":"bluewhale.png", "scrollOnClick":0.8425762914997863, "animation":"nothing", "position":{x:1280.5573011999852,y:356.30326112170667}, "anchor":{'x':0.5,'y':0.5}, "rotation":0, "scale":scale(98,946)},

      "rick":{"title":"Statue of Rick", "infoText":"rickroll", "src":"rick.png", "scrollOnClick":0.9999, "animation":"nothing", "position":{x:1500,y:120+11034*19.68}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":5},
      "seabottom":{"src":"seabottom.png", "animation":"nothing", "position":{x:1500,y:120+11034*19.68}, "anchor":{'x':0.5,'y':1}, "rotation":0, "scale":7},


      "deepsub":{"title":"Deep Sea Challenger", "infoText":"TODO", "src":"deepseachallenger.png", "scrollOnClick":"auto", "animation":"deepsub", "position":{x:1300,y:-100}, "anchor":{'x':0.5,'y':0.5}, "rotation":0, "scale":scale(26.2,902)},
}
/*~splitter~*/

// sea level = 120 px

// 1m = 19.68px
const M = 19.68;
// 1ft = 6 px;
const FT = 6;

text_things = [

  {"text":"10m down", "size":24, "position":{x:1500,y:120+10*M}},
  {"direction":Math.PI,"position":{x:1490,y:120+10*M}, "width":3, "length":100},

  {"text":"100m down", "size":24, "position":{x:1500,y:120+100*M}},
  {"direction":Math.PI,"position":{x:1490,y:120+100*M}, "width":3, "length":100},

  {"text":"200m down", "size":24, "position":{x:1500,y:120+200*M}},
  {"text":'The dysphotic zone (Twilight Zone):\n there isn\'t much sunlight down here', "size":12, "position":{x:1500-90,y:120+200*M+23}},
  {"direction":Math.PI,"position":{x:1490,y:120+200*M}, "width":3, "length":100},

  {"text":"1000m down", "size":24, "position":{x:1500,y:120+1000*M}},
  {"text":'The aphot zone (Midnight Zone):\n who turned off the lights?', "size":12, "position":{x:1500-90,y:120+1000*M+23}},
  {"direction":Math.PI,"position":{x:1490,y:120+1000*M}, "width":3, "length":100},


  {"text":"10,000m down", "size":24, "position":{x:1500,y:120+10000*M}},

  {"text":"Mariana trench", "size":240, "position":{x:1500,y:120+11034*M}},

]

// add sea depth texts
for(let depth = 100; depth<11000; depth+=100){
  if(depth!=100 && depth!=200 && depth!=1000 && depth!=10000){
    text_things.push(
      {"text":(depth).toLocaleString()+"m down", "size":24, "position":{x:1500,y:120+depth*M}},
    );
    text_things.push(
      {"direction":Math.PI,"position":{x:1490,y:120+depth*M}, "width":3, "length":100},
    );
  }
}


for(let i in strips){
  if(things[i]){ // this should always be true
    things[i].strip = i;
  }else{
    console.error(i+" does not exist in things, but is listed in strips")
  }
}

// add list of chilren to parents e.g children: ["lion_tail", "lion_ear"]
let indx_ = 0;
for(let i in things){
  things[i].index = indx_++;
  if(things[i].parent){
    if(!things[things[i].parent].children){
      things[things[i].parent].children = [];
    }
    things[things[i].parent].children.push(i);
  }

}
// add list of children above and below (above is list of children that is on top, below are children that are rendered below)
for(let i in things){
  things[i].childrenAbove = [];
  things[i].childrenBelow = [];
  if(things[i].children){
    for(let i2 = 0; i2<things[i].children.length; i2++){

      if(things[i].index > things[things[i].children[i2]].index){
        things[i].childrenBelow.push(things[i].children[i2]);
      }else{
        things[i].childrenAbove.push(things[i].children[i2]);
      }

    }
  }
}

const text = {
  "EN":{
    "TODO":"TODO",
    "rubberbandball":"The world's largest rubberband ball was made \nwith about 700,000 rubber bands! When \nfinished, it weighed over 4 tonnes.",
    "car":"This is your typical car, just one of the \n1.5 billion cars on the earth",
    "palmtree":"The classic palmtree",
    "cactus":"The saguaro is the largest species of cactus \nin the world. The average saguaro will grow \nto be about 40 feet tall (12m), but some have \nmeassured in at over 70 feet (21m).",
    "willistower":"The Willis Tower, formally know as the \nSears Tower, held the title for world's \ntallest building untill 1998",
    "burjkhalifa":"Standing at 2722 ft, the Burj Khalifa is the tallest building in the world",
    "pyramid":"",
    "taipei101":"",
    "empirestate":"",
    "tajmahal":"",
    "trex":"",
    "lion":"",
    "palmtree":"",
    "arch":"",
    "seawisegiant":"",
    "argentinosaurus":"This is the largest of the dinosours and the \nlargest land animal that ever lived. The \nargentinosaurus weighed up to 100 metric \ntones",
    "rickroll":"Never gonna give you up!"
  }
}


let camData = [
 {"x":-482.7143320712505, "y":-19.78596836993779, "zoom":0.002434770193745057},
 {"x":-416.7143320712505, "y":-24.78596836993779, "zoom":0.006946683515312709},
 {"x":-506.7143320712505, "y":-17.78596836993779, "zoom":0.03191982309763493},
 {"x":-359.7143320712505, "y":-12.785968369937791, "zoom":0.06842297560926981},
 {"x":-387.71433207125057, "y":-11.785968369937791, "zoom":0.23621466909900357},
 {"x":-584.7143320712506, "y":-0.7859683699377912, "zoom":0.8970248128026704},
 {"x":-174.7143320712505, "y":1.2140316300622087, "zoom":1.1939400258403545},
 {"x":351.2856679287495, "y":2.214031630062209, "zoom":1.3133340284243902},
 {"x":922.2856679287495, "y":32.21403163006221, "zoom":1.1939400258403545},
 {"x":1381.2856679287495, "y":191.2140316300622, "zoom":1.0854000234912313},
 {"x":1561.2856679287495, "y":369.2140316300622, "zoom":1.0854000234912313},
 {"x":1588.2856679287495, "y":726.2140316300622, "zoom":1.0854000234912313},
 {"x":1570.7856679287495, "y":944.2140316300622, "zoom":1.0854000234912313},
 {"x":1577.803162936247, "y":1750.6187021248793, "zoom":1.0854000234912313},
 {"x":509.96107258556276, "y":660.998995591696, "zoom":0.3509401183072051},
 {"x":856.9477297272389, "y":1291.6099043710408, "zoom":0.5887396883592259},
 {"x":189.00707609053848, "y":21875.091213255746, "zoom":0.10016676254285069},
]


let keyframes = [];

function initKeyFrames(){
  let l_ = camData.length;
  for(let i=0; i<l_; i++){
      camData[i].pos = i/(l_-1);
  }

  keyframes = camData;

  // Auto set the scroll on ckick

  console.log("setting scroll on clicks")

  for(let i in things){
    if(things[i].scrollOnClick == "auto"){

      let thingx = things[i].position.x;
      for(let i2 = 1; i2<camData.length; i2++){

        if((camData[i2].x/camData[i2].zoom)>thingx){
          let x1 = ((camData[i2-1].x-200)/camData[i2-1].zoom); // -200 is offset constant
          let x2 = ((camData[i2].x-200)/camData[i2].zoom);

          let lambda = (thingx - x1)/(x2-x1); // % mix of pos1 and pos2

          console.log({x1,x2,lambda})

          things[i].scrollOnClick = (camData[i2-1].pos)*(1-lambda) + (camData[i2].pos)*lambda;

          break;
        }
      }
    }
  }
  for(let i in things){
    if(things[i].scrollOnClick == "parent"){
        things[i].scrollOnClick = things[things[i].parent].scrollOnClick;
    }
  }
}



// function initKeyFrames(){
//   let l_ = camData.length;
//   for(let i=0; i<l_; i++){
//       camData[i].pos = i/(l_-1);
//   }
//
//   keyframes = camData;
//
//   // Auto set the scroll on ckick
//
//   console.log("setting scroll on clicks")
//
//   for(let i in things){
//     if(things[i].scrollOnClick == "auto"){
//
//       let mindist = Infinity; // closest point;
//       let mindist2 = Infinity; // second closest point
//
//       let closepoint = null; // closest point (where distance == mindist)
//       let closepoint2 = null;
//
//
//
//       let thingx = things[i].position.x;
//       let thingy = things[i].position.x;
//       for(let i2 = 1; i2<camData.length; i2++){
//
//         let _dist = dist(thingx, camData[i2].x/camData[i2].zoom, thingy, camData[i2].z/camData[i2].zoom);
//
//         if(_dist < midist){
//           mindist2 = mindist;
//           mindist = _dist;
//
//           closepoint2 = closepoint;
//           closepoint = i2;
//         }
//
//         if(_dist < mindist2 && _dist > mindist){
//           mindist2 = _dist;
//           closepoint2 = i2;
//         }
//
//
//       } // for i2 in camData points
//
//
//       if((camData[i2].x/camData[i2].zoom)>thingx){
//         let x1 = ((camData[mindist].x-200)/camData[mindist].zoom); // -200 is offset constant
//         let x2 = ((camData[mindist2].x-200)/camData[mindist2].zoom);
//
//         let lambda = (thingx - x1)/(x2-x1); // % mix of pos1 and pos2
//
//         console.log({x1,x2,lambda})
//
//         things[i].scrollOnClick = (camData[i2-1].pos)*(1-lambda) + (camData[i2].pos)*lambda;
//
//         break;
//       }
//
//     } // if scrollOnClick == auto
//   }
//   for(let i in things){
//     if(things[i].scrollOnClick == "parent"){
//         things[i].scrollOnClick = things[things[i].parent].scrollOnClick;
//     }
//   }
// }

initKeyFrames();


// // for camera path
// const keyframes =
// /*~splitter~*/
// [
//   {x: -469, y: -16, zoom: 0.031919823097634956, pos: 0.0},
//   {x: -373, y: -4, zoom: 0.17747157708415004, pos: 0.23639706352765766},
//   {x: -683, y: 5, zoom: 0.9867272940829387, pos: 0.4374940468530809},
//   {x: -164, y: 15, zoom: 1.444667431266831, pos: 0.45},
//   {x: 679, y: 13, zoom: 1.444667431266831, pos: 0.5892642830388516},
//   {x: 1789, y: 213, zoom: 1.444667431266831, pos: 0.7778629587581017},
//   {x: 2144, y: 595, zoom: 1.444667431266831, pos: 0.85},
//   {x: 2070, y: 120+11034*M+100, zoom: 1.444667431266831, pos: 1}
// ]
// /*~splitter~*/
