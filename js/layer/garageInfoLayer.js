function garageInfoLayer(id,scene) {
	layerBase.apply(this,arguments);
}
garageInfoLayer.prototype = new layerBase();
garageInfoLayer.prototype.init = function(){
	this.initBase();
	// 展示用户信息
	this.display();
}
garageInfoLayer.prototype.display = function(){
	this.ele.children().not('.displayBg').remove();
	// 展示用户形象
	this.userFigure = new createActiveUser(this.ele);
	this.userFigure.init();
	// 装备信息
	this.EquipmentInfo = new createEquipment(this.ele);
	this.EquipmentInfo.init();
	// 装备选择
	this.EquipmentChoose = new EquipmentChoose(this.ele);
	this.EquipmentChoose.init();
}
// 创建具体展示信息
function createEquipment(father){
	this.father = father;
	this.ele;
	this.init = function(){
		this.ele = $('<div></div>');
		this.ele.attr('class','EquipmentInfo');
		var bikers,motor,wheel;
		for(var i=0;i<goodsList.length;i++){
			if(goodsList[i].userImg == activeUser.headImg){bikers = goodsList[i].growth}
			if(goodsList[i].userImg == activeUser.carBodyImg){motor = goodsList[i].growth}
			if(goodsList[i].userImg == activeUser.carWheelImg){wheel = goodsList[i].growth}
		}
		var $p1 = $('<p>人物车技:<span>'+bikers+'</span></p>');
		var $p2 = $('<p>最高时速:<span>'+motor+'km/h</span></p>');
		var $p3 = $('<p>加速时间:<span>'+wheel+'s</span></p>');
		this.ele.append($p1,$p2,$p3);
		this.ele.appendTo(this.father);
	}	
}
// 装备选择块
function EquipmentChoose(father){
	this.father = father;
	this.ele;
	this.init = function(){
		this.ele = $('<div></div>');
		this.ele.attr('class','EquipmentChoose');
		// 第一栏
		this.choose1 = new chooseModule(this.ele,'bikers');
		this.choose1.init();
		// 第二栏
		this.choose2 = new chooseModule(this.ele,'motor');
		this.choose2.init();
		// 第三栏
		this.choose3 = new chooseModule(this.ele,'wheel');
		this.choose3.init();
		// 追加
		this.ele.appendTo(this.father);
	}
	function chooseModule(father,category){
		this.father = father;
		this.ele;
		this.index;
		this.arr = new Array();
		this.category = category;
		this.compareImg;
		this.init = function(){
			var self = this;
			switch(category){
	    		case 'bikers':this.compareImg = activeUser.headImg;break;
	    		case 'motor':this.compareImg = activeUser.carBodyImg;break;
	    		case 'wheel':this.compareImg = activeUser.carWheelImg;break;
	    	}

			this.ele = $('<div></div>');
			this.ele.attr('class','chooseModule');
			// 左切换
			this.leftbtn = new Button(64,64,'button/left.png','button/left_2.png',this.ele,Fun);
			this.leftbtn.init();
			this.leftbtn.ele.prop('aim','left');
			// 中间展示图
			var ownarr = activeUser.orderList.split(',');/*已购买商品列表*/
			var index=0;/*找下标*/
			for(var i=0;i<goodsList.length;i++){
				if(ownarr.indexOf(goodsList[i].id+'')!=-1&&goodsList[i].category == this.category){
					var img = $('<img>');
					img.attr('src',goodsList[i].showImg);
					img.css('display','none');
					if(goodsList[i].userImg == this.compareImg){
						this.index = index;
						img.css('display','inline-block');
					}
					this.ele.append(img);
					this.arr.push(goodsList[i]);
					index++;
				}
			}
			// 右切换
			this.rightbtn = new Button(64,64,'button/right.png','button/right_2.png',this.ele,Fun);
			this.rightbtn.init();
			function Fun(){
				var i=1;
				if(this.aim == 'left'){i=-1};/*判断方向*/
				var n = (self.index+i)%self.arr.length;
				if(n==-1){n=self.arr.length-1};
				switch(category){
		    		case 'bikers':activeUser.headImg = self.arr[n].userImg;break;
		    		case 'motor':activeUser.carBodyImg = self.arr[n].userImg;break;
		    		case 'wheel':activeUser.carWheelImg = self.arr[n].userImg;break;
	    		}
	    		garageScene.displayLayer.display();/*刷新本层*/
			}


			// 追加进去
			this.ele.appendTo(this.father);
		}
	}
}
