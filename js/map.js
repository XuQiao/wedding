// 初始化地图

function initMap() {
    // 创建地图实例
    const map = new AMap.Map('map-container', {
        zoom: 16,
        center: [118.740218,30.97028],  // 敬亭湖宾馆坐标
        viewMode: '2D',
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
    const marker = {
        "banquet": new AMap.Marker({
        position: [118.737997,30.972957],
        map: map,
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
        title: '婚礼主场地 -- 研学基地内部草坪'
        }),
        "venue": new AMap.Marker({
        position: [118.740218,30.97028],
        map: map,
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        title: '午宴场地 -- 敬亭湖宾馆通和西厅'
        })
    }

    // 信息窗口内容
    const infoWindow = {
        "banquet": new AMap.InfoWindow({
        content: `<div class="map-infowindow">
                    <p>仪式地点</p>
                    <p>2025年10月19日 10:28</p>
                    <img src="/images/wedding-icon.png">
                  </div>`,
        offset: new AMap.Pixel(0, -30)
    }),
        "venue": new AMap.InfoWindow({
        content: `<div class="map-infowindow">
                    <p>午宴地点</p>
                    <p>2025年10月19日 12:08</p>
                    <img src="/images/wedding-icon.png">
                  </div>`,
        offset: new AMap.Pixel(0, -30)
        })
    }

    // 点击标记显示信息窗口
    Object.entries(marker).forEach(([key, value]) => {
        value.on('click', function() {
            infoWindow[key].open(map, item.getPosition());
        })
    })
    
/*
    banquetMarker.on('click', function() {
        infoWindow1.open(map, banquetMarker.getPosition());
    });
*/
    // POI点交互
    document.querySelectorAll('.poi-item').forEach(item => {
        item.addEventListener('click', function() {
            const lng = parseFloat(this.dataset.lng);
            const lat = parseFloat(this.dataset.lat);
            map.setCenter([lng, lat]);
            marker[this.dataset.type].setPosition([lng, lat]);
            infoWindow[this.dataset.type].open(map, [lng, lat]);
        });
    });

    // 导航功能
    /*
    document.getElementById('navigation-btn').addEventListener('click', function() {
        AMap.plugin('AMap.Transfer', function() {
            const transfer = new AMap.Transfer({
                map: map,
                panel: 'panel'
            });
            transfer.search([
                { keyword: '我的位置' },
                { keyword: '宣城市研学基地' }
            ]);
        });
    });
    */
    // 出租车功能
    /*
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
    */
}

// 页面加载完成后初始化地图
window.onload = function() {
    initMap();
};