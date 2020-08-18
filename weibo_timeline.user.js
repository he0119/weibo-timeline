// ==UserScript==
// @name         让微博按正确的时间线排序
// @namespace    https://hehome.xyz/
// @version      0.2.2
// @icon         https://weibo.com/favicon.ico
// @description  自动切换到最新微博，恢复正确的时间线
// @author       hemengyang
// @match        https://weibo.com/*
// @match        https://www.weibo.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 判断是否是新版微博
    var isNewVersion = document.querySelector('a.gn_name') == null;

    if (!isNewVersion) {
        // 老版微博
        var userId = document.querySelector('a.gn_name').href.split('/')[3];
        var isHome = window.location.pathname.split('/')[3] == 'home';
        var isNew = window.location.search.indexOf('is_new') != -1;
        // 自动切换到最新微博
        if (isHome && !isNew) {
            window.location = '/home?is_new=1';
        }
        // 替换左上角的微博图标点击后网址为最新微博
        document.querySelector('a.box').setAttribute('href', '/u/' + userId + '/home?is_new=1');
    }
    else {
        // 新版微博
        window.addEventListener('load', function () {
            // 切换到最新微博
            function switchToLatest() {
                // 侧边栏的最新微博按钮
                var latestButton = document.querySelector('div[title="最新微博"]');
                if (latestButton == null) {
                    // 无法找到最新微博的按钮时，会尝试重新加载网页
                    window.location = '/';
                } else {
                    latestButton.click();
                }
            }
            // 首页按钮
            var homeButton = document.querySelector('div[title="首页"]');
            // 左上角的图标
            var homeIcon = document.querySelector('span[aria-label="Weibo"]');

            // 替换首页按钮点击事件
            homeButton.addEventListener('click', (e) => { switchToLatest(); e.stopPropagation(); }, true);
            // 替换左上角的微博图标点击事件
            homeIcon.addEventListener('click', (e) => { switchToLatest(); e.stopPropagation(); }, true);

            // 如果在微博主页自动切换到最新微博
            if (window.location.pathname == '/') {
                // 有时候页面没有能完全加载
                // 等待 500 毫秒，增加成功率
                setTimeout(function(){
                    switchToLatest();
                }, 500);
            }
        }, false);
    }
})();
