/**
 * Created by 轩哥哥 on 2017/8/21.
 */
define(['jquery','template','bootstrap'],function ($,template) {
  //添加教师列表
  $(function () {
    $.ajax({
      url:'/api/teacher',
      type:'get',
      success:function (info) {
        if(info.code == 200){
          var html = template('teacher_list_tpl',info);
          $('#teacher_list').html(html);
          var logouts = $('.logout');
          // console.log(logouts);
          logouts.each(function () {
            if($(this).data('status') == 0){
              $(this).html('注 销');
              $(this).addClass('btn-warning').removeClass('btn-success');
            }else{
              $(this).html('启 用');
              $(this).removeClass('btn-warning').addClass('btn-success');
            }
          })
         
        }
      }
    })
    //点击查看
    $('#tab').on('click','.look',function () {
      var tc_id = $(this).parent().data('id');
      $.ajax({
        type:'get',
        data:{
          tc_id:tc_id
        },
        url:'/api/teacher/view',
        success:function (info) {
          var html = template('teacher_look',info.result);
          $('#teacherModal').html(html);
        }
      })
    });
    //注销
    $('#tab').on('click','.logout',function () {
      var tc_id = $(this).parent().data('id');
      var tc_status = $(this).data('status');
      var $that = $(this);
      $.ajax({
        type:'post',
        data:{
          tc_id:tc_id,
          tc_status:tc_status
        },
        url:'/api/teacher/handle',
        success:function (info) {
          console.log(info);
          if(info.code == 200){
           if(info.result.tc_status == 0){
             $that.html('注 销');
             $that.addClass('btn-warning').removeClass('btn-success');
           }else{
             $that.html('启 用');
             $that.removeClass('btn-warning').addClass('btn-success');
           }
            $that.data('status',info.result.tc_status);
            
          }
        }
      })
    });
  })
 
})