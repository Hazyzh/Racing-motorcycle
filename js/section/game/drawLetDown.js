function drawLetDown() {
	this.alive;
	this.bg1 = new Image();
	this.bg2 = new Image();
	this.x;
	this.y;
}
drawLetDown.prototype.init = function(){
	this.alive = true;
	this.x = 3000;
	this.y = 328;
	this.bg1.src = 'images/Maps/water1.png';
	this.bg2.src = 'images/Maps/water2.png';
}
drawLetDown.prototype.draw = function(c){
	// 循环加
	addLoopD(this);

	this.x -= H.activeUser.speedX*H.delayTime/100;
	if(this.x<-400){this.alive = false};

	var img = this.y==328?this.bg1:this.bg2;
	c.drawImage(img,this.x,this.y);
}
function addLoopD(obj) {
	if(300+H.activeUser.distance+2000>H.data.gameOvernum){
		return false;
	}
	if(!obj.alive){
		obj.alive = true;
		obj.x = 2000;
		obj.y = Math.random()>0.5?328:476;

		for(var n=0;n<H.users.length;n++){
			H.users[n].judge2 = true;
		}
	}	
}