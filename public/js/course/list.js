/**
 * Created by 轩哥哥 on 2017/8/25.
 */
define(['jquery','template'],function ($, template) {
 $(function () {
   $.ajax({
     url:'/api/course',
     type:'get',
     success:function (info) {
       console.log(info);
       if(info.code == 200){
         var html = template('courseTmp',info);
         $('#courses').append(html);
       }
     }
   })
 })
});