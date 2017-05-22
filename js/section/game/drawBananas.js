function drawBananas(){
	this.x = [];
	this.y = [];
	this.alive = [];
	this.bananaType2 = new Image();
}
drawBananas.prototype.num = 8;
drawBananas.prototype.init = function(){
	for(var i=0;i<this.num;i++){
		if(i<2){this.alive[i]= true}else{this.alive[i]= false}
		this.x[i] = Math.random()*3000+800;
		this.y[i] = i/10*156+288;
	}
	this.bananaType2.src = 'images/Game/banana_2.png';
}
drawBananas.prototype.draw = function(c){
	controlNum(this,1,5000,true);/*控制数量*/
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			this.x[i] -= H.activeUser.speedX*H.delayTime/100;
			if(this.x[i]<-100){this.alive[i]=false};
			c.drawImage(this.bananaType2,this.x[i],this.y[i]);
		}
	}
}