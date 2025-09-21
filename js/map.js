// 初始化地图

function initMap() {
    // 创建地图实例
    const map = new AMap.Map('map-container', {
        zoom: 14,
        center: [118.740218,30.97028],  // 敬亭湖宾馆坐标
        //center: [118.7355,30.97222],
        viewMode: '2D',
        pitch: 45
    });

    /*
    // 添加3D建筑
    map.on('complete', function() {
        AMap.plugin(['AMap.Buildings'], function() {
            map.add(new AMap.Buildings({
                zooms: [15, 20],
                heightFactor: 2
            }));
        });
    });
    */
    // 添加婚礼场地标记
    const marker = {
        "banquet": new AMap.Marker({
        position: [118.737997,30.972957],
        //position: [118.73473,30.97488],
        map: map,
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
        title: '婚礼主场地 -- 研学基地内部草坪'
        }),
        "venue": new AMap.Marker({
        position: [118.740218,30.97028],
        //position: [118.7355,30.97222],
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
                    <img src="./images/wedding-icon.png" alt="" />
                  </div>`,
        offset: new AMap.Pixel(0, -30),
        automove: true
    }),
        "venue": new AMap.InfoWindow({
        content: `<div class="map-infowindow">
                    <p>午宴地点</p>
                    <p>2025年10月19日 12:08</p>
                    <img src="./images/wedding-icon.png" alt="" />
                  </div>`,
        offset: new AMap.Pixel(0, -30),
        automove: true
        })
    }

    // 点击标记显示信息窗口
    Object.entries(marker).forEach(([key, value]) => {
        value.on('click', function() {
            console.log(key, value.getPosition())
            map.setCenter(value.getPosition());
            value.setPosition(value.getPosition());
            setTimeout(function(){
                infoWindow[key].open(map, value.getPosition())
            }, 400);
            map.setZoomAndCenter(map.getZoom()>13?map.getZoom():14,value.getPosition());//设置地图放大级别及居中
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
            var ds = this.dataset
            const lng = parseFloat(ds.lng);
            const lat = parseFloat(ds.lat);
            console.log(lng, lat)
            //map.setCenter([lng, lat]);
            map.setZoomAndCenter(map.getZoom()>13?map.getZoom():14,[lng, lat]);//设置地图放大级别及居中
            //marker[ds.type].setPosition([lng, lat]);
            setTimeout(function(){
                infoWindow[ds.type].open(map, [lng, lat])
            }, 400);
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

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(item => {
        const link = item.getAttribute('href');
        if (link === currentPage) {
            item.classList.add('active');
        }
    });
});
