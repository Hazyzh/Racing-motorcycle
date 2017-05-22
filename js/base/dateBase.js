var db = openDatabase('hazyDataBase','1.0','my db',2*1024*1024);
// 存表
db.transaction(function(tx){
	// tx.executeSql('drop table goods');
	// 用户表
	tx.executeSql('create table if not exists user(id integer primary key,name text,password text,userName text,\
    	headImg text default "images/Shop/c1.png",carBodyImg text default "images/Shop/m1.png",carWheelImg text default "images/Shop/w1.png"\
    	,gold int default 1000,orderList text default "1,9,13",checkpoint int default 1)');
	// 商品表
	tx.executeSql('create table if not exists goods(id integer primary key,category text,showImg text\
        ,infoImg text,userImg text,price int,growth int)');
})
// 用户表
function createUser(){
	db.transaction(function(tx){
		tx.executeSql('insert into user(name,password,userName,gold) values ("a","a","oldDriver",1000)');
	})
}
// 商品表
function createGoods(){
	db.transaction(function(tx){
        tx.executeSql('insert into goods(category,showImg,userImg,infoImg,price,growth) values \
        	("bikers","images/Shop/c1s.png","images/Shop/c1.png","images/Window/cw1.png",100,40),\
        	("bikers","images/Shop/c2s.png","images/Shop/c2.png","images/Window/cw2.png",120,44),\
        	("bikers","images/Shop/c3s.png","images/Shop/c3.png","images/Window/cw3.png",130,48),\
        	("bikers","images/Shop/c4s.png","images/Shop/c4.png","images/Window/cw4.png",140,52),\
        	("bikers","images/Shop/c5s.png","images/Shop/c5.png","images/Window/cw5.png",150,56),\
        	("bikers","images/Shop/c6s.png","images/Shop/c6.png","images/Window/cw6.png",160,60),\
        	("bikers","images/Shop/c7s.png","images/Shop/c7.png","images/Window/cw7.png",170,64),\
        	("bikers","images/Shop/c8s.png","images/Shop/c8.png","images/Window/cw8.png",180,68),\
        	("motor","images/Shop/m1s.png","images/Shop/m1.png","images/Window/mw1.png",200,150),\
        	("motor","images/Shop/m2s.png","images/Shop/m2.png","images/Window/mw2.png",220,160),\
        	("motor","images/Shop/m3s.png","images/Shop/m3.png","images/Window/mw3.png",240,170),\
        	("motor","images/Shop/m4s.png","images/Shop/m4.png","images/Window/mw4.png",260,180),\
        	("wheel","images/Shop/w1s.png","images/Shop/w1.png","images/Window/ww1.png",100,12),\
        	("wheel","images/Shop/w2s.png","images/Shop/w2.png","images/Window/ww2.png",120,11),\
        	("wheel","images/Shop/w3s.png","images/Shop/w3.png","images/Window/ww3.png",140,10),\
        	("wheel","images/Shop/w4s.png","images/Shop/w4.png","images/Window/ww4.png",160,9)');
	})
}
addInfoFun('user',createUser);/*存用户*/
addInfoFun('goods',createGoods);/*存商品*/

// 添加数据函数
function addInfoFun(name,fun){
	db.transaction(function(tx){
		tx.executeSql('select * from '+name,[],function(a,r){
			if(!r.rows.length){
				fun()
			}
		})
	})
}