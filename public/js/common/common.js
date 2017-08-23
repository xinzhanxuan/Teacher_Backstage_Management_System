/**
 * Created by 轩哥哥 on 2017/8/20.
 */
define(['jquery','template','nprogress','jquery_cookie',],function ($,template,np) {
  $(function () {
    //设置加载进度
    np.start();
    setTimeout(function () {
      np.done();
    },500)
    
    //设置全局ajax加载提醒齿轮
    $(document).ajaxStart(function () {
      $('#mask').show();
    })
    $(document).ajaxStop(function () {
      $('#mask').hide();
    })
    
    //非登录情况下
    if(location.pathname != '/login'){
      //如果没有存储cookie，则跳转到登录界面
      if($.cookie('PHPSESSID')){
        //设置头像
        var userinfo = $.cookie('userinfo');
        userinfo = JSON.parse(userinfo);
        // console.log(userinfo);
        $('#headImg img').attr('src',userinfo.tc_avatar);
        var html = template('asideHead',{
          tc_avatar:userinfo.tc_avatar || '/uploads/avatar.jpg',
          tc_name:userinfo.tc_name
        })
        $('#asideProfile').html(html);
        //高亮
        var pathName = location.pathname;
        var pathObj = {
          '/teacher/add':'/teacher/list',
          '/settings':'/'
        }
        pathName = pathObj[pathName] || pathName;
        var pathList = $('.list-unstyled a');
        pathList.each(function () {
          $(this).removeClass('active');
          if($(this).attr('href') == pathName){
            $(this).addClass('active');
          }
        })
        //下拉菜单
        $('#courseManager').click(function () {
          $(this).children('.list-unstyled').slideToggle();
        });
        if($('#addList a').hasClass('active')){
          $('#courseManager').children('.list-unstyled').css('display','block');
        }
        //退出功能
        $('#back').click(function () {
          $.ajax({
            url:'/api/logout',
            type:'post',
            success:function (info) {
              if(info.code == 200){
                $.removeCookie('userinfo',{path:'/'});
                location.href = '/login';
              }
            }
          })
          
         
        })
      }else {
        location.href = '/login';
      }
      
    }
    
  })
})