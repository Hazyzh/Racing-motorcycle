function otherUser(headImg,carBodyImg,carWheelImg,maxSpeed,speedXgrowth,speedYgrowth,y,x) {
	this.headImg = new Image();
	this.carBodyImg = new Image();
	this.carWheelImg = new Image();
	this.smokeImg = new Image();
	this.smokeCounts;

	this.headImgSrc = headImg,
	this.carBodyImgSrc = carBodyImg;
	this.carWheelImgSrc = carWheelImg;
	this.speedXgrowth =  speedXgrowth;
	this.speedYgrowth = speedYgrowth;
	this.maxSpeed = maxSpeed/2;
	this.speedX;this.speedY;
	this.x;
	this.y = y;
	this.x = x;
	this.carWheelX;/*轮子图片剪切起始坐标*/
	this.counts,this.carTestTime;
	this.angle;/*碰香蕉旋转*/
	this.coe;/*加速减速系数*/
	this.distance;/*距离*/

	this.Yaim = y;  /*AI 上下自移动*/
	this.yDownFlag;this.yUpFlag;
	// 移动判断
	this.judge1;/*判断增速*/
	this.judge2;/*判断减速*/
	this.judge3;/*判断沙滩*/
	this.n2oJudge;/*汽油*/
	this.n2oJudgeTimer;
	this.followJudge;/*苍蝇*/
	this.followJudgeTimer;
	this.followPropY;
	this.missileJudge;/*导弹*/
	this.missileJudgeTimer;
	this.restoreY;/*存储Y值*/
	this.overflag;
}
otherUser.prototype.initBase = function(){
	this.headImg.src = this.headImgSrc;
	this.smokeImg.src = 'images/Game/yanwu.png';
	this.smokeCounts = 0;

	this.carBodyImg.src = this.carBodyImgSrc;
		switch(this.carWheelImgSrc){
		case 'images/Shop/w1.png':
		this.carWheelImgSrc = 'images/Shop/wm1.png';break;
		case 'images/Shop/w2.png':
		this.carWheelImgSrc = 'images/Shop/wm2.png';break;
		case 'images/Shop/w3.png':
		this.carWheelImgSrc = 'images/Shop/wm3.png';break;
		case 'images/Shop/w4.png':
		this.carWheelImgSrc = 'images/Shop/wm4.png';break;
	}
	this.carWheelImg.src = this.carWheelImgSrc;
	this.carWheelX = 0;this.counts = 0;
	this.carTestTime = 0;
	// x,y方向的速度
	this.speedX=0;this.speedY=0;
	this.angle=0;
	// 系数
	this.coe = 1;
	this.distance = 0;
	// 上下标志
	this.yDownFlag = this.yUpFlag = true;
	this.judge1 = this.judge2 = this.judge3 = true;
	this.n2oJudge = false;this.n2oJudgeTimer = 0;
	this.followJudge = false;this.followJudgeTimer = 0;
	this.missileJudge = false;this.missileJudgeTimer = 0;
	this.restoreY = 0;
	this.overflag = false;
}
otherUser.prototype.draw = function(c){
	if(this.speedX>this.maxSpeed){
		this.speedX = lerpDistance(this.maxSpeed,this.speedX,0.3);
	}

	// 前后
	if(this.speedX<this.maxSpeed&&H.data.gameBeign&&!this.overflag&&!H.data.gameOver){this.speedX += this.speedXgrowth*H.delayTime/1000;}

	this.speedX *=this.coe;
		// 上下
	if(this.Yaim != this.y&&!this.followJudge){
		if(this.Yaim<this.y&&this.yUpFlag){
			this.y -= this.speedYgrowth*H.delayTime/1000;
		}
		if(this.Yaim>this.y&&this.yDownFlag){
			this.y += this.speedYgrowth*H.delayTime/1000;
		}
		if(Math.abs(this.Yaim-this.y)<5){this.y = this.Yaim};
	}

	// 碰香蕉后检测
	if(this.angle){
		if(this.angle<1){this.angle=0}
		this.angle = lerpDistance(0,this.angle,0.99);
	}

	
	// 汽油时间
	if(this.n2oJudge&&!this.followJudge){
		this.n2oJudgeTimer += H.delayTime;
		if(this.n2oJudgeTimer>3000){
			this.speedXgrowth *=0.5;
			this.maxSpeed *=0.5;
			this.n2oJudgeTimer = 0;	
			this.n2oJudge = false;	
		}

		// 算轮子位置
		var wheelW = this.carWheelImg.width;
		var wheelH = this.carWheelImg.height;
		for(var i=0;i<10;i++){
			c.save();
			c.globalAlpha = (10-i)/20;
			c.translate(this.x+this.distance-H.activeUser.distance-i*this.speedX/4,this.y);
			c.rotate(this.angle*Math.PI/180);
			c.drawImage(this.carWheelImg,0,0,wheelW/8,wheelH,+30,-wheelH/2,wheelW/8,wheelH);
			c.drawImage(this.carWheelImg,0,0,wheelW/8,wheelH,-65,-wheelH/2,wheelW/8,wheelH);
			c.drawImage(this.carBodyImg,-this.carBodyImg.width/2,-this.carBodyImg.height/2-30);
			c.drawImage(this.headImg,-this.headImg.width/2,-this.headImg.height/2-60);
			c.restore();
		}
	}
	/*苍蝇*/
	if(this.followJudge){
		this.speedX = 0;
		if(this.restoreY){this.y = -1000}
		else{this.restoreY = this.y;this.y = -1000}
		this.followJudgeTimer += H.delayTime;
		if(this.followJudgeTimer>3000){
			this.followJudgeTimer = 0;	
			this.followJudge = false;
			this.y = this.restoreY;
			this.restoreY = 0;
		}
	}
	/*导弹*/
	if(this.missileJudge){
		this.speedX = 0;
		if(this.restoreY){this.y = -1000}
		else{this.restoreY = this.y;this.y = -1000}
		this.missileJudgeTimer += H.delayTime;
		if(this.missileJudgeTimer>3000){
			this.missileJudgeTimer = 0;	
			this.missileJudge = false;
			this.y = this.restoreY;
			this.restoreY = 0;
		}
	}
	if(this.overflag){
		this.speedX = lerpDistance(0,this.speedX,0.99);
		if(this.speedX<3){this.speedX = 0;}
	}
	if(H.data.gameOver){this.speedX = 0;}
	this.distance += this.speedX*H.delayTime/100;/*距离*/
	c.save();
	if(this.n2oJudge){
		c.shadowBlur = 30;
		c.shadowColor = "red";
	}
	var yval;
	if(this.followJudge){
		this.followPropY = lerpDistance(200,this.followPropY,0.97);
		yval = this.followPropY;
	}else if(this.missileJudge){
		yval = this.restoreY;
	}else{
		yval = this.y;
	}

	c.translate(this.x+this.distance-H.activeUser.distance,yval);
	c.rotate(this.angle*Math.PI/180);
	// 算轮子位置
	var wheelW = this.carWheelImg.width;
	var wheelH = this.carWheelImg.height;

	this.carTestTime += H.delayTime*this.speedX/10;
	if(this.carTestTime>150){
		this.counts = (this.counts+1)%8;
		this.carTestTime %= 150;
		this.smokeCounts = (this.smokeCounts+1)%8;
	}
	

	this.carWheelX = wheelW/8*this.counts;
	// 苍蝇
	if(this.followJudge){
		c.beginPath();
		var radialGradient = c.createRadialGradient (0,-50, 10,0,-50,100); 
		    radialGradient.addColorStop(0, 'rgba(247, 247, 247, 0)'); 
		    radialGradient.addColorStop(0.5, 'rgba(120, 120, 120, 0.5)'); 
		    radialGradient.addColorStop(0.8, 'rgba(51, 51, 51, 0.8)'); 
		    radialGradient.addColorStop(1, 'rgba(238, 238, 238, 1)'); 
	    c.fillStyle = radialGradient; 
		c.arc(0,-50,100,0,Math.PI*2);
		c.fill();
		c.closePath();	
	}
	// 导弹
	var missilea = 0;
	if(this.missileJudge){

		if(this.missileJudgeTimer<1500){
			missilea = this.missileJudgeTimer/100*2;
		}else{
			missilea = 30-((this.missileJudgeTimer-1500)/100*2);
		}
		c.rotate(missilea*Math.PI/360);
		// 画烟雾
		if(this.missileJudgeTimer<500){
			c.drawImage(H.activeUser.missileObjUserImg,-120,-100);
		}
	}
	c.drawImage(this.carWheelImg,this.carWheelX,0,wheelW/8,wheelH,+30+missilea,-wheelH/2-missilea,wheelW/8,wheelH);
	c.drawImage(this.carWheelImg,this.carWheelX,0,wheelW/8,wheelH,-65-2*missilea,-wheelH/2+missilea,wheelW/8,wheelH);
	c.drawImage(this.carBodyImg,-this.carBodyImg.width/2-missilea,-this.carBodyImg.height/2-30+missilea);
	c.drawImage(this.headImg,-this.headImg.width/2+missilea,-this.headImg.height/2-60-missilea);

	var smokeX = this.smokeImg.width;
	var smokeY = this.smokeImg.height;

	var sDrawX = smokeX/8*(8-this.smokeCounts);
	if(this.speedX){
		c.drawImage(this.smokeImg,sDrawX,0,smokeX-sDrawX,smokeY,sDrawX-250,-50,smokeX-sDrawX,smokeY);
	}
	c.restore();
}