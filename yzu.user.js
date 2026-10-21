// ==UserScript==
// @name         元智 Portal 手機版
// @description  登入元智 Portal 後自動換成手機版介面；學校其他系統（社團、預約、成績…）改成手機好讀的版面
// @match        https://portalx.yzu.edu.tw/*
// @match        https://portalfun.yzu.edu.tw/*
// @exclude      https://portalx.yzu.edu.tw/PortalSocialVB/Login.aspx*
// @run-at       document-end
// @noframes
// @version      1.2
// @updateURL    https://jacksight.github.io/yzu-portal-mobile/yzu.user.js
// @downloadURL  https://jacksight.github.io/yzu-portal-mobile/yzu.user.js
// ==/UserScript==

// portalx: loads the app (yzu.js) over the page, except on the login page, on
// the sign-in hops to other systems, and in tabs opened as 「原頁面」 (#yzu-off).
// portalfun: restyles the school's own system pages for a phone (fun-skin.js).
(function () {
  if (window.top !== window.self) return;
  var HOST = 'https://jacksight.github.io/yzu-portal-mobile';
  var load = function (file) {
    var s = document.createElement('script');
    s.src = HOST + '/' + file + '?t=' + Date.now();
    document.body.appendChild(s);
  };
  if (location.hostname === 'portalfun.yzu.edu.tw') return load('fun-skin.js');

  if (/\/(Login|IFrameSub|ClickMenuLog|IFrameRight)\.aspx/i.test(location.pathname)) return;
  try {
    if (location.hash.indexOf('yzu-off') >= 0) sessionStorage.setItem('yzuOff', '1');
    if (sessionStorage.getItem('yzuOff')) return;
  } catch (e) {}
  load('yzu.js');
})();
