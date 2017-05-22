// 登录场景
function menu(id,bgImg){
	sceneBase.apply(this,arguments)
}
menu.prototype = new sceneBase();
menu.prototype.init = function(){
	this.initBase();
	// 菜单按钮层
	this.menuLayer = new menuLayer('menuLayer',this.ele);
	this.menuLayer.init();
}
menu.prototype.display = function(){
	$('#'+this.id).show();
	G.closeBtn.ele.show();
	G.audioBtn.ele.show();
}