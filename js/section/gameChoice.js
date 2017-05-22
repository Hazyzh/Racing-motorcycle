function gameChoice(){
	sceneBase.apply(this,arguments);
}
gameChoice.prototype = new sceneBase();
gameChoice.prototype.init = function(){
	var self = this;
	this.initBase();
	// 场景选择层
	this.gameChoiceLayer = new gameChoiceLayer('gameChoiceLayer',this.ele);
	this.gameChoiceLayer.init();
	this.gameChoiceLayer.ele.click(function(){
		if(obj.index){self.simulateBtn.trigger('click');}else{G.display(trackChoiceScene);}
	})

	// 遮罩
	this.shadow = $('<div></div>').attr('class','shadow');
	this.ele.append(this.shadow);

 	// 左切换
	this.leftbtn = new Button(64,64,'button/left.png','button/left_2.png',this.ele,turnFun);
	this.leftbtn.init();
	this.leftbtn.ele.prop('aim','left');
	this.leftbtn.setPosition(100,235);
	// 右切换
	this.rightbtn = new Button(64,64,'button/right.png','button/right_2.png',this.ele,turnFun);
	this.rightbtn.init();
	this.rightbtn.setPosition(640,235);
	var obj = this.gameChoiceLayer;/*选择层*/
	function turnFun(){
		var i=1;
		var ele =obj.ele.find('div:not(.cue)'); 
		if(this.aim == 'left'){i=-1};/*判断方向*/
		obj.index = obj.index+i;
		if(obj.index==-1){ obj.index=0;return};
		if(obj.index==12){ obj.index=11;return};
		ele.animate({'left':-(obj.index*435)},1000);
	};

	// 返回按钮
	this.back = new Button(96,96,'button/back.png','button/back_2.png',this.ele,gameChoiceBackFun);
	this.back.init();
	this.back.ele.attr('class','backBtn');
	function gameChoiceBackFun(){G.display(menuScene);}
	// 继续按钮
	this.continueBtn = new Button(135,69,'button/next.png','button/next_2.png',this.ele,gameChoiceGoFun);
	this.continueBtn.init();
	this.continueBtn.ele.attr('class','continueBtn');
	function gameChoiceGoFun(){if(obj.index){self.simulateBtn.trigger('click');}else{G.display(trackChoiceScene);}}

	this.simulateBtn = $('<button></button>');
		// prompt弹窗1
	this.prompt = new WindowInfo(300,180,'Window/blockwindow1.png',this.ele,this.simulateBtn);
	this.prompt.init();
	this.prompt.ele.css('zIndex','5');
}
gameChoice.prototype.display = function(){
	var self = this;
	db.transaction(function(tx){
		tx.executeSql('select * from user where id = ?',[activeUser.id],function(a,b){
			activeUser = b.rows[0];
			$('#'+self.id).show();
		})
	})
}