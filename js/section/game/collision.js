// 人物金币的碰撞检测
function userGolds(){
	for(var i=0;i<H.golds.num;i++){
		if(H.golds.alive[i]){
			for(var n=0;n<H.users.length;n++){
				var x = Math.abs(H.golds.x[i]-(H.users[n].x+H.users[n].distance-H.activeUser.distance));
				var y = Math.abs(H.golds.y[i]-H.users[n].y+30);
				if(x<100&&y<30){
					if(H.users[n]==H.activeUser){
						M.CoinCollect.play();
						H.golds.work[i] = true;
						H.data.golds += 10;						
					}else{
						H.golds.alive[i] = false;
					}

				}
			}
		}
	}
}
// 人物和盒子的碰撞检测
function userPropBox(){
	for(var i=0;i<H.propbox.num;i++){
		if(H.propbox.alive[i]){
			// var l = getLength(H.propbox.x[i],H.activeUser.x,H.propbox.y[i],H.activeUser.y);
			for(var n=0;n<H.users.length;n++){
				var x = Math.abs(H.propbox.x[i]-(H.users[n].x+H.users[n].distance-H.activeUser.distance));
				var y = Math.abs(H.propbox.y[i]-H.users[n].y+30);
				if(x<100&&y<30){
					if(H.users[n]==H.activeUser){
						/*加音效*/
						M.prop.play();
						// M.CoinCollect.play();
						H.propbox.alive[i] = false;
						H.data.prop.unshift(H.propbox.category[i]);	
					}else{
						H.propbox.alive[i] = false;
						switch(H.propbox.category[i]){
							case 'banana':
								for(var m=0;m<H.bananas.num;m++){
									if(!H.bananas.alive[m]){
										H.bananas.alive[m] = true;
										H.bananas.x[m] = (H.users[n].x+H.users[n].distance-H.activeUser.distance)-100;
										H.bananas.y[m] = H.users[n].y-30;
										break;
									}
								};
							break;
							case 'n2o':
								if(H.users[n].n2oJudge){
									H.users[n].n2oJudgeTimer = 0;
								}else{
									H.users[n].speedXgrowth *=2;
									H.users[n].maxSpeed *=2;
									H.users[n].n2oJudge = true;									
								}
							break;
							case 'follow':
							case 'missile':
								var obj = getPrevObj(H.users[n]);
								if(obj){
									for(var i=0;i<H.followProp.num;i++){
										if(!H.followProp.alive[i]){
											H.followProp.alive[i] = true;
											H.followProp.x[i] = (H.users[n].x+H.users[n].distance-H.activeUser.distance)+50;
											H.followProp.y[i] = H.users[n].y;
											H.followProp.aim[i] = obj;
											break;
										}
									}
								}
							break;
						}
					}

				}
			}
		}
	}
}
// 人物和香蕉的碰撞检测
function userBananas(){
	for(var i=0;i<H.bananas.num;i++){
		if(H.bananas.alive[i]){
			for(var n=0;n<H.users.length;n++){
				var x = Math.abs(H.bananas.x[i]-(H.users[n].x+H.users[n].distance-H.activeUser.distance));
				var y = Math.abs(H.bananas.y[i]-H.users[n].y+30);
				if(x<100&&y<30){
					H.bananas.alive[i] = false;
					H.users[n].speedX = lerpDistance(0,H.users[n].speedX,0.1);
					H.users[n].angle = 30;
					if(H.users[n]==H.activeUser){M.banana.play();}
					break;
				}
			}

		}
	}
}
// 人物和增速带的碰撞
function userGearedUp(){
	for(var n=0;n<H.users.length;n++){
		var userX = H.users[n].x+H.users[n].distance-H.activeUser.distance;
		var userY = H.users[n].y;
		var upX =  H.gearedUp.x;
		if(userY>H.gearedUp.y-10&&userY<H.gearedUp.y+20&&userX-upX<250&&userX-upX>-30){
			H.users[n].coe = 2;
		}else{
			H.users[n].coe = 1;
		}

		if(upX-userX<500&&H.users[n].judge1){
			H.users[n].judge1 = false;
			if(Math.random()<0.9){
				H.users[n].Yaim = H.gearedUp.y;
			}
		}
	}

}
// 人物和减速带的碰撞
function userLetDown(){
	for(var n=0;n<H.users.length;n++){
		var userX = H.users[n].x+H.users[n].distance-H.activeUser.distance;
		var userY = H.users[n].y;
		var downX =  H.letDown.x,downY = H.letDown.y;
		var l1 = getLength(downX,H.gearedUp.x,downY,H.gearedUp.y);
		var l2 = getLength(downX,H.sand.x,downY,H.sand.y);
		if(l1<100){H.gearedUp.alive = false;}
		if(l2<100){H.sand.alive = false;}
		if(userY>downY-17&&userY<downY+25&&userX-downX<250&&userX-downX>-30){
			H.users[n].coe = 0.97;
		}

		if(downX-userX<500&&H.users[n].judge2&&userY>downY-17&&userY<downY+25){
			H.users[n].judge2 = false;
			H.users[n].Yaim = getOutNum(downY-17,downY+25);
		}
	}
}
// 人物和沙滩
function userSand(){
	for(var n=0;n<H.users.length;n++){
		var userX = H.users[n].x+H.users[n].distance-H.activeUser.distance;
		var userY = H.users[n].y;
		var sandX =  H.sand.x,sandY = H.sand.y;
		var l = getLength(sandX,H.gearedUp.x,sandY,H.gearedUp.y);
		if(l<100){
			H.gearedUp.alive = false;
		}
		var sandH = H.sand.img.height;
		var sandW = H.sand.img.width;
		if(userY>sandY-20&&userY<sandY+sandH-20&&userX>sandX&&userX<sandX+sandW){
			H.users[n].coe = 0.98;
		}

		if(sandX-userX<500&&H.users[n].judge3&&userY>sandY-20&&userY<sandY+sandH-20){
			H.users[n].judge3 = false;
			if(Math.random()<0.9){
				H.users[n].Yaim = getOutNum(sandY-20,sandY+sandH-20);
			}
		}
	}
}
// 玩家和玩家之间
function userAndUser(obj){
	var a=0,b=0;
	for(var i=0;i<H.users.length;i++){
		if(obj != H.users[i]){
			var x = Math.abs(H.users[i].distance-obj.distance);
			var y = Math.abs(H.users[i].y-obj.y);
			// console.log(x+':'+y)
			if(x<100&&y<15){/*追尾*/
				if(H.users[i].distance>obj.distance){
					H.users[i].speedX += obj.speedX; 
					obj.speedX = 0;
				}
			}
			if(x<100&&y>15&&y<30){/*并行*/
				if(H.users[i].y > obj.y){
					obj.yDownFlag = false;
					a++;
				}else{
					obj.yUpFlag = false;
					b++;
				}
			}
		}
	}
	if(!a){obj.yDownFlag = true;}
	if(!b){obj.yUpFlag = true;}
}

// 得到距离函数
function getLength(x1,x2,y1,y2) {
	return Math.pow(Math.pow(x1-x2,2)+Math.pow(y1-y2,2),0.5);
}
// lerp趋近
function lerpDistance(aim,cur,ratio) {
	var dalta = cur - aim;
	return aim+dalta*ratio;
}
// 获取区域外的Y值
function getOutNum(yUp,yDown){
	var num = Math.random()*174+318;
	if(num>yUp&&num<yDown){
		return getOutNum(yUp,yDown);
	}
	return num;
}
// 获取前一个对象
function getPrevObj(obj){
	var arr = [];
	for(var i=0;i<H.users.length;i++){
		arr.push(H.users[i]);
	}
	arr.sort(function(a,b){
		return a.distance-b.distance;
	})
	for(var i=0;i<arr.length;i++){
		if(arr[i]==obj){break;}
	}
	if(i==arr.length-1){return false}
	else{return arr[i+1]}
}
// 获取前一个炸弹对象
function getMissilePrevObj(){
	var arr = [];
	for(var i=0;i<H.users.length;i++){
		if(H.users[i].distance>H.activeUser.distance&&Math.abs(H.users[i].y-H.activeUser.y)<15){
			arr.push(H.users[i]);
		}
	}
	if(arr.length){
		arr.sort(function(a,b){
			return a.distance-b.distance;
		})
		return arr[0];
	}else{
		return false;
	}
}