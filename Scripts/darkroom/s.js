// ==UserScript==
// @name         自动建造
// @namespace    http://tampermonkey.net/
// @version      2024-04-01_18:00
// @description  try to take over the world!
// @author       Mr.Lufei
// @match        https://darkroom.lifeka.com/?lang=zh_cn
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lifeka.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 默认10秒轮询一次
    setInterval(function () {

        // --喧嚣小镇--
        // 伐木
        const gatherButton = document.getElementById('gatherButton');
        !gatherButton.classList.contains('disabled') && gatherButton.click();

        // 查看陷阱
        const trapsButton = document.getElementById('trapsButton');
        !trapsButton.classList.contains('disabled') && trapsButton.click();

        // --生火间-建筑物--

        // 陷阱
        const btn_build_trap = document.getElementById('build_trap');
        !btn_build_trap.classList.contains('disabled') && btn_build_trap.click();

        // 货车
        const btn_build_cart = document.getElementById('build_cart');
        !btn_build_cart.classList.contains('disabled') && btn_build_cart.click();

        // 小屋
        const btn_build_hut = document.getElementById('build_hut');
        !btn_build_hut.classList.contains('disabled') && btn_build_hut.click();

        // 狩猎小屋
        const btn_build_lodge = document.getElementById('build_lodge');
        !btn_build_lodge.classList.contains('disabled') && btn_build_lodge.click();

        // 贸易站
        const btn_build_trading_post = document.getElementById('build_trading post');
        !btn_build_trading_post.classList.contains('disabled') && btn_build_trading_post.click();

        // 制革屋
        const btn_build_tannery = document.getElementById('build_tannery');
        !btn_build_tannery.classList.contains('disabled') && btn_build_tannery.click();

        // 熏肉房
        const btn_build_smokehouse = document.getElementById('build_smokehouse');
        !btn_build_smokehouse.classList.contains('disabled') && btn_build_smokehouse.click();

        // 工坊
        const btn_build_workshop = document.getElementById('build_workshop');
        !btn_build_workshop.classList.contains('disabled') && btn_build_workshop.click();

        // 炼钢坊
        const btn_build_steelworks = document.getElementById('build_steelworks');
        !btn_build_steelworks.classList.contains('disabled') && btn_build_steelworks.click();


        // --生火间-制造--

        // 如果火把少于5，则制造5个火把
        const btn_build_torch = document.getElementById('build_torch');
        !btn_build_torch.classList.contains('disabled') && btn_build_torch.click();

    }, 10000)

    // 默认2s执行一次，关闭弹框，执行战斗
    setInterval(() => {
        // 追踪
        const btnTrack = document.getElementById("track");
        if (btnTrack) {
            btnTrack.click();
        }

        // 返回
        const btnEnd = document.getElementById("end");
        if (btnEnd) {
            btnEnd.click();
        }

        // 噪声 弹框
        // 调查
        const btnInvestigate = document.getElementById("investigate");
        if (btnInvestigate) {
            btnInvestigate.click();
        }
    }, 2000)
})();

// 直接修改库存和武器

// 外星合金
// window.State.stores["alien alloy"] = 20

// // 子弹
// window.State.stores["bullets"] = 200

// // 套索
// window.State.stores["bolas"] = 200

// 更新库存和武器
// for (let key in window.State.stores) { window.State.stores[key] = 999999999 }