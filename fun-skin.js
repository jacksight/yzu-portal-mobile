(function(){
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
var load=function(src){var s=document.createElement('script');s.src=src;document.body.appendChild(s);};
var m=/^yzu:(\w+)$/.exec(window.name||'');
if(m&&location.hash.indexOf('yzu-off')<0){window.__yzuFun=m[1];return load('https://jacksight.github.io/yzu-portal-mobile/yzu.js?t='+Date.now());}
yzuVersion(function(v){load((v&&v.skin)||'https://jacksight.github.io/yzu-portal-mobile/fun-skin-5dd194bc1ff3.js');});
})();
