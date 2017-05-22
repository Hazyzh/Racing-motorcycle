function progressBar(father){
	this.father = father;
	this.ele;
}
progressBar.prototype.init = function(){
	this.ele = $('<div><div></div></div>');
	this.ele.attr('class','progressBar')
	this.father.append(this.ele);
}
progressBar.prototype.run = function(fun){
	this.ele.find('div').css('width','0%');
	this.ele.find('div').animate({
		'width':'100%'
	},6000,function(){
		fun();
	})
}