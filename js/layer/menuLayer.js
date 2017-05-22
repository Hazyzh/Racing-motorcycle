function menuLayer(id,scene) {
	layerBase.apply(this,arguments);
}
menuLayer.prototype = new layerBase();
menuLayer.prototype.init = function(){
	this.initBase();
	// 菜单按钮-单人模式
	this.playone = new Button(210,105,'Menu/playone.jpg','Menu/playone_2.jpg',this.ele,menuPlayoneFun);
	this.playone.init();
	// 菜单按钮-双人模式
	this.playtwo = new Button(210,105,'Menu/playtwo.jpg','Menu/playtwo_2.jpg',this.ele);
	this.playtwo.init();
		// prompt弹窗
	this.playtwo.prompt = new WindowInfo(400,240,'Window/unwindow.png',this.ele,this.playtwo.ele);
	this.playtwo.prompt.init();
	// 菜单按钮-商店按钮
	this.shop = new Button(210,105,'Menu/shop.jpg','Menu/shop_2.jpg',this.ele,menuShopFun);
	this.shop.init();
	// 菜单按钮-信息按钮
	this.about = new Button(210,105,'Menu/anenst.jpg','Menu/anenst_2.jpg',this.ele);
	this.about.init();
		// prompt弹窗
	this.about.prompt = new WindowInfo(400,240,'Window/unwindow.png',this.ele,this.about.ele);
	this.about.prompt.init();
}
// 单人模式
function menuPlayoneFun(){
	G.display(gameChoiceScene);
}
// 商店事件
function menuShopFun(){
	G.display(shopScene);
}