function trackChoice(){
	sceneBase.apply(this,arguments);
}
trackChoice.prototype = new sceneBase();
trackChoice.prototype.init = function(){
	var self = this;
	this.initBase();
	//选择层
	this.trackChoiceLayer = new trackChoiceLayer('trackChoiceLayer',this.ele);
	this.trackChoiceLayer.init();
	// 返回按钮
	this.back = new Button(98,87,'button/back_1.png','button/back_1_2.png',this.ele,gameChoiceBackFun);
	this.back.init();
	this.back.ele.attr('class','backBtn');
	function gameChoiceBackFun(){G.display(gameChoiceScene);}
	// 继续按钮
	this.continue = new Button(98,87,'button/go.png','button/go_2.png',this.ele,gameChoiceGoFun);
	this.continue.init();
	this.continue.ele.attr('class','continueBtn');
	function gameChoiceGoFun(){G.display(gameIntroduceScene);}

	this.simulateBtn = $('<button></button>');
		// prompt弹窗1
	this.prompt = new WindowInfo(300,180,'Window/blockwindow2.png',this.ele,this.simulateBtn);
	this.prompt.init();
	this.prompt.ele.css('zIndex','5');
}
trackChoice.prototype.display = function() {
	this.trackChoiceLayer.create();
	$('#'+this.id).show();
}