function () {
  var out = document.getElementById('out');
  function log(label, ok, detail) {
    var li = document.createElement('li');
    li.textContent = (ok ? '[OK] ' : '[NG] ') + label + (detail ? ' : ' + detail : '');
    out.appendChild(li);
  }
  function tryRead(label, fn) {
    try { log(label + ' が読めてしまった', false, String(fn()).slice(0, 80)); }
    catch (e) { log(label + ' はブロックされた', true, e.name); }
  }
  log('JavaScript実行成功', true, 'window.origin=' + window.origin);
  tryRead('parent.document.title', function () { return window.parent.document.title; });
  tryRead('親DOMの秘密文字列', function () { return window.parent.document.getElementById('parent-secret').textContent; });
  tryRead('親ページのリンク数', function () { return window.parent.document.links.length; });
  tryRead('parent.location.href', function () { return window.parent.location.href; });
  tryRead('top.document.title', function () { return window.top.document.title; });
  tryRead('document.cookie', function () { return document.cookie; });
  tryRead('localStorage', function () { return window.localStorage.length; });
  try { window.parent.postMessage('hello from iframe', '*'); log('postMessage送信（禁止されないのが仕様）', true); }
  catch (e) { log('postMessage送信', false, e.name); }
})();
