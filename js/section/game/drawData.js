function drawData() {
	this.speedBg = new Image();
	this.speedCounts = new Image();
	this.speedNum;

	this.timerBg = new Image();
	this.timer;

	this.goldsBg = new Image();
	this.golds;
	this.gameBeign = false;
	this.addKeyflag = false;

	this.rankBg = new Image();
	this.rankArr = new Array();

	//倒计时十秒 
	this.gameOver = false;
	this.gameOvernum;
	this.gameOverCountDown;
	this.gameOverCountDownflag;
	this.oldIndex;
	this.balls = new Array();
	this.ballsColors = new Array();


	this.finishImg = new Image();

	// 倒计时
	this.countDown;	
		// 倒计时数字
		this.countDownTimerImgs = [];
		this.countDownImgOpacity;
		// 倒计时灯
		this.countDownBg = new Image();
		this.countDownIconRed = new Image();
		this.countDownIconYellow = new Image();
		this.countDownIconGreen = new Image();
		this.countDownLightFlag;
		this.countDownLightX;
	// 道具
	this.prop = [];
	this.propBg = new Image();
	this.propBanana = new Image();
	this.propN2o = new Image();
	this.follow = new Image();
	this.missile = new Image();
	// end
	this.endBg = new Image();
	this.endPeople = new Array();
	this.endFlag = false;
	this.next=0;
	this.nextColor = '#fff';
}
drawData.prototype.init = function(){
	this.speedBg.src = 'images/Game/speed.png';
	this.speedCounts.src = 'images/Game/speedrect.png';
	this.speedNum = 0;

	this.timerBg.src = 'images/Game/timer.png';
	this.timer = 0;

	this.goldsBg.src = 'images/Game/coin.png';
	this.golds = 0;

	this.countDown = 4000;/*倒计时*/
	this.countDownIndex = this.countDown/1000;
	this.countDownBg.src = 'images/Game/light.png';
	this.countDownIconRed.src = 'images/Game/red.png';
	this.countDownIconYellow.src = 'images/Game/yellow.png';
	this.countDownIconGreen.src = 'images/Game/green.png';
	for(var i=0;i<7;i++){
		var img = new Image();
		img.src = 'images/Game/'+i+'.png';
		this.countDownTimerImgs.push(img);
	}
	this.countDownImgOpacity = 1;
	// 倒计时灯
	this.countDownLightFlag = true;
	this.countDownLightX=130; 

	// 道具
	this.propBg.src = 'images/Game/prop.png';
	this.propBanana.src = 'images/Game/banana_1.png';
	this.propN2o.src = 'images/Game/n2o.png';
	this.follow.src = 'images/Game/follow.png';
	this.missile.src = 'images/Game/missile.png';
	// 排名
	this.rankBg.src = 'images/Game/num.png';
	// 游戏结束倒计时
	this.gameOvernum = 40000;	// gameOvernum = 60000;
	this.gameOverCountDown = 11000;
	this.gameOverCountDownflag = false;
	this.ballsColors.push("#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000")
	this.oldIndex = 10;

	// 是否完成
	this.finishImg.src = 'images/Game/finish.png';
	// 结束
	this.endBg.src = 'images/End/ending.jpg';
	for(var i=0;i<8;i++){
		var img = new Image();
		img.src = 'images/End/cha'+(i+1)+'.png';
		this.endPeople.push(img);
	}
}


drawData.prototype.draw = function(c){
	var arr = [];/*距离数组*/
	for(var i=0;i<H.users.length;i++){
		arr.push(H.users[i]);
		if(H.users[i].distance>this.gameOvernum&&!H.users[i].overflag){
			H.users[i].overflag = true;
			this.rankArr.push(H.users[i]);
		}
	}
	arr.sort(function(a,b){
		return b.distance-a.distance;
	})
	if(arr[0].distance>this.gameOvernum){
		this.gameOverCountDownflag = true;
		// this.gameOver  = true;
	}

	// 道具栏
	c.save();
	c.translate(50,115);
	c.drawImage(this.rankBg,-this.rankBg.width/2,-this.rankBg.height/2)
	c.drawImage(this.propBg,-this.propBg.width/2+75,-this.propBg.height/2);
	c.drawImage(this.propBg,-this.propBg.width/2+150,-this.propBg.height/2);
	// 判断道具
	if(this.prop.length>2){this.prop.splice(2,1)}
	for(var i=0;i<this.prop.length;i++){
		if(this.prop[i]){
			var img = this.prop[i] == 'banana'?this.propBanana:
					  this.prop[i] == 'n2o'?this.propN2o:
					  this.prop[i] == 'follow'?this.follow:
					  this.prop[i] == 'missile'?this.missile:0;
			switch(i){
				case 0:
					c.drawImage(img,-img.width/2+75,-img.height/2);
					break;
				case 1:
					c.drawImage(img,-img.width/2+150,-img.height/2);
					break;
			}
		}
	}
	// 判断排名
	if(!H.activeUser.overflag){
		for(var i=0;i<arr.length;i++){
			if(arr[i]==H.activeUser){
				c.drawImage(this.countDownTimerImgs[i+1],-this.rankBg.width/2,-this.rankBg.height/2);
				break;
			}
		}
	}else{
		for(var i=0;i<this.rankArr.length;i++){
			if(this.rankArr[i]==H.activeUser){
				c.drawImage(this.countDownTimerImgs[i+1],-this.rankBg.width/2,-this.rankBg.height/2);
				break;
			}
		}			
	}
	c.restore();


	// 速度
	c.save();
	c.shadowBlur = 10;
	c.shadowColor = "#999";
	c.font = "30px 黑体";
	c.textAlign = 'center';
	c.textBaseline = 'middle';
	c.fillStyle = "#333";

	this.speedNum = Math.ceil((H.activeUser.speedX/H.activeUser.maxSpeed)*8);
	// c.fillText('SCORE: '+this.score,canWidth/2,canHeight-60);
	c.drawImage(this.speedBg,20,20); 
	var speedW = this.speedCounts.width*this.speedNum/9;
	c.drawImage(this.speedCounts,0,0,speedW,this.speedCounts.height,30,35,speedW*0.8,this.speedCounts.height);
	// 时间
	c.drawImage(this.timerBg,300,20);
	var min = Math.floor(this.timer/60000);
	var sec = Math.floor(this.timer%60000/1000);
	if(sec<10){sec = '0'+sec};
	c.fillText(min+':'+sec,450,60);
	// 金币
	c.drawImage(this.goldsBg,550,20);
	c.fillText(this.golds,650,60);
	c.restore();

	// 结束倒计时
	if(this.gameOverCountDownflag&&!this.endFlag){
		/*10秒倒计时开始*/
		M.game.pause();
		this.oldIndex>9?M.counts.play():0;
		// 遮罩
		c.save();
		c.fillStyle = "rgba(0,0,0,.8)";
		c.fillRect(0,0,H.canWidth,H.canHeight);
		c.restore();
		// 小球数据更新和画
		ballUpdata(this);
		c.save()
		c.globalAlpha = 0.8;
		for(var i=0;i<this.balls.length;i++){
			c.beginPath()
			c.arc(this.balls[i].x,this.balls[i].y,this.balls[i].r,0,Math.PI*2);
			c.fillStyle = this.balls[i].color;
			c.fill();
		}
		c.restore()
		// 倒计时
		if(this.gameOverCountDown>0){
			this.gameOverCountDown -= H.delayTime;
			c.save();
			var endIndex = Math.floor(this.gameOverCountDown/1000);
			if(endIndex<0){endIndex=0};
			if(endIndex!=10){
				createOne(c,400,150,digit[endIndex],10)
			}else{
				createOne(c,300,150,digit[1],10)
				createOne(c,500,150,digit[0],10)
			};
			c.restore();
			if(this.oldIndex!=endIndex){
				if(endIndex!=10){
					addballs(this,400,150,endIndex);
				}else{
					addballs(this,300,150,endIndex);
					addballs(this,500,150,endIndex);
				};
				if(endIndex>1){M.counts.time(0)}
				this.oldIndex = endIndex;
			}
		}else{
			this.gameOverCountDown -= H.delayTime;
			this.gameOver = true;
			c.save()
			c.fillStyle = "rgba(0,0,0,"+(0.5-this.gameOverCountDown/6000)+")";
			c.fillRect(0,0,H.canWidth,H.canHeight);
			c.drawImage(this.finishImg,200,200);
			c.restore();
			if(this.gameOverCountDown<-3000){
				this.endFlag = true;
				gameScene.continueBtn.ele.show();
				gameScene.restartBtn.ele.show();
				M.end.play();
				// 加金币与解锁
				for(var i=0;i<this.rankArr.length;i++){
					if(H.activeUser == this.rankArr[i]){break}
				}
				if(i<3){
					if(activeUser.trackIndex==activeUser.checkpoint){
						activeUser.checkpoint++;
					}
				}
				if(i<4){
					activeUser.gold += (this.golds+(4-i)*100);
				}else{
					activeUser.gold += this.golds;
				}
				db.transaction(function(tx){
					tx.executeSql('update user set gold = ?,checkpoint = ? where id = ?',[activeUser.gold,activeUser.checkpoint,activeUser.id]);
				})
				
			}
		}
	}

	// 开场倒计时
	if(this.countDown){
		this.countDown -= H.delayTime;
		if(this.countDown<=0){
			/*开始游戏*/
			M.game.play();
			M.theme.pause();
			addKeyFun(H.keyState);
			this.countDown=0;
			this.gameBeign = true;
			this.addKeyflag = false;
		};
		c.save();
		c.fillStyle = "rgba(0,0,0,.5)";
		c.fillRect(0,0,H.canWidth,H.canHeight);
		c.restore();
		c.save();
		var val = this.countDown%1000/1000;
		var index = Math.floor(this.countDown/1000);
		// console.log(index)
		c.translate(300,200);
		c.scale(1+val*2,1+val*2);
		c.globalAlpha = val;
		c.drawImage(this.countDownTimerImgs[index],0,0); 
		c.restore();
	}else{
		if(!H.activeUser.overflag&&!this.gameOver){this.timer += H.delayTime};
	}
	// 倒计时灯
	if(this.countDownLightFlag){
		c.save();
		c.translate(-50,25);
		this.countDownLightX -= H.activeUser.speedX*H.delayTime/100;
		c.drawImage(this.countDownBg,this.countDownLightX,125);
		if(!index){index=0};
		if(this.countDownIndex!=index){
			if(index==3){M.counts.play();}else if(index==2){M.counts.time(0)}
			this.countDownIndex = index;
		}
		
		switch(index){
			case 0:c.drawImage(this.countDownIconGreen,this.countDownLightX+110,240);
			case 1:c.drawImage(this.countDownIconGreen,this.countDownLightX+110,215);
			case 2:c.drawImage(this.countDownIconYellow,this.countDownLightX+110,190);
			case 3:c.drawImage(this.countDownIconRed,this.countDownLightX+110,165);		   
		}

		if(this.countDownLightX<-100){this.countDownLightFlag=false;} 
		c.restore();
	}
	// 结束画面
	if(this.endFlag){
		c.drawImage(this.endBg,0,0,H.canWidth,H.canHeight);
		var activeRank;
		for(var i=0;i<this.rankArr.length;i++){
			if(H.activeUser == this.rankArr[i]){activeRank = i+1};
			var reg = /\d{1}.png/;
			var ranknum = reg.exec(this.rankArr[i].headImg.src)[0][0]-1;
			switch(i){
				case 0:
					c.drawImage(this.endPeople[ranknum],240,160)
				break;
				case 1:
					c.drawImage(this.endPeople[ranknum],120,180)
				break;
				case 2:
					c.drawImage(this.endPeople[ranknum],360,200)
				break;
			}
		}
		c.save();
		c.font = "30px 方正舒体";
		c.textAlign = 'center';
		c.textBaseline = 'middle';
		c.fillStyle = "#fff";
		// 排名
		if(activeRank){
			c.fillText('第 '+activeRank+' 名',600,70);
			c.fillText('用时:'+min+'分'+sec+'秒',600,110);
			c.fillText('完成比赛奖励 '+(5-activeRank)*100,120,480);
			c.fillText('获得金币 '+this.golds,100,440);
		}else{
			c.fillText('未完成比赛',600,90);
					// 金币
			c.fillText('获得金币 '+this.golds,100,460);
			c.restore();
		}
		if(activeRank<4&&activeUser.trackIndex+1==activeUser.checkpoint){
			this.next += H.delayTime;
			if(this.next>1000){
				this.next %= 1000;
				this.nextColor = this.ballsColors[Math.floor(Math.random()*10)];
			}
			c.save();
			c.font = "30px 方正舒体";
			c.textAlign = 'center';
			c.textBaseline = 'middle';
			c.shadowBlur = 15;
			c.shadowColor = "#fff";
			c.fillStyle = this.nextColor;
			c.fillText('恭喜您 解锁下一关卡!',460,460);
			c.restore();
		}

	}
}

function ballUpdata(obj){
		// 删除多余小球
	for(var i=0;i<obj.balls.length;i++){
		if(obj.balls[i].y>550){
			obj.balls.splice(i,1);
			i--;
		}
	}
	for(var i=0;i<obj.balls.length;i++){
		// 改变轨迹
		obj.balls[i].x +=obj.balls[i].vx;
		obj.balls[i].y +=obj.balls[i].vy;
		obj.balls[i].vy +=obj.balls[i].g;
	}
}
function ball(x,y,r,g,vx,vy,color){
	this.x = x;
	this.y = y;
	this.r = r;
	this.g = g;
	this.vx = vx;
	this.vy = vy;
	this.color = color;
}
// 创建单元矩阵
function createOne(context,x,y,matrix,r){
	for(var i=0;i<matrix.length;i++){
		for(var n=0;n<matrix.length;n++){
			if(matrix[i][n]==1){
				context.beginPath();
				context.fillStyle = '#fff';
				context.arc(n*22+10+x-60,i*22+10+y,r,0,Math.PI*2)
				context.fill();
			}
		}
	}
}
// 加小球函数
function addballs(obj,x,y,number){
	var arr = digit[number];
	for(var i=0;i<arr.length;i++){
		for(var n=0;n<arr[i].length;n++){
			if(arr[i][n]==1){
				if(obj.balls.length>300){return;}
				var ballOne = new ball(x+n*22+11,y+i*22+11,10,Math.random(),Math.random()>0.5?-4:4,Math.random()>0.5?-1:-0.5,obj.ballsColors[Math.floor(Math.random()*10)]);
				obj.balls.push(ballOne);
			}
		}
	}
}