
(function () {
  if (location.hostname !== 'portalfun.yzu.edu.tw' || window.__yzuSkin) return;
  window.__yzuSkin = true;
  var head = document.head || document.documentElement;
  var vp = document.querySelector('meta[name=viewport]') || document.createElement('meta');
  vp.name = 'viewport';
  vp.content = 'width=device-width, initial-scale=1';
  head.appendChild(vp);

  var css = [
    'html,body{min-width:0!important;width:auto!important;margin:0!important;-webkit-text-size-adjust:100%}',
    'body{padding:8px!important;font:15px/1.5 -apple-system,"PingFang TC",sans-serif!important;word-break:break-word}',
    'body *{max-width:100%;box-sizing:border-box}',
    'img{height:auto}',
    // Header bar: keep the name / 首頁 / 登出 links, drop the logos.
    '#Uc1_ibnPortalLogo,#Uc1_ibnChangeVersion,#Uc1_imgBtnMyNotify,#Uc1_imgBtnMyCal{display:none!important}',
    // Wide data tables scroll sideways instead of overflowing the page.
    'table{width:auto!important}',
    'td,th{padding:4px 6px!important;white-space:normal!important;vertical-align:top}',
    '.yzu-scroll{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch}',
    // Menu (#Table1): one full-width button per entry.
    '#Table1,#Table1>tbody,#Table1 tr,#Table1 td{display:block!important;width:auto!important}',
    '#Table1 a{display:block;padding:10px 12px;margin:4px 0;border-radius:10px;background:#f3f5f8;color:#0a6cff;text-decoration:none}',
    // Identity choice (多重身分) and other link lists: big tap targets.
    '[id$="Panel_DeptList"] a{display:block;padding:12px 14px;margin:8px 0;border-radius:10px;background:#0a6cff;color:#fff!important;text-decoration:none;font-weight:600}',
    // Form fields: 16px stops iOS zooming in on focus.
    'input,select,textarea,button{font-size:16px!important;max-width:100%}',
    'input[type=submit],input[type=button],button{min-height:40px;padding:6px 14px;border-radius:8px}'
  ].join('');
  var style = document.createElement('style');
  style.textContent = css;
  head.appendChild(style);

  // Fixed pixel widths set as attributes beat CSS: strip them from layout.
  var wide = document.querySelectorAll('[width],[style*="width"]');
  for (var i = 0; i < wide.length; i++) {
    var el = wide[i];
    if (el.tagName === 'IMG') continue;
    el.removeAttribute('width');
    if (el.style && el.style.width) el.style.width = '';
    if (el.style && el.style.minWidth) el.style.minWidth = '0';
  }
  // Tables with many columns get the sideways-scroll wrapper behaviour.
  var tables = document.querySelectorAll('table');
  for (var j = 0; j < tables.length; j++) {
    var row = tables[j].rows && tables[j].rows[0];
    if (row && row.cells.length >= 5) tables[j].className += ' yzu-scroll';
  }
})();
true;
