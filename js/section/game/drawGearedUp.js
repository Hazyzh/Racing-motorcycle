function drawGearedUp() {
	this.alive;
	this.bg = new Image();
	this.x;
	this.yArr = [];
	this.y;
}
drawGearedUp.prototype.init = function(){
	this.alive = true;
	this.x = 1500;
	this.yArr = [341,407,472];
	this.y = this.yArr[Math.floor(Math.random()*3)];
	this.bg.src = 'images/Maps/up.png';
}
drawGearedUp.prototype.draw = function(c){
	// 循环加
	addLoop(this);

	this.x -= H.activeUser.speedX*H.delayTime/100;
	if(this.x<-200){
		this.alive = false;
	};

	c.drawImage(this.bg,this.x,this.y);
}
function addLoop(obj) {
	if(300+H.activeUser.distance+1500>H.data.gameOvernum){
		return false;
	}
	if(!obj.alive){
		obj.alive = true;
		obj.x = 1500;
		obj.y = obj.yArr[Math.floor(Math.random()*3)];
		for(var n=0;n<H.users.length;n++){
			H.users[n].judge1 = true;
		}
	}	
}