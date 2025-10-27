const fs = require('fs');
const path = require('path');
const gcoord = require('gcoord');

// 读取同级目录下的chaoyang_lunkuo_gcj02.json文件
const inputFilePath = path.join(__dirname, 'chaoyang_lunkuo_gcj02.json');
const outputFilePath = path.join(__dirname, 'chaoyang_lunkuo_wgs84.json');

// 读取GeoJSON文件
const geojsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

// 使用gcoord.transform进行坐标转换，从GCJ02到WGS84
gcoord.transform(geojsonData, gcoord.GCJ02, gcoord.WGS84);

// 将转换结果保存成新的文件
fs.writeFileSync(outputFilePath, JSON.stringify(geojsonData, null, 2));

console.log('坐标转换完成！');
console.log('输入文件:', inputFilePath);
console.log('输出文件:', outputFilePath);