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
    // 验证手机号
    function isPhoneNo(phone) {
        var pattern = /^1\d{10}$/;
        return pattern.test(phone);
    }

    //获取验证码
    $('#codeBtn').click(function () {
        var username = $("#username").val();
        console.log(username)

        if (username == null || username == "") {
            alert("您至少渠道账号哦！");
        }else  if(isPhoneNo(username) == false){
            alert("电话号码无效")
        } else{

            $.ajax({
                url: "https://mofisher-wapp.uma.com/captcha/captchaes",
                dataType: 'jsonp',
                jsonpCallback: 'callback',

                data: {
                    mobile: username,
                },

                success: function (data) {
                    console.log(data)

                    if(data.code == 2000){
                        alert("验证码发送成功，请稍等！");
                    }else if(data.code == 1005){

                        alert(data.sucinfo);
                    }else{

                        alert("验证码发送失败");
                    }
                }
                ,
                error: function (er) {
                    alert("服务器忙碌");
                }
            });
        }
    });

//登陆
    $('#loginBtn').click(function () {
        // window.location.href ="/h5/main/main.html"
        // console.log('logintn') ;
        // var textLab = $('#textLab');
        //
        // textLab.css("color","red")
    var username = $("#username").val();
        var password = $("#password").val();
        console.log(username,password)

        if (username == null || username == "" && password == null || password == "") {
            alert("您至少要填写渠道账号和验证码哦！");
        } else {
            $.ajax({
                url: "https://mofisher-wapp.uma.com/channels/login",
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                data: {
                    mobile: username,
                    code: password,
                },
                type: 'POST',
                success: function (data) {
                    console.log(data)

                    if(data.code == 2000){
                        var token = data.datainfo.token
                        console.log(token)
                        //存储，IE6~7 cookie 其他浏览器HTML5本地存储
                        if (window.localStorage) {
                            localStorage.setItem("token", token);
                            console.log("本地存储")
                        } else {
                            Cookie.write("token", token);
                            console.log("Cookie存储")
                        }

                        window.location.href ="/h5/main/main.html"

                    }else{

                        alert("登陆失败");
                    }
                }
                ,
                error: function (er) {
                    alert(er);
                }
            });
        }
    });


})
