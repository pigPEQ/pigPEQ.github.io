$(function () { //获取处理友链数据
  $.getJSON("https://cdn.jsdelivr.net/gh/pigPEQ/pigPEQ.github.io/json_data/friend.json", function (data) {

      // var data0 = data[0];
      $('.links-content').html("");

      // 随机排序过滤失效的
      let notValid = data.filter((item, a, b) => item.valid == 0);
      data = data.filter((item, a, b) => item.valid != 0).sort(function (a, b) {
          return Math.random() > .5 ? -1 : 1;
      });
      $('.links-content').append("<div class='friend-title-item'></div>");
      $.each(data, function (i, e) {
          var html = "<div class=\"box\" style=\"width:96%\"><article class=\"media\" style=\"display: flex;align-items: center;\"><div class=\"media-left\">";
          if (e.src == undefined) {
              html += "    <img class=\"ava\" src=\"/img/links/nopic.jpg\" title=\"图片链接不可用，使用的默认图片\">";
          } else {
              html += "<img style=\"border-radius:50%\" src=\"" + e.src + "\" width=\"100\" height=\"100\"></div>";
          }
          html +=
              "<div style=\"margin-left: 2rem;\"></div><div class=\"media-content\">" +
              "<div class=\"content\">" +
              "<div style=\"margin-bottom: 0.5rem\"><strong><i class=\"fa fa-bookmark\"></i> " + e.name + "</strong></div>" +
              "<div style=\"margin-bottom: 0.5rem\"><i class=\"fa fa-link\"></i>" + " " + "<a href=\"" + e.url + "\" target=\"_blank\"><span style=\"color:#3273dc\">" + e.url + "</span></a>" +
              "</div><div>" + e.desc + "</div>" + " </div></div></div></article></div>";


          $('.links-content').append(html);
      });

    //   // 过期的
    //   if (notValid.length > 0) {
    //       $('.links-content').append("<div class='friend-title-item'><br>异常的大佬们<br><br><hr></div></div>");
    //       $.each(notValid, function (i, e) {
    //           var html = "<div class=\"friend-card-item\">";
    //           html += "    <img class=\"ava\" src=\"/img/links/nopic.jpg\" title=\"图片链接不可用，使用的默认图片\">";
    //           html +=
    //               "<div class='text-desc' title=\""+e.desc+"\">    网址：<a href=\"" + e.url + "\" target=\"_blank\">" + e.name + "</a>" +
    //               "    <br>访问时间：" + e.stopTime +
    //               "<br>简介：" + e.desc + "</div>" +
    //               "    </div>";

    //           $('.links-content').append(html);
    //       })
    //   }

      $('.links-content').append("</div>");
  })
});