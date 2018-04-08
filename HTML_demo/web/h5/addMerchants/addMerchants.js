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

    //获取存储的token
    var token = window.localStorage? localStorage.getItem("token"): Cookie.read("token");
    console.log(token)

    $('#sureBtn').click(function () {
        console.log($("#qrcodeInput").val())
        if (token == null || token == "" ){

            alert("请重新登陆");
            // window.location.replace("https://mofisher-wapp.uma.com/guide/login");


        } else{
        //获取文件
        var imageFile = document.getElementById("shop_img").files[0];
        console.log(imageFile);

            if(imageFile == undefined){
                console.log('没有图片');
                alert("没有选择图片！");
            }else{
        //获取图片路径
        var _URL = window.URL || window.webkitURL;
        var objUrl = _URL.createObjectURL(imageFile)
        console.log(objUrl)
        console.log(imageFile.size/1024)
        if(imageFile.size/1024 > 200){
            console.log('压缩图片')
            // 调用函数处理图片 　　　　　　　　　　　　　　　　
            dealImage(objUrl, {
// 注意：在pc端可以用绝对路径或相对路径，移动端最好用绝对路径（因为用take photo后的图片路径，我没有试成功（如果有人试成功了可以分享一下经验））
                width : 700
            }, function(base){
//直接将获取到的base64的字符串，放到一个image标签中就可看到测试后的压缩之后的样式图了
// document.getElementById("yasuoimg").src = base;
                // console.log("压缩后：" + base.length / 1024 + " " + base);
                console.log('压缩后'+ base.length / 1024)

                //组装表单
                assemblyFormData(convertBase64UrlToBlob(base))

            })

        }else{

            console.log('上传图片，不压缩')
            //组装表单
            assemblyFormData(imageFile)
        }
        }

}
    });
    //组装表单数据
    function assemblyFormData(imageData) {
        var nowFormData = new FormData();
         //append函数的第一个参数是后台获取数据的参数名,和html标签的

        nowFormData.append("token",token);

        nowFormData.append("names",$('#loginId').val());
        nowFormData.append("shop_name",$('#nameId').val());
        nowFormData.append("scale",$('#DividedId').val());

        //可选
        nowFormData.append("cost",$('#one-ID').val());
        nowFormData.append("mobile",$('#two-ID').val());
        nowFormData.append("address",$('#three-ID').val());
        nowFormData.append("latitude",$('#four-ID').val());
        nowFormData.append("longitude",$('#five-ID').val());
        nowFormData.append("bank",$('#sex-ID').val());
        nowFormData.append("open_bank",$('#eight-ID').val());
        nowFormData.append("card",$('#nine-ID').val());
        nowFormData.append("card_name",$('#ten-ID').val());
        nowFormData.append("card_mobile",$('#eleven-ID').val());
        nowFormData.append("car_money",$('#twelve-ID').val());

        // nowFormData.append("mcar_money",$('#thirteen-ID').val());
        nowFormData.append("mcar_money_one",$('#thirteen-one-ID').val());
        nowFormData.append("mcar_money_two",$('#thirteen-two-ID').val());
        nowFormData.append("mcar_money_three",$('#thirteen-three-ID').val());
        nowFormData.append("mcar_money_four",$('#thirteen-four-ID').val());
        nowFormData.append("mcar_money_five",$('#thirteen-five-ID').val());
        nowFormData.append("mcar_money_six",$('#thirteen-six-ID').val());
        nowFormData.append("mcar_money_seven",$('#thirteen-seven-ID').val());
        nowFormData.append("mcar_money_eight",$('#thirteen-eight-ID').val());
        nowFormData.append("mcar_money_nine",$('#thirteen-nine-ID').val());


        nowFormData.append("max_money",$('#fourteen-ID').val());

        nowFormData.append("stat",$('#select-one').val());
        nowFormData.append("is_hide",$('#select-two').val());
        nowFormData.append("assume",$('#select-three').val());
        nowFormData.append("facility_type",$('#select-four').val());

        nowFormData.append("img",imageData);

        //上传表单数据
        traverseFormData(nowFormData)
    }

//上传表单数据
    function traverseFormData(formData) {
        alert("正在填加！");
        $.ajax({

            url: "https://mofisher-wapp.uma.com/channels/shopAdd",
            type: "POST",
            data: formData,
            dataType: 'json',
            // jsonpCallback: 'callback',
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            success: function(response,status,xhr){
                console.log(response);

                if(response.code == 2000){
                    alert("添加成功！");
                    window.location.replace("https://mofisher-wapp.uma.com/guide/main");

                }else if(response.code == 1005){

                    alert(response.sucinfo);

                }else if(response.code == 1015){
                    alert("请重新登陆");
                    window.location.replace("https://mofisher-wapp.uma.com/guide/login");

                }else{

                    alert("添加商家失败");
                }
            }
        });
    }

    //定位经纬度
    var mLocLat = 0;
    var mLocLng = 0;

    map = new AMap.Map("map", {


    });
    map.plugin('AMap.Geolocation', function () {
        console.log("定位1");

        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            GeoLocationFirst:true
    });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', function (suc) {
            console.log(suc);
            mLocLat = suc.position.lat;
            mLocLng = suc.position.lng;
            adress = suc.formattedAddress;

            // addLocMarkr(mLocLat, mLocLng)
            $("#three-ID").val(adress)
            $("#four-ID").val(mLocLat)
            $("#five-ID").val(mLocLng)
        });//返回定位信息
        AMap.event.addListener(geolocation, 'error', function (e) {

            alert("定位失败")
        });//返回定位出错信息
    });

})

/**
 * 图片压缩，默认同比例压缩
 * @param {Object} path
 *   pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
 * @param {Object} obj
 *   obj 对象 有 width， height， quality(0-1)
 * @param {Object} callback
 *   回调函数有一个参数，base64的字符串数据
 */
function dealImage(path, obj, callback){
    var img = new Image();
    img.src = path;
    img.onload = function(){
        var that = this;
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 1;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality );
        // 回调函数返回base64的值
        callback(base64);
    }
}

/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData){

    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }

    return new Blob( [ab] , {type : 'image/png'});
}