$(function () {
    // alert 在手机浏览器会显示网址
    window.alert = function(name){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
    }
    // window.onload= function(){}
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
    $('#sureBtn').click(function () {

        console.log($("#qrcodeInput").val())

    if (token == null || token == "" ){

        alert("请重新登陆");
        window.location.replace("/h5/login/login.html");
    } else{
        $.ajax({
            url: "https://mofisher-wapp.uma.com/channels/facilityAdd",
            dataType: 'jsonp',
            jsonpCallback: 'callback',

            data: {
                token:token,
                shopid:shopID,
                qrcode:$("#qrcodeInput").val()
            },

            success: function (data) {
                console.log(data)

                if(data.code == 2000){

                    window.location.href ="/h5/equipmentTest/equipmentTest.html?qrcode="+$("#qrcodeInput").val()
                }else if(data.code == 1005){

                    alert(data.sucinfo);

                }else if(data.code == 1015){
                    alert("请重新登陆");
                    window.location.replace("/h5/login/login.html");

                }else{

                    alert("获取商家列表失败");
                }
            }
            ,
            error: function (er) {
                alert("服务器忙碌");
            }
        });

    }
    });

    //测试设备
    $('#equipmentTestBtn').click(function () {
        var obj_payPlatform = $("input[type='radio']:checked");

        console.log(obj_payPlatform.val())
        if(obj_payPlatform.val() == null || obj_payPlatform.val() == "" ){

            alert("请选择商家")
        }else{

            window.location.href ="/h5/equipmentTest/equipmentTest.html?shopID="+obj_payPlatform.val()

        }

    });


})