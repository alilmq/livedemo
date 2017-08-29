require('./listheader.scss');

$('.list_title h3').on('click', function(){
  $('.list_title h3').removeClass('active');
  $(this).addClass('active');
  if($(this).hasClass('historyhead')){
    $('.chat_area').hide();
    $('.list_area').show();
  }else{
    $('.list_area').hide();
    $('.chat_area').show();
  }
});