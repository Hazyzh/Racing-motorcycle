(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());/*浏览器requestAnimationFrame兼容*/

H.lastTime = Date.now();H.delayTime = 0; /*计算动画间隔时间*/
H.backgroundImg = new Image();
H.keyState;
H.gameControl;
H.users = new Array(); /*全部参赛选手*/

// 重新开始
H.refresh = function(){
	window.cancelAnimationFrame(H.gameControl);
	gameInit();
	gameloop();
	M.game.pause();
	M.end.pause();
	gameScene.continueBtn.ele.hide();
	gameScene.restartBtn.ele.hide();
}
// 工作状态
H.working = function(){
	window.cancelAnimationFrame(H.gameControl);
	if(M.counts.ele.currentTime != M.counts.ele.duration){
		M.counts.play();
	}
	gameloop();
}
// 暂停状态
H.pause = function(){
	M.counts.pause();
	window.cancelAnimationFrame(H.gameControl);
}
// 初始化
function gameInit(){
	H.users.length = 0;
	// 背景图
	H.background = new drawBackground();
	H.background.init();
		// 当前商品的属性
		for(var i=0;i<goodsList.length;i++){
			if(goodsList[i].userImg == activeUser.headImg){
				var speedY = goodsList[i].growth;
			}else if(goodsList[i].userImg == activeUser.carBodyImg){
				var maxSpeed = goodsList[i].growth;
			}else if(goodsList[i].userImg == activeUser.carWheelImg){
				var speedXgrowth = goodsList[i].growth;
			}
		}
	// 人物
	H.activeUser = new drawUserBase(activeUser.headImg,activeUser.carBodyImg,activeUser.carWheelImg,maxSpeed/2,(20-speedXgrowth),speedY);
	H.activeUser.initBase();
	H.users.push(H.activeUser);
	// 人物控制
	H.keyState = new keyManager();
	removeKeyFun();
	// 金币
	H.golds = new drawGolds();
	H.golds.init();
	// 香蕉
	H.bananas = new drawBananas();
	H.bananas.init();
	// 道具箱
	H.propbox = new drawPropBox();
	H.propbox.init();
	// follow
	H.followProp = new drawFollow();
	H.followProp.init();
	// missile
	H.missileProp = new drawMissile();
	H.missileProp.init();

	// 数据控制
	H.data = new drawData();
	H.data.init();
	// 增速带
	H.gearedUp = new drawGearedUp();
	H.gearedUp.init();
	// 减速带
	H.letDown = new drawLetDown();
	H.letDown.init();
	// 沙滩
	H.sand = new drawSand();
	H.sand.init();
	// AI
		H.userone1 = new otherUser(goodsList[1].userImg,goodsList[8].userImg,goodsList[12].userImg,85,12,53,340,280);
		H.userone1.initBase();
		H.userone2 = new otherUser(goodsList[4].userImg,goodsList[10].userImg,goodsList[13].userImg,86,11,51,440,320);
		H.userone2.initBase();
		H.userone3 = new otherUser(goodsList[7].userImg,goodsList[11].userImg,goodsList[14].userImg,88,10,52,490,350);
		H.userone3.initBase();
		H.users.push(H.userone1,H.userone2,H.userone3);
}
// 游戏循环
function gameloop(){
	var nowTime = Date.now();
	H.delayTime = nowTime - H.lastTime;
	if(H.delayTime>50){H.delayTime=50};
	H.lastTime = nowTime;
	
	// H.ctx.clearRect(0,0,H.canWidth,H.canHeight);/*清空画布有白线 未解决*/
	// 画背景
	H.background.draw(H.ctx);
	// 画增速带
	H.gearedUp.draw(H.ctx);
	// 画减速带
	H.letDown.draw(H.ctx);
	// 画沙滩
	H.sand.draw(H.ctx);
	// 画金币
	H.golds.draw(H.ctx);
	// 画香蕉
	H.bananas.draw(H.ctx);
	// 画道具盒子
	H.propbox.draw(H.ctx);
	// 画苍蝇
	H.followProp.draw(H.ctx);
	// 画导弹
	H.missileProp.draw(H.ctx);
	// 画人物
	H.users.sort(function(a,b){
		return a.y-b.y;
	})
	for(var i=0;i<H.users.length;i++){
		H.users[i].draw(H.ctx);
	}
	// 画数据
	H.data.draw(H.ctx);
	
	// 碰撞检测
		// 人物与金币
	userGolds();
		// 人物与香蕉
	userBananas();
		// 人物与增速带
	userGearedUp();
		// 人物与减速带
	userLetDown();
		//人物与沙滩
	userSand(); 
		// 人物与道具盒子
	userPropBox();
		// 人物与人物
		for(var i=0;i<H.users.length;i++){
			userAndUser(H.users[i]);/*人物与人物碰撞*/
		}
	// 循环
	H.gameControl = requestAnimationFrame(gameloop);
}
