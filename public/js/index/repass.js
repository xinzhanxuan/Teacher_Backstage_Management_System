/**
 * Created by 轩哥哥 on 2017/8/23.
 */
define(['jquery'],function ($) {
  $(function () {
    $('.alter').click(function () {
      var originPass = $('.originPass').val();
      var currentPass = $('.currentPass').val();
      var firmPass = $('.firmPass').val();
      if(currentPass != firmPass){
        alert('密码不一致');
      }else {
        $.ajax({
          url:'/api/teacher/repass',
          type:'post',
          data:$('#pass').serialize(),
          success:function (info) {
            if(info.code == 200){
              $('#back').trigger('click');
            }
          }
        })
      }
      return false;
    })
  })
})