<template>
  <div class="map" id="mapEchart" style="width:100%;height:calc(100vh - 100px) ;"></div>

  <div class="animation-controls">
    <button @click="toggleAnimation">
      {{ isAnimating ? '暂停' : '开始' }}
    </button>
  </div>
</template>

<script setup>
import geoJson from "./json/chaoyang_street.json";
import * as echarts from "echarts";
import "echarts-gl";
import { onMounted, ref, onUnmounted } from "vue";

const isAnimating = ref(true);
let animationId = null;
let myChart = null;
const chartMap = () => {
  myChart = echarts.init(document.getElementById("mapEchart"));
  echarts.registerMap("chaoyang", geoJson);

  // 缓存地图实例，避免重复初始化
  window.mapInstance = myChart;

  let option = {
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: function (params) {
        return `${params.name}<br/> 人数: ${params.value ? params.value[0] : '未知'} <br/> 日期: ${params.value ? params.value[1] : '未知'}`;
      }
    },
    visualMap: [
      {
        type: "continuous",
        text: ["高", "低"],
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
          { name: '和平街街道', value: [77127, '2025-01-01'] },
          { name: '大屯街道', value: [95506, '2025-01-01'] },
          { name: '崔各庄乡', value: [27348, '2025-01-01'] },
          { name: '六里屯街道', value: [58536, '2025-01-01'] },
          { name: '潘家园街道', value: [75282, '2025-01-01'] },
          { name: '十八里店乡', value: [46408, '2025-01-01'] },
          { name: '东湖街道', value: [46728, '2025-01-01'] },
          { name: '三里屯街道', value: [35514, '2025-01-01'] },
          { name: '将台乡', value: [30240, '2025-01-01'] },
          { name: '孙河乡', value: [23013, '2025-01-01'] },
          { name: '呼家楼街道', value: [60807, '2025-01-01'] },
          { name: '金盏乡', value: [28512, '2025-01-01'] },
          { name: '劲松街道', value: [77722, '2025-01-01'] },
          { name: '酒仙桥街道', value: [66878, '2025-01-01'] },
          { name: '左家庄街道', value: [62770, '2025-01-01'] },
          { name: '三间房乡', value: [65694, '2025-01-01'] },
          { name: '亚运村街道', value: [46839, '2025-01-01'] },
          { name: '团结湖街道', value: [30862, '2025-01-01'] },
          { name: '双井街道', value: [75585, '2025-01-01'] },
          { name: '朝外街道', value: [41730, '2025-01-01'] },
          { name: '首都机场街道', value: [22245, '2025-01-01'] },
          { name: '豆各庄乡', value: [22097, '2025-01-01'] },
          { name: '建外街道', value: [34536, '2025-01-01'] },
          { name: '王四营乡', value: [20952, '2025-01-01'] },
          { name: '太阳宫乡', value: [70526, '2025-01-01'] },
          { name: '南磨房乡', value: [72129, '2025-01-01'] },
          { name: '来广营乡', value: [82011, '2025-01-01'] },
          { name: '奥运村街道', value: [71422, '2025-01-01'] },
          { name: '小红门乡', value: [31887, '2025-01-01'] },
          { name: '常营回族乡', value: [44028, '2025-01-01'] },
          { name: '管庄乡', value: [66207, '2025-01-01'] },
          { name: '望京街道', value: [98233, '2025-01-01'] },
          { name: '东坝乡', value: [73832, '2025-01-01'] },
          { name: '小关街道', value: [43134, '2025-01-01'] },
          { name: '垡头街道', value: [39590, '2025-01-01'] },
          { name: '黑庄户乡', value: [22132, '2025-01-01'] },
          { name: '麦子店街道', value: [23224, '2025-01-01'] },
          { name: '八里庄街道', value: [79887, '2025-01-01'] },
          { name: '东风乡', value: [37200, '2025-01-01'] },
          { name: '平房乡', value: [46959, '2025-01-01'] },
          { name: '香河园街道', value: [33278, '2025-01-01'] },
          { name: '安贞街道', value: [41944, '2025-01-01'] },
          { name: '高碑店乡', value: [56268, '2025-01-01'] },
        ],
      }
    ],
  };

  myChart.setOption(option);

  // 启动光照动画
  startLightAnimation();

  // 优化 resize 事件，避免频繁触发
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      myChart.resize();
    }, 100);
  });
};

// onMounted(() => {
//   chartMap();
// });

// 添加光照动画函数
const startLightAnimation = () => {
  const animateLight = () => {
    if (!isAnimating.value || !myChart) return;

    const time = Date.now() / 2000;
    const alpha = 55 + Math.sin(time) * 30;
    const beta = 10 + Math.cos(time) * 30;

    const currentOption = myChart.getOption();
    if (currentOption && currentOption.series && currentOption.series[0]) {
      currentOption.series[0].light.main.alpha = alpha;
      currentOption.series[0].light.main.beta = beta;

      myChart.setOption(currentOption, {
        replace: false,
        silent: true
      });
    }

    animationId = requestAnimationFrame(animateLight);
  };

  animateLight();
};

// 添加控制动画的函数
const toggleAnimation = () => {
  isAnimating.value = !isAnimating.value;
  if (isAnimating.value) {
    startLightAnimation();
  } else if (animationId) {
    cancelAnimationFrame(animationId);
  }
};

// 修改 onMounted
onMounted(() => {
  chartMap();
});

// 添加清理函数
onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (myChart) {
    myChart.dispose();
  }
});
</script>

<style scoped>
.map {
  background: url('@/assets/imgs/bg01.jpg');
}
</style>
