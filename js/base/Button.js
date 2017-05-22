function Button(width,height,img1,img2,father,fun){
	this.width = width;
	this.height = height;
	this.img1 = img1;
	this.img2 = img2;
	this.fun = fun;
	this.father = father;
	this.ele;
}
Button.prototype.init = function(){
	var self = this;
	this.ele = $('<button></button>');
	this.ele.css({
		'width':this.width,
		'height':this.height,
		'background':'url(images/'+this.img1+')center center no-repeat',
		'backgroundSize':'100% 100%',
	})
	this.ele.on({
		 mousedown:function(){
		 	M.click.play();
		 	$(this).css('background','url(images/'+self.img2+')center center no-repeat');
		 	$(this).css('backgroundSize','100% 100%');
		 	$('body').one('mouseup',function(){
		  		self.ele.css('background','url(images/'+self.img1+')center center no-repeat');
		  		self.ele.css('backgroundSize','100% 100%');
		  	})
		 },
		 click:self.fun
	})
	this.ele.appendTo(this.father);
}
Button.prototype.setPosition = function(x,y){
	this.ele.css({
		'position':'absolute',
		'left':x,
		'top':y
	})
}