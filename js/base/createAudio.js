var M = new Object();
var Marr = new Array();/*音乐*/

function creatAudio(src) {
	this.ele;
	this.src = src;
}
creatAudio.prototype.init = function(){
	this.ele = new Audio();
	this.ele.src = 'Music/'+this.src;
	Marr.push(this);
}
creatAudio.prototype.play = function(){
	this.ele.play();
}
creatAudio.prototype.pause = function(){
	this.ele.pause();
}
creatAudio.prototype.time = function(a){
	this.ele.currentTime = a;
}
creatAudio.prototype.volume = function(a){
	if(a&&this.ele.default){
		this.ele.volume = this.ele.default;
	}else{
		this.ele.volume = a;
	}
	
}
// 直接建
M.click = new creatAudio('click.ogg');
M.click.init();
// 游戏背景
M.theme = new creatAudio('Theme.mp3');
M.theme.init();
M.theme.ele.autoplay = true;
M.theme.ele.loop = true;
M.theme.ele.volume = 0.6;
M.theme.ele.default = 0.6;
// 收集金币
M.CoinCollect = new creatAudio('CoinCollect.ogg');
M.CoinCollect.init();
// 香蕉
M.banana = new creatAudio('jiasu.mp3');
M.banana.init();
// 开始游戏
M.counts = new creatAudio('go.mp3');
M.counts.init();
// 游戏背景音乐
M.game = new creatAudio('game.mp3');
M.game.init();
M.game.ele.loop = true;
M.game.ele.volume = 0.3;
M.game.ele.default = 0.3;
// 结束音效
M.end = new creatAudio('end.mp3');
M.end.init();
M.end.ele.loop = true;
M.end.ele.volume = 0.6;
M.end.ele.default = 0.6;
// 吃道具音效
M.prop = new creatAudio('propBox.mp3');
M.prop.init();
// 苍蝇
M.follow = new creatAudio('follow.mp3');
M.follow.init(); 
// 导弹开始
M.missileBegin = new creatAudio('missileBegin.mp3');
M.missileBegin.init();
// 导弹结束
M.missileEnd = new creatAudio('missileEnd.mp3');
M.missileEnd.init();
// n2o
M.n2o = new creatAudio('n2o.mp3');
M.n2o.init();