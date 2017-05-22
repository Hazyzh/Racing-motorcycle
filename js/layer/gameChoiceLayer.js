function gameChoiceLayer(id,scene) {
	layerBase.apply(this,arguments);
}
gameChoiceLayer.prototype = new layerBase();
gameChoiceLayer.prototype.init = function(){
	this.initBase();
	this.arr = new Array();
	this.index = 0;
	for(var i=0;i<12;i++){
		var img = $('<img>');
		img.attr('src','images/CheckPoint/checkpoint'+(i+1)+'.png');
		if(i!=0){img.css('opacity',0.5)};
		this.arr.push(img);
	}

	this.box = $('<div>').css('position','relative');
	for(var i=0;i<12;i++){
		this.box.append(this.arr[i]);
		var cue = $('<div></div>').attr('class','cue');
		cue.css({
			'left':169.5+i*435,
		})
		if(i){this.box.append(cue)};
	}
	this.ele.append(this.box);
}
