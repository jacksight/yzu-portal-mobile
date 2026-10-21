// Loader (yzu.js, loaded by the userscript web/yzu.user.js): runs on the portal page the student is already logged in
// to, hides the desktop page and mounts the app (the Expo web build) over it.
// scripts/build-web.sh fills in the version lookup (yzuVersion) and a fallback bundle URL.
(function () {
  // Which build is current. The host's CDN caches .js files (fixed names like
  // yzu.js) for up to an hour, but serves .html fresh, so the build writes the
  // current file names into v.html; a hidden iframe of it posts them back here.
  // Falls back to the names baked into this file if it doesn't answer.
  var yzuVersion = function (cb) {
    var HOST = 'https://jacksight.github.io/yzu-portal-mobile', done = false;
    // Messages carry only the origin (no path), e.g. https://jacksight.github.io.
    var ORIGIN = HOST.split('/').slice(0, 3).join('/');
    var f = document.createElement('iframe');
    var finish = function (v) {
      if (done) return;
      done = true;
      window.removeEventListener('message', on);
      if (f.parentNode) f.parentNode.removeChild(f);
      cb(v);
    };
    var on = function (e) {
      if (e.origin === ORIGIN && e.data && e.data.yzu === 'v') finish(e.data);
    };
    window.addEventListener('message', on);
    f.style.display = 'none';
    f.src = HOST + '/v.html?t=' + Date.now();
    document.body.appendChild(f);
    setTimeout(function () { finish(null); }, 4000);
  };
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

  yzuVersion(function (v) {
    var s = document.createElement('script');
    s.src = (v && v.bundle) || 'https://jacksight.github.io/yzu-portal-mobile/_expo/static/js/web/index-317e7c611b5092376d81d27d85d0fe1d.js';
    s.onerror = function () { alert('載入失敗，請檢查網路後重新整理頁面。'); };
    document.body.appendChild(s);
  });
})();
