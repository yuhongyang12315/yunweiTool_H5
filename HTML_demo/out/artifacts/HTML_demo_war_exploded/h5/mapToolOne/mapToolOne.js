
$(function () {
    var windowsArr = [];
    var marker = [];
    var map = new AMap.Map("mapContainer", {
        resizeEnable: true,
        center: [120.176922,30.244759],//地图中心点
        zoom: 13,//地图显示的缩放级别
        keyboardEnable: false
    });

    AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function() {
        var autoOptions = {
            city: "杭州", //城市，默认全国
            input: "keyword"//使用联想输入的input的id
        };
        autocomplete = new AMap.Autocomplete(autoOptions);
        var placeSearch = new AMap.PlaceSearch({
            city: '杭州',
            map: map
        })

        AMap.event.addListener(autocomplete, "select", function(e){
            //TODO 针对选中的poi实现自己的功能
            placeSearch.setCity(e.poi.adcode);
            placeSearch.search(e.poi.name)
        });
    });
    //在对象初始化的时候设定
    var placeSearch= new AMap.PlaceSearch({
        type:'风景名胜',
        city: "010" //城市
    });
    placeSearch.searchNearBy("", [116.405467, 39.907761], 500, function(status, result) {
        console.log(result)
        if (status === 'complete' && result.info === 'OK') {
            //TODO : 解析返回结果,如果设置了map和panel，api将帮助完成点标注和列表
        }
    });
})