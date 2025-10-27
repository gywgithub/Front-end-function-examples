<template>
  <!-- <div class="map" id="mapEchart" style="width:500px;height:600px;border:2px solid red;margin:0 auto;"></div> -->
  <div class="map" id="mapEchart" style="width:100%;height:calc(100vh - 100px) ;"></div>
</template>

<script setup>
// 关于geoJSON 数据，可以访问 https://geojson.io 创建，或者在里面验证数据是否正常

import geoJson from "./json/chaoyang_street.json"; //该文件路径改成自己项目中的文件路径即可
// import geoJson from "./json/chaoyang_street_origin.json"; //原始文件，体积很大，性能差
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
        max: 250,
        inRange: {
          color: ["#87aa66", "#eba438", "#d94d4c"],
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
      viewControl: {
        // autoRotate: true,
        autoRotate: false, // 关闭自动旋转
        autoRotateAfterStill: 3,
        distance: 190,// 增加距离值来缩小视图 (原值: 120)
        minAlpha: 5, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
        maxAlpha: 90, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
        minBeta: -360, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
        maxBeta: 360, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]
        animation: true, // 是否开启动画。[ default: true ]
        animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
        animationEasingUpdate: "cubicInOut", // 过渡动画的缓动效果。[ default: cubicInOut ]
        // alpha: 45, // 调整上下角度，让地图更往上一点 (新增)
        // beta: 10,   // 左右角度 (新增)
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
        itemStyle: {
          color: "#ff7aff", //显示移入的区块变粉色
        },
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

      //     {
      //   // type: 'geo3D',
      //   map: 'chaoyang', // 与注册名称一致
      //   // roam: true, // 允许缩放拖动
      //   data: [ // 为每个区域绑定数据
      //     { name: '和平街街道', value: 200 },
      //     { name: '大屯街道', value: 150 }
      //   ],
      //   // emphasis: { // 高亮样式（可选）
      //   //   itemStyle: { areaColor: 'yellow' }
      //   // }
      // },
      // {
      //   type: 'scatter3D', // 3D 散点图类型（用于关联地图）
      //   coordinateSystem: 'geo3D', // 绑定到 geo3D 坐标系
      //   data: [1, 2, 3, 4, 5], // 空数据即可激活交互（如果有实际数据可填入）
      //   tooltip: {
      //     // 继承或覆盖 geo3D 的 tooltip 配置
      //     show: true
      //   }
      // },
      //3D柱状图配置项
      {
        name: "",
        type: "bar3D",
        coordinateSystem: "geo3D",
        barSize: 2,
        shading: "lambert",
        opacity: 0.1,
        bevelSize: 0.2,
        label: {
          show: false,
          formatter: "{a}",
        },
        data: [
          {
            name: '和平街街道', value: [116.408795, 39.971735, 100],
            // tooltip: {
            //   show: true,
            //   formatter: function (params) {
            //     console.log('params2242 ', params);
            //     return `${params.name}<br/>数值2: ${params.value[2]}`;
            //   }
            // }
          }
        ]
        //自定义的data数组 value中数组的含义:[杭州的经度or纬度，要展示的3d柱状图数值大小]
        // data: [
        //   { name: "杭州", value: [120.161693, 30.280059, 643] },
        //   { name: "温州", value: [120.705869, 28.001095, 98] },
        //   { name: "湖州", value: [120.094566, 30.899015, 72] },
        //   { name: "嘉兴", value: [120.762045, 30.750912, 131] },
        //   { name: "绍兴", value: [120.586673, 30.036519, 116] },
        //   { name: "丽水", value: [119.929503, 28.472979, 40] },
        //   { name: "衢州", value: [118.880768, 28.941661, 22] },
        //   { name: "金华", value: [119.654027, 29.084455, 156] },
        //   { name: "台州", value: [121.426996, 28.662297, 110] },
        //   { name: "宁波", value: [121.556686, 29.880177, 163] },
        //   { name: "舟山", value: [122.214339, 29.991092, 20] },
        // ],
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

<style lang="less" scoped></style>
