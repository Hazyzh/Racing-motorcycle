// 登录场景
function login(id,bgImg){
	sceneBase.apply(this,arguments);
}
login.prototype = new sceneBase();
login.prototype.init = function(){
	this.initBase();
	// 登陆层
	this.login = new loginLayer('loginLayer',this.ele);
	this.login.init();
	// 注册层
	this.register = new registerLayer('registerLayer',this.ele);
	this.register.init();
	this.register.ele.css('display','none');
	// 注册层验证
	
	this.simulateBtn = $('<button></button>');
	this.simulateBtn2 = $('<button></button>');
	this.simulateBtn3 = $('<button></button>');
	this.simulateBtn4 = $('<button></button>');

		// prompt弹窗1
	this.prompt = new WindowInfo(300,180,'Window/idError.png',this.ele,this.simulateBtn);
	this.prompt.init();
		// prompt弹窗2
	this.prompt2 = new WindowInfo(300,180,'Window/psError.png',this.ele,this.simulateBtn2);
	this.prompt2.init();
		// prompt弹窗3
	this.prompt3 = new WindowInfo(300,180,'Window/registSucceed.png',this.ele,this.simulateBtn3);
	this.prompt3.init();
		// prompt弹窗3
	this.prompt4 = new WindowInfo(300,180,'Window/registInfo.png',this.ele,this.simulateBtn4);
	this.prompt4.init();
}
login.prototype.display = function(){
	$('#'+this.id).show();
	$('#loginId').val('');
	$('#loginPassword').val('');
	G.closeBtn.ele.hide();
}

