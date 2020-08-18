// ==UserScript==
// @name         让微博按正确的时间线排序
// @namespace    https://hehome.xyz/
// @version      0.2.1
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
    var is_new_version = document.querySelector('a.gn_name') == null;

    if (!is_new_version) {
        // 老版微博
        var user_id = document.querySelector('a.gn_name').href.split('/')[3];
        var is_home = window.location.pathname.split('/')[3] == 'home';
        var is_new = window.location.search.indexOf('is_new') != -1;
        // 自动切换到最新微博
        if (is_home && !is_new) {
            window.location = '/home?is_new=1';
        }
        // 替换左上角的微博图标点击后网址为最新微博
        document.querySelector('a.box').setAttribute('href', '/u/' + user_id + '/home?is_new=1');
    }
    else {
        // 新版微博
        window.addEventListener('load', function () {
            // 侧边栏的最新微博按钮
            var latest_button = document.querySelector('div[title="最新微博"]');
            // 首页按钮
            var home_button = document.querySelector('div[title="首页"]');
            // 左上角的图标
            var home_icon = document.querySelector('span[aria-label="Weibo"]');

            // 替换首页按钮点击事件
            home_button.addEventListener('click', (e) => { latest_button.click(); e.stopPropagation(); }, true);
            // 替换左上角的微博图标点击事件
            home_icon.addEventListener('click', (e) => { latest_button.click(); e.stopPropagation(); }, true);

            // 如果在微博主页自动切换到最新微博
            if (window.location.pathname == '/') {
                latest_button.click();
            }
        }, false);
    }
})();
