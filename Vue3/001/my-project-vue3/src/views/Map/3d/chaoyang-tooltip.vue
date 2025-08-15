<template>
  <div class="map" id="mapEchart" style="width:100%;height:calc(100vh - 100px) ;"></div>
</template>

<script setup>
import geoJson from "./json/chaoyang_street.json";
import * as echarts from "echarts";
import "echarts-gl";
import { onMounted } from "vue";

const chartMap = () => {
  var myChart = echarts.init(document.getElementById("mapEchart"));
  echarts.registerMap("chaoyang", geoJson);

  // 缓存地图实例，避免重复初始化
  window.mapInstance = myChart;

  let option = {
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: function (params) {
        return `${params.name}<br/> 数值: ${params.value ? params.value[0] : '未知'} <br/> 日期: ${params.value ? params.value[1] : '未知'}`;
      }
    },
    visualMap: [
      {
        type: "continuous",
        text: ["低", "高"],
        show: true,
        calculable: true,
        max: 100000,
        inRange: {
          color: ["#87aa66", "#eba438", "#d94d4c"],
        },
      },
    ],
    series: [
      {
        type: 'map3D',
        map: 'chaoyang',
        roam: true,
        regionHeight: 4,
        animation: true,
        animationDuration: 300,
        animationEasing: 'cubicOut',
        // 基础样式设置
        itemStyle: {
          color: "#007aff",
          opacity: 0.8,
          borderWidth: 0.4,
          borderColor: "#000",
        },
        // 优化视角控制，减少动画带来的闪烁
        viewControl: {
          autoRotate: false,
          distance: 190,
          minAlpha: 5,
          maxAlpha: 90,
          minBeta: -360,
          maxBeta: 360,
          animation: false,  // 关闭视角动画，减少闪烁
          damping: 0.8,
          rotateSensitivity: 1,
          zoomSensitivity: 1,
          panSensitivity: 1,
          alpha: 55, // 调整上下角度，让地图更往上一点 (新增)
          beta: 0,   // 左右角度 (新增)
        },
        // 优化高亮效果，减少样式突变
        emphasis: {
          disabled: true,
          label: {
            show: false
          },
          itemStyle: {
            // color: "#00baff",
            // // 增加过渡效果
            // transitionDuration: 0.3
          },
        },
        label: {
          show: false,
          position: "top",
          color: "#111",
          fontSize: 14,
          lineHeight: 16,
        },
        shading: "lambert",
        // 优化光照设置，减少阴影计算
        light: {
          main: {
            intensity: 1,
            shadow: true,
            // 降低阴影质量换取性能
            shadowQuality: "low",
            alpha: 55,
            beta: 10,
          },
          ambient: {
            intensity: 0.7,
          },
        },
        data: [
          { name: '和平街街道', value: [75506, '2025-01-01'] },
          { name: '大屯街道', value: [95506, '2025-01-01'] },
          { name: '崔各庄乡', value: [27348, '2025-01-01'] },
          { name: '六里屯街道', value: [100, '2025-01-01'] },
        ]
      }
    ],
  };

  myChart.setOption(option);

  // 优化 resize 事件，避免频繁触发
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      myChart.resize();
    }, 100);
  });
};

onMounted(() => {
  chartMap();
});
</script>

<style scoped>
.map {
  background: url('@/assets/imgs/bg01.jpg');
}
</style>
