/**
 * Created by 轩哥哥 on 2017/8/23.
 */
define(['jquery','template'],function ($,template) {
  $(function () {
    $.ajax({
      url:"/api/category",
      type:'get',
      success:function (info) {
        console.log(info);
        var html = template('tmpCategory',info);
        $('tbody').html(html);
      }
    })
  })
})