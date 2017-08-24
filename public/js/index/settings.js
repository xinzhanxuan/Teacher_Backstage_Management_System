/**
 * Created by 轩哥哥 on 2017/8/23.
 */
define(["jquery", "template",'tool','ckeditor','region',"uploadify",'jquery_cookie'], function ($, template,tool,CKEDITOR) {
  
  $(function () {
    $.ajax({
      url:'/api/teacher/profile',
      type:'get',
      success:function (info) {
        console.log(info);
        var html = template('personCenter',info.result);
        $('#personForm').html(html);
      
        //上传头像
        $("#upfile").uploadify({
          height: 120,
          swf: '/public/assets/uploadify/uploadify.swf',
          uploader: '/api/uploader/avatar',
          width: 120,
          fileObjName:"tc_avatar",
          buttonText:"",
          onUploadSuccess:function (file, data, response) {
            data = JSON.parse(data);
            console.log(data);
            //设置图片
            $(".preview img").attr("src", data.result.path);
            var infoObj = {
              tc_name:info.result.tc_name,
              tc_avatar:data.result.path
            }
            infoObj = JSON.stringify(infoObj);
            $('#headImg img').attr('src',data.result.path);
            $.cookie('userinfo',infoObj,{path:"/", expires:1});
          }
        });
      
        //日期插件
        tool.setDate('.birthDay');
        tool.setDate('.workDate');
      
        //三级联动
        $('#region').region({
          url:'/public/assets/jquery-region/region.json'
        })
      
        //富文本编辑器
        CKEDITOR.replace( 'text' ,{
          toolbarGroups: [
            {name: 'clipboard', groups: ['clipboard', 'undo']},
          
            {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
            '/',
            {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']},
            {name: 'styles'},
            {name: 'colors'},
          ]
        });
  
       
      
      }
    })
  
    //点击保存
    $('body').on('click','#save',function () {
      //点击提交时，把富文本编辑的内容同步到textarea中，这样后端获取到这个值
      for ( instance in CKEDITOR.instances ) {
        CKEDITOR.instances[instance].updateElement();
      }
      
      $.ajax({
        url:'/api//teacher/modify',
        type:'post',
        data:$('#personForm').serialize(),
        success:function (info) {
          if(info.code == 200){
            location.href = "/settings";
          }
        }
      })
    })
  })
  
 
  
});