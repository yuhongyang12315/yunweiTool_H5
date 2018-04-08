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
    var qrcodeString = getUrlParam('qrcode');

    console.log(qrcodeString)

    //获取存储的token
    var token = window.localStorage? localStorage.getItem("token"): Cookie.read("token");
    console.log(token)

    // $("#type_twofieldset").show()

    // $('#sureBtn').click(function () {

        // var dataArray = [{voltage:'erer'},{voltage:'1qwwee'},{voltage:'weqweqw'}]
        // for(var i=0;i<dataArray.length;i++){
        //
        //     var  htmlUI= '<fieldset><legend>端口号：'+(i+1)+'</legend><label class="lable_item">电流：'+dataArray[i].voltage+'</label><label class="lable_item">电压：'+dataArray[i].voltage+'</label><label class="lable_item">总电量：'+dataArray[i].voltage+'</label><label class="lable_item">设备状态：'+dataArray[i].voltage+'</label><label class="lable_item">充电状态：'+dataArray[i].voltage+'</label></fieldset>'
        //
        //     $("#listInformation").append(htmlUI);
        // }

        if (token == null || token == "" ){

            alert("请重新登陆");
            // window.location.replace("https://mofisher-wapp.uma.com/guide/login");
        } else{
            $.ajax({
                url: "https://mofisher-wapp.uma.com/fix/facinfo",
                dataType: 'jsonp',
                jsonpCallback: 'callback',

                data: {
                    token:token,
                    qrcode:qrcodeString
                },

                success: function (data) {
                    console.log(data)

                    if(data.code == 2000){
                        var  dataArray = data.datainfo

                        if(data.sucinfo == 1){
                            console.log('设备是快充')
                            for(var i=0;i<dataArray.length;i++){

                                var  htmlUI= '<fieldset><legend>端口号：'+(i+1)+'</legend><label class="lable_item">电流：'+dataArray[i].voltage+'</label><label class="lable_item">电压：'+dataArray[i].voltage+'</label><label class="lable_item">总电量：'+dataArray[i].voltage+'</label><label class="lable_item">设备状态：'+dataArray[i].voltage+'</label><label class="lable_item">充电状态：'+dataArray[i].voltage+'</label></fieldset>'

                                $("#listInformation").append(htmlUI);
                            }
                        }else {
                            console.log('设备是慢充')

                            $("#type_twofieldset").show()


                            $(".lable_item-one").text('纬度：' + data.lng)
                            $(".lable_item-two").text('经度：' + data.lat)
                            $(".lable_item-three").text('总电量：' + data.total_consume)
                            $(".lable_item-four").text('信号强度：' + data.signal)
                            $(".lable_item-five").text('最后上报时间：' + data.heart_time)

                            for(var i=0;i<dataArray.length;i++){
                                if (dataArray[i] == 1){

                                    var  htmlUI= '<label class="one_lab">1</label>'
                                    $("#listInformation").append(htmlUI);

                                }else{
                                    var  htmlUI= '<label class="two_lab">2</label>'
                                    $("#listInformation").append(htmlUI);

                                }

                            }
                            var htmlLab = '<label class="shuoming">* 1代表空闲，2代表充电中</label>'

                            $("#listInformation").append(htmlLab);
                        }

                    }else if(data.code == 1005){

                        alert(data.sucinfo);

                    }else if(data.code == 1015){
                        alert("请重新登陆");
                        window.location.replace("https://mofisher-wapp.uma.com/guide/login");

                    }else{

                        alert("获取设备信息失败");


                    }
                }
                ,
                error: function (er) {
                    alert("服务器忙碌");
                }
            });

        }
    // });



})