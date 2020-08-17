// ==UserScript==
// @name         让微博按正确的时间线排序
// @namespace    https://hehome.xyz/
// @version      0.2.0
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
    // 不太清楚微博是怎么来切换版本的
    var new_version = window.location.pathname == '/';

    if (!new_version) {
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

        // 当页面加载后自动单击最新微博
        window.addEventListener('load', function () {
            document.querySelector('div[title="最新微博"]').click();
        }, false);
    }
})();
