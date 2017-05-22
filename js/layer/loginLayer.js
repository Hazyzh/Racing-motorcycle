function loginLayer(id,scene) {
	layerBase.apply(this,arguments);
}
loginLayer.prototype = new layerBase();
loginLayer.prototype.init = function(){
	this.initBase();
	// form
	this.from = new loginFromCreate(this.ele);
	this.from.init();
}


// 本身层自带杂乱类
// from
function loginFromCreate(father){
	this.father = father;
	this.ele;
	this.init = function(){
		this.ele = $('<from></from>');
		this.table = new loginTableCreate(this.ele);
		this.table.init();

		this.ele.appendTo(this.father);
	}
}
// table
function loginTableCreate(father){
	this.father = father;
	this.ele;
	this.init = function(){
		this.ele = $('<table></table>');
		this.ele.append('<caption>登录界面</caption>')
		// 第一行
		this.tr1 = new loginTrCreate(this.ele);
		this.tr1.init();
		this.tr1.ele.find('td:first').text('账号:');
		var input = new EditBox('loginId',this.tr1.ele.find('td:last'));
		input.init();
		input.ele.attr('placeholder','账号密码都是a');
		// 第二行
		this.tr2 = new loginTrCreate(this.ele);
		this.tr2.init();
		this.tr2.ele.find('td:first').text('密码:');
		var input = new EditBox('loginPassword',this.tr2.ele.find('td:last'));
		input.init();
		input.ele.attr('type','password');
		// 第三行
		this.tr3 = new loginTrCreate(this.ele);
		this.tr3.init();
		var button = new Button(168,64,'button/login.png','button/login_2.png',this.tr3.ele.find('td:first')
								,LloginBtnFun);
		button.init();
		var button = new Button(168,64,'button/register.png','button/register_2.png',this.tr3.ele.find('td:last')
								,LregisterBtnFun);
		button.init();

		this.ele.appendTo(this.father);
	}
}
// tr
function loginTrCreate(father){
	this.father = father;
	this.ele;
	this.init = function(){
		this.ele = $('<tr></tr>');
		this.child = $('<td></td><td></td>');
		this.ele.append(this.child);
		this.ele.appendTo(this.father);
	}
}
// 登录按钮事件
function LloginBtnFun(){
	db.transaction(function(tx){
		tx.executeSql('select * from user',[],function(a,b){
			var user = b.rows;
			for(var i=0;i<user.length;i++){
				if($('#loginId').val()==user[i].name){	
					if($('#loginPassword').val()==user[i].password){
						// alert('succeed');
						// 激活当前用户
						activeUser = b.rows[i];
						console.log(activeUser);
						// 激活商品列表
						// goodsList
						tx.executeSql('select * from goods',[],function(a,b){
							goodsList = b.rows;
							// 加载菜单场景
								// menu
								menuScene = new menu('menuScene','images/bg/menubg.jpg');
								menuScene.init();
								// shop
								shopScene = new shop('shopScene','images/bg/shop.png');
								shopScene.init();
								// garage
								garageScene = new garage('garageScene','images/bg/garagebg.png');
								garageScene.init();
								// gameChoiceScene
								gameChoiceScene = new gameChoice('gameChoiceScene','images/bg/checkpointbg_1.png');
								gameChoiceScene.init();
								// trackChoiceScene
								trackChoiceScene = new trackChoice('trackChoiceScene','images/bg/trackbg.png');
								trackChoiceScene.init();
								// gameIntroduceScene
								gameIntroduceScene = new gameIntroduce('gameIntroduceScene','images/bg/gameIntroduce.png');
								gameIntroduceScene.init();
								// gameScene
								gameScene = new game('gameScene');
								gameScene.init();

								// G.display(gameIntroduceScene);
						})

						// 展示下一场景
						G.display(loading1Scene);
						// G.display(shopScene);
						return;
					}else{
						loginScene.simulateBtn2.trigger('click');
						return;
					}
				}
			}
			loginScene.simulateBtn.trigger('click');
		})
	})
}
// 注册按钮事件
function LregisterBtnFun(){
	// 测试使用
	db.transaction(function(tx){
		
	})
	loginScene.login.ele.hide();
	loginScene.register.ele.show();
}