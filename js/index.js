// 景区列表
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
window.sessionStorage["zdnumber"] = JSON.stringify(GetQueryString("zdnumber"));
window.sessionStorage["id"] = JSON.stringify(GetQueryString("id"));
$(function () {
  var urls = "expeciallyView";
  // var urls = "";
  // if (GetQueryString("id") == 1) {
  //   urls = "expeciallyView";    //特别推荐
  // } else if (GetQueryString("id") == 2) {
  //   urls = "viewTravalView";    //景点游
  // }
  //轮播图
  $.ajax({
    type: "get",
    url: common_api + "view/getView.action",
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.code == 0) {
        // $(".swiper-wrapper").html("暂无数据,请重试~");
      }
      var lis = "";
      //下方产品
      for (var i = 0; i < data.data.length; i++) {
        lis +=
          '<li>' +
          '<div class="left">' +
          '<img src=' + data.data[i].pic[0].url + ' alt="">' +
          '</div>' +
          '<div class="right">' +
          '<h3>' + data.data[i].name + '</h3>' +
          '<div class="tips">' +
          '<ul class=" clearfix ">' +
          '<li class="fl">' + data.data[i].tag1 + '</li>' +
          '<li class="fl">' + data.data[i].tag2 + '</li>' +
          '<li class="fl">' + data.data[i].tag3 + '</li>' +
          '<li class="fl">' + data.data[i].tag4 + '</li>' +
          '</ul>' +
          '</div>' +
          '<hr>' +
          '<p>' +
          '<span>' + data.data[i].remark + '</span>' +
          '</p>' +
          '<div class="go clearfix">' +
          '<div class="prices">' +
          '<b style="color: #DB214C;">¥ </b>' +
          '<span class="lows">' + data.data[i].tinyPrice + '</span>' +
          '<span>起</span>' +
          '</div>' +
          '<div class="details fr">' +
          '<a href = ./page/lists.html?id=' + data.data[i].id + '> 立 即 购 买 </a> ' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</li>';
      }
      $(".viewsLists").html(lis);
      // setTimeout(() => {
      //   $(".viewsLists").html(lis);
      // }, 3000);
    }
  });
});
