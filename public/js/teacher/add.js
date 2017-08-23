/**
 * Created by 轩哥哥 on 2017/8/21.
 */
define(['jquery','template','tool','bootstrap','jquery_form'],function ($,template,tool) {
  $(function () {
    var search = location.search;
    search = search.substr(1).split('=');
    var url;
    //判断是添加还是编辑
      //根据判断添加和编辑改变url
      //如果是编辑：search.length>1，发送ajax渲染界面，如果是添加，重置内容，添加信息
    if(search.length > 1){
      var tc_id = search[1];
      url = '/api/teacher/update';
      $.ajax({
        type:'get',
        url:'/api/teacher/edit',
        data:{
          tc_id:tc_id
        },
        success:function (info) {
          console.log(info);
          info.result.title = '讲师编辑';
          info.result.text = '修 改';
          var html = template('teacher_edit',info.result)
          $('.teacher').html(html);
          tool.setDate('.tc_join_date');
        }
      });
    }else {
      $('.teacher_add_form')[0].reset();
      tool.setDate('.tc_join_date');
      url = '/api/teacher/add';
    }
    //点击添加
    $('.teacher').on('click','.add',function () {
      $('.teacher_add_form').ajaxSubmit({
        type:'post',
        url:url,
        success:function (info) {
          console.log(info);
          if(info.code == 200){
            alert('ok');
            location.href = '/teacher/list';
          }
        }
      })
      return false;
    })
    
  })
})