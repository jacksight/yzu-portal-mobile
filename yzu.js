// Loader (yzu.js, loaded by the userscript web/yzu.user.js): runs on the portal page the student is already logged in
// to, hides the desktop page and mounts the app (the Expo web build) over it.
// scripts/build-web.sh fills in the bundle URL.
(function () {
  if (window.__yzuLoaded) return;
  // portalfun: only in a tab the app opened for one of its screens (window.__yzuFun, set by fun-skin.js).
  if (location.hostname !== 'portalx.yzu.edu.tw' && !(location.hostname === 'portalfun.yzu.edu.tw' && window.__yzuFun)) {
    alert('請先開啟並登入元智 Portal（portalx.yzu.edu.tw）。');
    location.href = 'https://portalx.yzu.edu.tw/PortalSocialVB/Login.aspx';
    return;
  }
  window.__yzuLoaded = true;

  var head = document.head || document.documentElement;
  var vp = document.querySelector('meta[name=viewport]') || document.createElement('meta');
  vp.name = 'viewport';
  vp.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
  head.appendChild(vp);

  // The portal's own CSS still applies to the page, so the app sits in a
  // fixed, full-screen layer above everything with a small reset.
  var style = document.createElement('style');
  style.textContent =
    'html,body{height:100%;margin:0;overflow:hidden;min-width:0!important}' +
    'body>*:not(#root){display:none!important}' +
    '#root{position:fixed;inset:0;z-index:2147483647;display:flex;flex-direction:column;background:#fff;' +
    'font-family:-apple-system,BlinkMacSystemFont,"PingFang TC","Helvetica Neue",sans-serif;font-size:14px;line-height:normal;text-align:left}' +
    '#root *{box-sizing:border-box}';
  head.appendChild(style);

  var root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);

  // The bundle named at build time. (The site keeps old bundles, so a yzu.js the
  // CDN still caches from an earlier deploy loads fine too.)
  var s = document.createElement('script');
  s.src = 'https://jacksight.github.io/yzu-portal-mobile/_expo/static/js/web/index-a76ab0a0897a923ea50ea9171a794fec.js';
  s.onerror = function () { alert('載入失敗，請檢查網路後重新整理頁面。'); };
  document.body.appendChild(s);
})();
