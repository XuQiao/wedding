// 初始化地图
function initMap() {
    // 创建地图实例
    const map = new AMap.Map('map-container', {
        zoom: 16,
        center: [118.7516, 30.9455],  // 敬亭湖宾馆坐标
        viewMode: '3D',
        pitch: 45
    });

    // 添加3D建筑
    map.on('complete', function() {
        AMap.plugin(['AMap.Buildings'], function() {
            map.add(new AMap.Buildings({
                zooms: [15, 20],
                heightFactor: 2
            }));
        });
    });

    // 添加婚礼场地标记
    const venueMarker = new AMap.Marker({
        position: [118.7516, 30.9455],
        map: map,
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        title: '婚礼主场地'
    });

    // 信息窗口内容
    const infoWindow = new AMap.InfoWindow({
        content: `<div class="map-infowindow">
                    <h3>狐狸先生 & 兔子小姐</h3>
                    <p>森林主题婚礼庆典</p>
                    <p>2025年10月19日 12:00</p>
                    <img src="images/wedding-icon.png" alt="婚礼图标">
                  </div>`,
        offset: new AMap.Pixel(0, -30)
    });

    // 点击标记显示信息窗口
    venueMarker.on('click', function() {
        infoWindow.open(map, venueMarker.getPosition());
    });

    // POI点交互
    document.querySelectorAll('.poi-item').forEach(item => {
        item.addEventListener('click', function() {
            const lng = parseFloat(this.dataset.lng);
            const lat = parseFloat(this.dataset.lat);
            map.setCenter([lng, lat]);
            venueMarker.setPosition([lng, lat]);
            infoWindow.open(map, [lng, lat]);
        });
    });

    // 导航功能
    document.getElementById('navigation-btn').addEventListener('click', function() {
        AMap.plugin('AMap.Transfer', function() {
            const transfer = new AMap.Transfer({
                map: map,
                panel: 'panel'
            });
            transfer.search([
                { keyword: '我的位置' },
                { keyword: '宣城市敬亭湖宾馆' }
            ]);
        });
    });

    // 出租车功能
    document.getElementById('taxi-btn').addEventListener('click', function() {
        AMap.plugin('AMap.Driving', function() {
            const driving = new AMap.Driving({
                map: map,
                panel: 'panel'
            });
            driving.search([
                { keyword: '我的位置' },
                { keyword: '宣城市敬亭湖宾馆' }
            ], function(status, result) {
                if (status === 'complete') {
                    console.log('路线规划完成');
                } else {
                    console.log('路线规划失败');
                }
            });
        });
    });
}

// 页面加载完成后初始化地图
window.onload = function() {
    initMap();
};