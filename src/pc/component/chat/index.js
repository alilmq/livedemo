require('./chat.scss');

$('.emoji_btn').on('click',function(){
  if($('.emoji_pop').css('display')=='block'){
    $('.emoji_pop').hide();
  }else{
    $('.emoji_pop').show();
  }
});


$('#send_txt').on('input propertychange', function(){//!IE--input;IE--propertychange(未测试)
  console.log('it is changed');
});
let str=$('#send_txt').html();
let reg1 = new RegExp('<img', 'g');
let imgNum = str.match(reg1).length;
let s = str.replace(/<img.*?>/g,"");//原字符串值不变
let curLength = s.length+imgNum*2;

  

  