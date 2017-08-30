/**
 * Created by 轩哥哥 on 2017/8/25.
 */
define(['jquery', 'template', 'tool', "uploadify", 'Jcrop'], function ($, template, tool) {
  $(function () {
    var cs_id = tool.getParam('cs_id');
    var x, y, w, h;
    $.ajax({
      type: 'get',
      url: '/api/course/picture',
      data: {
        cs_id: cs_id
      },
      success: function (info) {
        if(info.code == 200){
          var html = template('cutImg', info.result);
          $('#course-add').html(html);
  
  
          $("#pp").uploadify({
            swf: '/public/assets/uploadify/uploadify.swf',
            buttonText: "上传图片",
            buttonClass: "btn btn-success btn-sm btn_upfile",
            width: 70,
            height: 30,
            fileObjName: "cs_cover_original",
            formData: {
              cs_id: cs_id
            },
            itemTemplate: "<span></span>",
            uploader: "/api/uploader/cover",
            fileSizeLimit: "2MB",
            fileTypeExts: '*.gif; *.jpg; *.png',
            onUploadSuccess: function (file, data) {
              var data = JSON.parse(data);
              var path = data.result.path;
             
              $('.preview img').attr('src', path);
              $('#clip').removeAttr('disabled');
              
            }
    
          });
        }
        
        
      }
    })
  
    //裁剪图片
    $('body').on('click', '#clip', function () {
      var clipName = $(this).text();
      if (clipName == '裁切图片') {
        $('#preview img').Jcrop({
          aspectRatio: 2,
          setSelect: [0, 0, 1000, 1000],
          boxWidth: 400,
        }, function () {
          this.initComponent('Thumbnailer', {width: 240, height: 120, parent: '.thumb'});
          var init = this.getSelection();
          x = init.x;
          y = init.y;
          w = init.w;
          h = init.h;
        
          //移动事件
          $('#preview').on('cropmove', function (a, b, c) {
            x = parseInt(c.x);
            y = parseInt(c.y);
            w = parseInt(c.w);
            h = parseInt(c.h);
          });
        });
        $(this).html('保存图片');
      } else {
        $.ajax({
          url:'/api/course/update/picture',
          type:'post',
          data:{
            x:x,
            y:y,
            w:w,
            h:h,
            cs_id:cs_id
          },
          success:function (info) {
            console.log(info);
            if(info.code == 200){
              // $('#clip').attr('disabled','disabled');
              // location.href = '/course/step3?cs_id='+cs_id;
            }
          }
        })
        // $(this).html('裁剪图片');
      }
    
    })
    
  })
});