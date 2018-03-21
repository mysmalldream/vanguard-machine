// 产品详情页
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
// console.log(GetQueryString("id"));
// console.log(window.sessionStorage["id"]);
if (window.sessionStorage["id"] == undefined) {
  window.location.href = "../index.html";
}

$(function () {
  // 产品详细数据
  $.ajax({
    type: "get",
    url: common_api + "product/detailPro.action?id=" + GetQueryString("id"),
    dataType: "json",
    success: function (data) {
      console.log(data.data);
      // console.log(data.data.qrcode.url);
      var lis = "";
      $(".endTime").html(data.data.endTime);
      $(".special_top3 h3").html(data.data.name);
      $("#salePrice").html(data.data.salePrice);
      $("#ewms").html('<img id="ewm" src=' + data.data.qrcode.url + ' alt="">');
      // console.log('<img id="ewm" src=' + data.data.qrcode.url + ' alt="">');
      // 轮播图
      for (var i = 0; i < data.data.images.length; i++) {
        lis +=
          '<div class="swiper-slide">' +
          '<a href="###">' +
          '<img src=' + data.data.images[i].url + ' alt="">' +
          '</a>' +
          '</div>';
      }
      // console.log(lis);
      $(".swiper-wrapper").html(lis);
      // 初始化轮播图
      var swiper = new Swiper(".swiper-container", {
        pagination: ".swiper-pagination",
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        autoplay: 2000,
        loop: true,
        autoplayDisableOnInteraction: false
      });
    }
  });

});
