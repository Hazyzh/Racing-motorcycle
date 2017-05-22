function interfaceLoading(){
	sceneBase.apply(this,arguments);
}
interfaceLoading.prototype = new sceneBase();
interfaceLoading.prototype.init = function(){
	this.initBase();
	// 进度条
	this.progressBar = new progressBar(this.ele);
	this.progressBar.init();
}
// 重写display方法；
interfaceLoading.prototype.display = function(){
	this.ele.show();
	this.progressBar.run(function(){G.display(menuScene)});
}