// 初始化高德地图
function initMap() {
    // 宣城市敬亭湖宾馆的经纬度
    const position = [118.7516, 30.9455];
    
    const map = new AMap.Map('map', {
        zoom: 15,
        center: position,
        viewMode: '2D'
    });
    
    // 添加标记点
    new AMap.Marker({
        position: position,
        map: map,
        title: '敬亭湖宾馆 - 婚礼场地'
    });
    
    // 添加信息窗口
    const infoWindow = new AMap.InfoWindow({
        content: '<div style="padding:5px;line-height:1.5;">狐狸先生 & 兔子小姐<br>森林主题婚礼<br>2025.10.19 12:00</div>',
        offset: new AMap.Pixel(0, -30)
    });
    
    infoWindow.open(map, position);
}


// 页面加载完成后初始化地图
window.onload = function() {
    initMap();
};