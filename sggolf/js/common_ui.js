var winW = $(window).width();
var wid_mobile = 767;

var moSwpArr = [];

//팝업 함수
function resizePop(el) {
  var target = $(el);
  var cont = $(el).find(".pop-cont");
  var maxHei = $(window).height() - 94;

  cont.css("max-height", maxHei + "px");
  // $(window).resize();  /* 20230127 퍼블리싱 수정 */
}
function openPop(el) {
  var target = $(el);
  target.stop().addClass("active-pop").fadeIn(200);
  if ($(".dimmed").length > 0) {
    target.css("margin", "20px 0 0 20px");
  } else {
    var dimmed = '<div class="dimmed"></div>';
    $("body").css("overflow", "hidden").append(dimmed);
  }
  resizePop(el);
  $(window).resize();
}
function closePop(el) {
  var target = $(el);
  if (!target) target = $(".layer-pop.active-pop");
  target.stop().removeClass("active-pop").fadeOut(200);
  $("body").css("overflow", "");

  if ($(".active-pop").length > 0) {
  } else {
    $(".dimmed").remove();
  }
}

//푸터 패밀리 사이트
function toggleFamilySite() {
  var target = $(".family-site");
  if (target.hasClass("active")) {
    target.removeClass("active");
  } else {
    target.addClass("active");
  }
}

function toggleTabCont(menu) {
  var tabmenu = $(menu);
  var tabmenulist = tabmenu.closest("li");
  var target = $(tabmenu.attr("href"));

  tabmenulist.addClass("active");
  tabmenulist.siblings(".menu").removeClass("active");
  target.show();
  target.siblings(".cont").hide();
}
function toggleFolding(item) {
  var qbox = $(item);
  var list = qbox.closest(".item");

  if (list.hasClass("active")) {
    list.removeClass("active");
    list.find(".a-box").stop().slideUp();
  } else {
    list.siblings(".item").removeClass("active");
    list.addClass("active");
    list.siblings(".item").find(".a-box").stop().slideUp();
    list.find(".a-box").stop().slideDown();
  }
}
function toggleTopBanner() {
  /* 20251222 수정 - s */
  var bnrCnt = Number($(".is-topbanner").attr("data-topbnr"));
  console.log(bnrCnt);
  if ($("body").hasClass("is-topbanner")) {
    bnrCnt--;
    if(bnrCnt < 1){
      console.log(bnrCnt);
      $(".is-topbanner").removeAttr("data-topbnr");
      $("body").removeClass("is-topbanner");
    }else{
      $(".is-topbanner").attr("data-topbnr",bnrCnt);
    }
  }
  /* 20251222 수정 - e */
}

// $(document).on("click",".btn-popup",function(){
//   var target = $(this).attr("href");
//   openPop(target);
// });
$(document).on("click", ".close-pop", function () {
  var thisLayer = $(this).closest(".layer-pop");
  var target = "#" + thisLayer.attr("id");
  closePop(target);
});

$(document).on("mouseenter", ".gnb .depth01", function () {
  // PC 메뉴 확장 이벤트
  if (winW <= wid_mobile) return;
  var header = $("#header");
  var thisDep01 = $(this).closest("li");
  var dep02 = $(this).siblings(".depth02");

  if (dep02.length > 0) {
    header.addClass("active");
  } else {
    header.removeClass("active");
  }
  thisDep01.addClass("active");
  thisDep01.siblings("li").removeClass("active");
});
$(document).on("mouseleave", "#header", function () {
  if (winW <= wid_mobile) return;
  var header = $(this);
  header.find(".gnb > li").removeClass("active");
  header.removeClass("active");
});
$(document).on("click", ".btn-top", function (e) {
  $("html").animate(
    {
      scrollTop: "0",
    },
    400
  );
});

$(document).on("click", ".gnb .depth01", function () {
  // MO 메뉴 확장 이벤트
  if (winW > wid_mobile) return;
  var thisDep01 = $(this).closest("li");
  var dep02 = $(this).siblings(".depth02");

  if (thisDep01.hasClass("active")) {
    thisDep01.removeClass("active");
  } else {
    thisDep01.addClass("active");
    thisDep01.siblings("li").removeClass("active");
  }
});

$(document).on("click", ".filter-btns .opt a", function () {
  var filter = $(this).closest(".filter-btns");
  var btn = $(this);
  if (filter.hasClass("mo-active")) {
    filter.removeClass("mo-active");
  } else {
    filter.addClass("mo-active");
  }
  btn.addClass("active");
  btn.closest(".opt").siblings(".opt").find("a").removeClass("active");
});

$(document).on("click", ".btn-fullmenu", function (e) {
  $("#header").addClass("mo-active");
  $("body").addClass("mo-deactive");
});
$(document).on("click", ".fullmenu-close", function (e) {
  if (winW > wid_mobile) return;
  $("#header").removeClass("mo-active");
  $("body").removeClass("mo-deactive");
});

$(window).resize(function () {
  winW = $(window).width();

  if (winW > wid_mobile) {
    $("body").removeClass("mo-deactive");
    $("#header").removeClass("mo-active");
    $(".btn-fullmenu").removeClass("mo-close");
    $("#header .gnb li").removeClass("active");
    if ($(".mo-swiper").length > 0) {
      $(".mo-swiper").each(function (idx) {
        var id = $(this).attr("id");
        if (moSwpArr[id]) moSwpArr[id].destroy();
        moSwpArr[id] = null;
      });
    }
    if ($(".mo-swiper02").length > 0) {
      $(".mo-swiper02").each(function (idx) {
        var id = $(this).attr("id");
        if (moSwpArr[id]) moSwpArr[id].destroy();
        moSwpArr[id] = null;
      });
    }
  } else {
    $("#header").removeClass("active");
    if ($("#header .menu-wrap").is(":visible")) {
      $("#header .menu-wrap").hide();
      setTimeout(function () {
        $("#header .menu-wrap").show();
      }, 100);
    }

    if ($(".mo-swiper").length > 0) {
      $(".mo-swiper").each(function (idx) {
        var id = $(this).attr("id");
        var swpStr = "#" + id;
        if (!moSwpArr[id]) {
          moSwpArr[id] = new Swiper(swpStr + " .swiper-container", {
            speed: 300,
            loop: true,
            spaceBetween: 15,
            centeredSlides: true,
            pagination: false,
            navigation: false,
          });
        } else {
          moSwpArr[id].update();
        }
      });
    }
    if ($(".mo-swiper02").length > 0) {
      $(".mo-swiper02").each(function (idx) {
        var id = $(this).attr("id");
        var swpStr = "#" + id;
        if (!moSwpArr[id]) {
          moSwpArr[id] = new Swiper(swpStr + " .swiper-container", {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            pagination: false,
            navigation: {
              nextEl: swpStr + " .swiper-button-next",
              prevEl: swpStr + " .swiper-button-prev",
            },
          });
        } else {
          moSwpArr[id].update();
        }
      });
    }
  }
  resizePop(".active-pop"); /* 20230127 퍼블리싱 수정 */
});
$(document).ready(function () {
  $(window).resize();
});

/* 2022.11.20 신규UI 스크립트 추가 - s */
$(document).on("click", ".custom-select .sel-opt a", function () {
  var wrap = $(this).closest(".custom-select");
  var btn = $(this);
  if (wrap.hasClass("active")) {
    wrap.removeClass("active");
  } else {
    wrap.addClass("active");
  }
  btn.addClass("active");
  btn.closest(".sel-opt").siblings(".sel-opt").find("a").removeClass("active");
});
/* 2022.11.20 신규UI 스크립트 추가 - e */
