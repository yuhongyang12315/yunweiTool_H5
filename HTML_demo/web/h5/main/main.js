$(function () {

    // var dataArray = [{
    //
    //     "name": "商家1"
    //
    // }, {
    //     "name": "商家1"
    // }, {
    //     "name": "商家1"
    // }, {
    //     "name": "商家1"
    // }, {
    //     "name": "商家1"
    // }, {
    //     "name": "商家1"
    // }
    //
    // ]

    // alert 在手机浏览器会显示网址
    window.alert = function(name){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
    }


    //获取存储的token
    var token = window.localStorage? localStorage.getItem("token"): Cookie.read("token");
    console.log(token)

    if (token == null || token == ""){

        alert("请重新登陆");
        window.location.replace("/h5/login/login.html");
    }else{
            $.ajax({
                url: "https://mofisher-wapp.uma.com/channels/shopes",
                dataType: 'jsonp',
                jsonpCallback: 'callback',

                data: {
                    token:token
                },

                success: function (data) {
                    console.log(data)

                    if(data.code == 2000){

                        var  dataArray = data.datainfo

                        for(var i=0;i<dataArray.length;i++){

                            var label=$("<label class=\"redioLable\">"+dataArray[i].shop_name+"</label>")

                            var radio=$('<input  class="redioView" name="Fruit" type="radio" value="'+dataArray[i].id+'" />')

                            $("#listShop").append(radio,label);
                        }

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

   //  var r=confirm("提示内容")
   //     if (r==true)
   // {
   //     alert("You pressed OK!")
   // }
   // else
   // {
   //     alert("You pressed Cancel!")
   // }

        // <label><input name="Fruit" type="radio" value=data[i].name />苹果 </label>


    // $('input:radio').eq(2).attr('checked', 'true');


    //添加商家
    $('#addMerchantsBtn').click(function () {

            window.location.href ="/h5/addMerchants/addMerchants.html"

    });
//分配设备
    $('#distributionBtn').click(function () {
        var obj_payPlatform = $("input[type='radio']:checked");

        console.log(obj_payPlatform.val())
     if(obj_payPlatform.val() == null || obj_payPlatform.val() == "" ){

alert("请选择商家")
        }else{

         window.location.href ="/h5/distribution/distribution.html?shopID="+obj_payPlatform.val()
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
