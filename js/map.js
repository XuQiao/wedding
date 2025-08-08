// 初始化地图

function initMap() {
    // 创建地图实例
    const map = new AMap.Map('map-container', {
        zoom: 16,
        center: [118.740218,30.97028],  // 敬亭湖宾馆坐标
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
        position: [118.737997,30.972957],
        map: map,
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        title: '婚礼主场地'
    });

    // 信息窗口内容
    const infoWindow = new AMap.InfoWindow({
        content: `<div class="map-infowindow">
                    <h3>狐狸先生 & 兔子小姐</h3>
                    <p>森林主题婚礼庆典</p>
                    <p>2025年10月19日 11:08</p>
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
console.log('AMap对象:', typeof AMap);

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(item => {
        const link = item.getAttribute('href');
        if (link === currentPage) {
            item.classList.add('active');
        }
    });
});
AMap.securityConfig = {
    securityJsCode: "61415f48b5d4dbe08e0185b3f6633566"
};
// 初始化地图
var map = new AMap.Map('map-container', {
    zoom: 15,  // 缩放级别
    center: [118.737997,30.972957],  // 宣城市研学基地草坪的经纬度
    viewMode: '2D'  // 使用2D视图
});

// 添加标记点
var marker = new AMap.Marker({
    position: [118.737997,30.972957],
    title: "婚礼仪式地点"
});
map.add(marker);

// 添加信息窗口
var infoWindow = new AMap.InfoWindow({
    content: '<div style="padding: 5px;"><strong>婚礼仪式地点</strong><br/>宣城市研学基地草坪</div>',
    offset: new AMap.Pixel(0, -30)
});

// 点击标记点显示信息窗口
marker.on('click', function() {
    infoWindow.open(map, marker.getPosition());
});

// 默认打开信息窗口
infoWindow.open(map, marker.getPosition());


// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 初始化地图
    initMap();
});


// 页面加载完成后初始化地图
window.onload = function() {
    initMap();
};