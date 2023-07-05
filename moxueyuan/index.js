// ==UserScript==
// @name         用魔法打败魔法
// @namespace    http://tampermonkey.net/
// @version      0.1.30
// @description  自动播放，切换视频，自动点击弹框，支持自定义设置
// @author       Mr_J, Mr_L
// @match        *://*/*
// @icon         data:image/png;base64,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
// @grant        none
// ==/UserScript==
(async function () {
  "use strict";

  let main = function () {
    console.log("tags: ", document.getElementsByTagName("*"));
    Array.prototype.forEach.call(
      document.getElementsByTagName("*"),
      function (el) {
        ["visibilitychange", "onfocus", "onblur"].forEach((item) => {
          el[item] = function (e) {
            e.stopImmediatePropagation();
          };
        });

        ["oncontextmenu"].forEach((xcanwin) => {
          el[xcanwin] = function (e) {
            if (e.target && e.target.points == undefined) {
              // 处理普通的单击右键，跳过滑动右键
              e.stopImmediatePropagation();
            }
          };
        });
      }
    );

    console.clear = () => {};
    window.debugger = () => {};
  };

  main();

  // ----- 自定义配置 -----
  let stopAfter8h = false; // 超过8小时停止继续运行脚本

  // let r = await getContinueFlag();
  // console.log("r: ", r);
  // if (!r) {
  //   return false;
  // }

  console.log("script start");
  let text1 = "";

  /**
   * 获取是否继续的状态
   * @returns true / false
   */
  function getContinueFlag() {
    // get token
    // login
    // userid,token,eid
    // browser.cookies.getAll()
    let loginString = getCookie("login");
    console.log("login: ", loginString);

    // let loginCookieObj = decodeURIComponent(loginString)
    // console.log('loginCookieObj:', loginCookieObj)

    let loginCookieObj = JSON.parse(decodeURIComponent(loginString));
    console.log("loginCookieObj:", loginCookieObj);

    const token = loginCookieObj["token"];
    console.log("token:", token);

    let myHeaders = new Headers();
    myHeaders.append("User-Agent", "apifox/1.0.0 (https://www.apifox.cn)");

    let requestOptions = {
      method: "GET",
      //    headers: myHeaders,
      redirect: "follow",
    };

    // let start_time = 1680278400
    // let end_time = 1682870399
    let currentDate = new Date();
    // let start_time = new Date(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-01').getTime()
    let start_time = new Date(getFirstDay()).getTime();
    // console.log('start_time: ', start_time).getTime())
    let end_time = new Date(getLastDay()).getTime();

    console.log("start_time: ", start_time);
    console.log("end_time: ", end_time);

    //获取当月最后一天的日期
    function getLastDay() {
      let year = new Date().getFullYear(); //获取年份
      let month = new Date().getMonth() + 1; //获取月份
      let lastDate = new Date(year, month, 0).getDate(); //获取当月最后一日
      month = month < 10 ? "0" + month : month; //月份补 0
      return [year, month, lastDate].join("-");
    }

    //获取当月第一天的日期
    function getFirstDay() {
      let year = new Date().getFullYear(); //获取年份
      let month = new Date().getMonth() + 1; //获取月份
      let fisrtDate = "01";
      month = month < 10 ? "0" + month : month; //月份补 0
      return [year, month, fisrtDate].join("-");
    }
    console.log(getFirstDay());

    return new Promise((resolve, reject) => {
      /**
       * 获取学习时长接口
       * token - 从cookie中读取
       * start_time - 当前月第一天的时间戳
       * end_time - 当前月最后一天的时间戳
       * return true/false
       */
      fetch(
        `https://api.moxueyuan.com/c45814c9a643ea71new2/appapi.php/index?r=apiMy/getMyStudyCount&version=6.0.0&platform=pcweb&eid=25415&userid=d342c421_821a_c554_c7b8_8f4da4ef61f5
          &token=${token}
          &language=zh_CN
          &userPortalID=389
          &type=m
          &start_time=1680278400
          &end_time=1682870399`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("get learn data:");
          console.log(data);
          if (data.data && data.data.length > 0) {
            const t = data.data[0].sum_cumtime; // 有效学时
            // 29400 s = 8:10:00 (h:m:s)
            if (t > 29400 && stopAfter8h) {
              console.log("stop");
              //   return false;
              resolve(false);
            } else {
              console.log("continue");
              //   return true;
              resolve(true);
            }
          }
        })
        .catch((error) => console.log("error", error));
    });
  }

  setInterval(function () {
    console.log("setInterval start");

    let vedio = null;
    if (
      document.querySelectorAll("#player_html5_api") &&
      document.querySelectorAll("#player_html5_api")[0]
    ) {
      vedio = document.querySelectorAll("#player_html5_api")[0];
    }
    let doc = null;
    if (
      document.querySelectorAll(".course_doc") &&
      document.querySelectorAll(".course_doc")[0]
    ) {
      doc = document.querySelectorAll(".course_doc")[0];
    }
    if (!vedio && doc) {
      // doc
      // window.clearInterval(intervalId);
      console.log("doc");
      return false;
    }

    // 默认静音
    vedio.muted = true;

    // 每隔1分钟输出一下倒计时(测试是否正常状态)
    let ele1 = document.querySelectorAll(".course-view-tips .dis-flex")[0];

    if (ele1 && ele1.innerText) {
      console.log("ele1 1");
      console.log(ele1.innerText);
      const t = ele1.innerText;

      if (t.indexOf("还需0秒完成") > -1) {
        //         console.log("0秒，手动暂停视频");
        console.log("0秒，");
        //         vedio.pause();
        return false;
      }

      if (text1 === t) {
        console.log("倒计时停止了，需要重新播放视频");
        // 说明倒计时停止了，需要重新播放视频
        text1 = "";
        vedio.currentTime = 0;
        vedio.play();
      } else {
        console.log("eles");
        text1 = t;
      }
    } else {
      console.log("视频处于暂停状态，或视频播放倒计时结束状态");
      text1 = "";

      // “稍后再说” 按钮点击
      let closeBtnList = document.querySelectorAll(".close-btn");
      closeBtnList.forEach((item) => {
        if (item.innerText === "稍后再说") {
          item.click();
        }
      });
    }

    // 如果弹框出现，就点击确认
    document.querySelectorAll(".el-dialog__wrapper").forEach((v, i) => {
      if (
        document.querySelectorAll(".el-dialog__wrapper")[i].style.display === ""
      ) {
        console.log(v, i);
        if (i === 10) {
          document.querySelectorAll(".dialog-footer-confirmed")[6].click();
          console.log("触发了 已完成本章节，继续学习下一章");
        }
      }
    });

    if (
      document.querySelectorAll(".el-dialog__wrapper")[9].style.display === ""
    ) {
      document.querySelectorAll(".dialog-footer-confirmed")[6].click();
      console.log("点击了一次");
    } else {
      console.log("没有发现弹窗");
    }

    // 是否恢复播放
    if (document.querySelectorAll(".course-btn-yes")[0]) {
      // 是 - 按钮点击
      document.querySelectorAll(".course-btn-yes")[0].click();
    }
    del();
  }, 1000 * 5);

  /**
   * 移除弹框
   */
  function del() {
    console.log("del()");
    const pb1 = document.getElementsByClassName("popup-buttons")[0];
    if (pb1) {
      pb1.click();
    }
  }

  /**
   * 获取cookie
   * @param {} cname
   * @returns
   */
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
  }

  /**
   * cookie 字符串转 json
   * @param {*} cookieString
   * @returns
   */
  // function cookieToJson(cookieString) {
  //   let cookieArr = cookieString.split(";");
  //   let obj = {}
  //   cookieArr.forEach((i) => {
  //     let arr = i.split("=");
  //     obj[arr[0]] = arr[1];
  //   });
  //   return obj
  // }
  // console.log(cookieToJson());
})();
