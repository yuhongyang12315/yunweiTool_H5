//获取存储的token
var token = window.localStorage? localStorage.getItem("token"): Cookie.read("token");
console.log(token)

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

    //获取存储的token
    // var qrcode = window.localStorage? localStorage.getItem("qrcode"): Cookie.read("qrcode");

    // var shopID = getUrlParam('shopID');
    // var qrcode = getUrlParam('qrcode');

    // console.log(shopID)
    // console.log(qrcode);

// if(qrcode == null ){
//
//
// }else{
//
//     // $("#qrcodeInput").val(qrcode)
// }
    $('#information_btn').click(function () {

        window.location.href = "/h5/equipmentIM/equipmentIM.html?qrcode=" + $("#qrcodeInput").val().toUpperCase()
    })

    $('#sureBtn').click(function () {
        // console.log('开始测试')
        // console.log($("#selectedOne").val())
        // console.log($("#qrcodeInput").val())



        if (token == null || token == "" ){

            alert("请重新登陆");
            window.location.replace("https://mofisher-wapp.uma.com/guide/login");
        } else if($("#selectedOne").val() == null || $("#selectedOne").val() == "" ||$("#qrcodeInput").val() == null || $("#qrcodeInput").val() == ""){

            alert("设备信息不完整");
        }

        else{
            $.ajax({
                url: "https://mofisher-wapp.uma.com/notice/Trecharge",
                type:'POST',
                dataType: 'json',
                //jsonpCallback: 'callback',

                data: {
                    token:token,
                    qrcode:$("#qrcodeInput").val().toUpperCase(),
                    port_id:$("#selectedOne").val(),
                    action_type:1
                },

                success: function (data) {
                    console.log(data)

                    if(data.code == 2000){


                    }else if(data.code == 1005){

                        alert(data.sucinfo);

                    }else if(data.code == 1015){
                        alert("请重新登陆");
                        window.location.replace("https://mofisher-wapp.uma.com/guide/login");

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
    });

    // 最近一次心跳时间
    // "heart_time": "1515664464",
    // 总用电量
    //     "total_consume": "0.7",
    // 经度
    //     "lng": "30.33",
    // 维度
    //     "lat": "120.12",
    // 信号强度
    //     "signal": "26"




})

function test_oneByoneAction(parameter){
    console.log('一个个测试')
    console.log(parameter)
    console.log($("#timeInput").val())
    // console.log($("#selectedOne").val())
    // console.log($("#qrcodeInput").val())
    if (token == null || token == "" ){

        alert("请重新登陆");
        // window.location.replace("https://mofisher-wapp.uma.com/guide/login");
    } else if($($("#selectedOne").val() == null || $("#selectedOne").val() == "" || "#qrcodeInput").val() == null || $("#qrcodeInput").val() == ""){

        alert("设备信息不完整");
    } else{
        var action_type_int;
        if (parameter == 'one_open'){

            action_type_int = 1

        }else if (parameter == 'one_close'){

            action_type_int = 2
        }
        console.log(action_type_int)
        $.ajax({
            url: "https://mofisher-wapp.uma.com/notice/trecharge",
            type:'POST',
            dataType: 'json',
            //jsonpCallback: 'callback',

            data: {
                token:token,
                qrcode:$("#qrcodeInput").val().toUpperCase(),
                action_type:action_type_int,
                time:$("#timeInput").val(),
                port_id:$("#selectedOne").val(),

            },

            success: function (data) {
                console.log(data)

                if(data.code == 2000){


                }else if(data.code == 1005){

                    alert(data.sucinfo);

                }else if(data.code == 1015){
                    alert("请重新登陆");
                    window.location.replace("https://mofisher-wapp.uma.com/guide/login");

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
};

function test_allAction(parameter){
    console.log('一键测试')
    console.log(parameter)

    // console.log($("#selectedOne").val())
    // console.log($("#qrcodeInput").val())
    if (token == null || token == "" ){

        alert("请重新登陆");
        // window.location.replace("https://mofisher-wapp.uma.com/guide/login");
    } else if($("#qrcodeInput").val() == null || $("#qrcodeInput").val() == ""){

        alert("设备信息不完整");
    }

    else{
        var action_type_int;

        if (parameter == 'open'){

            action_type_int = 3
        }else if (parameter == 'close'){
            action_type_int = 4
        }
        console.log(action_type_int)
        $.ajax({
            url: "https://mofisher-wapp.uma.com/notice/trecharge",
            type:'POST',
            dataType: 'json',
            //jsonpCallback: 'callback',

            data: {
                token:token,
                qrcode:$("#qrcodeInput").val().toUpperCase(),
                action_type:action_type_int,
                time:$("#timeInput").val(),

            },

            success: function (data) {
                console.log(data)

                if(data.code == 2000){


                }else if(data.code == 1005){

                    alert(data.sucinfo);

                }else if(data.code == 1015){
                    alert("请重新登陆");
                    window.location.replace("https://mofisher-wapp.uma.com/guide/login");

                }else{

                    alert(data.sucinfo);
                }
            },
            error: function (er) {
                alert("服务器忙碌");
            }
        });

    }
}


