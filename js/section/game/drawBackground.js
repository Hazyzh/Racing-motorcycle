function drawBackground(){
	this.layer1 = new Image();
	this.layer2 = new Image();
	this.line = new Image();
	this.layer2BeginY;
	this.begin;/*起点*/
	this.distance;
	// 背景动感图片
	this.bigstore = new Image();
	this.cactus = new Image();
	this.skeleton = new Image();
	this.stoneBlocks = new Image();

	this.bgMoveArr = [];
	this.bgMoveX = [];
	this.bgMoveY = [];
	this.bgMoveAlive = [];

}
drawBackground.prototype.init = function(){
	this.layer1.src = 'images/Maps/Map1/bg.png';
	this.layer2.src = 'images/Maps/Map1/floot.png';
	this.line.src = 'images/Maps/Map1/end.png';
	this.layer2BeginY = 328;
	this.begin = true;
	this.distance = 40;
	// 背景图
	this.bigstore.src = 'images/Maps/Map1/bigstore.png';
	this.cactus.src = 'images/Maps/Map1/Cactus.png';
	this.skeleton.src = 'images/Maps/Map1/Skeleton.png';
	this.stoneBlocks.src = 'images/Maps/Map1/StoneBlocks.png';

	this.bgMoveArr.push(this.bigstore,this.cactus,this.skeleton,this.stoneBlocks);
	for(var i=0;i<this.bgMoveArr.length;i++){
		this.bgMoveX[i] = i*800+500;
		this.bgMoveAlive[i] = true;
	}
	this.bgMoveY = [0,50,100,200];
}
drawBackground.prototype.draw = function(c){
	this.distance += -H.activeUser.speedX*H.delayTime/100;
	if(this.distance<-400){
		this.begin = false;
	}
	// 第一层
	c.drawImage(this.layer1,0,0,H.canWidth,H.canHeight);
	// 第二层
	c.save();
	var pattern = c.createPattern(this.layer2, "repeat");
    c.fillStyle = pattern;
    c.beginPath();
    var layer2x = this.distance%256;
    c.translate(layer2x-40,this.layer2BeginY);
    c.fillRect(0,0,H.canWidth*2,H.canHeight-this.layer2BeginY);
	c.restore();
	// 第三层 背景动感图片
	for(var i=0;i<this.bgMoveArr.length;i++){
			if(this.bgMoveX[i]<-800){this.bgMoveX[i] = 2900;}
			this.bgMoveX[i] += -H.activeUser.speedX*H.delayTime/100;
			var w = this.bgMoveArr[i].width;
			var h = this.bgMoveArr[i].height;
			switch(i){
				case 0:c.drawImage(this.bgMoveArr[i],this.bgMoveX[i],this.bgMoveY[i]);break;
				case 1:
					var a = Math.floor(Math.abs(this.bgMoveX[i]%800)*6/800);
					c.drawImage(this.bgMoveArr[i],w*(5-a)/6,0,w/6,h,this.bgMoveX[i],this.bgMoveY[i],w/6,h);
					break;
				case 2:
					var a = Math.floor(Math.abs(this.bgMoveX[i]%800)*7/800);
					c.drawImage(this.bgMoveArr[i],w*(6-a)/7,0,w/7,h,this.bgMoveX[i],this.bgMoveY[i],w/7,h);
					break;
				case 3:
					var a = Math.floor(Math.abs(this.bgMoveX[i]%800)*5/800);
					c.drawImage(this.bgMoveArr[i],0,h*a/5,w,h/5,this.bgMoveX[i],this.bgMoveY[i],w,h/5);
					break;
			}
	}
	// 起点
	if(this.begin){
		c.drawImage(this.line,this.distance+50,this.layer2BeginY);
	}
	c.drawImage(this.line,this.distance+H.data.gameOvernum,this.layer2BeginY);
	
}
