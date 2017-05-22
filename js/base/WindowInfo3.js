function WindowInfo3(w,h,img,father,Bindbtn,fun) {
	this.w = w;
	this.h = h;
	this.father = father;
	this.img = img;
	this.Bindbtn = Bindbtn;
	this.fun = fun;
	this.ele;
	this.price;
	this.fun;
}
WindowInfo3.prototype.init = function(){
	var self = this;
	// 样式
	this.ele = $('<div></div>');
	this.ele.attr('class','WindowInfo');
	this.ele.css({
		'width':this.w,
		'height':this.h,
		'background':'url(images/'+this.img+')center center no-repeat',
		'backgroundSize':'100% 100%',
		'display':'none',
	})

	// 加两个Btn
		// btn1
	this.cancelBtn = new Button(128,44,'button/windowcancel.png','button/windowcancel_2.png',this.ele,function(){
		self.ele.hide();
	});
	this.cancelBtn.init();
	this.cancelBtn.setPosition(50,160);
		// btn2
	this.affirmBtn = new Button(128,44,'button/windowensure.png','button/windowensure_2.png',this.ele,function(){
		self.fun()
	});
	this.affirmBtn.init();
	this.affirmBtn.setPosition(200,160);

	this.father.append(this.ele);
	// 绑定按钮加点击显示
	this.Bindbtn.click(function(){
		self.ele.parents('section').find('.WindowInfo').hide();
		self.ele.show();
	});
}