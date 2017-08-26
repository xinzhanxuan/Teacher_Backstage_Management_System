/**
 * Created by 轩哥哥 on 2017/8/24.
 */
define(['jquery'],function ($) {
  $('#creatCourse').click(function () {
    var cs_name = $('#courseName').val();
    $.ajax({
      url:'/api/course/create',
      type:'post',
      data:{
        cs_name:cs_name
      },
      success:function (info) {
        if(info.code == 200){
          location.href = '/course/step1?cs_id='+info.result.cs_id;
        }
      }
    })
    return false;
  })
});