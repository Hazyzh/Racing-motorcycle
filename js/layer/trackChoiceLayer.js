function trackChoiceLayer(id,scene){
	layerBase.apply(this,arguments);
}
trackChoiceLayer.prototype = new layerBase();
trackChoiceLayer.prototype.init = function(){
	this.initBase();
	// 加背景
	this.trackSrc = 'images/Track/track1.png';
	this.lockSrc = 'images/Track/lock.png';
	this.create();
}
trackChoiceLayer.prototype.create = function() {
	this.ele.empty();
	for(var i=0;i<9;i++){
		if(2<i&&i<6){p=67}else{p=0};/*X轴偏移*/
		var x = 179*(i%3)+p+144;
		var y = i>5?312:i<3?67:189;
		var $div = $('<div></div>').css({
			'width':'96px',
			'height':'96px',
			'background':'url('+this.trackSrc+')',
			'backgroundPositionX':-i*96,/*选择背景图*/
			'position':'absolute',
			'top':y,
			'left':x,
		}).prop('trackIndex',i+1);
		if(i>=activeUser.checkpoint){
			var $lock = $('<div></div>');
			$lock.css({
			'width':'100%',
			'height':'100%',
			'background':'url('+this.lockSrc+')center center no-repeat',
			})
			$div.css('opacity',0.8);
			$div.append($lock);
			$div.on('click',function(){trackChoiceScene.simulateBtn.trigger('click');})
		}else{
			$div.on('click',function(){
				activeUser.trackIndex = this.trackIndex;
				G.display(gameIntroduceScene);
			})
		}
		this.ele.append($div);
	}
}
