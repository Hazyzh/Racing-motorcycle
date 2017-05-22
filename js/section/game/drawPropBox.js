function drawPropBox() {
	this.propboxImg = new Image();
	this.alive = [];
	this.x = [];
	this.y = [];
	this.drawX = [];/*切图位置*/
	this.timer = [];
	this.category = [];
	this.categoryArr = [];
}
drawPropBox.prototype.num = 8;
drawPropBox.prototype.init = function(){
	this.propboxImg.src = 'images/Game/propBox.png';
	this.categoryArr.push('banana','n2o','follow','missile');
	for(var i=0;i<this.num;i++){
		i>3?this.alive[i] = false:this.alive[i] = true;
		this.x[i] = 900;
		this.y[i] = (i%4)*50+310;
		this.drawX[i] = 0;
		this.timer[i] = 0;
		this.category[i] = this.categoryArr[Math.floor(Math.random()*this.categoryArr.length)];
		// this.category[i] = 'missile';
	}
}
drawPropBox.prototype.draw = function(c){
	controlNum(this,2,2000,true,true);
	var propW = this.propboxImg.width;
	var propH = this.propboxImg.height;
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			c.save();
			c.shadowBlur = 15;
			c.shadowColor = "orange";
			// 自身旋转
			this.timer[i] += H.delayTime;
				if(this.timer[i]>150){
					this.drawX[i] = (this.drawX[i]+1)%5;
					this.timer[i] %= 150;}
				// 改变位置
			this.x[i] -= H.activeUser.speedX*H.delayTime/100;
			if(this.x[i]<-2000){this.alive[i]=false};
			// 循环画出
			c.drawImage(this.propboxImg,this.drawX[i]*propW/5,0,propW/5,propH,this.x[i],this.y[i],propW/5,propH);
			c.restore();
		}
	}
}