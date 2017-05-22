function drawMissile() {
	this.missile = new Image();
	this.alive = [];
	this.x = [];
	this.y = [];
	this.drawX = [];/*切图位置*/
	this.timer = [];
	this.aim = [];
}
drawMissile.prototype.num = 2;
drawMissile.prototype.init = function(){
	this.missile.src = 'images/Game/missileProp.png';
	for(var i=0;i<this.num;i++){
		this.alive[i] = false;
		this.drawX[i] = 0;
		this.timer[i] = 0;
		this.aim[i] = false;
	}
}
drawMissile.prototype.draw = function(c){
	var propW = this.missile.width;
	var propH = this.missile.height;
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			c.save();
			c.shadowBlur = 15;
			c.shadowColor = "red";

			this.x[i] = lerpDistance(this.aim[i].x+this.aim[i].distance-H.activeUser.distance+50,this.x[i],0.95);
			this.y[i] = lerpDistance(this.aim[i].y-30,this.y[i],0.95);
			var l = getLength(this.x[i]-35,this.aim[i].x+this.aim[i].distance-H.activeUser.distance+50,this.y[i]-35,this.aim[i].y-30);
			if(l<80){
				this.alive[i]=false;
				this.aim[i].missileJudge = true;
				this.aim[i].missileJudgeTimer = 0;	
				// 音效
				M.missileEnd.play();
			}

			// 自身旋转
			this.timer[i] += H.delayTime;
				if(this.timer[i]>150){
					this.drawX[i] = (this.drawX[i]+1)%2;
					this.timer[i] %= 150;}
			// 循环画出
			c.drawImage(this.missile,this.drawX[i]*propW/2,0,propW/2,propH,this.x[i],this.y[i],propW/2,propH);
			c.restore();
		}
	}
}