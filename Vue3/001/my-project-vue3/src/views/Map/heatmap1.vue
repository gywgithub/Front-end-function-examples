<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { onMounted, onUnmounted, ref } from 'vue'
// 导入朝阳区街道数据
import geojsonData2 from './Data/chaoyang_street.json'

// 高德地图API密钥
const API_KEY = '715ae0980e2fc7aa8af8e64cf3f862ab'

let geojsonData = {
    ...geojsonData2,
}
console.log('geojsonData: ', geojsonData)

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

// 街道颜色配置 - 为每个街道分配不同的颜色
const streetColors = {
    // 预设一些鲜明的颜色，用于区分不同街道
    colors: [
        '#1E90FF',
        '#FF4500',
        '#32CD32',
        '#FFD700',
        '#9370DB',
        '#FF69B4',
        '#00CED1',
        '#FF8C00',
        '#8A2BE2',
        '#00FF7F',
        '#DC143C',
        '#00BFFF',
        '#FF1493',
        '#4682B4',
        '#FF6347',
        '#20B2AA',
        '#9932CC',
        '#FF4500',
        '#3CB371',
        '#FF00FF',
        '#1E90FF',
        '#ADFF2F',
        '#FA8072',
        '#87CEEB',
        '#7B68EE',
        '#FFA500',
        '#48D1CC',
        '#C71585',
        '#6495ED',
        '#DDA0DD',
        '#FF6347',
        '#40E0D0',
        '#BA55D3',
        '#4169E1',
        '#F08080',
        '#00FA9A',
        '#D8BFD8',
        '#DAA520',
        '#66CDAA',
        '#DB7093',
        '#F0E68C',
        '#AFEEEE',
        '#B22222',
        '#E9967A',
    ],
    // 获取颜色函数
    getColor: function (index) {
        return this.colors[index % this.colors.length]
    },
}

console.log(streetColors.getColor(0))

// 初始化地图
const initMap = async () => {
    try {
        window._AMapSecurityConfig = {
            //   securityJsCode: '30d5a921eacba484d637b043d7bb516a', // 个人
            securityJsCode: '1b6c4d01d851fd528ce410e884fd399e', // 企业
        }

        // 加载高德地图API，同时加载Loca插件（只需加载一次）
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
            zoom: 11.14,
            viewMode: '3D',
            pitch: 45,
            // pitch: 0,
            mapStyle: 'amap://styles/darkblue', // 极夜蓝
            // mapStyle: 'amap://styles/blue', // 靛青蓝
            // mapStyle: 'amap://styles/dark', // 幻影黑
            center: [116.485925, 39.921055],
            showBuildingBlock: false,
            showLabel: false,
            // 关闭右上角控制面板
            controlBar: false,
            // features: ['bg', 'point'],
            features: ['bg'],
        })



        // 添加街道描边
        geojsonData.features.forEach((v) => {
            v.geometry.coordinates.forEach((v2) => {
                new AMap.Polyline({
                    path: v2,
                    strokeColor: '#3c6697',
                    strokeWeight: 2,
                    map: map.value,
                })
            })
        })



        // 创建Loca容器，确保map.value正确传入
        let loca = (window.loca = new Loca.Container({
            map: map.value,
        }))

        // 设置环境光照
        // intensity: 环境光强度
        // color: 环境光颜色
        loca.ambLight = {
            intensity: 0.3,
            color: '#fff',
        }

        // 设置平行光照
        // intensity: 平行光强度
        // color: 平行光颜色
        // target: 光照目标点坐标[x,y,z]
        // position: 光源位置[x,y,z]
        loca.dirLight = {
            intensity: 0.6,
            color: '#fff',
            target: [0, 0, 0],
            position: [0, -1, 1],
        }

        // 设置点光源
        // color: 点光源颜色
        // position: 点光源位置[经度,纬度,高度]
        // intensity: 点光源强度
        // distance: 点光源照射距离
        loca.pointLight = {
            color: 'rgb(100,100,100)',
            position: [120.24289, 30.341335, 20000],
            intensity: 3,
            distance: 50000,
        }

        // 创建GeoJSON数据源
        let geo = new Loca.GeoJSONSource({
            data: geojsonData,
        })

        console.log('geo: ', geo)


        let colors = [
            '#34b3fd',
            '#34b3fd',
            '#34b3fd',
            '#34b3fd',
            '#34b3fd',
            '#34b3fd',
            '#34b3fd',
            '#34b3fd',
            '#34b3fd',
        ].reverse()
        // let height = [1000, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000]
        // let height = [100, 100, 100, 100, 100, 100, 100, 100, 100]
        // let height = [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]
        let height = [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000]

        // 修复PolygonLayer初始化，添加loca参数
        let pl = new Loca.PolygonLayer({
            loca: loca, // 添加loca参数
            zIndex: 120,
            opacity: 0.8,
            // cullface: 'none',
            shininess: 10,
            hasSide: true,
        })

        pl.setSource(geo)
        pl.setStyle({
            topColor: function (index, feature) {
                let v = feature.properties.health * 100
                return '#34b3fd'
            },
            sideTopColor: function (index, feature) {
                return '#34b3fd'
            },
            sideBottomColor: function (index, feature) {
                // let v = feature.properties.value;
                let v = feature.properties.health * 100
                return '#34b3fd'
            },
            height: 1000,
            altitude: 0,
        })
        loca.add(pl)

        // 创建纯文本标记
        let text = new AMap.Text({
            text: '纯文本标记',
            anchor: 'center', // 设置文本标记锚点
            draggable: true,
            cursor: 'pointer',
            angle: 0,
            visible: false,
            offset: [0, -105],
            style: {
                padding: '5px 10px',
                'margin-bottom': '1rem',
                'border-radius': '.25rem',
                'background-color': 'rgba(0,0,0,0.5)',
                // 'width': '12rem',
                'border-width': 0,
                'box-shadow': '0 2px 6px 0 rgba(255, 255, 255, .3)',
                'text-align': 'center',
                'font-size': '16px',
                color: '#fff',
            },
        })
        text.setMap(map.value)
        // 拾取
        map.value.on('mousemove', (e) => {
            let feat = pl.queryFeature(e.pixel.toArray())
            console.log('feat: ', feat)
            if (feat) {
                text.show()
                let health = feat.properties.health
                text.setText(
                    feat.properties.name +
                    ' <br/><div style="margin-top: 10px;text-align:left;">数据：' +
                    parseInt(health * 100) +
                    '12</div> <div style="margin-top: 4px;text-align:left;">户籍人口:79811人</div><div style="margin-top: 4px;text-align:left;">流动人口:22331人</div><div style="margin-top: 4px;text-align:left;">统计日期:2025-7</div>',
                )
                text.setPosition(e.lnglat)

                pl.setStyle({
                    topColor: (index, feature) => {
                        if (feature === feat) {
                            return [164, 241, 199, 0.5]
                        }
                        let v = feature.properties.health * 100
                        return '#34b3fd'
                    },
                    sideTopColor: (index, feature) => {
                        if (feature === feat) {
                            return [164, 241, 199, 0.5]
                        }
                        let v = feature.properties.health * 100
                        return '#34b3fd'
                    },
                    sideBottomColor: (index, feature) => {
                        if (feature === feat) {
                            return [164, 241, 199, 0.5]
                        }
                        let v = feature.properties.health * 100
                        return '#34b3fd'
                    },
                    height: 1000,
                })
            } else {
                text.hide()
                pl.setStyle({
                    topColor: (index, feature) => {
                        return '#34b3fd'
                    },
                    sideTopColor: (index, feature) => {
                        return '#34b3fd'
                    },
                    sideBottomColor: (index, feature) => {
                        return '#34b3fd'
                    },
                    height: 1000,
                })
            }
        })


        // 热力图
        let heatmap = new Loca.HeatMapLayer({
            zIndex: 10,
            opacity: 1,
            visible: true,
            radius: 30, // 增大半径
        });


        let heatData = {
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
                        "coordinates": [119.518251, 35.688427]
                    },
                    "properties": {
                        "count": 31
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.523751, 35.620927]
                    },
                    "properties": {
                        "count": 980
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.529251, 35.611927]
                    },
                    "properties": {
                        "count": 1481
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
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.529251, 35.643427]
                    },
                    "properties": {
                        "count": 1127
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.529251, 35.656927]
                    },
                    "properties": {
                        "count": 1213
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.529251, 35.661427]
                    },
                    "properties": {
                        "count": 11
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.529251, 35.697427]
                    },
                    "properties": {
                        "count": 12
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.529251, 35.701927]
                    },
                    "properties": {
                        "count": 1302
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.529251, 36.763927]
                    },
                    "properties": {
                        "count": 542
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.534751, 35.598427]
                    },
                    "properties": {
                        "count": 3
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.534751, 35.629927]
                    },
                    "properties": {
                        "count": 3
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.534751, 35.652427]
                    },
                    "properties": {
                        "count": 6
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.534751, 35.674927]
                    },
                    "properties": {
                        "count": 321
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.534751, 36.750427]
                    },
                    "properties": {
                        "count": 763
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.540251, 35.593927]
                    },
                    "properties": {
                        "count": 16
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.540251, 35.598427]
                    },
                    "properties": {
                        "count": 191
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.540251, 35.625427]
                    },
                    "properties": {
                        "count": 1183
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.540251, 35.629927]
                    },
                    "properties": {
                        "count": 15
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.540251, 35.674927]
                    },
                    "properties": {
                        "count": 375
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.540251, 35.679427]
                    },
                    "properties": {
                        "count": 44
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.540251, 35.697427]
                    },
                    "properties": {
                        "count": 652
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.540251, 35.701927]
                    },
                    "properties": {
                        "count": 8
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.540251, 35.706427]
                    },
                    "properties": {
                        "count": 3
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.540251, 35.710927]
                    },
                    "properties": {
                        "count": 6
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.540251, 36.736927]
                    },
                    "properties": {
                        "count": 4
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.540251, 36.781927]
                    },
                    "properties": {
                        "count": 564
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.540251, 36.786427]
                    },
                    "properties": {
                        "count": 3
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.540251, 36.790927]
                    },
                    "properties": {
                        "count": 771
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.545751, 35.598427]
                    },
                    "properties": {
                        "count": 177
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.545751, 35.602927]
                    },
                    "properties": {
                        "count": 741
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.545751, 35.652427]
                    },
                    "properties": {
                        "count": 15
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.545751, 35.665927]
                    },
                    "properties": {
                        "count": 219
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [119.545751, 35.674927]
                    },
                    "properties": {
                        "count": 16
                    }
                }
            ]
        }

    //   let mock_data2 = {
    //         "type": "FeatureCollection",
    //         "features": [
    //             {
    //                 "type": "Feature",
    //                 "geometry": {
    //                     "type": "Point",
    //                     "coordinates": [119.518251, 35.683927]
    //                 },
    //                 "properties": {
    //                     "count": 1159
    //                 }
    //             }
    //         ]
    //     }

        let heatData2 = {
            "type": "FeatureCollection",
            "features": []
        }
        let geo2 = new Loca.GeoJSONSource({
            data: heatData
        });
        //  let geo = new Loca.GeoJSONSource({
        //     url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/tsing.json',
        // });
        heatmap.setSource(geo2, {
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

        // 生长动画
        map.value.on('click', function () {
            pl.addAnimate(
                {
                    key: 'height',
                    value: [0, 1],
                    duration: 1000,
                    easing: 'CubicInOut',
                },
                function () {
                    // console.log(123);
                },
            )

            // heatmap.addAnimate({
            //     key: 'radius',
            //     value: [0, 1],
            //     random: true,
            //     transform: 1000,
            //     delay: 6000,
            //     easing: 'BounceOut' //https://redmed.github.io/chito/example/easing.html
            // });
        })
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
