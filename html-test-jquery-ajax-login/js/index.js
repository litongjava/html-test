var loginUrl="http://39.106.228.146:8090/js/a/login"
$(function() {
  // 定义变量
  var $mX;
  var $mY;
  var $move = false; // true是可以移动登录框
  // 鼠标按下事件
  $("h3").mousedown(function(event) {
    $("#login").css("opacity", 0.5); // 改变透明度
    $move = true;
    // 得到鼠标与登录框原点之间的距离
    $mX = event.pageX - parseInt($("#login").css("left"));
    $mY = event.pageY - parseInt($("#login").css("top"));
  })
  // 鼠标移动事件
  $(document).mousemove(function(event) {
    // 得到登录框要移动的量
    var x = (event.pageX - $mX);
    var y = (event.pageY - $mY);
    console.log(x, y)
    if ($move) {
      if (x > 0 && y > 0) {
        $("#login").css("left", x + "px")
        $("#login").css("top", y + "px")
      }
    }
  }).mouseup(function() {
    // 鼠标弹起事件
    $move = false;
    $("#login").css("opacity", 1);
  })
  //  异步请求
  $(":submit").click(function() {
    $.ajax({
      type: "get",
      url: loginUrl,
      data: {
        "username": $("#user").val(),
        "password": $("#pwd").val(),
        "__login":"true",
        "__ajax":'true'
      },
      dataType: "json",
      success: function(data) {
        console.log("成功：", data);
        /*if (data.usermsg==1&&data.pwdmsg==1) {
        $(location).prop("href","index1.html");
        } else{
        $("span").text("用户名或密码错误").prop("class","red");
        }*/
        if (data.usermsg == 1 && data.pwdmsg == 1) {
          $(location).prop("href", "index1.html");
        } else if (data.usermsg == 0 && data.pwdmsg == 0) {
          $("span").text("用户名或密码错误").prop("class", "red");
        } else if (data.usermsg == 0 && data.pwdmsg == 1) {
          $("span").text("该用户不存在").prop("class", "red");
        } else if (data.usermsg == 1 && data.pwdmsg == 0) {
          $("span").text("密码错误").prop("class", "red");
        }
      },
      error: function(err) {
        console.log("失败", err);
      }
    })
  })
  $(":reset").click(function() {
    $("span").text("");
  })
})
