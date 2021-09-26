    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Constraint = Matter.Constraint;
    const Body = Matter.Body;
    const Composites = Matter.Composites;
    const Composite = Matter.Composite;
    
    let engine;
    let world;
    var ground,rope,rope2,rope3,fruit;

    var blinking,eating,sad,bg_sound,mute_button,button,button2,button3;

    function preload(){
    
    //loaded background image
    bgImg = loadImage("background.png");

    //loaded fruit image
    fruitImg = loadImage("melon.png");

    //loaded bunny image
    rabbitImg = loadImage("Rabbit-01.png");

    //creating animation for rabbit blinking
    blinking = loadAnimation("blink_1.png","blink_2.png","blink_3.png");

    //creating animation for rabbit eating 
    eating = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");

    //creating animation for rabbit sad face
    sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png"); 

    //adding background sound
    bg_sound = loadSound ("sound1.mp3");

    //adding sad sound
    sad_sound = loadSound ("sad.wav");

     //adding rope cut sound
    ropeCut_sound = loadSound ("rope_cut.mp3");

     //adding airsound
     air_sound = loadSound ("air.wav");

     //adding eating sound
     eating_sound = loadSound ("eating_sound.mp3");

     blinking.playing = true;
     eating.playing = true;
     sad.playing = true;

     eating.looping = false;
     sad.looping = false;

    }

    function setup() 
    {
      var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if(isMobile){
        canW = displayWidth; 
        canH = displayHeight; 
        createCanvas(displayWidth+80, displayHeight);
      } 
      else {
        canW = windowWidth; 
        canH = windowHeight; 
        createCanvas(windowWidth, windowHeight);
  }
  frameRate(80);

      engine = Engine.create();
      world = engine.world;
      bg_sound.play();
      bg_sound.setVolume(0.5);


      //created ground object
      ground = new Ground(200,canH,600,20);
      

       //created rope object
      rope = new Rope(7,{x:40,y:30});
      rope2 = new Rope(7,{x:370,y:40});
      rope3 = new Rope(7,{x:400,y:225});
      

       //created fruit object
     // let fruit_options = {
       // density : 01
        //}

  
      fruit = Bodies.circle(300,300,15);

      //added constraint to fruit and rope
      Matter.Composite.add(rope.body,fruit);
      fruit_con = new Link(rope,fruit);
      fruit_con2 = new Link(rope2,fruit);
      fruit_con3 = new Link(rope3,fruit);

      //created bunny object
      bunny = createSprite(170,canH-80,100,100);
      //bunny.addImage(rabbitImg);
      bunny.scale = 0.2;

      //Added Blinking Animation To Bunny
      bunny.addAnimation("blinking",blinking);
      blinking.frameDelay = 20;
      bunny.changeAnimation("blinking");


      //Added Sad Animation To Bunny
      bunny.addAnimation("sad",sad);
      //sad.frameDelay = 20;

      //Added Eating Animation To Bunny
      bunny.addAnimation("eating",eating);
      eating.frameDelay = 20;

         
      //created mute button
      mute_button = createImg('mute.png');
      mute_button.position(450,20);
      mute_button.size(50,50);
      mute_button.mouseClicked(mute);

     

      //created button
      button = createImg("cut_button.png");
      button.position(20,30);
      button.mouseClicked(drop);
      button.size(50,50);

      //created button2
      button2 = createImg("cut_button.png");
      button2.position(330,35);
      button2.mouseClicked(drop2);
      button2.size(50,50);

      //created button3
      button3 = createImg("cut_button.png");
      button3.position(360,200);
      button3.mouseClicked(drop3);
      button3.size(50,50);

      //created blower
      blower = createImg("balloon.png");
      blower.position(10,200);
      blower.mouseClicked(airBlow);
      blower.size(150,100);
    
      rectMode(CENTER);  
      ellipseMode(RADIUS);
      textSize(50)
    }

    function draw() 
    {
      background(51);
      image(bgImg,0,0,displayWidth+80,displayHeight);
      imageMode(CENTER);

      if(fruit!=null){
        image(fruitImg,fruit.position.x,fruit.position.y,70,70);
      }
      

      //displayed objects
      ground.show();
      rope.show();
      rope2.show();
      rope3.show();

      Engine.update(engine);

      if(fruit!=null){
        image(fruitImg,fruit.position.x,fruit.position.y,60,60);

      }

      if(collide(fruit,bunny)==true)
      {
        bunny.changeAnimation('eating');
        eating_sound.play();
      }


      if(fruit!=null && fruit.position.y>=650)
      {
        bunny.changeAnimation('sad');
        bg_sound.stop();
        sad_sound.play();
        fruit=null;
        
      }
    
  
      drawSprites();  
        
    }

    function drop(){
    rope.break();
    fruit_con.detach();
    fruit_con = null;
    ropeCut_sound.play();

    }

    function drop2(){
    rope2.break();
    fruit_con2.detach();
    fruit_con2 = null;
    ropeCut_sound.play();
  
    }

   function drop3(){
    rope3.break(); 
    fruit_con3.detach();
    fruit_con3 = null;
    ropeCut_sound.play();
    
    }
    
    function airBlow(){
    Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
    air_sound.play();

    }

    function mute()
{
  if(bg_sound.isPlaying())
     {
      bg_sound.stop();
     }
     else{
      bg_sound.play();
     }
}

function collide(body,sprite)
{
  if(body!=null)
  {
   var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=80)
     {
      World.remove(engine.world,fruit);
     fruit = null;
    return true; 
            }
            else{
              return false;
            }
         }
}
    
  




