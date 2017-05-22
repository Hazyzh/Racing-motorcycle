function layerBase(id,scene) {
	this.id = id;
	this.father = scene;
	this.ele;
}
layerBase.prototype.initBase = function(){
	var div = $('<div></div>');
	this.ele = div;
	div.attr('id',this.id);
	this.father.append(this.ele);
}