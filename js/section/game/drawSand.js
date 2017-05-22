function drawSand() {
	this.alive;
	this.bg1 = new Image();
	this.bg2 = new Image();
	this.x;
	this.y;
	this.img;
}
drawSand.prototype.init = function(){
	this.alive = true;
	this.x = 1300;
	this.y = Math.random()*150+328;
	this.bg1.src = 'images/Maps/Map1/Sand.png';
	this.bg2.src = 'images/Maps/Map1/Sand1.png';
	this.img = this.bg2;
}
drawSand.prototype.draw = function(c){
	// 循环加
	addLoopS(this);

	this.x -= H.activeUser.speedX*H.delayTime/100;
	if(this.x<-600){this.alive = false};

	c.drawImage(this.img,this.x,this.y);
}
function addLoopS(obj) {
	if(300+H.activeUser.distance+1600>H.data.gameOvernum){
		return false;
	}
	if(!obj.alive){
		obj.alive = true;
		obj.x = 1600;
		if(Math.random()>0.7){
			obj.img = obj.bg1;
			obj.y = Math.random()*70+328;
		}else{
			obj.img = obj.bg2;
			obj.y = Math.random()*150+328;
		}

		for(var n=0;n<H.users.length;n++){
			H.users[n].judge3 = true;
		}
		
	}	
}