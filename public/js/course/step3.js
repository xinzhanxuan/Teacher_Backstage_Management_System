/**
 * Created by 轩哥哥 on 2017/8/26.
 */
define(['jquery', 'template', 'tool', 'bootstrap','jquery_form'], function ($, template, tool) {
  $(function () {
    var cs_id = tool.getParam('cs_id');
    console.log(location.pathname);
    $.ajax({
      type: 'get',
      url: '/api/course/lesson',
      data: {
        cs_id: cs_id
      },
      success: function (info) {
        console.log(info);
        if (info.code == 200) {
          var html = template('timeTmp', info.result);
          $('#course-add').html(html);
        }
      }
    })
    
    
    //添加课时
    $('body').on('click', '.addTime', function () {
      var obj = {
        title: "添加课时",
        btnText: "添 加",
        type: "add",
        ct_cs_id: cs_id   //添加时没有cs_id
      };
      var html = template('modelTmp', obj);
      $('#lesson').html(html);
      // console.log(html);
      $('#lesson').modal('show');
      
    });
    //编辑课时
    $('body').on('click', '.edit', function () {
      var ct_id = $(this).data('id');
      $.ajax({
        url: '/api/course/chapter/edit',
        type: 'get',
        data: {
          ct_id: ct_id
        },
        success: function (info) {
          console.log(info);
          info.result.title = "编辑课时";
          info.result.btnText = "编 辑";
          info.result.ct_cs_id = cs_id;
          info.result.type = "edit";
  
          var html = template('modelTmp', info.result);
          $('#lesson').html(html);
          $('#lesson').modal('show');
        }
      })
      
    })
    //修改，保存课时
    $('body').on('click', '.editText', function () {
      var type = $(this).data('type');
      console.log(type);
      var url;
      if (type == 'add') {
        url = '/api/course/chapter/add';
      }else {
        url = '/api/course/chapter/modify';
      }
      
      //判断是否免费
      var ct_is_free;
      if($('#ct_is_free').prop('checked')){
        ct_is_free = 1;
      }else{
        ct_is_free = 0;
      }
      $('#formm').ajaxSubmit({
        url:url,
        type:'post',
        data:{
          ct_is_free:ct_is_free,
        },
        success:function (info) {
          console.log(info);
          if(info.code == 200){
               // location.href = '/course/step3?cs_id='+cs_id
         }
        }
      })
      
      
    })
    
    
  })
  
});