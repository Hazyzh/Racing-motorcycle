// 车库场景
function garage(id,bgImg){
	sceneBase.apply(this,arguments)
}
garage.prototype = new sceneBase();
garage.prototype.init = function(){
	this.initBase();
	// 展示层
	this.displayLayer = new garageInfoLayer('garageInfoLayer',this.ele);
	this.displayLayer.init();

		// 保存按钮
	this.save = new Button(107,48,'Garage/save.png','Garage/save_2.png',this.ele,garageSaveFun);
	this.save.init();
	this.save.ele.attr('class','saveBtn'); 

	var self = this;
	function garageSaveFun(){
		// 添加到数据库
		db.transaction(function(tx){
			tx.executeSql('update user set headImg = ?,carBodyImg = ?,carWheelImg = ? where id = ?',
				[activeUser.headImg,activeUser.carBodyImg,activeUser.carWheelImg,activeUser.id],function(a,b){
					self.simulateBtn.trigger('click');
				},function(a,b){console.log(b)}
			);
		})
	}
		// 返回按钮
	this.back = new Button(107,48,'Garage/backshop.png','Garage/backshop_2.png',this.ele,garageBackFun);
	this.back.init();
	this.back.ele.attr('class','backBtn');
	function garageBackFun(){G.display(shopScene);}

	this.simulateBtn = $('<button></button>');
		// prompt弹窗1
	this.prompt = new WindowInfo(300,180,'Window/saveSucceed.png',this.ele,this.simulateBtn);
	this.prompt.init();
	this.prompt.ele.css('zIndex','5');
}
garage.prototype.display = function(){
	var self = this;
	db.transaction(function(tx){
		tx.executeSql('select * from user where id = ?',[activeUser.id],function(a,b){
			activeUser = b.rows[0];
			self.displayLayer.display();/*更新形象*/
			$('#'+self.id).show();
		})
	})
}