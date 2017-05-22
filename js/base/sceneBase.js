function sceneBase(id,bgImg){
	this.id = id;
	this.bgImg = bgImg;
	this.ele;
}
sceneBase.prototype.initBase = function(){
	var section = $('<section></section>');
	this.ele = section;
	section.attr('id',this.id);
	section.css({
		'background':'url('+this.bgImg+')center center no-repeat',
		'backgroundSize':'100% 100%',
		'display':'none',
	});
	G.ele.append(this.ele);
}
sceneBase.prototype.display = function(){
	$('#'+this.id).show();

	G.closeBtn.ele.show()
	G.audioBtn.ele.show();
}