// 产品预订
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
  // console.log($("#danjia").html());
  // console.log($("#zongjia").html());
  // console.log($("#numbers").val());
  //景区产品详情
  $.ajax({
    type: "get",
    url: common_api + "product/detailPro.action?id=" + GetQueryString("id"),
    dataType: "json",
    success: function (data) {
      console.log(data);
      // console.log(data.data[0].images[0].url);
      var lis = "";
      if (data.code == 0) {
        $(".jingqus").html("<h3>暂无数据,客官请稍后再试吧~~</h3>");
      }
      var lis = "";
      //轮播图
      // for (var i = 0; i < 3; i++) {
      //   lis +=
      //     '<div class="swiper-slide">' +
      //     "<a href='javascript:;'>" +
      //     "<img src=" +
      //     data.data[i].images[0].url +
      //     ' alt="">' +
      //     "</a>" +
      //     "<p>" +
      //     data.data[i].name +
      //     "</p>" +
      //     "</div>";
      // }
      $(".swiper-wrapper").html(lis);
      // $(".viewRemark").html(data.data[0].remark);
      // $(".costInside").html(data.data[0].costInside);
      // $(".costOutside").html(data.data[0].costOutside);
    }
  });
});
