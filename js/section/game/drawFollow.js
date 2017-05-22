function drawFollow() {
	this.followImg = new Image();
	this.alive = [];
	this.x = [];
	this.y = [];
	this.drawX = [];/*切图位置*/
	this.timer = [];
	this.upFlag = [];
	this.aim = [];
}
drawFollow.prototype.num = 4;
drawFollow.prototype.init = function(){
	this.followImg.src = 'images/Game/followProp.png';
	for(var i=0;i<this.num;i++){
		this.alive[i] = false;
		this.drawX[i] = 0;
		this.timer[i] = 0;
		this.upFlag[i] = false;
		this.aim[i] = false;
	}
}
drawFollow.prototype.draw = function(c){
	var propW = this.followImg.width;
	var propH = this.followImg.height;
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			c.save();
			c.shadowBlur = 15;
			c.shadowColor = "blue";


			if(!this.upFlag[i]){
				this.y[i] -= 20*H.delayTime/100;
				if(Math.abs(this.y[i]-200)<5){
					this.upFlag[i] =true;
				}
			}else{
				this.x[i] = lerpDistance(this.aim[i].x+this.aim[i].distance-H.activeUser.distance+50,this.x[i],0.9);
				this.y[i] = lerpDistance(this.aim[i].y-30,this.y[i],0.9);
				var l = getLength(this.x[i]+32,this.aim[i].x+this.aim[i].distance-H.activeUser.distance+50,this.y[i]+32,this.aim[i].y-30);
				if(l<50){
					this.alive[i]=false;
					this.aim[i].followJudge = true;
					this.aim[i].followJudgeTimer = 0;
					this.upFlag[i] = false;
					this.aim[i].followPropY = this.aim[i].y;	
				}
			}

			// 自身旋转
			this.timer[i] += H.delayTime;
				if(this.timer[i]>150){
					this.drawX[i] = (this.drawX[i]+1)%9;
					this.timer[i] %= 150;}
			// 循环画出
			c.drawImage(this.followImg,this.drawX[i]*propW/9,0,propW/9,propH,this.x[i],this.y[i],propW/9,propH);
			c.restore();
		}
	}
}