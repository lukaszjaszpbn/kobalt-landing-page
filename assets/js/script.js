(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var header = document.querySelector(".site-header");
  var heroMedia = document.querySelector(".hero-media");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  var navLinks = nav ? nav.querySelectorAll('a[href^="#"]') : [];

  /* ----------------------------------------------------------------------
     Mobile nav toggle
     ---------------------------------------------------------------------- */
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----------------------------------------------------------------------
     Scroll reveal with staggered children
     ---------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");

  // Assign a cascade delay to each revealed child inside a [data-stagger] group.
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    var items = group.querySelectorAll(":scope > [data-reveal]");
    items.forEach(function (item, i) {
      item.style.setProperty("--d", (i * 0.09).toFixed(2) + "s");
    });
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ----------------------------------------------------------------------
     Header state on scroll + hero parallax (rAF-throttled)
     ---------------------------------------------------------------------- */
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    if (header) {
      header.classList.toggle("scrolled", y > 24);
    }

    if (heroMedia && !reduceMotion && y < window.innerHeight) {
      heroMedia.style.transform =
        "translate3d(0," + (y * 0.14).toFixed(1) + "px,0) scale(1.04)";
    }

    // Clear nav highlight while in the hero zone (no section owns the top).
    if (y < window.innerHeight * 0.5) {
      navLinks.forEach(function (l) {
        l.classList.remove("is-active");
      });
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  /* ----------------------------------------------------------------------
     Scroll-spy: highlight the nav link of the top-level section in view.
     Only top-level <section> elements are observed, so links that point to
     a sub-block (e.g. Doradztwo) never fight the section they live in.
     ---------------------------------------------------------------------- */
  if (navLinks.length && "IntersectionObserver" in window) {
    var linkMap = {};
    navLinks.forEach(function (link) {
      linkMap[link.getAttribute("href").slice(1)] = link;
    });

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = linkMap[entry.target.id];
          if (!link || !entry.isIntersecting) return;
          navLinks.forEach(function (l) {
            l.classList.remove("is-active");
          });
          link.classList.add("is-active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    document.querySelectorAll("main > section[id]").forEach(function (section) {
      if (linkMap[section.id]) spy.observe(section);
    });
  }

  /* ----------------------------------------------------------------------
     Interactive Poland map (Projekty) — highlight market on hover/tap/focus
     ---------------------------------------------------------------------- */
  var plMarkers = document.querySelectorAll(".pl-marker");
  var plReadout = document.querySelector(".pl-readout");
  var plMap = document.querySelector(".pl-map");
  if (plMarkers.length && plReadout) {
    var plDefault = plReadout.textContent;

    var plActivate = function (marker) {
      plMarkers.forEach(function (x) {
        x.classList.remove("is-active");
      });
      marker.classList.add("is-active");
      var name = marker.getAttribute("data-name");
      var kind = marker.getAttribute("data-kind");
      plReadout.textContent = kind ? name + " — " + kind : name;
    };
    var plReset = function () {
      plMarkers.forEach(function (x) {
        x.classList.remove("is-active");
      });
      plReadout.textContent = plDefault;
    };

    plMarkers.forEach(function (m) {
      m.addEventListener("mouseenter", function () { plActivate(m); });
      m.addEventListener("focus", function () { plActivate(m); });
      m.addEventListener("click", function () { plActivate(m); });
      m.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); plActivate(m); }
      });
    });
    if (plMap) { plMap.addEventListener("mouseleave", plReset); }
  }

  /* ----------------------------------------------------------------------
     Footer year
     ---------------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
