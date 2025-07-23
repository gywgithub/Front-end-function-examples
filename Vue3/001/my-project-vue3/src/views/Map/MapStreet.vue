<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { onMounted, onUnmounted, ref } from 'vue'
// 导入朝阳区街道数据
import geojsonData2 from './Data/chaoyang_street.json'
// import geojsonData2 from './Data/chaoyang_resouce.json'

// 高德地图API密钥
const API_KEY = '715ae0980e2fc7aa8af8e64cf3f862ab'

function adjustCoordinates(features, offset = [0.0015, 0.0015]) {
  // 默认[经度偏移, 纬度偏移]
  return features.map((feature) => {
    const geometry = { ...feature.geometry }
    if (geometry.type === 'Polygon') {
      geometry.coordinates = geometry.coordinates.map((rings) =>
        rings.map((point) => [
          point[0] + offset[0], // 经度调整
          point[1] + offset[1], // 纬度调整
        ]),
      )
    }
    return { ...feature, geometry }
  })
}

let geojsonData = {
  ...geojsonData2,
  // features: adjustCoordinates(geojsonData2.features, [0.006, 0.0016]), // 同时设置经纬偏移
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
    //   viewMode: '3D',
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
    //   features: ['bg'],
    })

    // console.log(2222)
    // console.log('========= ', geojsonData)
    // let lng = 116.397428
    // let lat = 39.90923
    // const geocoder = new AMap.Geocoder({ city: '全国' })

    // let index = 14 - 1
    // geojsonData.features.forEach((v2, i2) => {
    //     if (i2 > 9) {
    //             let arr0 =v2.geometry.coordinates[0]
    // // 创建一个Map来存储街道计数
    // const townshipCounts = new Map()

    // // 使用Promise处理异步请求
    // const promises = arr0.map((v) => {
    //   return new Promise((resolve) => {
    //     geocoder.getAddress([v[0], v[1]], (status, result) => {
    //       if (status === 'complete') {
    //         const { township, district } = result.regeocode.addressComponent
    //         if (township && district === '朝阳区') {
    //           resolve({ township, district })
    //         } else {
    //           resolve(null)
    //         }
    //       } else {
    //         resolve(null)
    //       }
    //     })
    //   })
    // })

    // // 等待所有请求完成并处理结果
    // Promise.all(promises).then((results) => {
    //   // 过滤掉null值并统计街道出现次数
    //   results.filter(Boolean).forEach((result) => {
    //     const count = townshipCounts.get(result.township) || 0
    //     townshipCounts.set(result.township, count + 1)
    //   })

    //   // 输出统计结果
    //   console.log(i2 + 1)
    //   console.log('街道统计结果：')
    //   townshipCounts.forEach((count, township) => {
    //     console.log( `${township}: ${count}次`)
    //   })
    // })

    //     }
    // })

    // --- 根据单个值获取街道数据 ---
    // let index = 35 - 1
    // let arr0 = geojsonData.features[index].geometry.coordinates[0]
    // // 创建一个Map来存储街道计数
    // const townshipCounts = new Map()

    // // 使用Promise处理异步请求
    // const promises = arr0.map((v) => {
    //   return new Promise((resolve) => {
    //     geocoder.getAddress([v[0], v[1]], (status, result) => {
    //       console.log(344567)
    //       console.log(index)
    //       console.log('result', result)
    //       if (status === 'complete') {
    //         const { township, district } = result.regeocode.addressComponent
    //         if (township && district === '朝阳区') {
    //           resolve({ township, district })
    //         } else {
    //           resolve(null)
    //         }
    //       } else {
    //         resolve(null)
    //       }
    //     })
    //   })
    // })

    // // 等待所有请求完成并处理结果
    // Promise.all(promises).then((results) => {
    //   // 过滤掉null值并统计街道出现次数
    //   results.filter(Boolean).forEach((result) => {
    //     const count = townshipCounts.get(result.township) || 0
    //     townshipCounts.set(result.township, count + 1)
    //   })

    //   // 输出统计结果
    //   console.log(index + 1)
    //   console.log('街道统计结果：')
    //   townshipCounts.forEach((count, township) => {
    //     console.log(`${township}: ${count}次`)
    //   })
    // })
    // --- end ---

    // 解析经纬度（示例：[116.397428, 39.90923]）
    // geocoder.getAddress([lng, lat], (status, result) => {
    //   console.log('1111111111')
    //   if (status === 'complete') {
    //     const { township, district } = result.regeocode.addressComponent
    //     console.log(`街道：${township}, 区：${district}`) // 输出：街道：望京街道, 区：朝阳区
    //   }
    // })

    // 添加街道描边
    geojsonData.features.forEach((v) => {
      v.geometry.coordinates.forEach((v2) => {
        new AMap.Polyline({
          path: v2,
          strokeColor: '#3c6697',
          // strokeColor: "red",
          strokeWeight: 2,
          map: map.value,
        })
      })
    })

    // 查询朝阳区
    // const options1 = {
    //   extensions: 'all',
    //   level: 'district', // 设置查询行政区级别为区
    // }
    // let district1 = new AMap.DistrictSearch(options1)
    //查询北京市区域
    // district1.search('朝阳区', function (status, result) {
    //   console.log(222)
    //   console.log(result)
    //   var bounds = result.districtList[0]['boundaries']
    //   var mask = []
    //   for (var i = 0; i < bounds.length; i++) {
    //     mask.push([bounds[i]])
    //   }

    //   //添加描边
    //   for (var i = 0; i < bounds.length; i++) {
    //     new AMap.Polyline({
    //       path: bounds[i],
    //       strokeColor: '#3c6697',
    //       // strokeColor: "red",
    //       strokeWeight: 2,
    //       map: map.value,
    //     })
    //   }

    // // 创建行政区查询对象
    const districtSearch = new AMap.DistrictSearch({
      level: 'street', // 设置查询级别为街道级
      subdistrict: 2, // 返回下一级行政区
      extensions: 'all', // 返回行政区边界坐标组等具体信息
    })

    // 查询朝阳区的街道
    districtSearch.search('朝阳区', (status, result) => {
      console.log(3333)
      console.log(status)
      console.log(result)
      if (status === 'complete') {
        const streets = result.districtList[0].districtList
        console.log('朝阳区街道数据：', streets)

        // 添加街道名称标注
        // streets.forEach((street, index) => {
        //   const center = street.center
        //   const text = new AMap.Text({
        //     text: street.name,
        //     position: [center.lng, center.lat],
        //     anchor: 'center',
        //     style: {
        //       'background-color': 'rgba(0,0,0,0.5)',
        //       'border-width': 0,
        //       'text-align': 'center',
        //       'font-size': '12px',
        //       color: '#fff',
        //       padding: '2px 5px',
        //     },
        //   })
        //   text.setMap(map.value)
        // })
      }
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
    let geo3 = new Loca.GeoJSONSource({
      data: geojsonData,
    })

    console.log('geo3: ', geo3)

    // let colors = [
    //   '#FFF8B4',
    //   '#D3F299',
    //   '#9FE084',
    //   '#5ACA70',
    //   '#00AF53',
    //   '#00873A',
    //   '#006B31',
    //   '#004835',
    //   '#003829',
    // ].reverse()
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
    let height = [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]
    // let height = [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000]

    // 修复PolygonLayer初始化，添加loca参数
    let pl = new Loca.PolygonLayer({
      loca: loca, // 添加loca参数
      zIndex: 120,
      opacity: 0.8,
      // cullface: 'none',
      shininess: 10,
      hasSide: true,
    })

    pl.setSource(geo3)
    pl.setStyle({
      topColor: function (index, feature) {
        let v = feature.properties.health * 100
        return v < 40
          ? colors[8]
          : v < 50
            ? colors[7]
            : v < 55
              ? colors[6]
              : v < 60
                ? colors[5]
                : v < 65
                  ? colors[4]
                  : v < 70
                    ? colors[3]
                    : v < 75
                      ? colors[2]
                      : v < 80
                        ? colors[1]
                        : v < 100
                          ? colors[0]
                          : '#34b3fd'
      },
      sideTopColor: function (index, feature) {
        // let v = feature.properties.value;
        let v = feature.properties.health * 100
        return v < 40
          ? colors[8]
          : v < 50
            ? colors[7]
            : v < 55
              ? colors[6]
              : v < 60
                ? colors[5]
                : v < 65
                  ? colors[4]
                  : v < 70
                    ? colors[3]
                    : v < 75
                      ? colors[2]
                      : v < 80
                        ? colors[1]
                        : v < 100
                          ? colors[0]
                          : '#34b3fd'
      },
      sideBottomColor: function (index, feature) {
        // let v = feature.properties.value;
        let v = feature.properties.health * 100
        return v < 40
          ? colors[8]
          : v < 50
            ? colors[7]
            : v < 55
              ? colors[6]
              : v < 60
                ? colors[5]
                : v < 65
                  ? colors[4]
                  : v < 70
                    ? colors[3]
                    : v < 75
                      ? colors[2]
                      : v < 80
                        ? colors[1]
                        : v < 100
                          ? colors[0]
                          : '#34b3fd'
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
    //   console.log('feat: ', feat)
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
            return v < 40
              ? colors[8]
              : v < 50
                ? colors[7]
                : v < 55
                  ? colors[6]
                  : v < 60
                    ? colors[5]
                    : v < 65
                      ? colors[4]
                      : v < 70
                        ? colors[3]
                        : v < 75
                          ? colors[2]
                          : v < 80
                            ? colors[1]
                            : v < 100
                              ? colors[0]
                              : '#34b3fd'
          },
          sideTopColor: (index, feature) => {
            if (feature === feat) {
              return [164, 241, 199, 0.5]
            }
            let v = feature.properties.health * 100
            return v < 40
              ? colors[8]
              : v < 50
                ? colors[7]
                : v < 55
                  ? colors[6]
                  : v < 60
                    ? colors[5]
                    : v < 65
                      ? colors[4]
                      : v < 70
                        ? colors[3]
                        : v < 75
                          ? colors[2]
                          : v < 80
                            ? colors[1]
                            : v < 100
                              ? colors[0]
                              : '#34b3fd'
          },
          sideBottomColor: (index, feature) => {
            if (feature === feat) {
              return [164, 241, 199, 0.5]
            }
            let v = feature.properties.health * 100
            return v < 40
              ? colors[8]
              : v < 50
                ? colors[7]
                : v < 55
                  ? colors[6]
                  : v < 60
                    ? colors[5]
                    : v < 65
                      ? colors[4]
                      : v < 70
                        ? colors[3]
                        : v < 75
                          ? colors[2]
                          : v < 80
                            ? colors[1]
                            : v < 100
                              ? colors[0]
                              : '#34b3fd'
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
<style lang="scss">
</style>
<style lang="scss" scoped>
.page-container {
}

.map-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.street-info-panel {
  position: absolute;
  top: 20%;
  left: 10%;
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid #0091ea;
  border-radius: 4px;
  padding: 15px;
  color: white;
  z-index: 100;
  min-width: 250px;
  display: none;
}

.street-name {
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #0091ea;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.street-info {
  margin-bottom: 10px;
  font-size: 14px;
}

.number {
  color: #00a8ff;
  font-weight: bold;
  font-size: 18px;
}

.area-panel {
  position: absolute;
  bottom: 5%;
  right: 5%;
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid #0091ea;
  border-radius: 4px;
  padding: 10px;
  color: white;
  z-index: 100;
}
</style>
