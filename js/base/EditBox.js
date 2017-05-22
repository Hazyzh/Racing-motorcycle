function EditBox(id,father,name) {
	this.id = id;
	this.father = father;
	this.name = name;
	this.ele;
}
EditBox.prototype.init = function(){
	this.ele = $('<input></input>');
	this.ele.attr({
		'id':this.id,
		'name':this.name,
		'type':'text'
	});
	this.ele.appendTo(this.father);
}