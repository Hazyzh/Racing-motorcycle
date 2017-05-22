// Global variable
var G;/*总导演*/
var loginScene,loading1Scene,menuScene,shopScene,garageScene,gameChoiceScene,trackChoiceScene,gameIntroduceScene,gameScene;/*各种场景*/
var activeUser,goodsList;/*当前用户*/
var H = new Object();/*canavs game*/
// -------------------------------------------
function Global(){
	this.allHide = function(){
		this.ele.find('section').hide();
	}
	this.ele = $('<article></article>');

	this.display = function(scene){
		this.allHide();
		$('.WindowInfo').hide();
		scene.display();
	}
}
Global.prototype.init = function(){
	this.ele.attr('id','main');
	$('body').append(this.ele);
	this.ele.css('position','relative')
	// login
	loginScene = new login('loginScene','images/bg/loginbg.png');
	loginScene.init();
	// register
	loading1Scene = new interfaceLoading('loading1Scene','images/bg/loadingbg.jpg');
	loading1Scene.init();

	// 关闭和音效
	this.closeBtn = new Button(50,50,'button/close.png','button/close_2.png',this.ele); 
	this.closeBtn.init();
	this.closeBtn.ele.css({
		'position':'absolute',
		'right':'10px',
		'top':'10px',
		'z-index':'9999'
	})

	this.audioBtn = new Button(50,50,'button/music.png','button/music_2.png',this.ele);
	this.audioBtn.init();
	// this.audioBtn.ele.off();
	this.audioBtn.ele.click(function(){
		if(M.theme.ele.volume){
			Marr.forEach(function(a){a.volume(0);})
			$(this).css('background','url(images/button/music_2.png)center center no-repeat')
		}else{
			Marr.forEach(function(a){a.volume(1);})
			$(this).css('background','url(images/button/music.png)center center no-repeat')
		}
	})
	this.audioBtn.ele.css({
		'position':'absolute',
		'right':'70px',
		'top':'10px',
		'border-radius':'50%',
		'box-shadow':'0px 0px 3px #000',
		'z-index':'9999'
	})
	// prompt弹窗3
	this.prompt = new WindowInfo3(400,240,'Window/closewindow.png',this.ele,this.closeBtn.ele,function(){
		G.ele.remove();
		G = new Global();
  		G.init();
		G.display(loginScene);
	});
	this.prompt.init();
	this.prompt.ele.css('z-index','9999')
}

$(document).ready(function() {
  	G = new Global();
  	G.init();
  	G.display(loginScene);
  	
});