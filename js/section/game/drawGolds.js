function drawGolds(){
	this.gold = new Image();
	this.alive = [];
	this.golds = [];
	this.x = [];
	this.y = [];
	this.drawX = [];/*切图位置*/
	this.timer = [];
	this.work = [];
}
drawGolds.prototype.num = 10;
drawGolds.prototype.init = function(){
	this.gold.src = 'images/Shop/Coin.png';
	for(var i=0;i<this.num;i++){
		i>5?this.alive[i] = false:this.alive[i] = true;
		this.x[i] = Math.random()*2000+800;
		this.y[i] = i/10*156+288;
		this.drawX[i] = 0;
		this.timer[i] = 0;
		this.work[i] = false;
	}
}
drawGolds.prototype.draw = function(c){

	controlNum(this,3,2000);
	var goldW = this.gold.width;
	var goldH = this.gold.height;
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			c.save();
			// 自身旋转
			this.timer[i] += H.delayTime;
				if(this.timer[i]>50){
					this.drawX[i] = (this.drawX[i]+1)%20;
					this.timer[i] %= 50;}
			// 向上抛
			if(this.work[i]){
				var l = getLength(this.x[i],550,this.y[i],20);
				this.x[i] = lerpDistance(550,this.x[i],0.96);
				this.y[i] = lerpDistance(20,this.y[i],0.96);
				c.globalAlpha = l/600+0.1;
				if(l<30){this.alive[i]=false;this.work[i]=false;}

			}else{
				// 改变位置
				this.x[i] -= H.activeUser.speedX*H.delayTime/100;
				if(this.x[i]<-100){this.alive[i]=false};
			}
			// 循环画出
			c.drawImage(this.gold,this.drawX[i]*goldW/20,0,goldW/20,goldH,this.x[i],this.y[i],goldW/20,goldH);
			c.restore();
		}
	}
}
// 获得存活金币的数量
function getAliveNum(obj){
	for(var i=0,n=0;i<obj.num;i++){
		if(obj.alive[i]){n++}
	}
	return n;
}
// 控制数量
function controlNum(obj,n,number,falg,falg2){
	if(300+H.activeUser.distance+1000>H.data.gameOvernum){
		return false;
	}
	var num = getAliveNum(obj);
	if(num>n){
		return;
	}else{
		var objx = Math.random()*number+800;
		if(300+H.activeUser.distance+number>H.data.gameOvernum){
			objx = Math.random()*(H.data.gameOvernum-H.activeUser.distance-1000)+800;
		}
		for(var i=0;i<obj.num;i++){
			if(!obj.alive[i]){
				// 赋值坐标
				obj.x[i] = Math.random()*objx+800;
				if(falg){obj.y[i] = Math.random()*156+288}else{
					obj.y[i] = i/10*156+288;
				}
				if(falg2){
					obj.category[i] = obj.categoryArr[Math.floor(Math.random()*obj.categoryArr.length)];
				}
				obj.alive[i] = true;
				return;
			}
		}
	}
}