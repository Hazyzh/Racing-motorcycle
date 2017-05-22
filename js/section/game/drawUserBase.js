function drawUserBase(headImg,carBodyImg,carWheelImg,maxSpeed,speedXgrowth,speedYgrowth) {
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
	this.x;this.y;
	this.carWheelX;/*轮子图片剪切起始坐标*/
	this.counts,this.carTestTime;
	this.angle;/*碰香蕉旋转*/
	this.coe;/*加速减速系数*/
	this.distance;/*距离*/
	this.yDownFlag;this.yUpFlag;
	this.n2oJudge;/*汽油*/
	this.n2oJudgeTimer;
	this.followJudge;/*苍蝇*/
	this.followJudgeTimer;
	this.restoreY;/*存储Y值*/
	this.missileFlag;
	this.missileObj;
	this.missileAimTimer;
	this.missileAimImg = new Image();
	this.missileObjUserImg = new Image();
	this.overflag;
}
drawUserBase.prototype.initBase = function(){
	this.x = 300;
	this.y = 390;
	this.headImg.src = this.headImgSrc;/*'images/Shop/c8s_2.gif';*/
	this.carBodyImg.src = this.carBodyImgSrc;
	this.smokeImg.src = 'images/Game/yanwu.png';
	this.smokeCounts = 0;

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
	this.n2oJudge = false;this.n2oJudgeTimer = 0;
	this.followJudge = false;this.followJudgeTimer = 0;
	this.restoreY = 0;
	// missile
	this.missileFlag = false;
	this.missileAimTimer = 0;
	this.missileObj;
	this.missileAimImg.src = 'images/Game/missileAim.png';
	this.missileObjUserImg.src = 'images/Game/missileSmoke.png';

	this.overflag = false;
}
drawUserBase.prototype.draw = function(c){

	var self = this;
	// 键盘事件
	if(this.speedX>this.maxSpeed){
		this.speedX = lerpDistance(this.maxSpeed,this.speedX,0.3);
	}

		// 前后
	if(H.keyState.Right){
		if(this.speedX<this.maxSpeed&&!this.overflag&&!H.data.gameOver){this.speedX += this.speedXgrowth*H.delayTime/1000;}
	}else if(H.keyState.Left){
		this.speedX -= this.speedXgrowth*H.delayTime/500;
		if(this.speedX<0){this.speedX = 0;} 
	}
	this.speedX *=this.coe;
		// 上下
	if(this.speedX>0&&!this.overflag&&!H.data.gameOver){
		if(H.keyState.Up&&this.y>318&&this.yUpFlag){
		this.y -= this.speedYgrowth*H.delayTime/1000; 
		}else if(H.keyState.Down&&this.y<492&&this.yDownFlag){
			this.y += this.speedYgrowth*H.delayTime/1000; 
		}
	}
	if(H.keyState.changeProp){
		H.data.prop.reverse();
		H.keyState.changeProp = false;
	}

(function(){
		// 扔香蕉
	if(H.keyState.useProp&&H.keyState.usePropFlag&&!H.data.gameOver){
		H.keyState.usePropFlag = false;
		if(H.data.prop.length){
			if(H.data.prop[0]=='banana'){
				for(var i=0;i<H.bananas.num;i++){
					if(!H.bananas.alive[i]){
						H.bananas.alive[i] = true;
						H.bananas.x[i] = H.activeUser.x-100;
						H.bananas.y[i] = H.activeUser.y-30;
						break;
					}
				}
			}else if(H.data.prop[0]=='n2o'){
				M.n2o.play();
				M.n2o.time(0);
				if(self.n2oJudge){
					self.n2oJudgeTimer = 0;
				}else{
					self.speedXgrowth *=2;
					self.maxSpeed *=2;
					self.n2oJudge = true;									
				}
			}else if(H.data.prop[0]=='follow'){
				M.follow.play();
				var obj = getPrevObj(self);
				if(obj){
					for(var i=0;i<H.followProp.num;i++){
						if(!H.followProp.alive[i]){
							H.followProp.alive[i] = true;
							H.followProp.x[i] = H.activeUser.x;
							H.followProp.y[i] = H.activeUser.y;
							H.followProp.aim[i] = obj;
							break;
						}
					}
				}
			}else if(H.data.prop[0]=='missile'){
				H.keyState.usePropFlag2 = false;
				/*	if(H.keyState.usePropFlag2){
						H.keyState.usePropFlag2 = false;
						$(document).one('keyup',function(e){
							H.keyState.usePropFlag2 = true;
							if(e.keyCode==17){
								H.data.prop.splice(0,1);
								if(obj){
									for(var i=0;i<H.missileProp.num;i++){
										if(!H.missileProp.alive[i]){
											H.missileProp.alive[i] = true;
											H.missileProp.x[i] = H.activeUser.x;
											H.missileProp.y[i] = H.activeUser.y;
											H.missileProp.aim[i] = obj;
											H.activeUser.missileFlag = false;
											break;
										}
									}
								}
							}
						})
					}
			return;*/
			}/*其他道具*/

		H.data.prop.splice(0,1);
		}
	}
}())
	// 碰香蕉后检测
	if(this.angle){
		if(this.angle<1){this.angle=0}
		this.angle = lerpDistance(0,this.angle,0.99);
	}
	// 汽油时间
	if(this.n2oJudge){
		this.n2oJudgeTimer += H.delayTime;
		if(this.n2oJudgeTimer>3000){
			this.speedXgrowth *=0.5;
			this.maxSpeed *=0.5;
			this.n2oJudgeTimer = 0;	
			this.n2oJudge = false;	
		}
	}

	

	if(this.n2oJudge){
			// 算轮子位置
		var wheelW = this.carWheelImg.width;
		var wheelH = this.carWheelImg.height;
		for(var i=0;i<10;i++){
			c.save();
			c.globalAlpha = (10-i)/20;
			c.translate(this.x-i*this.speedX/6,this.y);
			c.rotate(this.angle*Math.PI/180);
			c.drawImage(this.carWheelImg,0,0,wheelW/8,wheelH,+30,-wheelH/2,wheelW/8,wheelH);
			c.drawImage(this.carWheelImg,0,0,wheelW/8,wheelH,-65,-wheelH/2,wheelW/8,wheelH);
			c.drawImage(this.carBodyImg,-this.carBodyImg.width/2,-this.carBodyImg.height/2-30);
			c.drawImage(this.headImg,-this.headImg.width/2,-this.headImg.height/2-60);
			c.restore();
		}
	}
	/*苍蝇导弹*/
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

	if(!H.keyState.usePropFlag2){
		this.missileFlag = true;
		this.missileObj = getMissilePrevObj();
	}else{
		// 
		if(this.missileObj){
			M.missileBegin.play();
			for(var i=0;i<H.missileProp.num;i++){
				if(!H.missileProp.alive[i]){
					H.missileProp.alive[i] = true;
					H.missileProp.x[i] = this.x;
					H.missileProp.y[i] = this.y;
					H.missileProp.aim[i] = this.missileObj;
					break;
				}
			}
		}
		this.missileObj = null;
		this.missileFlag = false;
	}
	// 导弹图
	if(this.missileFlag){
		c.save()
		c.beginPath();
		c.globalAlpha=0.8;
		c.arc(400,180,90,0,Math.PI*2);
		c.stroke();
		c.closePath();
		c.restore();
		if(this.missileObj){
			this.missileAimTimer += H.delayTime;
			if(this.missileAimTimer>2000){this.missileAimTimer = 0;}
			var MscaleNum = this.missileAimTimer/4000;
			var Mobjx = this.missileObj.x+this.missileObj.distance-H.activeUser.distance;
				// console.log(this.missileObj.distance+':'+this.missileObj.speedX);
				c.save()
				c.beginPath();
				c.translate(Mobjx,this.missileObj.y);
				c.scale(MscaleNum+0.5,MscaleNum+0.5);
				c.arc(0,0,50,0,Math.PI*2);
				c.drawImage(this.missileAimImg,-this.missileAimImg.width/2,-this.missileAimImg.height/2);
				c.stroke();
				c.closePath();
				c.restore();
				c.save()
				c.translate(400,220);
				c.scale(1,1);
					var MaimImgW = this.missileObj.carWheelImg.width;
					var MaimImgH = this.missileObj.carWheelImg.height;
					c.drawImage(this.missileObj.carWheelImg,0,0,MaimImgW/8,MaimImgH,+30,-MaimImgH/2,MaimImgW/8,MaimImgH);
					c.drawImage(this.missileObj.carWheelImg,0,0,MaimImgW/8,MaimImgH,-65,-MaimImgH/2,MaimImgW/8,MaimImgH);
					c.drawImage(this.missileObj.carBodyImg,-this.missileObj.carBodyImg.width/2,-this.missileObj.carBodyImg.height/2-30);
					c.drawImage(this.missileObj.headImg,-this.missileObj.headImg.width/2,-this.missileObj.headImg.height/2-60);
				c.restore()
		}
	}

	if(this.overflag){
		this.speedX = lerpDistance(0,this.speedX,0.99);
		if(this.speedX<3){this.speedX = 0;}
	}
	if(H.data.gameOver){this.speedX = 0;}
	// console.log(this.distance)
	this.distance += Math.abs(this.speedX)*H.delayTime/100;
	c.save();
	c.font = "20px 黑体";
	c.textAlign = 'center';
	c.textBaseline = 'middle';
	c.fillStyle = "#fff";
	if(this.n2oJudge){
		c.shadowBlur = 30;
		c.shadowColor = "red";
	}

	var yval;
	if(this.followJudge){
		this.followPropY = lerpDistance(200,this.followPropY,0.97);
		yval = this.followPropY;
	}else{
		yval = this.y;
	}
	c.translate(this.x,yval);
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
	// 

	this.carWheelX = wheelW/8*this.counts;
	c.fillText(activeUser.userName,0,-130);
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

	c.drawImage(this.carWheelImg,this.carWheelX,0,wheelW/8,wheelH,+30,-wheelH/2,wheelW/8,wheelH);
	c.drawImage(this.carWheelImg,this.carWheelX,0,wheelW/8,wheelH,-65,-wheelH/2,wheelW/8,wheelH);
	c.drawImage(this.carBodyImg,-this.carBodyImg.width/2,-this.carBodyImg.height/2-30);
	c.drawImage(this.headImg,-this.headImg.width/2,-this.headImg.height/2-60);

	var smokeX = this.smokeImg.width;
	var smokeY = this.smokeImg.height;

	var sDrawX = smokeX/8*(8-this.smokeCounts);
	if(this.speedX){
		c.drawImage(this.smokeImg,sDrawX,0,smokeX-sDrawX,smokeY,sDrawX-250,-50,smokeX-sDrawX,smokeY);
	}
	c.restore();


}