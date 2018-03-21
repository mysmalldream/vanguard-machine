// 产品列表
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
// console.log(GetQueryString("id"));
// if (window.sessionStorage["id"] == undefined) {
//   window.location.href = "../index.html";
// }
$(function () {
  $.ajax({
    type: "get",
    url: common_api + "view/productList.action?id=" + GetQueryString("id"),
    dataType: "json",
    success: function (data) {
      console.log(data);
      var lis = "";
      if (data.code == 0) {
        $(".jingqus").html("<h3>暂无数据,客官请稍后再试吧~~</h3>");
      }
      var lis = "", liss = "", imgs = '';
      for (var i = 0; i < data.data[0].images.length; i++) {
        // imgs += '<img class="fl" src = ' + data.data[0].images[i].url + ' alt = "" >';
        imgs += '<div class="swiper-slide" style="background-image:url(' + data.data[0].images[i].url + ')"></div>';
      }
      $(".swiper-wrapper").html(imgs);
      var swiper = new Swiper('.swiper-container', {   //轮播初始化
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        autoplay: 2000,
        loop: true,
        autoplayDisableOnInteraction: false,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
          
        },
        pagination: {
          el: '.swiper-pagination',
        },
      });
      $(".lab1").html(data.data[0].notice);
      $(".lab2").html(data.data[0].remark);
      $(".lab3").html(data.data[0].method);
      $(".costInside").html(data.data[0].costInside);
      $(".costOutside").html(data.data[0].costOutside);
      $(".foot>h1").html(data.data[0].viewName);
      for (var i = 0; i < data.data.length; i++) {
        liss +=
          '<li class="fl goes">' +
          // "<a href=" +
          "<a href=./order.html?id=" +
          data.data[i].id +
          ">" +
          '<div class="h3">' +
          data.data[i].name +
          "</div>" +
          "<p>" +
          data.data[i].salePrice +
          "<span>元</span>" +
          "</p>" +
          "</a>" +
          "</li>";
      }
      $(".jingqus").html(liss);
      // $('.goes').on('click',function () {
      // $.alert(43214, "text")
      // })
    }
  });
});
