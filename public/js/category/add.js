/**
 * Created by 轩哥哥 on 2017/8/24.
 */
define(['jquery','template','tool'],function ($,template,tool) {
  $(function () {
    var cg_id = tool.getParam('cg_id');
    var url;
    if(cg_id){
      url = '/api/category/modify';
      //编辑
      $.ajax({
        type:'get',
        url:'/api/category/edit',
        data:{
          cg_id:cg_id
        },
        success:function (info) {
          info.result.title = '课程编辑';
          info.result.text = '编辑';
          info.result.type = 'edit';
          var html = template('categoryTmp',info.result);
          $('#course-category').html(html);
        }
      })
    }else {
      url = '/api/category/add';
      //添加
      $.ajax({
        type:'get',
        url:'/api/category/top',
        success:function (info) {
          var tmp = {
            title:'课程添加',
            text:'添加',
            top:info.result
          }
          var html = template('categoryTmp',tmp);
          $('#course-category').html(html);
        }
      })
    }
    //点击保存
    $('body').on('click','#save',function () {
      $.ajax({
        url:url,
        type:'post',
        data:$('.form-horizontal').serialize(),
        success:function (info) {
          if(info.code == 200){
            location.href = '/category/list';
          }
        }
      })
      return false;
    })
   
  })
});

