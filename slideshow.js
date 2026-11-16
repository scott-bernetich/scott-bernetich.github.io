// Cycles through the <img> elements inside every .slideshow.
// Images that fail to load (missing files) are removed, so the placeholder text shows instead.
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".slideshow").forEach(function (box) {
    var index = 0;

    function images() {
      return Array.prototype.slice.call(box.querySelectorAll("img"));
    }

    function show() {
      var list = images();
      if (!list.length) return;
      index = index % list.length;
      list.forEach(function (img, k) {
        img.classList.toggle("active", k === index);
      });
    }

    // error events don't bubble, so listen in the capture phase
    box.addEventListener("error", function (e) {
      if (e.target.tagName === "IMG") {
        e.target.remove();
        show();
      }
    }, true);

    // remove any image that already failed before this script ran
    images().forEach(function (img) {
      if (img.complete && img.naturalWidth === 0) img.remove();
    });

    show();

    if (!reduceMotion) {
      setInterval(function () {
        if (images().length > 1) {
          index += 1;
          show();
        }
      }, 4000);
    }
  });
})();
