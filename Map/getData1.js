const axios = require('axios');

// 高德地图API Key
const apiKey = 'b0d489d8a86c55e7d5bcfb4ce49a25d7';

/**
 * 获取行政区边界数据
 * @param {string} cityName 城市名称
 * @param {string} districtName 区域名称
 * @returns {Promise<string|null>} 边界坐标数据
 */
async function getDistrictBoundaries(cityName, districtName) {
    const url = 'https://restapi.amap.com/rest/me/polygon/dataquery/street?key=b0d489d8a86c55e7d5bcfb4ce49a25d7&showPolygon=1&adcode=110114&pageSize=2&pageNum=1'
    // const url = `https://restapi.amap.com/rest/me/polygon/dataquery/street?key=${apiKey}&showPolygon=1&adcode=110114&pageSize=2&pageNum=1`
    // const url =  `https://restapi.amap.com/rest/me/polygon/dataquery/street?key=${apiKey}&showPolygon=1&adcode=110114&pageSize=2&pageNum=1`;
    // const url = `https://restapi.amap.com/v3/config/district?key=${apiKey}&keywords=${districtName}&subdistrict=1&extensions=all`;
    
    try {
        const response = await axios.get(url);
        if (response.data.status === '1') {
            const districts = response.data.districts;
            for (const district of districts) {
                if (district.name === districtName) {
                    return district.polyline;
                }
            }
        } else {
            console.error('请求失败:', response.data.info);
            return null;
        }
    } catch (error) {
        console.error('网络请求异常:', error.message);
        return null;
    }
}

// 示例调用
getDistrictBoundaries('北京市', '朝阳区')
    .then(boundaries => {
        if (boundaries) {
            console.log('边界数据:', boundaries);
        } else {
            console.log('未获取到边界数据');
        }
    });