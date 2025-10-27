<template>
  <!-- <div class="map" id="mapEchart" style="width:500px;height:600px;border:2px solid red;margin:0 auto;"></div> -->
  <div class="map" id="mapEchart" style="width:100%;height:calc(100vh - 100px) ;"></div>
</template>

<script setup>
// 关于geoJSON 数据，可以访问 https://geojson.io 创建，或者在里面验证数据是否正常

import geoJson from "./json/chaoyang_street.json"; //该文件路径改成自己项目中的文件路径即可
import * as echarts from "echarts";
import "echarts-gl"; //3D地图插件
import { onMounted } from "vue";

// 定义echarts方法
const chartMap = () => {
  var myChart = echarts.init(document.getElementById("mapEchart"));
  // 重点：不要遗漏这句代码！！
  echarts.registerMap("chaoyang", geoJson);
  // 图表配置项
  let option = {
    backgroundColor: 'transparent', // 设置背景透明
    tooltip: {
      show: true,
      trigger: 'item', // 触发类型为数据项触发
      formatter: function (params) {
        console.log('Tooltip params1: ', params);
        if (params.componentType === 'geo3D') {
          return params.name || '未知区域';
        }
        if (params.seriesType === 'bar3D') {
          return `${params.name}<br/>数值: ${params.value[2]}`;
        }
        return params.name || '';
      }
    },
    //热力图配置项
    visualMap: [
      {
        type: "continuous",
        text: ["高", "低"],
        show: false, // 隐藏视觉映射组件，但仍然应用其配置
        calculable: true,
        dimension: 2, // 使用数据的第3个维度（Z轴数值）进行映射
        // min: 0,
        max: 200,
        inRange: {
          color: ["#87aa66", "#eba438", "#d94d4c"],
          // symbolSize: [5, 50] // 控制柱子底面大小
        },
      },
    ],
    //3D地图配置项
    geo3D: {
      map: "chaoyang",
      roam: true,
      itemStyle: {
        color: "#007aff",
        opacity: 0.8,
        borderWidth: 0.4,
        borderColor: "#000",
        // areaColor: '#fff'
      },
      // tooltip: {
      //   show: true,
      //   formatter: function (params) {
      //     console.log('geo3D tooltip params: ', params);
      //     return params.name || '未知区域';
      //   }
      // },
      viewControl: {
        // autoRotate: true,
        autoRotate: false, // 关闭自动旋转
        autoRotateAfterStill: 3,
        distance: 190,// 增加距离值来缩小视图
        minDistance: 170, // 设置最小距离，限制最大放大层级
        maxDistance: 220, // 设置最大距离，限制最小缩小层级
        minAlpha: 5, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
        maxAlpha: 90, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
        minBeta: -360, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
        maxBeta: 360, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]
        animation: true, // 是否开启动画。[ default: true ]
        animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
        animationEasingUpdate: "cubicInOut", // 过渡动画的缓动效果。[ default: cubicInOut ]
        // alpha: 45, // 调整上下角度，让地图更往上一点 (新增)
        // beta: 10,   // 左右角度 (新增)
        center: [0, -10, 0] // 将地图整体上移
      },


      emphasis: {
        disabled: true, //是否可以被选中
        label: {
          //移入时的高亮文本
          show: true,
          color: "#333", //显示字体颜色变淡
          // fontSize: 18, //显示字体变大
          formatter: function (params) {
            // 可以返回任意自定义内容
            // return params.name;  // 显示区域名称
            // 或者
            return `${params.name}`;  // 自定义格式
          }
        },
        // itemStyle: {
        //   color: "#ff7aff", //显示移入的区块变粉色
        // },
      },
      label: {
        show: false,
        position: "top",
        color: "#111", //地图初始化区域字体颜色
        fontSize: 14,
        lineHeight: 16,
      },
      shading: "lambert",
      light: {
        //光照阴影
        main: {
          // color: "#fff", //光照颜色
          intensity: 1, //光照强度
          //shadowQuality: 'high', //阴影亮度
          shadow: true, //是否显示阴影
          shadowQuality: "medium", //阴影质量 ultra //阴影亮度
          alpha: 55,
          beta: 10,
        },
        ambient: {
          intensity: 0.7,
        },
      },
    },
    series: [
      //3D柱状图配置项
      {
        name: "",
        type: "bar3D",
        coordinateSystem: "geo3D",
        minHeight: 1,    // 最小高度
        maxHeight: 200,   // 最大高度

        barSize: 3,
        shading: "lambert",
        opacity: 1,
        bevelSize: 0.2,
        label: {
          show: false,
          formatter: "{a}",
        },
        data: [
          {
            name: '和平街街道', value: [116.408795,
              39.971735, 75506],
          },
          {
            name: '大屯街道', value: [116.44158,
              40.004894, 95506]
          },
          {
            name: '崔各庄乡',
            value: [116.485, 40.025, 45230]
          },
          {
            name: '六里屯街道',
            value: [116.472, 39.956, 68750]
          },
          {
            name: '亚运村街道',
            value: [116.398, 39.998, 11]
          }
        ],
        // 添加高度比例控制
        // minHeight: 10,    // 最小高度
        // maxHeight: 100,   // 最大高度
      },
    ],
  };
  myChart.setOption(option);
  //让可视化地图跟随浏览器大小缩放
  window.addEventListener("resize", () => {
    myChart.resize();
  });

};

onMounted(() => {
  // 挂载echart
  chartMap();
});
</script>

<style scoped>
.map {
  /* background-color: rgba(55, 107, 219, 0.616); */
  /* background-color: url('@/assets/imgs/bg01.jpg'); */
  background: url('@/assets/imgs/bg01.jpg');
}
</style>
