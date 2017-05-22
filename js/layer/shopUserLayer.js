function shopUserLayer(id,scene) {
	layerBase.apply(this,arguments);
}
shopUserLayer.prototype = new layerBase();
shopUserLayer.prototype.init = function(){
	this.initBase();
	// 展示信息
		// 添加用户展示背景
	this.displayBg = $('<div><img src="images/bg/dispalyBg.jpg"></div>').attr('class','displayBg');
	this.ele.append(this.displayBg);
	// 展示用户信息
	this.display();
}
shopUserLayer.prototype.display = function(){
	this.ele.children().not('.displayBg').remove();
	// 展示用户信息
	this.userInfo = new createActiveUserInfo(this.ele);
	this.userInfo.init();
	// 展示用户形象
	this.userFigure = new createActiveUser(this.ele);
	this.userFigure.init();
}
// 创建用户信息
function createActiveUserInfo(father){
	this.father = father;
	this.init = function(){
		// console.log(activeUser.gold)
		// 姓名
		var p = $('<p></p>');
		p.attr('class','userName');
		p.text(activeUser.userName);
		p.appendTo(this.father);
		// 金币
		var p = $('<p></p>');
		p.attr('class','usergold');
		p.text(activeUser.gold);
		p.appendTo(this.father);
	}
}
// 创建用户展示图
function createActiveUser(father){
	this.ele;
	this.father = father;
}
createActiveUser.prototype.init = function(){
	// 创建人物
	this.ele = $('<div></div>');
	this.ele.attr('class','userFigure')
	this.ele.append($('<div></div>').css({
			'width':'78px','height':'121px',
			'background':'url('+activeUser.headImg+')center center no-repeat',
			'position':'absolute','zIndex':'3','top':'0px','left':'30px',
		})).append(
			$('<div></div>').css({
				'width':'128px','height':'64px',
				'background':'url('+activeUser.carBodyImg+')center center no-repeat',
				'position':'absolute','top':'60px','left':'0px','zIndex':'2'
		})).append(
			$('<div></div>').css({
				'width':'49px','height':'49px',
				'background':'url('+activeUser.carWheelImg+')center center no-repeat',
				'position':'absolute','top':'90px','left':'-10px',
				'animation':'carWheelAnm 2s linear infinite','zIndex':'2',	
		})).append(
			$('<div></div>').css({
				'width':'49px','height':'49px',
				'background':'url('+activeUser.carWheelImg+')center center no-repeat',
				'position':'absolute','top':'90px','left':'90px',
				'animation':'carWheelAnm 2s linear infinite','zIndex':'2',
		}));
	this.ele.appendTo(this.father);
}
