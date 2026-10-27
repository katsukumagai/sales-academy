(function () {
  var d = document, root = d.documentElement, KEY = "sa_lang";
  root.classList.add("js");

  function setLang(l) {
    root.setAttribute("lang", l);
    try { localStorage.setItem(KEY, l); } catch (e) {}
    [].forEach.call(d.querySelectorAll(".langbtn"), function (b) {
      b.classList.toggle("on", b.getAttribute("data-l") === l);
    });
    var t = d.body.getAttribute("data-t-" + l);
    if (t) d.title = t;
  }

  var l = null;
  try { l = localStorage.getItem(KEY); } catch (e) {}
  if (l !== "ja" && l !== "en") l = /^ja/i.test(navigator.language || "ja") ? "ja" : "en";
  setLang(l);

  [].forEach.call(d.querySelectorAll(".langbtn"), function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-l")); });
  });

  // scroll reveal (text blocks + diagrams)
  var els = d.querySelectorAll(".reveal, figure");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    [].forEach.call(els, function (e) { io.observe(e); });
  } else {
    [].forEach.call(els, function (e) { e.classList.add("in"); });
  }

  // progress bar
  var bar = d.getElementById("bar");
  function prog() {
    var h = d.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", prog, { passive: true });
  prog();
})();
