//NOT A REALISITIC PHYSICS SIM

class Player{
  
  constructor(size,col){
    
    this.x = width/2
    this.y = height/2
    this.s = size
    this.velocity = 1
    this.acceleration = 1
    this.thrust = 0
    this.MAXVEL = 7
    this.resistence = 0.2
    this.col = col
  }
  
   show(){
      fill(this.col)
      ellipse(this.x,this.y,this.s)
    }
  
  move(){
    
   // console.log(this.y)
    this.velocity += this.acceleration
  
    if(this.velocity >= this.MAXVEL){
    
      this.velocity = this.MAXVEL
    }
  
    if(this.thrust > 0 ){
    
      this.thrust -= this.resistence
    }else if(this.thrust < 0){
    
      this.thrust +=this. resistence
    }
  
    this.y += this.velocity
    this.x += this.thrust
  
    if (this.y < 10){
    
      this.y = 10
    
    }
    else if(this.y >height){
      this.y =0
      score = 0
    }
    
    if(this.x >= width + this.s/2){
      
      this.x = 0
      
    }
    
    else if(this.x <= 0 - this.s/2){
      
      this.x = width
      
    }
    
  }

  //65 | A     68 | D
    
  left(){
    
    this.velocity = -10
    this.thrust = -5
    
  }

  right(){

    this.velocity = -10
    this.thrust = 5 
  }
}


class Ball{
  
  constructor(){
    
    
    this.s = 10
    this.x = random(0+this.s/2,width-this.s/2)
    this.y = random(0,-1000)
    
  }
  
  
  show(){
    fill("#1212FF")
    ellipse(this.x,this.y,this.s)
    
  }
  
  move(){
    
    this.y += 1
    if(this.y >= height + this.s/2){
      
      this.y = random(0,-100)
      
    }
    
  }
  
}


function setup() {
  createCanvas(400, 400);

  start_time = new Date()
  start_time = start_time.getSeconds()
  
  balls = []
  player = new Player(30,"#AA1212")
  for(let i = 0; i < 20; i++){
    
    balls.push(new Ball())
    
  }
  best_score = 0
  score = 0
}

function draw() {
  background(220);

  textSize(16);
  text(`Score: ${parseInt(score)}`, 10, 30);
  
  player.show()
  player.move()
  
  for(let i = 0; i < balls.length; i++){
    balls[i].show()
    balls[i].move()
    
    if(collision_detection(balls[i])){
      
      score = 0
      player.x = width/2
      player.y = height/2
      
      for(let y = 0; y < balls.length;y++){
        
        balls[y].y = random(0,-1000)
        
      }
      
    }
    
  }
  
  if(score > best_score){
    
    best_score = score
    
  }
  text(`Best Score: ${parseInt(best_score)}`,width/2 + 85,30)
}


function keyPressed(){
  
  if(keyCode === 65){
    
    player.left()
    
  }else if(keyCode === 68){
    
    player.right()
    
  }
  
}

function collision_detection(obj){
  
  dx = player.x - obj.x
  dy = player.y - obj.y
  
  distance = Math.sqrt(dx*dx + dy*dy)
  
  if(distance < (player.s/2) + (obj.s/2) ){
    
    return true
    
  }else{score+= 1 /1000}
  
}
