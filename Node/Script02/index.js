console.log('script02 -> index.js')

/**
 * node 脚本请求头静态配置获取接口数据
 */

import fetch from 'node-fetch'


const myHeaders = {
  'Accept': '*/*',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.9',
  'Connection': 'keep-alive',
  'Content-Type': 'application/json',
  'Cookie': 'MONITOR_WEB_ID=7b3f4252-02fd-4eaa-bd15-0c3430dd3f92; _ga=GA1.2.1258033918.1636683224; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25226992469115525940776%2522%252C%2522ssid%2522%253A%25227eb7d8b0-0b08-4466-a949-d37ff9875d72%2522%252C%2522user_unique_id%2522%253A%25226992469115525940776%2522%252C%2522timestamp%2522%253A1628061088734%257D; _tea_utm_cache_2608=undefined; _gid=GA1.2.878988666.1649298618; passport_csrf_token=793a4de0ae64c3c56bf401d73ffeecfe; passport_csrf_token_default=793a4de0ae64c3c56bf401d73ffeecfe; _tea_utm_cache_2018=undefined; n_mh=-9BCfv0wc3AbKIzk_CClvreSd3Ha09_rY-Tk7jYvpso; sid_guard=34879ecf4431d34414fc488788c647ce%7C1649386804%7C5184000%7CTue%2C+07-Jun-2022+03%3A00%3A04+GMT; uid_tt=80f5545c85ed7bc70c7063a362ef5b19; uid_tt_ss=80f5545c85ed7bc70c7063a362ef5b19; sid_tt=34879ecf4431d34414fc488788c647ce; sessionid=34879ecf4431d34414fc488788c647ce; sessionid_ss=34879ecf4431d34414fc488788c647ce; sid_ucp_v1=1.0.0-KGY0OGIzN2NmYjU3OWUxNmM1NzlhOTk5NjNjN2Q4YmQxNjU0ZDg3NGQKFgjdm_DA_fVxELTKvpIGGLAUOAFA6gcaAmxmIiAzNDg3OWVjZjQ0MzFkMzQ0MTRmYzQ4ODc4OGM2NDdjZQ; ssid_ucp_v1=1.0.0-KGY0OGIzN2NmYjU3OWUxNmM1NzlhOTk5NjNjN2Q4YmQxNjU0ZDg3NGQKFgjdm_DA_fVxELTKvpIGGLAUOAFA6gcaAmxmIiAzNDg3OWVjZjQ0MzFkMzQ0MTRmYzQ4ODc4OGM2NDdjZQ',
  'Host': 'api.juejin.cn',
  'Origin': 'https://juejin.cn',
  'Referer': 'https://juejin.cn/',
  'sec-ch-ua': "' Not A;Brand';v='99', 'Chromium';v='100', 'Google Chrome';v='100'",
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': "'Windows'",
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-site',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36'
}

// get 请求，获取当前页数据
const url = 'https://api.juejin.cn/growth_api/v1/get_counts?aid=2608&uuid=6992469115525940776'

// then 链式调用写法
// fetch(url, {
//   method: 'GET',
//   headers: myHeaders
// }).then(res => res.json())
// .then(data => {
//   console.log(data)
// })

// async await 同步写法
const response = await fetch(url, {
  method: 'GET',
  headers: myHeaders
})
const data = await response.json()
console.log(data)

// 如果 get 数据正确获取，执行 post
if (data && data.err_msg === 'success') {
  console.log('get success')
  // 2022/4/11 13:07
  // _02B4Z6wo00f01wiYvxQAAIDDiJpFVIy.Zn8InLuAAKB.bTI59VmggnHnRuQb7110GGpxJbDSV2nQgZwtihBEdOnH-Wc4houwKy7cZMByXl3geLj02Va65c5TgxnqJOnXe1kjBKu871ycHpjt2c
  const _signature = '_02B4Z6wo00101OSw8jwAAIDAZLIIfXeb6QzktPaAAFuFkZSugcoFEqlJ8mty.cnUOpFQc78SfIEAnwHPo1vvHLINlIhYmA4K7dqSip3lol12ZUFpDxG-F3bY7dO-j8qxnWF2U-QEgOZN3YXOa5'
  const url2 = 'https://api.juejin.cn/growth_api/v1/check_in?aid=2608&uuid=6992469115525940776&_signature=' + _signature
  const res2 = await fetch(url2, {
    method: 'POST',
    headers: myHeaders
  })
  const data2 = await res2.json()
  console.log(data2)
} else {
  console.error('get error')
}
