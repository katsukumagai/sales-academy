/* 抑止レイヤー（セキュリティ本体ではない）。
   本当のアクセス制御は Cloudflare Access（サーバー側）で行う。
   ここでは「ログイン中メールの透かし表示」「コピー/右クリック/印刷の抑止」だけ。 */
(function () {
  function mark(email) {
    var wm = document.createElement("div");
    wm.id = "wm";
    var t = email + " · " + new Date().toISOString().slice(0, 10);
    for (var y = -100; y < window.innerHeight + 200; y += 110) {
      for (var x = -100; x < window.innerWidth + 300; x += 320) {
        var s = document.createElement("span");
        s.textContent = t;
        s.style.left = x + "px";
        s.style.top = y + "px";
        wm.appendChild(s);
      }
    }
    document.body.appendChild(wm);
    var who = document.getElementById("who");
    if (who) who.textContent = email;
  }

  // Cloudflare Access のログイン中ユーザーを取得（Access 配下でのみ成功）
  fetch("/cdn-cgi/access/get-identity", { credentials: "same-origin" })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
    .then(function (j) { mark(j.email || "member"); })
    .catch(function () { mark("PREVIEW (not behind Access)"); });

  ["contextmenu", "copy", "cut", "dragstart", "selectstart"].forEach(function (ev) {
    document.addEventListener(ev, function (e) { e.preventDefault(); });
  });
  document.addEventListener("keydown", function (e) {
    var k = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && ["p", "s", "c", "a", "u"].indexOf(k) > -1) e.preventDefault();
  });
})();
