/**
 * Created by 轩哥哥 on 2017/8/20.
 */
define(['jquery','jquery_cookie','jquery_form'],function ($) {
  $(function () {
    $('form').submit(function () {
        $(this).ajaxSubmit({
          type:'post',
          url:'/api/login',
          success:function (info) {
            if(info.code == 200){
               var userinfo = JSON.stringify(info.result);
              $.cookie('userinfo',userinfo);
              location.href = '/';
            }
          }
        })
      
      return false;
    })
  })
})