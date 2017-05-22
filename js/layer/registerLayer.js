function registerLayer(id,scene) {
	layerBase.apply(this,arguments);
}
registerLayer.prototype = new layerBase();
registerLayer.prototype.init = function(){
	this.initBase();
	// form
	this.form = new registerFormCreate(this.ele);
	this.form.init();
	// 表单验证
	$('#'+this.id+' form').validate({
	    rules:{
	        userName:{
	            required:true,
	            minlength:5
	        },
	        password:{
	            required:true,
	            rangelength:[2,5]
	        },
	        surePassword:{
	        	required:true,
	            equalTo:"#registerPassword"
	        }
	    },
	    messages:{
	        userName:{
	            required:"必填",
	            minlength:"至少{0}个字符"
	        },
	        password:{
	            required:"必填",
	            rangelength:"至少{0}到{1}个字符"
	        },
	        surePassword:{
	        	required:"必填",
	        	equalTo:"密码不一致"
	        }
	    },
	     submitHandler: function(){
	        db.transaction(function(tx) {
	            tx.executeSql('select * from user where user.name = ?',[$('#registerId').val()],function(a,resoult){
	                if(resoult.rows.length){
	                    loginScene.simulateBtn4.trigger('click');
	                    return false;
	                }else{
	                   // 注册事件
	                    tx.executeSql('insert into user(name,password,userName) values (?,?,?)',[$('#registerId').val(),$('#registerPassword').val(),$('#registerId').val()]);
	                    $('#registerId').val('');
	                    $('#registerPassword').val('');
	                    $('#surePassword').val('');
	                    loginScene.simulateBtn3.trigger('click');
	                    RcancelBtnFun();
	                }
	            })   
	        })
	     }
	});//！！！调用表单验证方法。
}

// 本身层自带杂乱类
// form
function registerFormCreate(father){
	this.father = father;
	this.ele;
	this.init = function(){
		this.ele = $('<form></form>');
		this.table = new registerTableCreate(this.ele);
		this.table.init();

		this.ele.appendTo(this.father);
	}
}
// table
function registerTableCreate(father){
	this.father = father;
	this.ele;
	this.init = function(){
		this.ele = $('<table></table>');
		this.ele.append('<caption>注册界面</caption>')
		// 第一行
		this.tr1 = new registerTrCreate(this.ele);
		this.tr1.init();
		this.tr1.ele.find('td:first').text('账号:');
		var input = new EditBox('registerId',this.tr1.ele.find('td:last'),'userName');
		input.init();
		// 第二行
		this.tr2 = new registerTrCreate(this.ele);
		this.tr2.init();
		this.tr2.ele.find('td:first').text('密码:');
		var input = new EditBox('registerPassword',this.tr2.ele.find('td:last'),'password');
		input.init();
		input.ele.attr('type','password');
		// 第三行
		this.tr3 = new registerTrCreate(this.ele);
		this.tr3.init();
		this.tr3.ele.find('td:first').text('确认密码:');
		var input = new EditBox('surePassword',this.tr3.ele.find('td:last'),'surePassword');
		input.init();
		input.ele.attr('type','password');
		// 第四行
		this.tr4 = new registerTrCreate(this.ele);
		this.tr4.init();
		var button = new Button(168,64,'button/windowensure.png','button/windowensure_2.png',this.tr4.ele.find('td:first')
								,null);
		button.init();
	

		var button = new Button(168,64,'button/windowcancel.png','button/windowcancel_2.png',this.tr4.ele.find('td:last')
								,RcancelBtnFun);
		button.init();
		button.ele.attr('type','button');


		this.ele.appendTo(this.father);
	}
}
// tr
function registerTrCreate(father){
	this.father = father;
	this.ele;
	this.init = function(){
		this.ele = $('<tr></tr>');
		this.child = $('<td></td><td></td>');
		this.ele.append(this.child);
		this.ele.appendTo(this.father);
	}
}
// 取消按钮事件
function RcancelBtnFun(){
	loginScene.register.ele.hide();
	loginScene.login.ele.show();
	$('#loginId').val('');
	$('#loginPassword').val('');
}
