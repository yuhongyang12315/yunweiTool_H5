
// alert 在手机浏览器会显示网址
window.alert = function(name){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
}
//使用正则表达式获取url中的参数
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数值
    if (r != null) return unescape(r[2]); return null;
}

var shopID = getUrlParam('shopID');

console.log(shopID)
//获取存储的token
var token = window.localStorage? localStorage.getItem("token"): Cookie.read("token");
console.log(token)

var clickNumber;
function boxClickAction(number) {

    clickNumber = number;
    console.log(number)

}

$(function () {
    $('.boxView .boxBtn').click(function () {

        console.log(clickNumber)
        var thisUI = $(this);
        if ($("#qrcodeInput").val() == null || $("#qrcodeInput").val() == "" ){

            alert("请输入设备编号");
        } else{

            $.ajax({
                url: "http://t2.uma.com/c3/open",
                type: "POST",
                dataType: 'json',
                // jsonpCallback: 'callback',
                data: {
                    // token:token,
                    number:clickNumber,
                    imei:$("#qrcodeInput").val()
                    // imei:'DLMHU18010001'

                },

                success: function (data) {
                    console.log(data)

                    if(data.code == 2000){
                        // 修改按钮样式
                        thisUI.addClass('selected').siblings();

                        var text = thisUI.text();
                        thisUI.text(text+'*开');
                        // 按钮点击
                        thisUI.attr('disabled',true)

                        // window.location.href ="/h5/equipmentTest/equipmentTest.html?qrcode="+$("#qrcodeInput").val()
                    }else if(data.code == 1005){

                        alert(data.sucinfo);

                    }else if(data.code == 1015){
                        alert("请重新登陆");
                        // window.location.replace("/h5/login/login.html");

                    }else{

                        alert(data.sucinfo);
                    }
                }
                ,
                error: function (er) {
                    alert("服务器忙碌");
                }
            });

        }


    })


})