/**
 * Node 爬虫脚本
 * Node 根据搜索内容获取百度百科数据
 * 运行 node index.js ，控制台输出解析内容
 */

let cheerio = require('cheerio');
let request = require('request');
let urlencode = require('urlencode');
let fs = require('fs');

// 想要搜索的内容 ， 如吊兰
let name = '吊兰'; 
let utf8 = urlencode(name);
// 百度百科查询接口,中文使用utf8编码处理一下
let url = 'https://baike.baidu.com/item/' + utf8;
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    let data = body;

    // 保存页面
    fs.writeFile('test.html', body, function(err, res){
      if (err) {
        console.log(err)
        return false;
      } else {
        console.log('save test.html success')
      }
    })

    // 使用 cheerio 模块解析 获取dom数据
    let $ = cheerio.load(data);
    let arrayData = [];
    let obj = {};
    obj['name'] = name;
    obj['function'] = '无'
    obj['nickName'] = '无'
    // 获取 ’别称‘
    $('.basic-info dl dd').each(function (i, elem) {
      if (i === 2) {
        // 别称  这里的内容中有 \n 换行符，做个全局替换
        obj['nickName'] = $(elem).text().replace(/\n/g, '');
        return false;
      }
    });
    // 获取 ’功能主治‘
    $('b').each(function (i, elem) {
      if ($(elem).text() === '功能主治') {
        obj['function'] = $(elem).parent().next().text().replace(/\n/g, '')
        return false;
      }
    });

    // 获取 ’图片‘
    let dataSrc = $('.summary-pic img').first().attr('src');
    obj['src'] = dataSrc;
    console.log(obj)
  }
});