
//获取存储的token
var tokenData = window.localStorage? localStorage.getItem("token"): Cookie.read("token");
console.log(tokenData)

//打印表单数据
function traverseFormData(formData) {
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
}
function submitFromeAction() {
    var form=document.getElementById("formFileData");
    var fd =new FormData(form);
    fd.append("token",tokenData);  //append函数的第一个参数是后台获取数据的参数名,和html标签的

    //打印表单数据
    traverseFormData(fd)
    //获取文件
    var imageFile = document.getElementById("img-two").files[0];
    console.log(imageFile);
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
//                     document.getElementById("yasuoimg").src = base;
                    // console.log("压缩后：" + base.length / 1024 + " " + base);
                    console.log('压缩后'+ base.length / 1024)
                    var nowFormData = new FormData();
                    //convertBase64UrlToBlob函数是将base64编码转换为Blob
                    nowFormData.append("img",convertBase64UrlToBlob(base));  //append函数的第一个参数是后台获取数据的参数名,和html标签的
                    nowFormData.append("shop_name",$('#shop_nameInput-two').val());
                    nowFormData.append("address",$('#addressInput-two').val());
                    nowFormData.append("longitude",$('#longitude-two').val());
                    nowFormData.append("latitude",$('#latitude-two').val());

                    nowFormData.append("token",tokenData);
                    nowFormData.append("k_sum",$('#k_sumNumber').val());
                    nowFormData.append("m_sum",$('#m_sumNumber').val());
                    console.log('开始上传图片')
                    alert("正在上传图片，请稍等！");
                    $.ajax({

                        url: "https://mofisher-wapp.uma.com/fix/shopdot",
                        type: "POST",
                        data: nowFormData,
                        // dataType: 'jsonp',
                        // jsonpCallback: 'callback',
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success: function(response,status,xhr){
                            console.log(response);

                            if(response.code == '2000'){
                                alert('打点成功')

                            }else{
                                alert(response.sucinfo)

                            }
                        }
                    });

                })

            }else{
                alert("正在上传图片，请稍等！");
                console.log('上传图片，不压缩')
                $.ajax({

                    url: "https://mofisher-wapp.uma.com/fix/shopdot",
                    type: "POST",
                    data: fd,
                    // dataType: 'jsonp',
                    // jsonpCallback: 'callback',
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                    success: function(response,status,xhr){
                        console.log(response);

                        if(response.code == '2000'){
                            alert('打点成功')

                        }else{
                            alert(response.sucinfo)
                        }
                    }
                });
            }

    return false;
}

$(function () {

//获取地址栏参数//可以是中文参数
    function getUrlParam(key) {
        // 获取参数
        var url = window.location.search;
        // 正则筛选地址栏
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        // 匹配目标参数
        var result = url.substr(1).match(reg);
        //返回参数值
        return result ? decodeURIComponent(result[2]) : null;
    }
    var longitude = getUrlParam('longitude');
    var latitude = getUrlParam('latitude');
    var addressTring = getUrlParam('addressTring');

    console.log(longitude)
    console.log(latitude)
    console.log(addressTring)

    $('#longitude-two').val(longitude)
    $('#latitude-two').val(latitude)
    $('#addressInput-two').val(addressTring)

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


