<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { onMounted, onUnmounted, ref } from 'vue'

// 高德地图API密钥
const API_KEY = '715ae0980e2fc7aa8af8e64cf3f862ab'

// 地图实例引用
const map = ref(null)
const mapContainer = ref(null)
const mapContainerDom = mapContainer.value
// 声明Loca和window类型，避免TypeScript报错
declare const Loca: any
declare global {
    interface Window {
        loca: any
    }
}


// 初始化地图
const initMap = async () => {
    try {
        window._AMapSecurityConfig = {
            securityJsCode: '1b6c4d01d851fd528ce410e884fd399e',
        }


        const AMap = await AMapLoader.load({
            key: API_KEY,
            version: '2.0',
            plugins: [
                'AMap.DistrictSearch',
                'AMap.Scale',
                'AMap.ToolBar',
                'AMap.ControlBar',
                'AMap.Polygon3D',
                'AMap.Geocoder',
            ],
            // 添加Loca配置
            Loca: {
                version: '2.0.0',
            },
        })



        // 创建地图实例
        map.value = new AMap.Map(mapContainer.value, {
            zoom: 9.66,
            center: [120.209524, 36.305702],
            showLabel: false,
            viewMode: '3D',
            mapStyle: 'amap://styles/dark', // 幻影黑
        })

        let loca = (window.loca = new Loca.Container({
            map: map.value,
        }))

        // let geo = new Loca.GeoJSONSource({
        //     url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/tsing.json',
        // });


        let mock_data = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.518251, 35.683927]
                    },
                    "properties": {
                        "count": 1159
                    }
                },

                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.529251, 35.638927]
                    },
                    "properties": {
                        "count": 92
                    }
                }
            ]
        }
        let geo = new Loca.GeoJSONSource({
            data: mock_data
        });

        let heatmap = new Loca.HeatMapLayer({
            // loca,
            zIndex: 10,
            opacity: 1,
            visible: true,
            zooms: [2, 22],
        });

        heatmap.setSource(geo, {
            radius: 9000,
            unit: 'meter',
            height: 8000,
            difference: true,
            gradient: {
                1: '#FF4C2F',
                0.8: '#FAA53F',
                0.6: '#FFF100',
                0.5: '#7DF675',
                0.4: '#5CE182',
                0.2: '#29CF6F',
            },
            value: function (index, feature) {
                return feature.properties.count;
            },
            opacity: [0, 1],
            heightBezier: [0, 0.53, 0.37, 0.98]
        });
        loca.add(heatmap);

        map.value.on('click', () => {
            heatmap.addAnimate({
                key: 'radius',
                value: [0, 1],
                random: true,
                transform: 1000,
                delay: 6000,
                easing: 'BounceOut' //https://redmed.github.io/chito/example/easing.html
            });
        });


    } catch (error) {
        console.error('地图加载失败：', error)
    }
}

onMounted(() => {
    initMap()
})



onUnmounted(() => {
    // 销毁地图实例
    if (map.value) {
        map.value.destroy()
    }
})
</script>

<template>
    <div class="page-container">
        <div class="map-container" ref="mapContainer"></div>
    </div>
</template>
<style lang="scss"></style>
<style lang="scss" scoped>
.map-container {
    width: 100%;
    height: 100vh;
    position: relative;
}
</style>
