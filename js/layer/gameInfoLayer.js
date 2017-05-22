function gameInfoLayer(id,scene){
	layerBase.apply(this,arguments);
}
gameInfoLayer.prototype = new layerBase();
gameInfoLayer.prototype.init = function(){
	var self = this;
	this.initBase();
	// 加背景

	// 信息展示框
	this.infoDisplayBox = new createInfoDisplayBox(this.ele);
	this.infoDisplayBox.init();

	function createInfoDisplayBox(father){
		this.father = father;
		this.ele;
		this.init = function(){
			this.ele = $('<div></div>');
			this.ele.css({
				'position':'absolute',
				'left':'0','top':'0','right':'0','bottom':'0',
				'margin':'auto',
				'width':'570',
				'height':'410',
				'border-radius':'30px',
				'background':'rgba(3,52,11,.56)'
			})

			this.propImg1 = new createImg('images/button/bananaInfoImg.png',135,30,this.ele);
			this.propImg1.init();

			this.propImg2 = new createImg('images/button/n2oInfoImg.png',135,30,this.ele);
			this.propImg2.init();

			this.propImg3 = new createImg('images/button/followImg.png',135,30,this.ele);
			this.propImg3.init();

			this.propImg4 = new createImg('images/button/missileInfoImg.png',135,30,this.ele);
			this.propImg4.init();						

			// 加图片
			function createImg(src,left,top,father){
				this.ele;
				this.father = father;
				this.src = src;
				this.left = left;
				this.top = top;
				this.init = function(){
					this.ele = $('<img>');
					this.ele.attr('src',this.src);
					this.ele.css({
						'position':'absolute',
						'left':this.left,
						'top':this.top,
						'display':'none'
					})
					this.ele.appendTo(this.father);
				}
			}

			// 追加
			this.father.append(this.ele);
		}
	}

	this.propBtn1 = new shopGoodsBtn(94,94,'button/bananaInfo_2.png','button/bananaInfo.png',this.ele,page);
	this.propBtn1.init();
	this.propBtn1.setPosition(60,46);
	this.propBtn1.ele.prop('index',1);

	this.propBtn2 = new shopGoodsBtn(94,94,'button/n2oInfo_2.png','button/n2oInfo.png',this.ele,page);
	this.propBtn2.init();
	this.propBtn2.setPosition(60,142);
	this.propBtn2.ele.prop('index',2);

	this.propBtn3 = new shopGoodsBtn(94,94,'button/follow_2.png','button/follow.png',this.ele,page);
	this.propBtn3.init();
	this.propBtn3.setPosition(60,238);
	this.propBtn3.ele.prop('index',3);

	this.propBtn4 = new shopGoodsBtn(94,94,'button/missileInfo_2.png','button/missileInfo.png',this.ele,page);
	this.propBtn4.init();
	this.propBtn4.setPosition(60,336);
	this.propBtn4.ele.prop('index',4);

	function page(){
		var num = this.index;
		self.infoDisplayBox.ele.find('img').each(function(a,b){
			if(num==a+1){$(b).show()}else{$(b).hide()};
		})
	}
}
