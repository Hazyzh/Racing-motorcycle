// 车库场景
function game(id,bgImg){
	sceneBase.apply(this,arguments)
}
game.prototype = new sceneBase();
game.prototype.init = function(){
	this.initBase();
	// 游戏界面
	this.ele.css('background','none');
	// 游戏界面
	this.canvas = $('<canvas width="800" height="520"></canvas>');
	this.ele.append(this.canvas);
	// 获取绘图环境
	H.ctx =  this.canvas[0].getContext('2d');
	H.canWidth = this.canvas[0].width;
	H.canHeight = this.canvas[0].height;
/*	// 工作
	H.refresh();*/

	// 返回按钮
	this.pause = new Button(64,64,'Game/pause.png','Game/pause_2.png',this.ele,function(){
		H.pause();
	});
	this.pause.init();
	this.pause.ele.css({
		'position':'absolute',
		'right':'0px',
		'top':'0px'
	})
	var self = this;
	// function garageBackFun(){}
	this.pauseWindow = new WindowInfo(300,200,'Game/pausewindow.png',this.ele,this.pause.ele,true);
	this.pauseWindow.init();
	// again
	this.againBtn = new Button(168,64,'Game/again.png','Game/again_2.png',this.pauseWindow.ele,function(){
		H.refresh();
		self.pauseWindow.ele.hide();
	});
	this.againBtn.init();
	this.againBtn.setPosition(70,68);
	// back
	this.pauseBtn = new Button(168,64,'Game/backmenu.png','Game/backmenu_2.png',this.pauseWindow.ele,function(){
		M.game.pause();
		M.end.pause();
		M.theme.play();
		G.display(menuScene);
	});
	this.pauseBtn.init();
	this.pauseBtn.setPosition(70,125);
	// go on 
	this.workingBtn = new Button(168,64,'Game/continue.png','Game/continue_2.png',this.pauseWindow.ele,function(){
		H.working();
		self.pauseWindow.ele.hide();
	});
	this.workingBtn.init();		
	this.workingBtn.setPosition(70,10);

	// 游戏结束后btn
	this.restartBtn = new Button(64,64,'End/restart.png','End/restart_2.png',this.ele,function(){
		if(self.pauseWindow.ele.css('display')=='block')return;
		H.refresh();
	});
	this.restartBtn.init();
	this.restartBtn.ele.css({
		'position':'absolute',
		'right':'30px',
		'bottom':'30px'
	})

	this.continueBtn = new Button(64,64,'End/continue.png','End/continue_2.png',this.ele,function(){
		if(self.pauseWindow.ele.css('display')=='block')return;
		H.refresh();
	});
	this.continueBtn.init();
	this.continueBtn.ele.css({
		'position':'absolute',
		'right':'100px',
		'bottom':'30px'
	})
}
// 重写display方法；
game.prototype.display = function(){
	this.ele.show();
	H.refresh();
	G.closeBtn.ele.hide();
	G.audioBtn.ele.hide();
}