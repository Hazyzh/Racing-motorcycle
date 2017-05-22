function WindowInfo(w,h,img,father,Bindbtn,flag) {
	this.w = w;
	this.h = h;
	this.father = father;
	this.img = img;
	this.flag = flag;
	this.Bindbtn = Bindbtn;
	this.ele;
}
WindowInfo.prototype.init = function(){
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
	this.father.append(this.ele);
	// 判断是否加事件
	if(!this.flag){
		this.ele.on('click',function(){
			$(this).hide();
		})
	}
	// 绑定按钮加点击显示
	this.Bindbtn.click(function(){
		self.ele.parents('section').find('.WindowInfo').hide();
		self.ele.show();
	});

}