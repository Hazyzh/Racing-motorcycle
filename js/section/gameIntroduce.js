function gameIntroduce(){
	sceneBase.apply(this,arguments);
}
gameIntroduce.prototype = new sceneBase();
gameIntroduce.prototype.init = function(){
	this.initBase();
	// 游戏介绍层
	this.gameInfoLayer = new gameInfoLayer('gameInfoLayer',this.ele);
	this.gameInfoLayer.init();

	// 返回按钮
	this.back = new Button(98,87,'button/back_1.png','button/back_1_2.png',this.ele,function() {
		G.display(trackChoiceScene);
	});
	this.back.init();
	this.back.ele.attr('class','backBtn');
	// 继续按钮
	this.continue = new Button(98,87,'button/go.png','button/go_2.png',this.ele,function(){
		G.display(gameScene);
	});
	this.continue.init();
	this.continue.ele.attr('class','continueBtn');	
}
gameIntroduce.prototype.display = function() {
	$('#'+this.id).show();
	this.gameInfoLayer.propBtn1.ele.trigger('click');
}