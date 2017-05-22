function shopGoodsLayer(id,scene) {
	layerBase.apply(this,arguments);
}
shopGoodsLayer.prototype = new layerBase();
shopGoodsLayer.prototype.init = function(){
	this.initBase();
	// 按钮
		// 人物按钮
	this.bikerBtn = new shopGoodsBtn(64,64,'shop/item4.png','shop/item1.png',this.ele,shopGoodsBtnFun);
	this.bikerBtn.init();
	this.bikerBtn.ele.attr('id','bikerBtn');
	this.bikerBtn.ele.prop('category','bikers');
	this.bikerBtn.setPosition(10,50);
		// 摩托按钮
	this.motorBtn = new shopGoodsBtn(64,64,'shop/item5.png','shop/item2.png',this.ele,shopGoodsBtnFun);
	this.motorBtn.init();
	this.motorBtn.ele.prop('category','motor');
	this.motorBtn.setPosition(10,160);
		// 轮子按钮
	this.wheelBtn = new shopGoodsBtn(64,64,'shop/item6.png','shop/item3.png',this.ele,shopGoodsBtnFun);
	this.wheelBtn.init();
	this.wheelBtn.ele.prop('category','wheel');
	this.wheelBtn.setPosition(10,270);
		//商品展示层 
	this.shopGoodsShow = new layerBase('shopGoodsShow',this.ele);
	this.shopGoodsShow.initBase();
	// 翻页
	this.shopGoodsPagesBox = new layerBase('shopGoodsPagesBox',this.ele);
	this.shopGoodsPagesBox.initBase();
		//	翻页里面加内容
		this.shopGoodsPagesBox.prve = new Button(45,20,'shop/pre.png','shop/pre_2.png',this.shopGoodsPagesBox.ele,prveFun);
		this.shopGoodsPagesBox.prve.init();
		$('<input></input>')
			.attr({'type':'text','value':'1','readonly':'readonly'})
			.css({'width':'23','height':'14','vertical-align':'top','border':'3px groove #fff',
				'background':'none','text-align':'center','color':'#fff','margin':'0px 5px'})
			.appendTo(this.shopGoodsPagesBox.ele)
		this.shopGoodsPagesBox.next = new Button(45,20,'shop/nextpage.png','shop/nextpage_2.png',this.shopGoodsPagesBox.ele,nextFun);
		this.shopGoodsPagesBox.next.init();
		function prveFun(){
			var input = $(this).siblings('input');
			var PagesBox = $('#shopGoodsPagesBox')[0];
			if(input.val()!=1){
				input.attr('value',function(a,b){return b*1-1;});
				createGoodsAllFun(PagesBox.category,(input.val()*1-1)*6);
			}
		};
		function nextFun(){
			var input = $(this).siblings('input');
			var PagesBox = $('#shopGoodsPagesBox')[0];
			if(input.val()!=PagesBox.pageNum){
				input.attr('value',function(a,b){return b*1+1;});
				createGoodsAllFun(PagesBox.category,(input.val()*1-1)*6);
			}
		};
	this.simulateBtn = $('<button></button>');
	this.simulateBtn2 = $('<button></button>');
	this.simulateBtn3 = $('<button></button>');
	this.simulateBtn4 = $('<button></button>');
		// prompt弹窗1
	this.prompt = new WindowInfo(300,180,'Window/buyedwindow.png',this.ele,this.simulateBtn);
	this.prompt.init();
		// prompt弹窗2
	this.prompt2 = new WindowInfo(300,180,'Window/nomoneywindow.png',this.ele,this.simulateBtn2);
	this.prompt2.init();
		// prompt弹窗3
	this.prompt3 = new WindowInfo2(400,240,'Window/buywindow.png',this.ele,this.simulateBtn3);
	this.prompt3.init();
		// prompt弹窗4
	this.prompt4 = new WindowInfo(300,180,'Window/buySucceed.png',this.ele,this.simulateBtn4);
	this.prompt4.init();
}
// 新的button样式
function shopGoodsBtn(width,height,img1,img2,father,fun){
	Button.apply(this,arguments);
}
shopGoodsBtn.prototype.init = function(){
	var self = this;
	this.ele = $('<button></button>');
	this.ele.css({
		'width':this.width,
		'height':this.height,
		'background':'url(images/'+this.img1+')center center no-repeat',
	})
	this.ele[0].img = this.img1;
	this.ele.on('click',function(){
		$(this).siblings('button').each(function(){
			$(this).css('background','url(images/'+this.img+')center center no-repeat')
		})
		$(this).css('background','url(images/'+self.img2+')center center no-repeat');
	});
	this.ele.on('click',this.fun);
	this.ele.appendTo(this.father);
}
shopGoodsBtn.prototype.setPosition = function(left,top){
	this.ele.css({
		'position':'absolute',
		'left':left,
		'top':top,
	})
}
// 人物按钮事件
function shopGoodsBtnFun(){
	var num=0;
	for(var i=0;i<goodsList.length;i++){
		if(goodsList[i].category == this.category){num++}
	}
	$('#shopGoodsPagesBox')[0].pageNum = Math.ceil(num/6);
	$('#shopGoodsPagesBox')[0].category = this.category;
	$('#shopGoodsPagesBox').find('input').attr('value',1);
	createGoodsAllFun(this.category,0);
}
// 创建商品
function createGoodsAllFun(category,starNum){
	$('#shopGoodsShow').empty();
	// 挑选商品
	var counts=0;
	// console.log(goodsList);
	for(var i=0;i<goodsList.length;i++){
		if(goodsList[i].category == category){
			counts++;
			if(starNum<counts){
				createGoodOne(goodsList[i],category);
			}
			if(starNum+5<counts)break;

		}
	}
}
// 创建一个商品
function createGoodOne(obj,category){
	var userListArr = activeUser.orderList.split(',');
	var text = '金币:'+obj.price;
	for(var i=0;i<userListArr.length;i++){
		if(obj.id == userListArr[i]){
			text = '已购买';
		}
	}
	var $newContent = $('<div class="goods-one">\
								<div class="display-img"><img src="'+obj.showImg+'"><img src="'+obj.infoImg+'" class="infoImg"></div>\
								<div class="price"><p>'+text+'</p></div>\
							</div>');
	var previewBtn = new Button(48,22,'button/preview.png','button/preview_2.png',$newContent,previewFun);
	previewBtn.init();
	var buyBtn = new Button(64,22,'button/buy.png','button/buy.png',$newContent,function(){
		// shopScene.shopGoodsLayer.simulateBtn3.trigger('click',[buyFun]);
		buyFun();
	});
	buyBtn.init();
    $('#shopGoodsShow').append($newContent);
    function previewFun(){
    	switch(category){
    		case 'bikers':activeUser.headImg = obj.userImg;break;
    		case 'motor':activeUser.carBodyImg = obj.userImg;break;
    		case 'wheel':activeUser.carWheelImg = obj.userImg;break;
    	}
    	shopScene.shopUserLayer.display();
    }
    function buyFun(){
    	if($newContent.find('.price').find('p').text() == '已购买'){
    		// console.log(shopScene.shopGoodsLayer.simulateBtn)
    		shopScene.shopGoodsLayer.simulateBtn.trigger('click');
    		return;}
    	if(activeUser.gold>=obj.price){
    		shopScene.shopGoodsLayer.simulateBtn3.trigger('click',[obj.price,buyFunInner]);
    	}else{
    		shopScene.shopGoodsLayer.simulateBtn2.trigger('click');
    	}
    	function buyFunInner(){
    		// 减钱
    		activeUser.gold -= obj.price;
    		// 换装备
    		var tableC;
			switch(category){
				case 'bikers':activeUser.headImg = obj.userImg;tableC='headImg';break;
				case 'motor':activeUser.carBodyImg = obj.userImg;tableC='carBodyImg';break;
				case 'wheel':activeUser.carWheelImg = obj.userImg;tableC='carWheelImg';break;
			}
    		// 加购物清单
    		activeUser.orderList += ','+obj.id;
    		// 添加到数据库
			db.transaction(function(tx){
				tx.executeSql('update user set orderList = ?,gold = ?,'+tableC+'=? where id = ?',
					[activeUser.orderList,activeUser.gold,obj.userImg,activeUser.id],function(a,b){
						shopScene.shopGoodsLayer.simulateBtn4.trigger('click');
						$newContent.find('.price').find('p').text('已购买');
						shopScene.shopUserLayer.display();
					},function(a,b){console.log(b)}
				);
			})
    	}
    }

    $newContent.find('.display-img').on('mousemove',function(e){
    	$(this).find('.infoImg').show();
    	var x = e.offsetX-e.offsetX/127*70;
    	var y = e.offsetY>44?e.offsetY-52:e.offsetY+2;
    	$(this).find('.infoImg').css({
    		'top':y,
    		'left':x,
    	})
    })
    $newContent.find('.display-img').on('mouseout',function(){
    	$(this).find('.infoImg').hide();
    })
}
