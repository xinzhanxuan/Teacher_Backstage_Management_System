/**
 * Created by 轩哥哥 on 2017/8/24.
 */
define(['jquery','template','tool','ckeditor'],function ($,template,tool,CKEDITOR) {
  $(function () {
    var cs_id = tool.getParam('cs_id');
    console.log(cs_id);
    $.ajax({
      url:'/api/course/basic',
      type:'get',
      data:{
        cs_id:cs_id
      },
      success:function (info) {
        console.log(info);
        var html = template('teacherInfo',info.result);
        $('#course-add').html(html);
      
        //富文本编辑器
        CKEDITOR.replace('text' ,{
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
    });
  
  
    //渲染二级分类
    $('body').on('change','#cs_cg_pid',function () {
      var cg_id = $(this).val();
      $.ajax({
        url:'/api/category/child',
        type:'get',
        data:{
          cg_id:cg_id
        },
        success:function (info) {
          if(info.code == 200){
            //渲染二级分类
            var html = template("category_tpl", info);
            $("#cs_cg_id").html(html);
          }else {
            $("#cs_cg_id").html('<option value="">二级分类</option>');
          }
        }
      })
    });
    
  
    //点击保存
    $('body').on('click','.btn_save',function () {
      //点击提交时，把富文本编辑的内容同步到textarea中，这样后端获取到这个值
      for ( instance in CKEDITOR.instances ) {
        CKEDITOR.instances[instance].updateElement();
      }
    
      $.ajax({
        url:'/api/course/update/basic',
        type:'post',
        data:$('.teacher').serialize(),
        success:function (info) {
          if(info.code == 200){
            location.href = '/course/step2?cs_id='+cs_id
          }
        }
      })
      return false;
    })
  })
});