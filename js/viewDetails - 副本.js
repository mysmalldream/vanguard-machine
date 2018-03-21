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
$(function() {
  // console.log($("#danjia").html());
  // console.log($("#zongjia").html());
  // console.log($("#numbers").val());
  //景区产品详情
  $.ajax({
    type: "get",
    url: common_api + "/user/productList.action?id=" + GetQueryString("id"),
    dataType: "json",
    success: function(data) {
      // console.log(data);
      // console.log(data.data[0].images[0].url);
      var lis = "";
      if (data.code == 0) {
        $(".jingqus").html("<h3>暂无数据,客官请稍后再试吧~~</h3>");
      }
      var lis = "";
      //轮播图
      for (var i = 0; i < 3; i++) {
        lis +=
          '<div class="swiper-slide">' +
          "<a href='javascript:;'>" +
          "<img src=" +
          data.data[i].images[0].url +
          ' alt="">' +
          "</a>" +
          "<p>" +
          data.data[i].name +
          "</p>" +
          "</div>";
      }
      // $(".swiper-wrapper").html(lis);
      // $(".viewRemark").html(data.data[0].remark);
      // $(".costInside").html(data.data[0].costInside);
      // $(".costOutside").html(data.data[0].costOutside);
    }
  });
  // console.log(JSON.parse(window.sessionStorage.getItem("zdnumber")));
  var auth_code,
    device_info,
    product_name,
    total_fee,
    quantity,
    telephone,
    enddate,
    viewname;
  //产品支付详情
  $.ajax({
    type: "get",
    url: common_api + "/user/detailPro.action?id=" + GetQueryString("id"),
    dataType: "json",
    success: function(data) {
      console.log(data.data);
      var lis = "";
      for (var i = 0; i < 3; i++) {
        lis +=
          "<div class='swiper-slide'>" +
          "<a href=javascript:;>" +
          "<img src=" +
          data.data.images[i].url +
          ' alt="">' +
          "</a>" +
          "<p>" +
          data.data.name +
          "</p>" +
          "</div>";
      }
      // $(".swiper-wrapper").html(lis);
      $(".names").html(data.data.name);   //产品名称 
      // console.log(data.data.viewRemark); 
      $(".viewRemark").html(data.data.remark);
      $(".viewRemarks").html(data.data.viewRemark);
      $(".costInside").html(data.data.costInside);
      $(".costOutside").html(data.data.costOutside);
      $(".names").html(data.data.name);
      $("#danjia").html(data.data.salePrice);
      $(".hides").html(data.data.salePrice);
      $("#zongjia").html(data.data.salePrice);
      product_name = data.data.name;
      viewname = data.data.viewName;
      enddate = data.data.endTime;
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
      var imgs = '';
      for (var i = 0; i < 3; i++) {
        imgs += '<img src = ' + data.data.images[i].url + ' alt = "" >';
      }
      $(".pics").html(imgs);
    }
  });
  $(".spinnerExample").spinner({}); //预定人数初始化
  $(".decrease").on("click", function(params) {
    $("#zongjia").html(Math.ceil($("#numbers").val() * $(".hides").html() * 10) / 10);
  });
  $(".increase").on("click", function(params) {
    $("#zongjia").html(Math.ceil($("#numbers").val() * $(".hides").html() * 10) / 10);
  });

  $(".quxiao").on("click", function() {
    $(".mask").fadeOut(500);
  });
  // 支付宝支付 283714889518461773
  $("#zhifubao").on("click", function() {
    // console.log($("#phone").val());
    if ($("#phone").val().length !== 11) {
      // alert("请输入正确的手机号码~");
      $.toast("请输入正确的手机号码~", "cancel");
      // return false;
    } else if ($("#phone").val().length == 11) {
      $(".mask").fadeIn(500);
      $("#zhifu1").focus();
      $("#zhifu1").bind("input propertychange", function() {
        // console.log($("#zhifu1").val());
        if ($("#zhifu1").val().length == 18) {
          $(".msg").html("正在支付...");
          $.ajax({
            type: "get",
            url:
              common_apis +
              "/ali/requestpay.do?device_info=" +
              JSON.parse(window.sessionStorage.getItem("zdnumber")) +
              "&auth_code=" +
              $("#zhifu1").val() +
              "&product_name=" +
              product_name +
              "&total_fee=" +
              $("#zongjia").html() +
              "&quantity=" +
              $("#numbers").val() +
              "&telephone=" +
              $("#phone").val() +
              "&enddate=" +
              enddate +
              "&viewname=" +
              viewname,
            dataType: "json",
            success: function(data) {
              console.log(data.code);
              //134565072134654674
              if (data.code == -1) {
                $(".msg").html(data.message);
              } else if (data.code == 1) {
                $(".msg").html(data.message);
                $(".quxiao").html("确定,返回首页");
                $(".quxiao").on("click", function() {
                  window.location.href = "../index.html";
                });
              }
            }
          });
        }
      });
    }
  });
  //微信支付 134555276662693335
  $("#weixin").on("click", function() {
    if ($("#phone").val().length !== 11) {
      $.toast("请输入正确的手机号码~", "cancel");
      return false;
    } else if ($("#phone").val().length == 11) {
      $(".mask").fadeIn(500);
      $("#zhifu2").focus();
      $("#zhifu2").bind("input propertychange", function() {
        if ($("#zhifu2").val().length == 18) {
          $(".msg").html("正在支付...");
          $.ajax({
            type: "get",
            url:
              common_apis +
              "/wxpay/requestpay.do?device_info=" +
              JSON.parse(window.sessionStorage.getItem("zdnumber")) +
              "&auth_code=" +
              $("#zhifu2").val() +
              "&product_name=" +
              product_name +
              "&total_fee=" +
              $("#zongjia").html() * 100 +
              "&quantity=" +
              $("#numbers").val() +
              "&telephone=" +
              $("#phone").val() +
              "&enddate=" +
              enddate +
              "&viewname=" +
              viewname,
            dataType: "json",
            success: function(data) {
              console.log(data.code);
              //134525389283707851
              if (data.code == -1) {
                $(".msg").html(data.message);
              } else if (data.code == 1) {
                $(".msg").html(data.message);
                $(".quxiao").html("确定,返回首页");
                $(".quxiao").on("click", function() {
                  window.location.href = "../index.html?id=" + JSON.parse(window.sessionStorage.getItem("id")) + '&zdnumber=' + JSON.parse(window.sessionStorage.getItem("zdnumber"));
                });
              }
            }
          });
        }
      });
    }
  });
});
