// 商店场景
function shop(id,bgImg){
	sceneBase.apply(this,arguments)
}
shop.prototype = new sceneBase();
shop.prototype.init = function(){
	this.initBase();
	// 用户信息展示层
	this.shopUserLayer = new shopUserLayer('shopUserLayer',this.ele);
	this.shopUserLayer.init();
	// 商品展示层
	this.shopGoodsLayer = new shopGoodsLayer('shopGoodsLayer',this.ele);
	this.shopGoodsLayer.init();
	// 三个功能按钮
		// 我的仓库
	this.carPort = new Button(128,44,'button/garage.png','button/garage_2.png',this.ele,shopCarPortFun);
	this.carPort.init();
	this.carPort.ele.attr('class','carPortBtn');
		// 充值
	this.recharge = new Button(128,44,'button/chongzhi.png','button/chongzhi_2.png',this.ele,null);
	this.recharge.init();
	this.recharge.ele.attr('class','rechargeBtn');
			// prompt弹窗
	this.recharge.prompt = new WindowInfo(400,240,'Window/unwindow.png',this.ele,this.recharge.ele);
	this.recharge.prompt.init();
		// 返回按钮
	this.back = new Button(98,87,'button/back_1.png','button/back_1_2.png',this.ele,shopBackFun);
	this.back.init();
	this.back.ele.attr('class','backBtn');
	// 滚动条
	this.marquee = $('<marquee>尊敬的'+activeUser.userName+',欢迎来到游戏商城！祝您购物愉快！</marquee>')
	this.marquee.appendTo(this.ele);
}
shop.prototype.display = function(){
	var self = this;
	db.transaction(function(tx){
		tx.executeSql('select * from user where id = ?',[activeUser.id],function(a,b){
			activeUser = b.rows[0];
			$('#bikerBtn').trigger('click');
			shopScene.shopUserLayer.display();
			$('#'+self.id).show();
		})
	})
}
// 我的仓库
function shopCarPortFun(){
	G.display(garageScene);
}
// 返回
function shopBackFun(){
	G.display(menuScene);
}