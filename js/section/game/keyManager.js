function keyManager(){
	this.Up=false;
    this.Right=false;
    this.Down=false;
    this.Left=false;
    this.Space=false;
    this.useProp=false;
    this.usePropFlag = true;
    this.usePropFlag2 = true;/*导弹判断事件*/
    this.changeProp = false;
}
// 对象加事件
function addKeyFun(obj){
    $(document).on({
        "keydown":function(event){
            switch (event.keyCode){
                case 38:
                    obj.Up = true;
                    break;
                case 39:
                    obj.Right = true;
                    break;
                case 40:
                    obj.Down = true;
                    break;
                case 37:
                    obj.Left = true;
                    break;
                case 32:
                    obj.Space = true;
                    break;
                case 17:
                    obj.useProp = true;
                    break;
            }
        },
        "keyup":function(event){
            switch (event.keyCode){
                case 38:
                    obj.Up = false;
                    break;
                case 39:
                    obj.Right = false;
                    break;
                case 40:
                    obj.Down = false;
                    break;
                case 37:
                    obj.Left = false;
                    break;
                case 32:
                    obj.Space = false;
                    break;
                case 17:
                    obj.useProp = false;
                    obj.usePropFlag = true;
                    obj.usePropFlag2 = true;
                    break;
                case 16:
                    obj.changeProp = true;
                    break;
            }
        }
    });
}
// 对象加事件
function removeKeyFun(){
    $(document).off();
}