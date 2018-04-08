$(function () {
    var action_stat = $("#action_stat").val();
    console.log(action_stat)
    switch (action_stat) {
        case 1:
            alert('打点成功')
            break;
        case 3:
            alert('缺少照片')
            break;
        case 4:
            alert('缺少地址')
            break;
        case 5:
            alert('缺少店名参数')
            break;
        case 6:
            alert('缺少经纬度')
            break;
        case 7:
            alert('附件有问题')
            break;
        case 8:
            alert('附件上传失败')
            break;
        case 9:
            alert('打点失败')
            break;
        case 10:
            alert('服务器异常错误')
            break;
    }


    // 地图UI加载
    AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {

        //初始化地图对象，加载地图
        ////初始化加载地图时，若center及level属性缺省，地图默认显示用户当前城市范围

        /***************************************
         由于Chrome、IOS10等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度，请尽快升级您的站点到HTTPS。
         ***************************************/
        var map, geolocation;
        //加载地图，调用浏览器定位服务
        map = new AMap.Map('container', {
            zoom: 16,
            resizeEnable: true
        });
        map.plugin('AMap.Geolocation', function () {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition: 'RB'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });

        //解析定位结果
        function onComplete(data) {
            var str = ['定位成功'];
            str.push('经度：' + data.position.getLng());
            str.push('纬度：' + data.position.getLat());
            if (data.accuracy) {
                str.push('精度：' + data.accuracy + ' 米');
            }//如为IP精确定位结果则没有精度信息
            str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
            // document.getElementById('tip').innerHTML = str.join('<br>');
        }

        //解析定位错误信息
        function onError(data) {
            // document.getElementById('tip').innerHTML = '定位失败';
        }


        // var map = new AMap.Map('container', {
        //     zoom: 16,
        //     scrollWheel: false,
        // })
        //地图中添加地图操作ToolBar插件
        map.plugin(['AMap.ToolBar'], function () {
            //设置地位标记为自定义标记
            // var toolBar = new AMap.ToolBar();
            // map.addControl(toolBar);
        });

        var positionPicker = new PositionPicker({
            mode: 'dragMap',
            map: map
        });

        var lon = '';
        var addressTring = '';
        positionPicker.on('success', function (positionResult) {
            lon = positionResult.position;
            addressTring = positionResult.address;

            // 经纬度:
            document.getElementById('lnglat').innerHTML = positionResult.position;
            // 地址:
            document.getElementById('address').innerHTML = positionResult.address;
            // 最近的路口:
            // document.getElementById('nearestJunction').innerHTML = positionResult.nearestJunction;
            // 最近的路:
            // document.getElementById('nearestRoad').innerHTML = positionResult.nearestRoad;
            // 最近的POI:
            // document.getElementById('nearestPOI').innerHTML = positionResult.nearestPOI;
        });
        positionPicker.on('fail', function (positionResult) {
            document.getElementById('lnglat').innerHTML = ' ';
            document.getElementById('address').innerHTML = ' ';
            // document.getElementById('nearestJunction').innerHTML = ' ';
            // document.getElementById('nearestRoad').innerHTML = ' ';
            // document.getElementById('nearestPOI').innerHTML = ' ';
        });
        var onModeChange = function (e) {
            positionPicker.setMode(e.target.value)
        }
        var startButton = document.getElementById('start');
        var stopButton = document.getElementById('stop');
        var dragMapMode = document.getElementsByName('mode')[0];
        var dragMarkerMode = document.getElementsByName('mode')[1];
        //开始选点
        // AMap.event.addDomListener(startButton, 'click', function() {
        positionPicker.start(map.getBounds().getSouthWest())
        // })
        //结束选点
        // AMap.event.addDomListener(stopButton, 'click', function() {
        //     positionPicker.stop();
        // })
        AMap.event.addDomListener(dragMapMode, 'change', onModeChange)
        AMap.event.addDomListener(dragMarkerMode, 'change', onModeChange);
        positionPicker.start();
        map.panBy(0, 1);

        // map.addControl(new AMap.ToolBar({
        //     liteStyle: true
        // }))

        //打点拍照点击事件
        var oDiv = document.getElementById("pohobtn");
        oDiv.addEventListener("click", function () {


            window.location.href = "/h5/photoUpload/photoUpload.html?longitude=" + lon.L + "&latitude=" + lon.N + "&addressTring=" + addressTring

            console.log(lon)
            console.log(lon.L)
            console.log(lon.N)
            console.log(addressTring)
        });
    });
})