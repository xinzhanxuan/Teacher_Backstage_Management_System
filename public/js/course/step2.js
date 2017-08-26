/**
 * Created by 轩哥哥 on 2017/8/25.
 */
define(['jquery','template','tool',"uploadify"],function ($, template,tool) {
  $(function () {
    var cs_id = tool.getParam('cs_id');
    $.ajax({
      type:'get',
      url:'/api/course/picture',
      data:{
        cs_id:cs_id
      },
      success:function (info) {
        console.log(info);
        var html = template('cutImg',info.result);
        $('#course-add').html(html);
        
        
        $("#pp").uploadify({
          swf: '/public/assets/uploadify/uploadify.swf',
          buttonText:"上传图片",
          buttonClass:"btn btn-success btn-sm btn_upfile",
          width:70,
          height:30,
          fileObjName:"cs_cover_original",
          formData:{
            cs_id:cs_id
          },
          itemTemplate:"<span></span>",
          uploader:"/api/uploader/cover",
          fileSizeLimit: "2MB",
          fileTypeExts: '*.gif; *.jpg; *.png',
          onUploadSuccess:function (file, data) {
            data = JSON.parse(data);
            location.href = '/course/step2?cs_id='+cs_id;
            

          }
    
        });
        
        
        
      }
    })
  })
});