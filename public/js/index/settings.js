/**
 * Created by 轩哥哥 on 2017/8/23.
 */
define(["jquery", "template", "uploadify"], function ($, template) {
  
  $.ajax({
    url:'/api/teacher/profile',
    type:'get',
    success:function (info) {
      console.log(info);
      var html = template('personCenter',info.result);
      $('#personForm').html(html);
    }
  })
  
  // $(function () {
  //   $("#upfile").uploadify({
  //     height: 120,
  //     swf: '/public/assets/uploadify/uploadify.swf',
  //     uploader: '/api/uploader/avatar',
  //     width: 120,
  //     fileObjName:"tc_avatar",
  //     buttonText:"",
  //     onUploadSuccess:function (file, data, response) {
  //       alert('sb');
  //       data = JSON.parse(data);
  //       console.log(data);
  //       //设置图片
  //       $(".preview img").attr("src", data.result.path);
  //     }
  //   });
  // });
  
});